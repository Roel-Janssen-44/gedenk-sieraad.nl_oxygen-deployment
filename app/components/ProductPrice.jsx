import {Money} from '@shopify/hydrogen';

/**
 * @param {{
 *   price?: MoneyV2;
 *   compareAtPrice?: MoneyV2 | null;
 * }}
 */
export function ProductPrice({price, compareAtPrice}) {
  return (
    <div className="product-price">
      {compareAtPrice ? (
        <div className="product-price-on-sale">
          {price ? <Money data={price} /> : null}
          <s>
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <Money data={price} />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */

export function FormatedPrice({value}) {
  const price = formatPrice(value);
  return <span>€ {price}</span>;
}

function formatPrice(price) {
  let priceString = price.toString().replace('.', ',');
  if (priceString.includes(',00')) {
    return priceString.replace(',00', ',-');
  }
  if (!priceString.includes(',')) {
    return priceString + ',-';
  }
  if (priceString.endsWith(',0')) {
    return priceString.replace(',0', ',-');
  }
  return priceString;
}
