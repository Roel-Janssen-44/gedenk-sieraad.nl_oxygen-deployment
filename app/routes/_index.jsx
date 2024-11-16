import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

import Hero from '~/components/Hero';
import CollectionCollage from '~/components/CollectionCollage';
import CollectionSlider from '~/components/CollectionSlider';
import TextWithImage from '~/components/TextWithImage';
import Video from '~/components/Video';

/**
 * @type {MetaFunction}
 */
export const meta = ({data}) => {
  return [
    {
      title: `Gedenksieraden en herinneringssieraden voor jou persoonlijk gemaakt -- gedenk-sieraad.nl`,
    },
    {
      name: 'description',
      content: `Exclusieve gedenksieraden om as, haarlokjes en vingerafdrukken van je dierbare in te verwerken en te personaliseren. De online juwelier van voordelige ashangers, memorials, unieke assieraden en See You gedenksieraden. Herinneringssieraden voor huisdieren. Herdenkingswinkel`,
    },
    {
      property: 'og:image',
      content: '../opengraph-image.png',
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
async function loadCriticalData({context}) {
  const [collections] = await Promise.all([
    context.storefront.query(getTopCollectionsQuery),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    // featuredCollection: collections,
    collections: collections,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const collectionLuxury = context.storefront
    .query(getCollectionLuxury)
    .catch((error) => {
      console.error(error);
      return null;
    });

  const collectionExquisite = context.storefront
    .query(getCollectionExquisite)
    .catch((error) => {
      console.error(error);
      return null;
    });
  console.log('Loaded collections:', {collectionLuxury, collectionExquisite});

  return {
    collectionLuxury,
    collectionExquisite,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <>
      <Hero />
      <CollectionCollage collections={data.collections} />
      <Suspense fallback={<div>Collectie aan het laden...</div>}>
        <Await resolve={data.collectionLuxury}>
          {(resolvedCollectionLuxury) => (
            <CollectionSlider collection={resolvedCollectionLuxury} />
          )}
        </Await>
      </Suspense>
      <TextWithImage />
      <Suspense fallback={<div>Collectie aan het laden...</div>}>
        <Await resolve={data.collectionExquisite}>
          {(resolvedCollectionExquisite) => (
            <CollectionSlider collection={resolvedCollectionExquisite} />
          )}
        </Await>
      </Suspense>
      <Video />
    </>
  );
}

const getTopCollectionsQuery = `#graphql
  query Collections {
    collection1: collection(handle: "sieraden-met-vingerprint") {
      ...collectionFields
    }
    collection2: collection(handle: "assieraden") {
      ...collectionFields
    }
    collection3: collection(handle: "dieren") {
      ...collectionFields
    }
  }

  fragment collectionFields on Collection {
    title
    handle
    descriptionHtml
    products(first: 15) {
      nodes {
        title
      }
    }
    image {
      height
      altText
      width
      url
    }
  }
`;

const getCollectionLuxury = `#graphql
  query Collection {
    collection(handle: "luxury-hand-made") {
      handle
      title
      descriptionHtml
      image {
        altText
        height
        url
        width
      }
      seo {
        description
        title
      }
      products(first: 3) {
        nodes {
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
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          vendor
        }
      }
    }
  }
`;
const getCollectionExquisite = `#graphql
  query Collection {
    collection(handle: "exquisite-hand-made") {
      handle
      title
      descriptionHtml
      image {
        altText
        height
        url
        width
      }
      seo {
        description 
        title
      }
      products(first: 3) {
        nodes {
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
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          vendor
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
