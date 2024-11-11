/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */

import {VariantSelector} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {Form, Link, useActionData} from '@remix-run/react';
import {useState, useEffect, useRef} from 'react';
import {cartLinesAddDefault} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {json} from '@remix-run/server-runtime';
import ExtraProductOptions from '~/components/ExtraProductOptions';
import {useFetcher} from '@remix-run/react';

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
export function ProductForm({
  product,
  selectedVariant,
  variants,
  tags,
  extraOptions,
  setExtraOptions,
  showErrors,
  error,
  hasTrueValue,
  setShowErrors,
  optionErrors,
  setOptionErrors,
}) {
  const {open} = useAside();
  const fetcher = useFetcher();
  const actionData = useActionData();

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [newVariantId, setNewVariantId] = useState(null);
  const addToCartButtonRef = useRef(null);

  useEffect(() => {
    if (actionData) {
      setResponseData(actionData);
      setIsLoading(false);
    }
  }, [actionData]);

  useEffect(() => {
    if (responseData?.status === 'success') {
      setNewVariantId(responseData?.variantId);
    } else {
      // Todo - error handling
    }
  }, [responseData]);

  useEffect(() => {
    console.log('newVariantId', newVariantId);
    const AddCreatedProductToCart = async () => {
      if (addToCartButtonRef.current) {
        addToCartButtonRef.current.click();
        setNewVariantId(null);
        setIsLoading(false);
      }
    };

    if (newVariantId !== null) {
      AddCreatedProductToCart(newVariantId);
    } else {
    }
  }, [newVariantId]);

  let extraOptionsArray = extraOptions
    .filter((item) => item.value != null && item.value !== '')
    .map((item) => ({
      key: item.key,
      value:
        typeof item.value === 'string' ? item.value : item.value.join(', '),
    }));

  extraOptionsArray.unshift({
    key: 'Artikelnr',
    value: selectedVariant.sku,
  });

  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options.filter(
          (option) => option.optionValues.length > 1,
        )}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>

      <br />

      <ExtraProductOptions
        tags={tags}
        extraOptions={extraOptions}
        setExtraOptions={setExtraOptions}
        showErrors={showErrors}
        optionErrors={optionErrors}
        setOptionErrors={setOptionErrors}
      />

      <br />
      <br />

      <Form
        method="post"
        action={`/products/${product.handle}`}
        onSubmit={() => setIsLoading(true)}
      >
        <input
          type="hidden"
          name="action"
          value={JSON.stringify('createproductvariant')}
        />
        <input type="hidden" name="product" value={JSON.stringify(product)} />
        <input
          type="hidden"
          name="extraOptions"
          value={JSON.stringify(extraOptions)}
        />
        <input
          type="hidden"
          name="selectedVariant"
          value={JSON.stringify(selectedVariant)}
        />

        <p className="text-red-500">{error}</p>
        <button
          disabled={hasTrueValue}
          type="submit"
          className="bg-green-400 mt-2 p-3 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Aan het laden...' : 'Toevoegen aan winkelwagen'}
        </button>
      </Form>

      {responseData != null && (
        <CartForm route="/cart" action={'CustomAddToCart'}>
          {(fetcher) => (
            <>
              <input
                type="hidden"
                value={JSON.stringify({
                  merchandiseId: `gid://shopify/ProductVariant/${newVariantId}`,
                  quantity: 1,
                  attributes: extraOptionsArray,
                  // attributes: [],
                })}
                name="lines"
              />
              <button
                onClick={() => open('cart')}
                type="submit"
                ref={addToCartButtonRef}
              >
                Submit
              </button>
            </>
          )}
        </CartForm>
      )}
    </div>
  );
}

/**
 * @param {{option: VariantOption}}
 */
function ProductOptions({option}) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          if (value.includes('WD options')) return;
          return (
            <Link
              className="product-options-item"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid black' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
              }}
            >
              {value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
