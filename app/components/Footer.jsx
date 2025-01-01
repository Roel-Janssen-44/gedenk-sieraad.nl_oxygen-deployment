// import {Suspense} from 'react';
// import {Await, NavLink} from '@remix-run/react';

// /**
//  * @param {FooterProps}
//  */
// export function Footer({footer: footerPromise, header, publicStoreDomain}) {
//   return (
//     <Suspense>
//       <Await resolve={footerPromise}>
//         {(footer) => (
//           <footer className="footer">
//             {footer?.menu && header.shop.primaryDomain?.url && (
//               <FooterMenu
//                 menu={footer.menu}
//                 primaryDomainUrl={header.shop.primaryDomain.url}
//                 publicStoreDomain={publicStoreDomain}
//               />
//             )}
//           </footer>
//         )}
//       </Await>
//     </Suspense>
//   );
// }

// /**
//  * @param {{
//  *   menu: FooterQuery['menu'];
//  *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
//  *   publicStoreDomain: string;
//  * }}
//  */
// function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
//   return (
//     <nav className="footer-menu" role="navigation">
//       {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
//         if (!item.url) return null;
//         // if the url is internal, we strip the domain
//         const url =
//           item.url.includes('myshopify.com') ||
//           item.url.includes(publicStoreDomain) ||
//           item.url.includes(primaryDomainUrl)
//             ? new URL(item.url).pathname
//             : item.url;
//         const isExternal = !url.startsWith('/');
//         return isExternal ? (
//           <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
//             {item.title}
//           </a>
//         ) : (
//           <NavLink
//             end
//             key={item.id}
//             prefetch="intent"
//             style={activeLinkStyle}
//             to={url}
//           >
//             {item.title}
//           </NavLink>
//         );
//       })}
//     </nav>
//   );
// }

// const FALLBACK_FOOTER_MENU = {
//   id: 'gid://shopify/Menu/199655620664',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461633060920',
//       resourceId: 'gid://shopify/ShopPolicy/23358046264',
//       tags: [],
//       title: 'Privacy Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/privacy-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633093688',
//       resourceId: 'gid://shopify/ShopPolicy/23358013496',
//       tags: [],
//       title: 'Refund Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/refund-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633126456',
//       resourceId: 'gid://shopify/ShopPolicy/23358111800',
//       tags: [],
//       title: 'Shipping Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/shipping-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633159224',
//       resourceId: 'gid://shopify/ShopPolicy/23358079032',
//       tags: [],
//       title: 'Terms of Service',
//       type: 'SHOP_POLICY',
//       url: '/policies/terms-of-service',
//       items: [],
//     },
//   ],
// };

// /**
//  * @param {{
//  *   isActive: boolean;
//  *   isPending: boolean;
//  * }}
//  */
// function activeLinkStyle({isActive, isPending}) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'white',
//   };
// }

// /**
//  * @typedef {Object} FooterProps
//  * @property {Promise<FooterQuery|null>} footer
//  * @property {HeaderQuery} header
//  * @property {string} publicStoreDomain
//  */

// /** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
// /** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */

import {Button} from '~/components/chadcn/Button';

import {StickyNote, Clock, Phone, Mail} from 'lucide-react';

export default function Footer() {
  return (
    <div className="pt-20 mt-20 border-t-2 border-[#c79385]">
      <div className="container flex flex-col gap-8 md:flex-row md:flex-wrap md:items-center xl:flex-nowrap xl:items-start">
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px]">
          <h4 className="font-roboto text-2xl mb-3">Info pagina&apos;s</h4>
          <ul>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/werkwijze-en-productinfo"
              >
                Productinfo en werkwijze
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/polsmaat-meten"
              >
                Polsmaat meten
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/de-juiste-ringmaat-bepalen"
              >
                De juiste ringmaat bepalen
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/retouren-en-verzending"
              >
                Retouren en verzending
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/vision-mission-value"
              >
                Statement
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px] xl:border-l-primary">
          <ul>
            <li className="my-2 flex flex-row items-center gap-1 mt-0">
              {/* <EmailRoundedIcon fontSize="small" /> */}
              <Mail />
              service@gedenk-sieraad.nl
            </li>
            <li className="my-2 flex flex-row items-center gap-1">
              {/* <LocalPhoneRoundedIcon fontSize="small" /> */}
              <Phone /> & WhatsApp 06 43 79 15 84
            </li>
            <li className="my-2 flex flex-row items-center gap-1">
              {/* <AccessTimeRoundedIcon fontSize="small" /> */}
              <Clock />
              Iedere dag van 09:00 tot 21:00 uur
            </li>
            <li className="my-2 flex flex-row gap-1">
              {/* <NoteRoundedIcon fontSize="small" sx={{ marginTop: "2px" }} /> */}
              <StickyNote />
              BTW nummer: NL001816537B08 <br /> en KvK nummer: 54210666
            </li>
          </ul>
          {/* Payment icons */}
          <ul className="my-5 flex flex-row gap-2 flex-wrap md:mb-0">
            <li>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                x="0"
                y="0"
                width="38"
                height="24"
                viewBox="0 0 165.521 105.965"
                aria-labelledby="pi-apple_pay"
              >
                <title id="pi-apple_pay">Apple Pay</title>
                <path
                  fill="#000"
                  d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"
                ></path>
                <path
                  fill="#FFF"
                  d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"
                ></path>
                <g>
                  <g>
                    <path
                      fill="#000"
                      d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"
                    ></path>
                    <path
                      fill="#000"
                      d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"
                    ></path>
                  </g>
                  <g>
                    <path
                      fill="#000"
                      d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"
                    ></path>
                    <path
                      fill="#000"
                      d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"
                    ></path>
                    <path
                      fill="#000"
                      d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"
                    ></path>
                  </g>
                </g>
              </svg>
            </li>

            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 38 24"
                width="38"
                height="24"
                aria-labelledby="pi-google_pay"
              >
                <title id="pi-google_pay">Google Pay</title>
                <path
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  fill="#000"
                  opacity=".07"
                ></path>
                <path
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  fill="#FFF"
                ></path>
                <path
                  d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z"
                  fill="#5F6368"
                ></path>
                <path
                  d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z"
                  fill="#34A853"
                ></path>
                <path
                  d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z"
                  fill="#FBBC04"
                ></path>
                <path
                  d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z"
                  fill="#EA4335"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-ideal"
              >
                <title id="pi-ideal">iDEAL</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                ></path>
                <path
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                  fill="#fff"
                ></path>
                <path
                  d="M14 6.912V19h5.648C24.776 19 27 16.302 27 12.486 27 8.834 24.776 6 19.648 6h-4.67c-.543 0-.978.414-.978.912Z"
                  fill="#C06"
                ></path>
                <path d="M19.312 21h-8.884C9.64 21 9 20.373 9 19.6V5.4c0-.773.64-1.4 1.428-1.4h8.884C27.742 4 29 9.317 29 12.482 29 17.974 25.555 21 19.313 21h-.001ZM10.428 4.467a.944.944 0 0 0-.878.573.936.936 0 0 0-.074.36v14.2a.936.936 0 0 0 .59.866c.115.046.238.07.362.068h8.884c5.938 0 9.212-2.86 9.212-8.052 0-6.972-5.774-8.015-9.212-8.015h-8.884Z"></path>
                <path
                  d="M16.252 11.008c.188 0 .361.03.528.088.167.06.304.155.427.273.116.125.21.28.282.457.065.184.101.398.101.649 0 .22-.028.42-.08.604a1.417 1.417 0 0 1-.245.479 1.197 1.197 0 0 1-.413.317 1.437 1.437 0 0 1-.586.118H15V11h1.252v.008Zm-.044 2.44c.095 0 .181-.016.276-.045a.539.539 0 0 0 .23-.155.863.863 0 0 0 .168-.28c.043-.118.065-.25.065-.42 0-.147-.015-.287-.044-.405a.814.814 0 0 0-.145-.31.656.656 0 0 0-.26-.199 1.047 1.047 0 0 0-.398-.066h-.464v1.887h.572v-.008Zm3.995-2.44v.553h-1.548v.64h1.426v.51h-1.426v.73h1.585v.552h-2.229V11h2.194v.008h-.002Zm2.215 0 1.1 2.992h-.673l-.224-.663h-1.1l-.232.663h-.652l1.108-2.992h.673Zm.037 1.835-.37-1.098h-.007l-.384 1.098h.76Zm2.112-1.835v2.44H26V14h-2.076v-2.992h.643Z"
                  fill="#fff"
                ></path>
                <path d="M11.5 13.652c.829 0 1.5-.593 1.5-1.326 0-.732-.671-1.326-1.5-1.326s-1.5.594-1.5 1.326c0 .732.671 1.326 1.5 1.326ZM12.63 19c-1.258 0-2.269-.9-2.269-2.007v-1.568a.969.969 0 0 1 .337-.715c.214-.189.502-.294.802-.291a1.24 1.24 0 0 1 .433.073c.137.05.262.124.368.218.106.093.19.205.248.327a.93.93 0 0 1 .09.388V19h-.008Z"></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-maestro"
              >
                <title id="pi-maestro">Maestro</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                <circle fill="#00A2E5" cx="23" cy="12" r="7"></circle>
                <path
                  fill="#7375CF"
                  d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-master"
              >
                <title id="pi-master">Mastercard</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                <path
                  fill="#FF5F00"
                  d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-paypal"
              >
                <title id="pi-paypal">PayPal</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <path
                  fill="#003087"
                  d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                ></path>
                <path
                  fill="#3086C8"
                  d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                ></path>
                <path
                  fill="#012169"
                  d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 38 24"
                width="38"
                height="24"
                aria-labelledby="pi-shopify_pay"
              >
                <title id="pi-shopify_pay">Shop Pay</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  fill="#000"
                ></path>
                <path
                  d="M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z"
                  fill="#5A31F4"
                ></path>
                <path
                  d="M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z"
                  fill="#fff"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="-36 25 38 24"
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-unionpay"
              >
                <title id="pi-unionpay">Union Pay</title>
                <path
                  fill="#005B9A"
                  d="M-36 46.8v.7-.7zM-18.3 25v24h-7.2c-1.3 0-2.1-1-1.8-2.3l4.4-19.4c.3-1.3 1.9-2.3 3.2-2.3h1.4zm12.6 0c-1.3 0-2.9 1-3.2 2.3l-4.5 19.4c-.3 1.3.5 2.3 1.8 2.3h-4.9V25h10.8z"
                ></path>
                <path
                  fill="#E9292D"
                  d="M-19.7 25c-1.3 0-2.9 1.1-3.2 2.3l-4.4 19.4c-.3 1.3.5 2.3 1.8 2.3h-8.9c-.8 0-1.5-.6-1.5-1.4v-21c0-.8.7-1.6 1.5-1.6h14.7z"
                ></path>
                <path
                  fill="#0E73B9"
                  d="M-5.7 25c-1.3 0-2.9 1.1-3.2 2.3l-4.4 19.4c-.3 1.3.5 2.3 1.8 2.3H-26h.5c-1.3 0-2.1-1-1.8-2.3l4.4-19.4c.3-1.3 1.9-2.3 3.2-2.3h14z"
                ></path>
                <path
                  fill="#059DA4"
                  d="M2 26.6v21c0 .8-.6 1.4-1.5 1.4h-12.1c-1.3 0-2.1-1.1-1.8-2.3l4.5-19.4C-8.6 26-7 25-5.7 25H.5c.9 0 1.5.7 1.5 1.6z"
                ></path>
                <path
                  fill="#fff"
                  d="M-21.122 38.645h.14c.14 0 .28-.07.28-.14l.42-.63h1.19l-.21.35h1.4l-.21.63h-1.68c-.21.28-.42.42-.7.42h-.84l.21-.63m-.21.91h3.01l-.21.7h-1.19l-.21.7h1.19l-.21.7h-1.19l-.28 1.05c-.07.14 0 .28.28.21h.98l-.21.7h-1.89c-.35 0-.49-.21-.35-.63l.35-1.33h-.77l.21-.7h.77l.21-.7h-.7l.21-.7zm4.83-1.75v.42s.56-.42 1.12-.42h1.96l-.77 2.66c-.07.28-.35.49-.77.49h-2.24l-.49 1.89c0 .07 0 .14.14.14h.42l-.14.56h-1.12c-.42 0-.56-.14-.49-.35l1.47-5.39h.91zm1.68.77h-1.75l-.21.7s.28-.21.77-.21h1.05l.14-.49zm-.63 1.68c.14 0 .21 0 .21-.14l.14-.35h-1.75l-.14.56 1.54-.07zm-1.19.84h.98v.42h.28c.14 0 .21-.07.21-.14l.07-.28h.84l-.14.49c-.07.35-.35.49-.77.56h-.56v.77c0 .14.07.21.35.21h.49l-.14.56h-1.19c-.35 0-.49-.14-.49-.49l.07-2.1zm4.2-2.45l.21-.84h1.19l-.07.28s.56-.28 1.05-.28h1.47l-.21.84h-.21l-1.12 3.85h.21l-.21.77h-.21l-.07.35h-1.19l.07-.35h-2.17l.21-.77h.21l1.12-3.85h-.28m1.26 0l-.28 1.05s.49-.21.91-.28c.07-.35.21-.77.21-.77h-.84zm-.49 1.54l-.28 1.12s.56-.28.98-.28c.14-.42.21-.77.21-.77l-.91-.07zm.21 2.31l.21-.77h-.84l-.21.77h.84zm2.87-4.69h1.12l.07.42c0 .07.07.14.21.14h.21l-.21.7h-.77c-.28 0-.49-.07-.49-.35l-.14-.91zm-.35 1.47h3.57l-.21.77h-1.19l-.21.7h1.12l-.21.77h-1.26l-.28.42h.63l.14.84c0 .07.07.14.21.14h.21l-.21.7h-.7c-.35 0-.56-.07-.56-.35l-.14-.77-.56.84c-.14.21-.35.35-.63.35h-1.05l.21-.7h.35c.14 0 .21-.07.35-.21l.84-1.26h-1.05l.21-.77h1.19l.21-.7h-1.19l.21-.77zm-19.74-5.04c-.14.7-.42 1.19-.91 1.54-.49.35-1.12.56-1.89.56-.7 0-1.26-.21-1.54-.56-.21-.28-.35-.56-.35-.98 0-.14 0-.35.07-.56l.84-3.92h1.19l-.77 3.92v.28c0 .21.07.35.14.49.14.21.35.28.7.28s.7-.07.91-.28c.21-.21.42-.42.49-.77l.77-3.92h1.19l-.84 3.92m1.12-1.54h.84l-.07.49.14-.14c.28-.28.63-.42 1.05-.42.35 0 .63.14.77.35.14.21.21.49.14.91l-.49 2.38h-.91l.42-2.17c.07-.28.07-.49 0-.56-.07-.14-.21-.14-.35-.14-.21 0-.42.07-.56.21-.14.14-.28.35-.28.63l-.42 2.03h-.91l.63-3.57m9.8 0h.84l-.07.49.14-.14c.28-.28.63-.42 1.05-.42.35 0 .63.14.77.35s.21.49.14.91l-.49 2.38h-.91l.42-2.24c.07-.21 0-.42-.07-.49-.07-.14-.21-.14-.35-.14-.21 0-.42.07-.56.21-.14.14-.28.35-.28.63l-.42 2.03h-.91l.7-3.57m-5.81 0h.98l-.77 3.5h-.98l.77-3.5m.35-1.33h.98l-.21.84h-.98l.21-.84zm1.4 4.55c-.21-.21-.35-.56-.35-.98v-.21c0-.07 0-.21.07-.28.14-.56.35-1.05.7-1.33.35-.35.84-.49 1.33-.49.42 0 .77.14 1.05.35.21.21.35.56.35.98v.21c0 .07 0 .21-.07.28-.14.56-.35.98-.7 1.33-.35.35-.84.49-1.33.49-.35 0-.7-.14-1.05-.35m1.89-.7c.14-.21.28-.49.35-.84v-.35c0-.21-.07-.35-.14-.49a.635.635 0 0 0-.49-.21c-.28 0-.49.07-.63.28-.14.21-.28.49-.35.84v.28c0 .21.07.35.14.49.14.14.28.21.49.21.28.07.42 0 .63-.21m6.51-4.69h2.52c.49 0 .84.14 1.12.35.28.21.35.56.35.91v.28c0 .07 0 .21-.07.28-.07.49-.35.98-.7 1.26-.42.35-.84.49-1.4.49h-1.4l-.42 2.03h-1.19l1.19-5.6m.56 2.59h1.12c.28 0 .49-.07.7-.21.14-.14.28-.35.35-.63v-.28c0-.21-.07-.35-.21-.42-.14-.07-.35-.14-.7-.14h-.91l-.35 1.68zm8.68 3.71c-.35.77-.7 1.26-.91 1.47-.21.21-.63.7-1.61.7l.07-.63c.84-.28 1.26-1.4 1.54-1.96l-.28-3.78h1.19l.07 2.38.91-2.31h1.05l-2.03 4.13m-2.94-3.85l-.42.28c-.42-.35-.84-.56-1.54-.21-.98.49-1.89 4.13.91 2.94l.14.21h1.12l.7-3.29-.91.07m-.56 1.82c-.21.56-.56.84-.91.77-.28-.14-.35-.63-.21-1.19.21-.56.56-.84.91-.77.28.14.35.63.21 1.19"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-visa"
              >
                <title id="pi-visa">Visa</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <path
                  d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                  fill="#142688"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                viewBox="0 0 38 24"
                aria-labelledby="pi-klarna"
              >
                <title id="pi-klarna">Klarna</title>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    fill="#FFB3C7"
                  ></path>
                  <path
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    fill="#FFB3C7"
                  ></path>
                  <path
                    d="M34.117 13.184c-.487 0-.882.4-.882.892 0 .493.395.893.882.893.488 0 .883-.4.883-.893a.888.888 0 00-.883-.892zm-2.903-.69c0-.676-.57-1.223-1.274-1.223-.704 0-1.274.547-1.274 1.222 0 .675.57 1.223 1.274 1.223.704 0 1.274-.548 1.274-1.223zm.005-2.376h1.406v4.75h-1.406v-.303a2.446 2.446 0 01-1.394.435c-1.369 0-2.478-1.122-2.478-2.507 0-1.384 1.11-2.506 2.478-2.506.517 0 .996.16 1.394.435v-.304zm-11.253.619v-.619h-1.44v4.75h1.443v-2.217c0-.749.802-1.15 1.359-1.15h.016v-1.382c-.57 0-1.096.247-1.378.618zm-3.586 1.756c0-.675-.57-1.222-1.274-1.222-.703 0-1.274.547-1.274 1.222 0 .675.57 1.223 1.274 1.223.704 0 1.274-.548 1.274-1.223zm.005-2.375h1.406v4.75h-1.406v-.303A2.446 2.446 0 0114.99 15c-1.368 0-2.478-1.122-2.478-2.507 0-1.384 1.11-2.506 2.478-2.506.517 0 .997.16 1.394.435v-.304zm8.463-.128c-.561 0-1.093.177-1.448.663v-.535H22v4.75h1.417v-2.496c0-.722.479-1.076 1.055-1.076.618 0 .973.374.973 1.066v2.507h1.405v-3.021c0-1.106-.87-1.858-2.002-1.858zM10.465 14.87h1.472V8h-1.472v6.868zM4 14.87h1.558V8H4v6.87zM9.45 8a5.497 5.497 0 01-1.593 3.9l2.154 2.97H8.086l-2.341-3.228.604-.458A3.96 3.96 0 007.926 8H9.45z"
                    fill="#0A0B09"
                    fillRule="nonzero"
                  ></path>
                </g>
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="pi-bancontact"
                role="img"
                viewBox="0 0 38 24"
                width="38"
                height="24"
              >
                <title id="pi-bancontact">Bancontact</title>
                <path
                  fill="#000"
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <path
                  d="M4.703 3.077h28.594c.139 0 .276.023.405.068.128.045.244.11.343.194a.9.9 0 0 1 .229.29c.053.107.08.223.08.34V20.03a.829.829 0 0 1-.31.631 1.164 1.164 0 0 1-.747.262H4.703a1.23 1.23 0 0 1-.405-.068 1.09 1.09 0 0 1-.343-.194.9.9 0 0 1-.229-.29.773.773 0 0 1-.08-.34V3.97c0-.118.027-.234.08-.342a.899.899 0 0 1 .23-.29c.098-.082.214-.148.342-.193a1.23 1.23 0 0 1 .405-.068Z"
                  fill="#fff"
                ></path>
                <path
                  d="M6.38 18.562v-3.077h1.125c.818 0 1.344.259 1.344.795 0 .304-.167.515-.401.638.338.132.536.387.536.734 0 .62-.536.91-1.37.91H6.38Zm.724-1.798h.537c.328 0 .468-.136.468-.387 0-.268-.255-.356-.599-.356h-.406v.743Zm0 1.262h.448c.438 0 .693-.093.693-.383 0-.286-.219-.404-.63-.404h-.51v.787Zm3.284.589c-.713 0-1.073-.295-1.073-.69 0-.436.422-.69 1.047-.695.156.002.31.014.464.035v-.105c0-.269-.183-.396-.531-.396a2.128 2.128 0 0 0-.688.105l-.13-.474a3.01 3.01 0 0 1 .9-.132c.767 0 1.147.343 1.147.936v1.222c-.214.093-.615.194-1.136.194Zm.438-.497v-.47a2.06 2.06 0 0 0-.37-.036c-.24 0-.427.08-.427.286 0 .185.156.281.432.281a.947.947 0 0 0 .365-.061Zm1.204.444v-2.106a3.699 3.699 0 0 1 1.177-.193c.76 0 1.198.316 1.198.9v1.399h-.719v-1.354c0-.303-.167-.444-.484-.444a1.267 1.267 0 0 0-.459.079v1.719h-.713Zm4.886-2.167-.135.479a1.834 1.834 0 0 0-.588-.11c-.422 0-.652.25-.652.664 0 .453.24.685.688.685.2-.004.397-.043.578-.114l.115.488a2.035 2.035 0 0 1-.75.128c-.865 0-1.365-.453-1.365-1.17 0-.712.495-1.182 1.323-1.182.27-.001.538.043.787.132Zm1.553 2.22c-.802 0-1.302-.47-1.302-1.178 0-.704.5-1.174 1.302-1.174.807 0 1.297.47 1.297 1.173 0 .708-.49 1.179-1.297 1.179Zm0-.502c.37 0 .563-.259.563-.677 0-.413-.193-.672-.563-.672-.364 0-.568.26-.568.672 0 .418.204.677.568.677Zm1.713.449v-2.106a3.699 3.699 0 0 1 1.177-.193c.76 0 1.198.316 1.198.9v1.399h-.719v-1.354c0-.303-.166-.444-.484-.444a1.268 1.268 0 0 0-.459.079v1.719h-.713Zm3.996.053c-.62 0-.938-.286-.938-.866v-.95h-.354v-.484h.355v-.488l.718-.03v.518h.578v.484h-.578v.94c0 .256.125.374.36.374.093 0 .185-.008.276-.026l.036.488c-.149.028-.3.041-.453.04Zm1.814 0c-.713 0-1.073-.295-1.073-.69 0-.436.422-.69 1.047-.695.155.002.31.014.464.035v-.105c0-.269-.183-.396-.532-.396a2.128 2.128 0 0 0-.687.105l-.13-.474a3.01 3.01 0 0 1 .9-.132c.766 0 1.146.343 1.146.936v1.222c-.213.093-.614.194-1.135.194Zm.438-.497v-.47a2.06 2.06 0 0 0-.37-.036c-.24 0-.427.08-.427.286 0 .185.156.281.432.281a.946.946 0 0 0 .365-.061Zm3.157-1.723-.136.479a1.834 1.834 0 0 0-.588-.11c-.422 0-.651.25-.651.664 0 .453.24.685.687.685.2-.004.397-.043.578-.114l.115.488a2.035 2.035 0 0 1-.75.128c-.865 0-1.365-.453-1.365-1.17 0-.712.495-1.182 1.323-1.182.27-.001.538.043.787.132Zm1.58 2.22c-.62 0-.938-.286-.938-.866v-.95h-.354v-.484h.354v-.488l.72-.03v.518h.577v.484h-.578v.94c0 .256.125.374.36.374.092 0 .185-.008.276-.026l.036.488c-.149.028-.3.041-.453.04Z"
                  fill="#1E3764"
                ></path>
                <path
                  d="M11.394 13.946c3.803 0 5.705-2.14 7.606-4.28H6.38v4.28h5.014Z"
                  fill="url(#pi-bancontact-a)"
                ></path>
                <path
                  d="M26.607 5.385c-3.804 0-5.705 2.14-7.607 4.28h12.62v-4.28h-5.013Z"
                  fill="url(#pi-bancontact-b)"
                ></path>
                <defs>
                  <linearGradient
                    id="pi-bancontact-a"
                    x1="8.933"
                    y1="12.003"
                    x2="17.734"
                    y2="8.13"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#005AB9"></stop>
                    <stop offset="1" stopColor="#1E3764"></stop>
                  </linearGradient>
                  <linearGradient
                    id="pi-bancontact-b"
                    x1="19.764"
                    y1="10.037"
                    x2="29.171"
                    y2="6.235"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FBA900"></stop>
                    <stop offset="1" stopColor="#FFD800"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </li>
          </ul>
        </div>
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px] 2xl:mt-0">
          <p className="mb-3 block relative">
            Bij een aankoopbedrag vanaf €250,- ontvang je gratis onze rosé gold
            metalen USB stick 3.0 - 16 GB geheugen t.w.v. €9,95
          </p>
          <img
            src={'/images/usb.webp'}
            width={250}
            height={160}
            className="rounded-lg w-auto block mt-2 h-auto xl:w-[200px]"
            alt="Foto van een USB van gedenk-sieraad.nl"
          />
        </div>
        <div className="max-w-md w-full mx-auto md:w-[336px] md:max-w-[336px] md:mb-20 2xl:mb-0 ">
          <p className="mb-2">
            Voor alle sieraden in de webshop geldt : twee jaar garantie en
            gratis verzending vanaf €60,-!
          </p>
          <a
            href="https://gedenk-sieraad.be"
            rel="nofollow"
            target="_blank"
            className="block relative mt-2"
          >
            <Button>
              In België ook online te bezoeken op: gedenk-sieraad.be
            </Button>
          </a>
        </div>
      </div>

      <div className="border-t-2 mb-0 mt-6 pt-6 border-[#c79385]">
        <ul className="container gap-6 flex flex-row flex-end items-center justify-end">
          <li>
            <a
              className="py-1 block hover:opacity-60 transition-opacity"
              href="/policies/privacy"
            >
              Privacy verklaring
            </a>
          </li>
          <li>
            <a
              className="py-1 block hover:opacity-60 transition-opacity"
              href="/policies/terms-of-service"
            >
              Algemene voorwaarden
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
