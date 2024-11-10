import {Suspense, useState, useEffect} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/lib/variants';
import {FormatedPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import ExtraProductOptions from '~/components/ExtraProductOptions';
import {calculatePrice} from '~/lib/utils';
import * as OptionSets from '~/components/productOptions/optionSets';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context, params}) {
  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = context.storefront
    .query(VARIANTS_QUERY, {
      variables: {handle: params.handle},
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    variants,
  };
}

/**
 * @param {{
 *   product: ProductFragment;
 *   request: Request;
 * }}
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

const colors = [
  'Transparent',
  'Aqua',
  'Black',
  'Blush',
  'Brown',
  'Blue',
  'Fluo',
  'Gold',
  'Green',
  'Orange',
  'Marine',
  'Olive',
  'Purple',
  'Red',
  'Baby',
  'Silver',
  'Soft',
  'White',
  'Turquoise',
  'Yellow',
];

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, variants} = useLoaderData();
  const selectedVariant = useOptimisticVariant(
    product.selectedVariant,
    variants,
  );

  const {title, tags, descriptionHtml} = product;
  const tempTags = [
    // 'ringmaat',
    // 'ringmaatsy',
    // 'cord',
    // 'satijn',
    // 'creool',
    'armbandmaat',
    // 'vulset',
    // 'kleuren',
    // 'hars',
    // 'gravure',
    'upload',
    // 'aspakket',
    // 'vppakket',
    // 'vppakketup',
    // 'aszijde',
    // 'tekst',
    // 'poot',
    // 'woord',
    // 'letter',
    // 'positie',
    // 'naamdatum',
    // 'print',
  ];

  const [loading, setLoading] = useState(false);
  const [extraOptions, setExtraOptions] = useState([]);
  const [optionErrors, setOptionErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [error, setError] = useState('');
  const [tempHarskleur, setTempHarskleur] = useState(null);

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTempHarskleur(randomColor);
  }, []);
  let hasTrueValue = Object.values(optionErrors).some(
    (value) => value === true,
  );

  useEffect(() => {
    hasTrueValue = Object.values(optionErrors).some((value) => value === true);
    if (!hasTrueValue) {
      setError('');
    } else {
      setError('* Niet alle velden zijn correct ingevuld.');
    }
  }, [optionErrors]);

  // useEffect(() => {
  //   if (!selectedVariant) return;

  //   const currentVariant = variants.find(
  //     (variant) => variant.id == selectedVariant.id
  //   );

  //   let activeMaterial = "";
  //   const zilver = ["zilver 925 sterling", "9 kt witgoud", "14 kt witgoud"];
  //   const geelgoud = [
  //     "9 kt geelgoud",
  //     "14 kt geelgoud",
  //     "zilver/geelgoud verguld",
  //   ];
  //   const rosegoud = [
  //     "9 kt roségoud",
  //     "14 kt roségoud",
  //     "zilver/roségoud verguld",
  //   ];

  //   let availableMaterialOrder = [];
  //   product.variants.nodes.forEach((variant) => {
  //     const variantMaterial = variant.title.split(" / ")[0].toLowerCase();
  //     if (zilver.includes(variantMaterial)) {
  //       if (!availableMaterialOrder.includes("zilver")) {
  //         availableMaterialOrder.push("zilver");
  //       }
  //     } else if (geelgoud.includes(variantMaterial)) {
  //       if (!availableMaterialOrder.includes("geelgoud")) {
  //         availableMaterialOrder.push("geelgoud");
  //       }
  //     } else if (rosegoud.includes(variantMaterial)) {
  //       if (!availableMaterialOrder.includes("rosegoud")) {
  //         availableMaterialOrder.push("rosegoud");
  //       }
  //     }
  //   });

  //   let newThumbnails = [];

  //   const selectedVariantMaterial =
  //     currentVariant.selectedOptions[0].value.toLowerCase();
  //   if (!product.tags.includes("kleuren")) {
  //     newThumbnails.push(currentVariant.image);
  //   }

  //   if (zilver.includes(selectedVariantMaterial)) {
  //     activeMaterial = "zilver";
  //   } else if (geelgoud.includes(selectedVariantMaterial)) {
  //     activeMaterial = "geelgoud";
  //   } else if (rosegoud.includes(selectedVariantMaterial)) {
  //     activeMaterial = "rosegoud";
  //   }

  //   const harskleurOption = extraOptions.find((obj) => obj.key === "kleuren");

  //   const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //   const harsKleur =
  //     harskleurOption?.value[0].value.split(" ")[0] ||
  //     tempHarskleur ||
  //     randomColor;

  //   if (product.tags.includes("kleuren")) {
  //     newThumbnails.forEach((thumbnail, index) => {
  //       if (!thumbnail.altText?.includes(harsKleur)) {
  //         newThumbnails.splice(index, 1);
  //       }
  //     });
  //     extraImages?.forEach((image) => {
  //       if (image.altText?.toLowerCase().includes(harsKleur.toLowerCase())) {
  //         newThumbnails.push(image);
  //       }
  //     });

  //     // Image order based on selected material
  //     if (availableMaterialOrder[0] != activeMaterial) {
  //       if (availableMaterialOrder[1] == activeMaterial) {
  //         [newThumbnails[0], newThumbnails[1]] = [
  //           newThumbnails[1],
  //           newThumbnails[0],
  //         ];
  //       } else if (availableMaterialOrder[2] == activeMaterial) {
  //         [newThumbnails[0], newThumbnails[2]] = [
  //           newThumbnails[2],
  //           newThumbnails[0],
  //         ];
  //       }
  //     }
  //   }

  //   extraImages?.forEach((image) => {
  //     if (!newThumbnails[0]) return;
  //     if (product.tags.includes("geboorte")) {
  //       if (
  //         newThumbnails[0].altText?.toLowerCase() ==
  //           image.altText.toLowerCase() ||
  //         image.altText?.toLowerCase().includes("alle") ||
  //         newThumbnails[0].altText
  //           ?.toLowerCase()
  //           .includes(image.altText.toLowerCase())
  //       ) {
  //         if (
  //           !newThumbnails.some(
  //             (thumbnail) =>
  //               thumbnail.url === image.url &&
  //               thumbnail.altText === image.altText
  //           )
  //         ) {
  //           newThumbnails.push(image);
  //         }
  //       }
  //     } else {
  //       if (
  //         newThumbnails[0].altText
  //           ?.toLowerCase()
  //           .includes(image.altText?.toLowerCase())
  //       ) {
  //         if (
  //           !newThumbnails.some(
  //             (thumbnail) =>
  //               thumbnail.url === image.url &&
  //               thumbnail.altText === image.altText
  //           )
  //         ) {
  //           newThumbnails.push(image);
  //         }
  //       } else if (product.tags.includes("letter")) {
  //         if (image.altText?.toLowerCase().includes("alle")) {
  //           newThumbnails.push(image);
  //         }
  //       } else {
  //         if (
  //           (selectedVariantMaterial.includes("zilver 925 sterling") ||
  //             selectedVariantMaterial.includes("witgoud")) &&
  //           (image.altText?.toLowerCase().includes("zilver 925 sterling") ||
  //             image.altText?.toLowerCase().includes("witgoud") ||
  //             image.altText?.toLowerCase().includes("alle"))
  //         ) {
  //           newThumbnails.push(image);
  //         } else if (
  //           selectedVariantMaterial.includes("geelgoud") &&
  //           (image.altText?.toLowerCase().includes("geelgoud") ||
  //             image.altText?.toLowerCase().includes("alle"))
  //         ) {
  //           newThumbnails.push(image);
  //         } else if (
  //           (selectedVariantMaterial.includes("rosegoud") ||
  //             selectedVariantMaterial.includes("roségoud")) &&
  //           (image.altText?.toLowerCase().includes("rosegoud") ||
  //             image.altText?.toLowerCase().includes("roségoud") ||
  //             image.altText?.toLowerCase().includes("alle"))
  //         ) {
  //           newThumbnails.push(image);
  //         }
  //       }
  //     }
  //   });

  //   if (tags.includes("positie")) {
  //     extraImages?.forEach((image) => {
  //       newThumbnails.push(image);
  //     });
  //   }

  //   const uniqueUrls = {};
  //   newThumbnails = newThumbnails.filter((obj) => {
  //     if (uniqueUrls[obj?.url]) {
  //       return false;
  //     }
  //     uniqueUrls[obj?.url] = true;
  //     return true;
  //   });

  //   setActiveImage(newThumbnails[0]);
  //   setCurrentThumbnails(newThumbnails);
  //   setActiveThumbnailIndex(0);
  // }, [selectedVariant, extraOptions]);

  useEffect(() => {
    console.log('extraOptions', extraOptions);
    // console.log(calculatePrice(extraOptions, OptionSets));
  }, [extraOptions]);

  return (
    <div className="product">
      <ProductImage image={selectedVariant?.image} />
      <div className="product-main">
        <h1>{title}</h1>

        {selectedVariant?.price?.amount && (
          <FormatedPrice
            value={(
              parseFloat(selectedVariant?.price?.amount) +
              parseFloat(calculatePrice(extraOptions, OptionSets))
            ).toFixed(2)}
          />
        )}

        <br />
        <Suspense
          fallback={
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={[]}
              tags={tempTags}
              extraOptions={extraOptions}
              setExtraOptions={setExtraOptions}
              showErrors={showErrors}
              error={error}
              hasTrueValue={hasTrueValue}
              setShowErrors={setShowErrors}
              optionErrors={optionErrors}
              setOptionErrors={setOptionErrors}
            />
          }
        >
          <Await
            errorElement="There was a problem loading product variants"
            resolve={variants}
          >
            {(data) => (
              <ProductForm
                product={product}
                selectedVariant={selectedVariant}
                variants={data?.product?.variants.nodes || []}
                tags={tempTags}
                extraOptions={extraOptions}
                setExtraOptions={setExtraOptions}
                showErrors={showErrors}
                error={error}
                hasTrueValue={hasTrueValue}
                setShowErrors={setShowErrors}
                optionErrors={optionErrors}
                setOptionErrors={setOptionErrors}
              />
            )}
          </Await>
        </Suspense>

        <br />
        <br />
        <p>
          <strong>Description</strong>
        </p>
        <br />
        <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
        <br />
      </div>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    tags
    options {
      name
      optionValues {
        name
      }
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 50) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

export async function action({context, request}) {
  const formData = await request.formData();
  const action = JSON.parse(formData.get('action'));

  if (action == 'createproductvariant') {
    const product = JSON.parse(formData.get('product'));
    const selectedVariant = JSON.parse(formData.get('selectedVariant'));
    const extraOptions = JSON.parse(formData.get('extraOptions'));

    const variantData = {
      product,

      extraOptions,
      selectedVariant,
    };

    const publicStoreDomain = context.env.PUBLIC_STORE_DOMAIN;
    const storeName = context.env.PUBLIC_STORE_DOMAIN;
    const ADMIN_TOKEN = context.env.PRIVATE_SHOPIFY_ADMIN_TOKEN;
    const method = 'POST';
    const apiVersion = '2023-10';

    const productIdParts = product.id.split('/');
    const productId = productIdParts[productIdParts.length - 1];

    const variants = product.variants.nodes;

    const imageIdParts = selectedVariant.image.id.split('/');
    const imageId = imageIdParts[imageIdParts.length - 1];

    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    const option1 =
      selectedVariant.selectedOptions[0].value +
      ' WD options ' +
      String(randomNumber);
    const option2 =
      selectedVariant.selectedOptions[1]?.value !== undefined
        ? selectedVariant.selectedOptions[1].value
        : null;
    const option3 =
      selectedVariant.selectedOptions[2]?.value !== undefined
        ? selectedVariant.selectedOptions[2].value
        : null;

    const price =
      parseFloat(selectedVariant.price.amount) +
      parseFloat(calculatePrice(extraOptions, OptionSets));

    const postBody = {
      variant: {
        product_id: productId,
        option1: option1,
        option2: option2,
        option3: option3,
        price: price,
        inventory_policy: 'continue',
        sku: selectedVariant.sku,
        image_id: imageId,
      },
    };

    const options = {
      method: method,
      headers: {
        'X-Shopify-Access-Token': ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    };

    const url = `https://${storeName}/admin/api/${apiVersion}/products/${postBody.variant.product_id}/variants.json`;

    return {
      status: 'success',
      message: '',
      variantId: 49227209015638,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return {
        status: 'success',
        message: '',
        variantId: data?.variant?.id,
      };
    } catch (error) {
      console.log(JSON.stringify({error: error.message}));
      return JSON.stringify({
        status: 'failed',
        message: error.message,
      });
    }
  } else {
    return 'Action not found';
  }
}
