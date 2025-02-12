// import {Await, useRouteLoaderData} from '@remix-run/react';
// import {Suspense} from 'react';
// import {CartForm} from '@shopify/hydrogen';
// import {json} from '@shopify/remix-oxygen';
// import {CartMain} from '~/components/CartMain';

// /**
//  * @type {MetaFunction}
//  */
// export const meta = () => {
//   return [{title: `Hydrogen | Cart`}];
// };

// /**
//  * @param {ActionFunctionArgs}
//  */
// export async function action({request, context}) {
//   // const {cart} = context;

//   // const formData = await request.formData();

//   // const {action, inputs} = CartForm.getFormInput(formData);

//   // if (!action) {
//   //   throw new Error('No action provided');
//   // }

//   const {cart} = context;

//   // Check the Content-Type header
//   const contentType = request.headers.get('Content-Type');

//   let inputs;

//   // Parse the JSON body if the Content-Type is application/json
//   if (contentType && contentType.includes('application/json')) {
//     inputs = await request.json();
//   } else {
//     // Fallback for other content types (if necessary)
//     const formData = await request.formData();
//     inputs = CartForm.getFormInput(formData);
//   }

//   const {action} = inputs;

//   let status = 200;
//   let result;

//   switch (action) {
//     case CartForm.ACTIONS.LinesAdd:
//       result = await cart.addLines(inputs.lines);
//       break;
//     case CartForm.ACTIONS.LinesUpdate:
//       result = await cart.updateLines(inputs.lines);
//       break;
//     case CartForm.ACTIONS.LinesRemove:
//       result = await cart.removeLines(inputs.lineIds);
//       break;
//     case 'CustomAddToCart':
//       console.log('CustomAddToCart');
//       console.log('inputs');
//       console.log(inputs);
//       result = await cart.addLines(inputs.lines);
//       break;
//     case CartForm.ACTIONS.DiscountCodesUpdate: {
//       const formDiscountCode = inputs.discountCode;

//       // User inputted discount code
//       const discountCodes = formDiscountCode ? [formDiscountCode] : [];

//       // Combine discount codes already applied on cart
//       discountCodes.push(...inputs.discountCodes);

//       result = await cart.updateDiscountCodes(discountCodes);
//       break;
//     }
//     case CartForm.ACTIONS.GiftCardCodesUpdate: {
//       const formGiftCardCode = inputs.giftCardCode;

//       // User inputted gift card code
//       const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];

//       // Combine gift card codes already applied on cart
//       giftCardCodes.push(...inputs.giftCardCodes);

//       result = await cart.updateGiftCardCodes(giftCardCodes);
//       break;
//     }
//     case CartForm.ACTIONS.BuyerIdentityUpdate: {
//       result = await cart.updateBuyerIdentity({
//         ...inputs.buyerIdentity,
//       });
//       break;
//     }
//     default:
//       throw new Error(`${action} cart action is not defined`);
//   }

//   const cartId = result?.cart?.id;
//   const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
//   const {cart: cartResult, errors, warnings} = result;

//   const redirectTo = formData.get('redirectTo') ?? null;
//   if (typeof redirectTo === 'string') {
//     status = 303;
//     headers.set('Location', redirectTo);
//   }

//   return json(
//     {
//       cart: cartResult,
//       errors,
//       warnings,
//       analytics: {
//         cartId,
//       },
//     },
//     {status, headers},
//   );
// }

// export default function Cart() {
//   /** @type {RootLoader} */
//   const rootData = useRouteLoaderData('root');
//   if (!rootData) return null;

//   return (
//     <div className="cart">
//       <h1>Cart</h1>
//       <Suspense fallback={<p>Loading cart ...</p>}>
//         <Await
//           resolve={rootData.cart}
//           errorElement={<div>An error occurred</div>}
//         >
//           {(cart) => {
//             return <CartMain layout="page" cart={cart} />;
//           }}
//         </Await>
//       </Suspense>
//     </div>
//   );
// }

// /** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
// /** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
// /** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
// /** @typedef {import('~/root').RootLoader} RootLoader */
// /** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
import {Await, useRouteLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/CartMain';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: `Hydrogen | Cart`}];
};

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case 'CustomAddToCart':
      // Parse the input directly without trying to access merchandiseId separately first
      const parsedLines = JSON.parse(inputs.lines); // This will be an object

      // Use the parsed object to create newLine
      let newLine;
      if (parsedLines?.attributes) {
        console.log('hasOptionset');
        const updatedAttributes = parsedLines.attributes.map((attr) =>
          attr.key === 'armbandmaat'
            ? {...attr, key: 'aangesloten polsmaat'}
            : attr,
        );

        // const hasOptionset = parsedLines?.attributes?.key?.find('armbandmaat');
        console.log(JSON.stringify(parsedLines?.attributes));
        console.log(JSON.stringify(updatedAttributes));
        newLine = {
          merchandiseId: parsedLines.merchandiseId,
          quantity: parsedLines.quantity,
          attributes: updatedAttributes,
        };
      } else {
        newLine = {
          merchandiseId: parsedLines.merchandiseId,
          quantity: parsedLines.quantity,
        };
      }

      // If you want lines to be an array
      const lines = [newLine];
      result = await cart.addLines(lines);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesUpdate: {
      const formGiftCardCode = inputs.giftCardCode;

      // User inputted gift card code
      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];

      // Combine gift card codes already applied on cart
      giftCardCodes.push(...inputs.giftCardCodes);

      result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = inputs.redirectTo ?? null; // Access redirectTo from inputs
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return json(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

export default function Cart() {
  /** @type {RootLoader} */
  const rootData = useRouteLoaderData('root');
  if (!rootData) return null;

  return (
    <div className="cart">
      <h1>Cart</h1>
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await
          resolve={rootData.cart}
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            return <CartMain layout="page" cart={cart} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}

/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('~/root').RootLoader} RootLoader */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
