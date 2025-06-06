import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} remixContext
 * @param {AppLoadContext} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  context,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    // https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    connectSrc: [
      'https://uploads.pinata.cloud/v3/files',
      'https://api.pinata.cloud/v3/files/groups/',
      'https://api.pinata.cloud',
    ],

    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'data:',
      'https://rose-historic-gayal-881.mypinata.cloud',
    ],
    frameSrc: ['https://www.youtube.com'],
    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com',
      'https://fonts.googleapis.com',
    ],

    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/remix-oxygen').EntryContext} EntryContext */
/** @typedef {import('@shopify/remix-oxygen').AppLoadContext} AppLoadContext */
