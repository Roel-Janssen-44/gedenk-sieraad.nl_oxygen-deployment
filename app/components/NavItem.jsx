'use client';

import {NavLink} from '@remix-run/react';
import {useAside} from '~/components/Aside';
import {useLocation} from 'react-router-dom';
import {ChevronDown} from 'lucide-react';

export default function NavItem({
  item,
  primaryDomainUrl,
  publicStoreDomain,
  closeAside,
  isLastIndex,
}) {
  // if the url is internal, we strip the domain
  let url =
    item.url.includes('myshopify.com') ||
    item.url.includes(publicStoreDomain) ||
    item.url.includes(primaryDomainUrl)
      ? new URL(item.url).pathname
      : item.url;

  let isActive = false;
  const location = useLocation();
  if (location.pathname === url) {
    isActive = true;
  }

  const {open} = useAside();

  return (
    <>
      <div className="relative group hidden w-auto xl:block ">
        {/* <NavLink
          className="text-black xl:text-white header-menu-item relative text-md w-auto xl:w-auto xl:flex xl:items-center xl:justify-center"
          end
          key={item.id}
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to={url}
        >
          <span className="flex flex-row relative gap-1 text-left items-center justify-center w-auto no-underline hover:no-underline group-hover:underline z-20">
            {item.title}{' '}
            {item.items.length > 0 && <ChevronDown size={'16px'} />}
          </span>
        </NavLink> */}
        <a
          className="text-black xl:text-white header-menu-item relative text-md w-auto xl:w-auto xl:flex xl:items-center xl:justify-center"
          href={url}
          onClick={closeAside}
          key={item.id}
        >
          <span className="flex flex-row relative gap-1 text-left items-center justify-center w-auto no-underline hover:no-underline group-hover:underline z-20">
            {item.title}{' '}
            {item.items.length > 0 && <ChevronDown size={'16px'} />}
          </span>
        </a>

        {item.items.length > 0 ? (
          <div className="min-w-[120px] font-title absolute invisible w-auto opacity-0 group-hover:visible group-hover:bg-white group-hover:opacity-100 p-4 rounded shadow-md flex flex-col gap-3 left-0 -translate-x-0 top-6">
            {item.items.map((subItem, index) => {
              let subItemUrl =
                item.url.includes('myshopify.com') ||
                item.url.includes(publicStoreDomain) ||
                item.url.includes(primaryDomainUrl)
                  ? new URL(subItem.url).pathname
                  : subItem.url;
              return (
                <NavLink
                  className="relative"
                  end
                  key={subItem.id}
                  onClick={closeAside}
                  prefetch="intent"
                  // style={activeLinkStyle}
                  to={subItemUrl || '/'}
                >
                  <span className="whitespace-nowrap relative hover:underline inline-block text-light-text w-auto lowercase font-semibold text-gray-900 mb-3">
                    {subItem.title}
                  </span>
                </NavLink>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="block xl:hidden mb-3">
        {/* <NavLink
          className="header-menu-item relative text-md w-20 xl:w-28 xl:flex xl:items-center xl:justify-center"
          end
          key={item.id}
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyleMobile}
          to={url}
        >
          <span className="relative text-center w-40 no-underline hover:no-underline group-hover:text-white z-20">
            {item.title}
          </span>
        </NavLink>{' '} */}
        <a
          className="header-menu-item relative text-md w-20 xl:w-28 xl:flex xl:items-center xl:justify-center"
          href={url}
          // onClick={closeAside}
          key={item.id}
        >
          <span className="relative text-center w-40 no-underline hover:no-underline group-hover:text-white z-20">
            {item.title}
          </span>
        </a>{' '}
      </div>
    </>
  );
}

function activeLinkStyle({isActive, isPending}) {
  return {
    color: isActive ? 'white' : 'white',
  };
}
function activeLinkStyleMobile({isActive, isPending}) {
  return {
    color: isActive ? '#C79385' : 'black',
  };
}
