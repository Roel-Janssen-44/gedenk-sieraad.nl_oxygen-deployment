'use client';

import {Money} from '@shopify/hydrogen';

export default function ProductGridItem({product}) {
  if (!product?.handle) return null;

  return (
    <a
      href={`/products/${product.handle}`}
      className="p-8 w-full sm:w-[284px] md:w-[332px] lg:w-[303px] xl:w-[295px] 2xl:w-[280px] animation-all duration-500"
    >
      <div className="relative block w-[150px] h-[150px] mx-auto">
        <img
          src={product?.images?.nodes[0].url}
          layout="raw"
          alt={product?.images?.nodes[0].altText}
          className={`w-full h-full object-scale-down`}
        />
      </div>
      <div className="text-center mt-2">
        {product?.vendor && (
          <span className="text-xs font-light">{product.vendor}</span>
        )}
        <h3 className="text-xl font-roboto mt-2 mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <span className="text-xl mt-4 font-light text-primary">
          {product.priceRange?.minVariantPrice && (
            <Money data={product.priceRange.minVariantPrice} />
          )}
        </span>
      </div>
    </a>
  );
}
