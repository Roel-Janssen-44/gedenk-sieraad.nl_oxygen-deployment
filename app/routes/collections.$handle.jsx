import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {
  getPaginationVariables,
  Image,
  Money,
  Analytics,
} from '@shopify/hydrogen';
import {useEffect, useState, Suspense} from 'react';
import {useVariantUrl} from '~/lib/variants';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import ProductGridItem from '~/components/ProductGridItem';
import SortCollection from '~/components/SortCollection';
import ProductGrid from '~/components/ProductGrid';
import FilterCollection from '~/components/FilterCollection';
import {getClientBrowserParameters} from '@shopify/hydrogen-react';
import {collapseTextChangeRangesAcrossMultipleVersions} from 'typescript';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
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
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 30,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  return {};
}

export default function Collection({pageProps}) {
  /** @type {LoaderReturnData} */
  const {collection} = useLoaderData();

  const [renderedProducts, setRenderedProducts] = useState(
    collection.products.nodes,
  );

  const filterProducts = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const material = searchParams.get('Materiaal');
    const vendor = searchParams.get('Merk');
    const minPrice = parseFloat(searchParams.get('MinPrijs')) || 0;
    const maxPrice = parseFloat(searchParams.get('MaxPrijs')) || Infinity;

    const filteredList = collection.products.nodes.filter((product, index) => {
      const matchesMaterial = material
        ? product.options.some(
            (option) =>
              option.name === 'Materiaal' && option.values.includes(material),
          )
        : true;

      const matchesVendor = vendor ? product.vendor === vendor : true;

      const productMinPrice = parseFloat(
        product.priceRange.minVariantPrice.amount,
      );
      const productMaxPrice = parseFloat(
        product.priceRange.maxVariantPrice.amount,
      );

      let matchesPrice = false;

      if (minPrice <= productMinPrice) {
        if (maxPrice >= productMinPrice) {
          matchesPrice = true;
        } else {
          matchesPrice = false;
        }
      } else if (minPrice > productMinPrice) {
        if (maxPrice > productMaxPrice) {
          matchesPrice = false;
        } else {
          matchesPrice = true;
        }
      }

      return matchesMaterial && matchesVendor && matchesPrice;
    });

    setRenderedProducts(filteredList);
  };
  const sortProducts = (sort) => {
    let sortedProducts = [...renderedProducts];
    //     aanbevolen
    // bestsellers
    // laag naar hoog
    // hoog naar laag
    switch (sort) {
      case 'laag naar hoog':
        console.log('laag naar hoog');
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return priceA - priceB;
        });
        break;

      case 'hoog naar laag':
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return priceB - priceA;
        });
        break;

      case 'aanbevolen':
      case 'bestsellers':
        sortedProducts.sort(() => Math.random() - 0.5);
        break;
    }

    console.log('Sorted products:', sortedProducts);

    setRenderedProducts(sortedProducts);
  };

  return (
    <>
      <div className="relative container flex flex-col gap-8 md:flex-row">
        <FilterCollection
          filterProducts={filterProducts}
          products={collection.products.nodes}
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-[1px] border-gray-200 p-4 mb-8 bg-white rounded-md">
            <div className="min-w-[150px]">
              <img
                className="rounded"
                src={collection.image.url}
                width={150}
                height={150}
              />
            </div>
            <div className="">
              <h1 className="text-3xl font-roboto mb-4">{collection.title}</h1>
              <p dangerouslySetInnerHTML={{__html: collection.description}}></p>
            </div>
          </div>
          <SortCollection sortProducts={sortProducts} />
          <Suspense fallback={<div>Collectie aan het laden...</div>}>
            <ProductGrid collectionProducts={renderedProducts} />
          </Suspense>
        </div>
      </div>
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ProductItem on Product {
    title
    id
    handle
    images(first: 2) {
      nodes {
        altText
        height
        url
        width
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
    options(first: 1) {
      name
      values
    }
  }

`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        altText
        height
        url
        width
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
        
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
