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
import ProductInfo from '~/components/ProductInfo';

/**
 * @type {MetaFunction<typeof loader>}
 */

// return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];

export const meta = ({data}) => {
  return [
    {title: `${data?.product.seo.title ?? ''} -- gedenk-sieraad.nl`},
    {
      name: 'description',
      content: `${data?.product.seo.description ?? ''} -- gedenk-sieraad.nl`,
    },
    {
      property: 'og:image',
      content: data?.product.selectedVariant.image?.url ?? '',
    },
  ];
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

  //
  //
  //
  //

  const variantImages = product.variants.nodes;
  let extraImages = [];
  product.media.nodes.forEach((media) => {
    if (!variantImages.some((image) => image.url === media.image.url)) {
      extraImages.push(media.image);
    }
  });

  const [activeImage, setActiveImage] = useState();
  const [currentThumbnails, setCurrentThumbnails] = useState([]);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

  return (
    <div className="flex flex-col gap-12">
      <div className="container flex flex-col items-start lg:flex-row">
        {/* Image section */}
        <div className="mb-8 px-0 relative block w-full md:flex md:flex-row-reverse lg:flex-col lg:max-w-lg lg:sticky lg:top-40 lg:mb-0 xl:flex-row-reverse xl:max-w-none 2xl:max-w-2xl 2xl:ml-auto">
          <div className="md:flex-1 lg:mb-4">
            {activeImage && (
              <div
                key={activeImage.url}
                className="animate-fadeIn mb-4 flex justify-center items-center aspect-square lg:mr-8 lg:mb-0"
              >
                <div className="relative group w-full h-full overflow-hidden">
                  <img
                    src={activeImage.url}
                    alt={activeImage.altText}
                    loading="eager"
                    className="max-w-full max-h-full object-contain rounded block w-full h-full z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            )}
          </div>
          {currentThumbnails.length > 1 && (
            <div className="max-w-lg mx-auto relative md:w-32 md:mt-8 lg:w-full lg:mt-0 lg:max-w-none xl:w-32 xl:h-[520px] 2xl:h-[500px] xl:mt-12 2xl:mt-9">
              {currentThumbnails?.map((image, index) => (
                <button
                  key={'thumbnailImage' + image?.url}
                  className={`w-full h-auto aspect-sqaure transition-all animate-fadeIn ml-2 first:ml-0 md:ml-0 md:flex md:justify-center md:mt-4 lg:justify-normal lg:mt-0 xl:mt-4 xl:ml-0 xl:flex xl:justify-center 2xl:mt-3
      focus-visible:outline-none focus:outline-none outline-none`}
                  onClick={() => {
                    setActiveThumbnailIndex(index);
                    setActiveImage(image);
                  }}
                >
                  <img
                    loading="lazy"
                    className={`w-24 h-24 xs:w-28 xs:h-28 object-contain aspect-sqaure sm:w-24 sm:h-24 rouned-lg border-2 rounded-lg ${
                      index == activeThumbnailIndex
                        ? 'border-black'
                        : 'border-black-300'
                    }`}
                    src={image.url}
                    alt={image.altText}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}

        <ProductInfo
          product={product}
          extraImages={extraImages}
          setCurrentThumbnails={setCurrentThumbnails}
          setActiveThumbnailIndex={setActiveThumbnailIndex}
          setActiveImage={setActiveImage}
        />
        {/* <div className="product-main">
          <h1
            style={{fontWeight: 400, fontSize: '2.25rem', marginBottom: '20px'}}
          >
            {title}
          </h1>

          {selectedVariant?.price?.amount && (
            <h5 style={{marginBottom: '20px'}} className="font-bold text-md">
              {'Prijs:'}
              <span className="font-light ml-2">
                <FormatedPrice
                  value={(
                    parseFloat(selectedVariant?.price?.amount) +
                    parseFloat(calculatePrice(extraOptions, OptionSets))
                  ).toFixed(2)}
                />
              </span>
            </h5>
          )}

          <Suspense
            fallback={
              <ProductForm
                product={product}
                selectedVariant={selectedVariant}
                variants={[]}
                tags={product.tags}
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
              errorElement="Er was een probleem met het laden van de varianten."
              resolve={variants}
            >
              {(data) => (
                <ProductForm
                  product={product}
                  selectedVariant={selectedVariant}
                  variants={data?.product?.variants.nodes || []}
                  tags={product.tags}
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
        </div> */}
      </div>

      <div className="flex flex-wrap items-center container mx-auto lg:max-w-5xl">
        <span className="bg-primary p-4 px-6 text-white rounded-t">
          <span className="font-bold w-full -mb-2">Productbeschrijving:</span>
        </span>
        <p
          style={{padding: 16}}
          dangerouslySetInnerHTML={{__html: descriptionHtml}}
          className="border-[1px] border-gray-200 p-4 leading-7 tracking-wide"
        ></p>
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
    id
    title
    sku
    unitPrice {
      amount
      currencyCode
    }
    image {
      altText
      height
      id
      src
      url
      width
    }
    selectedOptions {
      name
      value
    }
    compareAtPriceV2 {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    currentlyNotInStock
    priceV2 {
      currencyCode
      amount
    }
    price {
      amount
      currencyCode
    }
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
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
    media(first: 100) {
      nodes {
        ... on MediaImage {
          id
          image {
            id
            height
            altText
            url
            width
          }
        }
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
    console.log('createproductvariant');
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

    // return {
    //   status: 'success',
    //   message: '',
    //   variantId: 49179744829782,
    // };

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
