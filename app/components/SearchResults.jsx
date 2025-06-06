import {Link} from '@remix-run/react';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import {urlWithTrackingParams} from '~/lib/search';
import ProductGridItem from './ProductGridItem';
import ProductGrid from './ProductGrid';

/**
 * @param {Omit<SearchResultsProps, 'error' | 'type'>}
 */
export function SearchResults({term, result, children}) {
  if (!result?.total) {
    return null;
  }

  return children({...result.items, term});
}

SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty = SearchResultsEmpty;

/**
 * @param {PartialSearchResult<'articles'>}
 */
function SearchResultsArticles({term, articles}) {
  if (!articles?.nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Artikelen</h2>
      <div>
        {articles?.nodes?.map((article) => {
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${article.handle}`,
            trackingParams: article.trackingParameters,
            term,
          });

          return (
            <div className="search-results-item" key={article.id}>
              <Link prefetch="intent" to={articleUrl}>
                {article.title}
              </Link>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
}

/**
 * @param {PartialSearchResult<'pages'>}
 */
function SearchResultsPages({term, pages}) {
  if (!pages?.nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Pagina's</h2>
      <div>
        {pages?.nodes?.map((page) => {
          const pageUrl = urlWithTrackingParams({
            baseUrl: `/pages/${page.handle}`,
            trackingParams: page.trackingParameters,
            term,
          });

          return (
            <div className="search-results-item" key={page.id}>
              <Link prefetch="intent" to={pageUrl}>
                {page.title}
              </Link>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
}

/**
 * @param {PartialSearchResult<'products'>}
 */
function SearchResultsProducts({term, products}) {
  if (!products?.nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Producten</h2>
      {products?.nodes.length && (
        <ProductGrid collectionProducts={products.nodes} />
      )}
      {/* <Pagination connection={products}>
        {({nodes, isLoading, NextLink, PreviousLink}) => {
          const ItemsMarkup = nodes.map((product) => {
            const productUrl = urlWithTrackingParams({
              baseUrl: `/products/${product.handle}`,
              trackingParams: product.trackingParameters,
              term,
            });

            // return (
            //   <ProductGridItem
            //     key={product.id}
            //     product={product}
            //     url={productUrl}
            //   />
            // );

            // return (
            //   <div className="search-results-item" key={product.id}>
            //     <Link prefetch="intent" to={productUrl}>
            //       {product.variants.nodes[0].image && (
            //         <Image
            //           data={product.variants.nodes[0].image}
            //           alt={product.title}
            //           width={50}
            //         />
            //       )}
            //       <div>
            //         <p>{product.title}</p>
            //         <small>
            //           <Money data={product.variants.nodes[0].price} />
            //         </small>
            //       </div>
            //     </Link>
            //   </div>
            // );
          });

          return (
            <div>
              <div>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Vorige laden</span>}
                </PreviousLink>
              </div>
              <div>
                {ItemsMarkup}
                <br />
              </div>
              <div>
                <NextLink>
                  {isLoading ? 'Loading...' : <span>Laad meer ↓</span>}
                </NextLink>
              </div>
            </div>
          );
        }}
      </Pagination> */}
    </div>
  );
}

function SearchResultsEmpty() {
  return <p>Geen resultaten, probeer een andere zoekterm.</p>;
}

/** @typedef {RegularSearchReturn['result']['items']} SearchItems */
/**
 * @typedef {Pick<
 *   SearchItems,
 *   ItemType
 * > &
 *   Pick<RegularSearchReturn, 'term'>} PartialSearchResult
 * @template {keyof SearchItems} ItemType
 */
/**
 * @typedef {RegularSearchReturn & {
 *   children: (args: SearchItems & {term: string}) => React.ReactNode;
 * }} SearchResultsProps
 */

/** @typedef {import('~/lib/search').RegularSearchReturn} RegularSearchReturn */
