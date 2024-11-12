'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '~/components/chadcn/Button';
import '../styles/slick_slider.css';

export default function Hero() {
  const [Slider, setSlider] = useState(null);

  useEffect(() => {
    // Dynamically import react-slick
    import('react-slick').then((module) => {
      setSlider(() => module.default);
    });
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4500,
  };

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
  if (!Slider) return null;
  return (
    <div className="h-[100lvh] bg-secondary">
      <Slider {...settings} className="h-[100lvh]">
        {slides.map((slide, index) => (
          <div key={slide.title} className="h-[100lvh] relative cursor-grab">
            <img
              src={`/images/${slide.image}`}
              alt={slide.imageAlt}
              fill
              className="object-cover w-full h-full"
            />
            <div className="bg-black absolute top-0 left-0 w-full h-full z-10 opacity-20" />
            <div className="z-20 container max-w-2xl xl:max-w-3xl 2xl:max-w-4xl text-white mt-14 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h3 className="text-8xl font-tangerine max-w-xs mb-10">
                {slide.title}
              </h3>
              <Button
                variant="transparent"
                className="z-20 text-white w-28 h-28"
              >
                <a
                  className="p-4 text-white text-3xl font-tangerine border-[1px] w-full flex justify-center items-center h-full border-white rounded-full"
                  href={'/collections/all'}
                >
                  Shop nu
                </a>
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// // 'use client';

// import '../styles/slick_slider.css';
// // import {useState, useEffect} from 'react';
// import {Button} from '~/components/chadcn/Button';
// // const Slider = dynamic(() => import('react-slick'), { ssr: false });

// export default function Hero() {
//   //   return <p>ahjksbd</p>;
//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 3500,
//   };

//   const slides = [
//     {
//       image: 'hero-image-1.webp',
//       imageAlt: 'Twee gouden ringen die op elkaar liggen',
//       title: 'Sieraden met Emotie',
//     },
//     {
//       image: 'hero-image-2.webp',
//       imageAlt: 'Twee gouden ringen die op elkaar liggen',
//       title: 'Memories Forever',
//     },
//     {
//       image: 'hero-image-3.webp',
//       imageAlt: 'Twee gouden ringen die op elkaar liggen',
//       title: 'The art of Creation',
//     },
//   ];
//   //   const [slider, setSlider] = useState(null);

//   //   useEffect(() => {
//   //     // Dynamically import react-slick
//   //     import('react-slick').then((module) => {
//   //       setSlider(() => module.default);
//   //     });
//   //   }, []);

//   //   if (!Slider) return null;

//   return (
//     <div>
//       <p>Hi there</p>
//     </div>
//   );
//   return (
//     <div className="h-[100lvh] bg-secondary">
//       <Slider {...settings} className="h-[100lvh]">
//         {slides.map((slide, index) => (
//           <div key={slide.title} className="h-[100lvh] relative cursor-grab">
//             <img
//               src={`/images/${slide.image}`}
//               alt={`/images/${slide.imageAlt}`}
//               fill
//               objectFit="cover"
//               priority
//             />
//             <div
//               className={`bg-black absolute top-0 left-0 w-full h-full z-10 opacity-20`}
//             />
//             <div
//               className={`z-20 container max-w-2xl xl:max-w-3xl 2xl:max-w-4xl text-white mt-14 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 //sm:left-20 //sm:translate-x-0 `}
//             >
//               <h3 className="text-8xl font-tangerine max-w-xs mb-10">
//                 {slide.title}
//               </h3>
//               <Button className={`z-20 text-white w-28 aspect-square`}>
//                 <a
//                   className={`p-4 text-3xl font-tangerine border-[1px] w-full flex justify-center items-center h-full border-white rounded-full `}
//                   href={'/collections/all'}
//                 >
//                   Shop nu
//                 </a>
//               </Button>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
