import {Suspense, useState, useEffect} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/lib/variants';
import {FormatedPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import ExtraProductOptions from '~/components/ExtraProductOptions';
import {calculatePrice} from '~/lib/utils';
import * as OptionSets from '~/components/productOptions/optionSets';

const colors = [
  'Transparent',
  'Aqua',
  'Black',
  'Blush',
  'Brown',
  'Blue',
  'Fluo',
  'Gold',
  'Green',
  'Orange',
  'Marine',
  'Olive',
  'Purple',
  'Red',
  'Baby',
  'Silver',
  'Soft',
  'White',
  'Turquoise',
  'Yellow',
];

export default function ProductInfo({
  setCurrentThumbnails,
  extraImages = [],
  setActiveImage,
  setActiveThumbnailIndex,
  product,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [tempHarskleur, setTempHarskleur] = useState(null);
  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTempHarskleur(randomColor);
  }, []);

  const {
    variants,
    setSelectedOption,
    selectedVariant,
    selectedOptions,
    options,
  } = product;

  //   const {linesAdd} = useCart();
  const linesAdd = () => null;
  //   const openCartDrawer = useCartDrawer();
  const [extraOptions, setExtraOptions] = useState([]);
  const [optionErrors, setOptionErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const hasTrueValue = Object.values(optionErrors).some(
    (value) => value === true,
  );

  useEffect(() => {
    if (!hasTrueValue) {
      setError('');
    }
  }, [optionErrors]);

  // console.log("extraOptions");
  // console.log(extraOptions);
  // console.log("Total price:");
  // console.log(
  //   parseFloat(selectedVariant?.price?.amount) +
  //     parseFloat(calculatePrice(extraOptions, OptionSets))
  // );

  useEffect(() => {
    if (!selectedVariant) return;

    const currentVariant = product.variants.nodes.find(
      (variant) => variant.id == selectedVariant.id,
    );

    let activeMaterial = '';
    const zilver = ['zilver 925 sterling', '9 kt witgoud', '14 kt witgoud'];
    const geelgoud = [
      '9 kt geelgoud',
      '14 kt geelgoud',
      'zilver/geelgoud verguld',
    ];
    const rosegoud = [
      '9 kt roségoud',
      '14 kt roségoud',
      'zilver/roségoud verguld',
    ];

    let availableMaterialOrder = [];
    product.variants.nodes.forEach((variant) => {
      const variantMaterial = variant.title.split(' / ')[0].toLowerCase();
      if (zilver.includes(variantMaterial)) {
        if (!availableMaterialOrder.includes('zilver')) {
          availableMaterialOrder.push('zilver');
        }
      } else if (geelgoud.includes(variantMaterial)) {
        if (!availableMaterialOrder.includes('geelgoud')) {
          availableMaterialOrder.push('geelgoud');
        }
      } else if (rosegoud.includes(variantMaterial)) {
        if (!availableMaterialOrder.includes('rosegoud')) {
          availableMaterialOrder.push('rosegoud');
        }
      }
    });

    let newThumbnails = [];

    const selectedVariantMaterial =
      currentVariant.selectedOptions[0].value.toLowerCase();
    if (!product.tags.includes('kleuren')) {
      newThumbnails.push(currentVariant.image);
    }

    if (zilver.includes(selectedVariantMaterial)) {
      activeMaterial = 'zilver';
    } else if (geelgoud.includes(selectedVariantMaterial)) {
      activeMaterial = 'geelgoud';
    } else if (rosegoud.includes(selectedVariantMaterial)) {
      activeMaterial = 'rosegoud';
    }

    const harskleurOption = extraOptions.find((obj) => obj.key === 'kleuren');

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const harsKleur =
      harskleurOption?.value[0].value.split(' ')[0] ||
      tempHarskleur ||
      randomColor;

    if (product.tags.includes('kleuren')) {
      newThumbnails.forEach((thumbnail, index) => {
        if (!thumbnail.altText?.includes(harsKleur)) {
          newThumbnails.splice(index, 1);
        }
      });
      extraImages?.forEach((image) => {
        if (image.altText?.toLowerCase().includes(harsKleur.toLowerCase())) {
          newThumbnails.push(image);
        }
      });

      // Image order based on selected material
      if (availableMaterialOrder[0] != activeMaterial) {
        if (availableMaterialOrder[1] == activeMaterial) {
          [newThumbnails[0], newThumbnails[1]] = [
            newThumbnails[1],
            newThumbnails[0],
          ];
        } else if (availableMaterialOrder[2] == activeMaterial) {
          [newThumbnails[0], newThumbnails[2]] = [
            newThumbnails[2],
            newThumbnails[0],
          ];
        }
      }
    }

    extraImages?.forEach((image) => {
      if (!newThumbnails[0]) return;
      if (product.tags.includes('geboorte')) {
        if (
          newThumbnails[0].altText?.toLowerCase() ==
            image.altText.toLowerCase() ||
          image.altText?.toLowerCase().includes('alle') ||
          newThumbnails[0].altText
            ?.toLowerCase()
            .includes(image.altText.toLowerCase())
        ) {
          if (
            !newThumbnails.some(
              (thumbnail) =>
                thumbnail.url === image.url &&
                thumbnail.altText === image.altText,
            )
          ) {
            newThumbnails.push(image);
          }
        }
      } else {
        if (
          newThumbnails[0].altText
            ?.toLowerCase()
            .includes(image.altText?.toLowerCase())
        ) {
          if (
            !newThumbnails.some(
              (thumbnail) =>
                thumbnail.url === image.url &&
                thumbnail.altText === image.altText,
            )
          ) {
            newThumbnails.push(image);
          }
        } else if (product.tags.includes('letter')) {
          if (image.altText?.toLowerCase().includes('alle')) {
            newThumbnails.push(image);
          }
        } else {
          if (
            (selectedVariantMaterial.includes('zilver 925 sterling') ||
              selectedVariantMaterial.includes('witgoud')) &&
            (image.altText?.toLowerCase().includes('zilver 925 sterling') ||
              image.altText?.toLowerCase().includes('witgoud') ||
              image.altText?.toLowerCase().includes('alle'))
          ) {
            newThumbnails.push(image);
          } else if (
            selectedVariantMaterial.includes('geelgoud') &&
            (image.altText?.toLowerCase().includes('geelgoud') ||
              image.altText?.toLowerCase().includes('alle'))
          ) {
            newThumbnails.push(image);
          } else if (
            (selectedVariantMaterial.includes('rosegoud') ||
              selectedVariantMaterial.includes('roségoud')) &&
            (image.altText?.toLowerCase().includes('rosegoud') ||
              image.altText?.toLowerCase().includes('roségoud') ||
              image.altText?.toLowerCase().includes('alle'))
          ) {
            newThumbnails.push(image);
          }
        }
      }
    });

    if (tags.includes('positie')) {
      extraImages?.forEach((image) => {
        newThumbnails.push(image);
      });
    }

    const uniqueUrls = {};
    newThumbnails = newThumbnails.filter((obj) => {
      if (uniqueUrls[obj?.url]) {
        return false;
      }
      uniqueUrls[obj?.url] = true;
      return true;
    });

    setActiveImage(newThumbnails[0]);
    setCurrentThumbnails(newThumbnails);
    setActiveThumbnailIndex(0);
  }, [selectedVariant, extraOptions]);

  const tags = product.tags;

  return (
    <div className="product-main">
      <h1 style={{fontWeight: 400, fontSize: '2.25rem', marginBottom: '20px'}}>
        {product.title}
      </h1>

      {selectedVariant?.price?.amount && (
        <h5 style={{marginBottom: '20px'}} className="font-bold text-md">
          {'Prijs:'}
          <span className="font-light ml-2">
            <FormatedPrice
              value={(
                parseFloat(selectedVariant?.price?.amount) +
                parseFloat(calculatePrice(extraOptions, OptionSets))
              ).toFixed(2)}
            />
          </span>
        </h5>
      )}

      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
            tags={product.tags}
            extraOptions={extraOptions}
            setExtraOptions={setExtraOptions}
            showErrors={showErrors}
            error={error}
            hasTrueValue={hasTrueValue}
            setShowErrors={setShowErrors}
            optionErrors={optionErrors}
            setOptionErrors={setOptionErrors}
          />
        }
      >
        <Await
          errorElement="Er was een probleem met het laden van de varianten."
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data?.product?.variants.nodes || []}
              tags={product.tags}
              extraOptions={extraOptions}
              setExtraOptions={setExtraOptions}
              showErrors={showErrors}
              error={error}
              hasTrueValue={hasTrueValue}
              setShowErrors={setShowErrors}
              optionErrors={optionErrors}
              setOptionErrors={setOptionErrors}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
