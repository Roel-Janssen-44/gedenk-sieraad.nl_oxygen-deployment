'use client';

import {Button} from '~/components/chadcn/Button';

export default function Hero() {
  const slides = [
    {
      image: 'hero-image-1.webp',
      imageAlt: 'Twee gouden ringen die op elkaar liggen',
      title: 'Sieraden met Emotie',
    },
    {
      image: 'hero-image-2.webp',
      imageAlt: 'Twee gouden ringen die op elkaar liggen',
      title: 'Memories Forever',
    },
    {
      image: 'hero-image-3.webp',
      imageAlt: 'Twee gouden ringen die op elkaar liggen',
      title: 'The art of Creation',
    },
  ];
  return (
    <div className="h-[100lvh] bg-secondary">
      <div key={slides[0].title} className="h-[100lvh] relative">
        <img
          src={`/images/${slides[0].image}`}
          alt={slides[0].imageAlt}
          fill
          className="object-cover w-full h-full"
        />
        <div className="bg-black absolute top-0 left-0 w-full h-full z-10 opacity-20" />
        <div className="z-20 container max-w-2xl xl:max-w-3xl 2xl:max-w-4xl text-white mt-14 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-8xl font-tangerine max-w-xs mb-10">
            {slides[0].title}
          </h3>
          <Button variant="transparent" className="z-20 text-white w-28 h-28">
            <a
              className="p-4 text-white text-3xl font-tangerine border-[1px] w-full flex justify-center items-center h-full border-white rounded-full"
              href={'/collections/all'}
            >
              Shop nu
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
