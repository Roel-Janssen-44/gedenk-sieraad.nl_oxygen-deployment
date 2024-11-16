'use client';

import {Button} from '~/components/chadcn/Button';
import ProductGridItem from '~/components/ProductGridItem';
import {useEffect, useState} from 'react';
export default function CollectionSlider({collection}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="py-14 bg-white">
      <div className="container">
        {collection.collection != null && (
          <div className="p-4 rounded">
            <div className="flex flex-col lg:gap-10 lg:flex-row justify-center items-center max-w-6xl mx-auto lg:mb-6 2xl:mb-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-roboto text-gray-800 mb-3">
                  {collection.collection.title}
                </h2>
                <div className="mb-4">
                  {isClient ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: collection.collection.descriptionHtml,
                      }}
                      className="before:mb-1 before:mr-2 before:inline-block before:content-[''] before:w-16 before:bg-[#c79385] before:rounded before:h-[3px]"
                    ></p>
                  ) : (
                    'Aan het laden...'
                  )}
                </div>

                <a
                  href={'/collections/' + collection.collection.handle}
                  className="mb-6 inline-block"
                >
                  <Button className="bg-primary normal-case font-normal">
                    Bekijk alle
                  </Button>
                </a>
              </div>
              <div className="lg:w-1/2 lg:h-auto relative aspect-square xl:aspect-video overflow-hidden">
                {collection.collection?.image?.url && (
                  <img
                    className="rounded-md hidden lg:block"
                    src={collection.collection.image?.url}
                    loading="eager"
                    alt={collection.collection.image?.altText}
                  />
                )}
              </div>
            </div>

            {/* <Slider
            ref={sliderRef}
            {...settings}
            className="h-auto w-full mb-3"
          > */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:justify-between">
              {collection.collection?.products?.nodes.map((product, index) => (
                <div
                  className="w-full sm:max-w-[250px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[280px]"
                  key={product.id}
                >
                  <ProductGridItem product={product} />
                </div>
              ))}

              <div className="w-full sm:max-w-[250px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[280px] flex flex-col justify-center items-center gap-4">
                <p className="text-center">
                  Ontdek alle producten van {collection.collection.title}
                </p>
                <a href={'/collections/' + collection.collection.handle}>
                  <Button>Bekijk alle</Button>
                </a>{' '}
              </div>
            </div>
            {/* </Slider> */}
          </div>
        )}
      </div>
    </div>
  );
}
