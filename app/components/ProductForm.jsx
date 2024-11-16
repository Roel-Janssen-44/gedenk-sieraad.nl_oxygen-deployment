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
import {Button} from './chadcn/Button';

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
    console.log('Variant id changed', newVariantId);
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
    .filter((item) => {
      if (item.value != null && item.value != '') {
        return item;
      }
    })

    .flatMap((item) => {
      if (typeof item.value == 'string') {
        if (item.value != '') {
          return {
            key: item.key,
            value: item.value,
          };
        }
      } else if (typeof item.value == 'object') {
        if (typeof item.value[0].value == 'object') {
          let newOptions = [];
          if (typeof item.value[0].value == 'string') {
            if (item.value[0].value != '') {
              let newString = '';
              item.value.forEach((value, index) => {
                if (index > 0) {
                  newString += `, ${value.value}`;
                } else {
                  newString += value.value;
                }
              });
              return {
                key: item.key,
                value: newString,
              };
            }
          }
          return newOptions;
        } else {
          let newOptions = [];
          item.value.forEach((nestedItem) => {
            if (typeof nestedItem.value == 'object') {
              let newString = '';
              nestedItem.value?.forEach((nestedNestedItem, index) => {
                if (index > 0) {
                  newString += ` , ${nestedNestedItem}`;
                } else {
                  newString += nestedNestedItem;
                }
              });
              if (newString != '') {
                newOptions.push({
                  key: nestedItem.key,
                  value: newString,
                });
              }
            } else {
              if (nestedItem.value != '') {
                newOptions.push({
                  key: nestedItem.key,
                  value: nestedItem.value,
                });
              }
            }
          });
          return newOptions;
        }
      }
    });

  extraOptionsArray.unshift({
    key: 'Artikelnr',
    value: selectedVariant.sku,
  });

  console.log('extraOptionsArray', extraOptionsArray);

  console.log('actionData', actionData);
  console.log('responseData', responseData);
  console.log('newVariantId', newVariantId);

  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options.filter(
          (option) => option.optionValues.length > 0,
        )}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>

      <ExtraProductOptions
        tags={tags}
        extraOptions={extraOptions}
        setExtraOptions={setExtraOptions}
        showErrors={showErrors}
        optionErrors={optionErrors}
        setOptionErrors={setOptionErrors}
      />

      <h6
        style={{marginBottom: '20px'}}
        className="font-bold text-md flex flex-row"
      >
        <div className="min-w-[140px]">{'Merk/collectie:'}</div>
        <span className="font-light ml-2">{product.vendor}</span>
      </h6>
      <h6
        style={{marginBottom: '20px'}}
        className="font-bold text-md flex flex-row"
      >
        <div className="min-w-[140px]">{'Artikelnr:'}</div>
        <span className="font-light ml-2">{product.selectedVariant.sku}</span>
      </h6>

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
        <Button
          disabled={hasTrueValue}
          type="submit"
          className="mt-2 p-3 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Aan het laden...' : 'Toevoegen aan winkelwagen'}
        </Button>
      </Form>

      {responseData != null && (
        <div className="sr-only">
          <CartForm route="/cart" action={'CustomAddToCart'}>
            {(fetcher) => (
              <>
                <input
                  type="hidden"
                  value={JSON.stringify({
                    merchandiseId: `gid://shopify/ProductVariant/${newVariantId}`,
                    quantity: 1,
                    attributes: extraOptionsArray,
                  })}
                  name="lines"
                />
                <button
                  onClick={() => open('cart')}
                  type="submit"
                  ref={addToCartButtonRef}
                >
                  Aan winkelmand toevoegen
                </button>
              </>
            )}
          </CartForm>
        </div>
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
      <h5 style={{marginBottom: '4px'}} className="font-bold">
        {option.name}:
      </h5>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          if (value.includes('WD options')) return;
          return (
            <Link
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
            >
              <Button variant={isActive ? 'default' : 'secondary'}>
                {value}
              </Button>
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
