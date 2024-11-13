'use client';

// import sanitizeHtml from "sanitize-html-react";
import {useEffect, useState} from 'react';
import {Button} from '~/components/chadcn/Button';

export default function CollectionCollage({collections}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="pt-28 pb-16 container max-w-7xl mx-auto xl:flex xl:flex-row xl:flex-wrap xl:justify-center xl:gap-28">
      {Object.keys(collections).map((key, index) => {
        const collection = collections[key];
        const sanitizedHtmlContent = collection.descriptionHtml;
        // const sanitizedHtmlContent = sanitizeHtml(collection.descriptionHtml);
        return (
          <div
            key={key}
            className={`mb-10 bg-white rounded-lg shadow relative max-w-md lg:mb-20 lg:flex lg:aspect-[2/1] lg:gap-4 lg:max-w-[850px] xl:mb-0 xl:h-auto
            ${
              index === 0
                ? 'lg:flex-row-reverse xl:mx-auto xl:max-w-4xl xl:w-full'
                : ''
            }
            ${
              index === 1
                ? 'ml-auto lg:flex-row xl:flex-col xl:max-w-md xl:m-0 xl:mt-28'
                : ''
            }
            ${
              index === 2
                ? 'lg:flex-row-reverse xl:flex-col-reverse xl:max-w-md xl:mb-auto'
                : ''
            }
            `}
          >
            <div className="p-4 pt-5 flex flex-col justify-center">
              <h2 className="text-3xl font-roboto mb-4 text-gray-800">
                {collection.title}
              </h2>
              <div className="mb-4">
                {isClient ? (
                  <p
                    dangerouslySetInnerHTML={{__html: sanitizedHtmlContent}}
                    className="before:mb-1 before:mr-2 before:inline-block before:content-[''] before:w-16 before:bg-[#c79385] before:rounded before:h-[3px]"
                  ></p>
                ) : (
                  'Loading...'
                )}
              </div>
              <a
                href={'/collections/' + collection.handle}
                className="inline-block"
              >
                <Button>Ontdekken meer</Button>
              </a>
            </div>
            <div
              className={`relative min-w-[50%] w-auto min-h-[224px] h-full overflow-hidden rounded-b-lg rounded-t-sm
              ${index % 2 == 0 ? 'lg:rounded-l-lg lg:rounded-r-none' : ''}
              ${index % 2 == 1 ? 'lg:rounded-r-lg lg:rounded-l-none' : ''}
              ${
                index == 2
                  ? 'xl:rounded-t-lg xl:rounded-b-none xl:h-[224px]'
                  : ''
              }
              ${index == 1 ? 'xl:rounded-b-lg xl:rounded-t-none' : ''}
              `}
            >
              <img
                className={`absolute 
                ${index == 0 ? 'lg:top-10' : ''}
                ${
                  index == 1
                    ? 'top-1/2 -translate-y-1/2'
                    : 'top-0 -translate-y-10'
                }
                ${index == 2 ? 'lg:top-10 xl:top-0' : ''}
                `}
                src={collection.image.url}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
