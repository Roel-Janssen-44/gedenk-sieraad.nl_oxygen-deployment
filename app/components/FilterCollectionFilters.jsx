'use client';

import {useState, useEffect} from 'react';
import {Button} from '~/components/chadcn/Button';
import {getClientBrowserParameters} from '@shopify/hydrogen-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/chadcn/Accordion';
import {RadioGroup, RadioGroupItem} from '~/components/chadcn/Radio';
import {Label} from '~/components/chadcn/Label';
import InputTextField from './InputTextField';

const menu = [
  {
    label: 'Gedenksieraden as/haar',
    items: [
      {
        link: '/collections/ashangers',
        label: 'Gedenkhangers as/haar',
      },
      {
        link: '/collections/asringen',
        label: 'Gedenkringen as/haar',
      },
      {
        link: '/collections/armbanden-met-as',
        label: 'Gedenk armbanden as/haar',
      },
      {
        link: '/collections/oorsieraad',
        label: 'Gedenk oorsieraden as/haar',
      },
      {
        link: '/collections/asbedels',
        label: 'Gedenkbedels as/haar',
      },
      {
        link: '/collections/as-manchetkknopen',
        label: 'Gedenk manchetknopen as/haar',
      },
      {
        link: '/collections/ashanger-met-vingerprint-gravure',
        label: 'Gedenkhangers as/haar en vingerafdruk/gravure',
      },
    ],
  },
  {
    label: 'Gedenksieraden vingerafdruk/gravure',
    items: [
      {
        link: '/collections/hangers',
        label: 'Gedenkhangers met vingerafdruk/gravure',
      },
      {
        link: '/collections/ringen',
        label: 'Gedenkringen met vingerafdruk/gravure',
      },
      {
        link: '/collections/armband-met-vingerprint',
        label: 'Gedenk armbanden met vingerafdruk/gravure',
      },
      {
        link: '/collections/bedels',
        label: 'Gedenkbedels met vingerafdruk/gravure',
      },
      {
        link: '/collections/manchetknopen',
        label: 'Gedenk manchetknopen met vingerafdruk/gravure',
      },
    ],
  },
  {
    label: 'Assortiment',
    items: [
      {
        link: '/collections/specials-mannen',
        label: 'Specials mannen',
      },
      {
        link: '/collections/geboortesieraden',
        label: 'Geboortesieraden',
      },
      {
        link: '/collections/initials',
        label: 'Initialen/letter sieraden',
      },
      {
        link: '/collections/knuffelkeien',
        label: 'Knuffelkeitjes/mini urnen',
      },
      {
        link: '/collections/siders',
        label: 'Aanschuifringen',
      },
      {
        link: '/collections/colliers-kettingen',
        label: 'Colliers/kettingen',
      },
      {
        link: '/collections/accesoires',
        label: 'Accessoires/gedenkbonnen',
      },
    ],
  },
  {
    label: 'Herinnering dieren',
    items: [
      {
        link: '/collections/hangers-1',
        label: 'Gedenkhangers dieren',
      },
      {
        link: '/collections/bedels-1',
        label: 'Gedenkbedels dieren',
      },
      {
        link: '/collections/mini-urnen-1',
        label: 'Mini urnen dieren',
      },
    ],
  },
];

export default function FilterDrawerFilters({
  products,
  pageProps,
  filterProducts,
}) {
  const [expanded, setExpanded] = useState(false);

  const [pathname, setPathname] = useState(null);

  const [material, setMaterial] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    const browserParams = getClientBrowserParameters();
    setPathname(browserParams.path);
    const searchParams = new URLSearchParams(browserParams.search);
    setMaterial(searchParams.get('Materiaal'));
    setVendor(searchParams.get('Merk'));
    setMinPrice(searchParams.get('MinPrijs'));
    setMaxPrice(searchParams.get('MaxPrijs'));
  }, []);

  const updateSearchParams = (key, value) => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url);
    filterProducts();
  };

  const handleMaterialChange = (newMaterial) => {
    setMaterial(newMaterial);
    updateSearchParams('Materiaal', newMaterial);
  };

  const handleVendorChange = (newVendor) => {
    setVendor(newVendor);
    updateSearchParams('Merk', newVendor);
  };

  const handleMinPriceChange = (min) => {
    setMinPrice(min);
    updateSearchParams('MinPrijs', min);
  };
  const handleMaxPriceChange = (max) => {
    setMaxPrice(max);
    updateSearchParams('MaxPrijs', max);
  };

  let vendors = {
    elegant: {
      name: 'Elegant hand made',
      amount: 0,
    },
    exquisite: {
      name: 'Exquisite hand made',
      amount: 0,
    },
    seeyou: {
      name: 'See You Gedenksieraden',
      amount: 0,
    },
    milanello: {
      name: 'Milanello',
      amount: 0,
    },
    adore: {
      name: 'Adore',
      amount: 0,
    },
  };

  let materials = [
    {
      name: 'Zilver 925 sterling',
      amount: 0,
    },
    {
      name: '9 KT geel',
      amount: 0,
    },
    {
      name: '14 KT geelgoud',
      amount: 0,
    },
    {
      name: '9 KT wit',
      amount: 0,
    },
    {
      name: '14 KT witgoud',
      amount: 0,
    },
    {
      name: '9 KT rosé',
      amount: 0,
    },
    {
      name: '14 KT roségoud',
      amount: 0,
    },
    {
      name: 'Leder',
      amount: 0,
    },
    {
      name: 'Staal',
      amount: 0,
    },
    {
      name: 'Zilver/geelgoud verguld',
      amount: 0,
    },
    {
      name: 'Zilver/roségoud verguld',
      amount: 0,
    },
  ];

  products?.forEach((product) => {
    if (material == null) {
      if (product.vendor === 'Elegant hand made') {
        vendors['elegant'].amount++;
      } else if (product.vendor === 'Exquisite hand made') {
        vendors['exquisite'].amount++;
      } else if (product.vendor === 'See You Gedenksieraden') {
        vendors['seeyou'].amount++;
      } else if (product.vendor === 'Adore') {
        vendors['adore'].amount++;
      } else if (product.vendor === 'Milanello') {
        vendors['milanello'].amount++;
      }
    } else {
      product.options[0].values.forEach((option) => {
        if (option == material) {
          if (product.vendor === 'Elegant hand made') {
            vendors['elegant'].amount++;
          } else if (product.vendor === 'Exquisite hand made') {
            vendors['exquisite'].amount++;
          } else if (product.vendor === 'See You Gedenksieraden') {
            vendors['seeyou'].amount++;
          } else if (product.vendor === 'Adore') {
            vendors['adore'].amount++;
          } else if (product.vendor === 'Milanello') {
            vendors['milanello'].amount++;
          }
        }
      });
    }

    if (product.options[0]?.name == 'Materiaal') {
      if (vendor == null) {
        product.options[0].values.forEach((option) => {
          let existingMaterial = materials.find(
            (material) => material.name === option,
          );
          if (!existingMaterial) {
            materials.push({name: option, amount: 1});
          } else {
            existingMaterial.amount++;
          }
        });
      } else {
        if (
          vendor == 'Elegant hand made' &&
          product.vendor == 'Elegant hand made'
        ) {
          product.options[0].values.forEach((option) => {
            let existingMaterial = materials.find(
              (material) => material.name === option,
            );
            if (!existingMaterial) {
              materials.push({name: option, amount: 1});
            } else {
              existingMaterial.amount++;
            }
          });
        } else if (
          vendor == 'Exquisite hand made' &&
          product.vendor == 'Exquisite hand made'
        ) {
          product.options[0].values.forEach((option) => {
            let existingMaterial = materials.find(
              (material) => material.name === option,
            );
            if (!existingMaterial) {
              materials.push({name: option, amount: 1});
            } else {
              existingMaterial.amount++;
            }
          });
        } else if (
          vendor == 'See You Gedenksieraden' &&
          product.vendor == 'See You Gedenksieraden'
        ) {
          product.options[0].values.forEach((option) => {
            let existingMaterial = materials.find(
              (material) => material.name === option,
            );
            if (!existingMaterial) {
              materials.push({name: option, amount: 1});
            } else {
              existingMaterial.amount++;
            }
          });
        }
      }
    }
  });

  return (
    <>
      <div className="px-4 xl:px-0">
        <h5 style={{marginBottom: '4px'}} className="font-semibold mb-0">
          Categorie
        </h5>
        <div>
          <hr className="h-[3px] rounded-full bg-gray-800" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {menu.map((menuSet, index) => (
            <div className="" key={`accordion-${index}`}>
              <AccordionItem value={`accordion-${index}`}>
                <AccordionTrigger>{menuSet.label}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-8">
                    {menuSet.items.map((item, index) => (
                      <li key={`menuItem-${item.label}-${item.link}`}>
                        <a
                          href={item.link}
                          className={`py-2 px-4 w-full block ${
                            pathname == item.link ? 'text-primary' : ''
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>

        {materials && (
          <div className="mt-10">
            <h5 style={{marginBottom: '4px'}} className="font-semibold mb-0">
              Materiaal
            </h5>
            <div className="mb-2">
              <hr className="h-[3px] rounded-full bg-gray-800" />
            </div>
            <RadioGroup onValueChange={handleMaterialChange} value={material}>
              {materials.map((material) => {
                if (
                  material.name.includes('WD options') ||
                  material.name.toLowerCase().includes('mws')
                ) {
                  return null;
                } else {
                  return (
                    <div
                      key={material.name}
                      className={`flex items-center space-x-2 ${
                        material.amount == 0
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                    >
                      <RadioGroupItem
                        className={`${
                          material.amount == 0
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        }`}
                        disabled={material.amount === 0}
                        value={material.name}
                        id={material.name}
                      />
                      <Label
                        htmlFor={material.name}
                        className={` ${
                          material.amount == 0
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        }`}
                      >
                        {material.name} ({material.amount})
                      </Label>
                    </div>
                  );
                }
              })}
            </RadioGroup>

            <Button
              onClick={() => {
                handleMaterialChange(null);
              }}
              size="large"
              variant="outlined"
              className="mt-3"
            >
              Reset filter
            </Button>
          </div>
        )}

        {vendors && (
          <div className="mt-10">
            <h5 style={{marginBottom: '4px'}} className="font-semibold mb-0">
              Merk
            </h5>
            <div className="mb-2">
              <hr className="h-[3px] rounded-full bg-gray-800" />
            </div>
            <RadioGroup onValueChange={handleVendorChange} value={vendor}>
              {Object.values(vendors).map((vendor) => (
                <div
                  key={vendor.name}
                  className={`flex items-center space-x-2 ${
                    vendor.amount == 0 ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <RadioGroupItem
                    className={`${
                      vendor.amount == 0
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                    disabled={vendor.amount === 0}
                    value={vendor.name}
                    id={vendor.name}
                  />
                  <Label
                    htmlFor={vendor.name}
                    className={` ${
                      vendor.amount == 0
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                  >
                    {vendor.name} ({vendor.amount})
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              variant="outlined"
              onClick={() => {
                handleVendorChange(null);
              }}
              size="large"
              className="mt-3"
            >
              Reset filter
            </Button>
          </div>
        )}
      </div>

      <div className="mt-10 pb-8">
        <h5 style={{marginBottom: '4px'}} className="font-semibold mb-0">
          Prijs:
        </h5>
        <div>
          <hr className="h-[3px] rounded-full bg-gray-800" />
        </div>
        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Van €</span>
        </div>

        <input
          value={minPrice}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (typeof value === 'number') {
              updateSearchParams('MinPrijs', value);
              setMinPrice(value);
            } else {
              setMinPrice(9999);
            }
          }}
        />

        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Tot €</span>
        </div>
        <input
          value={maxPrice}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (typeof value === 'number') {
              updateSearchParams('MaxPrijs', value);
              setMaxPrice(value);
            } else {
              setMaxPrice(9999);
            }
          }}
        />
        <div>
          <Button
            onClick={() => {
              updateSearchParams('MinPrijs', 0);
              updateSearchParams('MaxPrijs', 9999);
              setMinPrice(0);
              setMaxPrice(9999);
            }}
            size="large"
            variant="outlined"
            className="mb-3"
          >
            Reset filter
          </Button>
        </div>
        <Button
          onClick={() => {
            window.scrollTo({
              top: 200,
              behavior: 'smooth',
            });
          }}
        >
          Producten zoeken
        </Button>
      </div>
    </>
  );
}
