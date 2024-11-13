'use client';

import {useState, useEffect} from 'react';
// import Link from "next/link";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";

// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import Drawer from "@mui/material/Drawer";
// import Typography from "@mui/material/Typography";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {Button} from '~/components/chadcn/Button';
// import IconButton from "@mui/material/IconButton";
// import InputRadio from "./InputRadio";
// import { TextField, Input } from "@mui/material";
// import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
import {getClientBrowserParameters} from '@shopify/hydrogen-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/chadcn/accordion';
import {RadioGroup, RadioGroupItem} from '~/components/chadcn/Radio';
import {Label} from '~/components/chadcn/label';

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

export default function FilterDrawerFilters(props, {products, pageProps}) {
  const [expanded, setExpanded] = useState(false);

  console.log('props');
  console.log(props);
  console.log('pageProps');
  console.log(pageProps);
  const [pathname, setPathname] = useState(null);
  //   const { replace } = useRouter();

  const [material, setMaterial] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    const browserParams = getClientBrowserParameters();
    console.log('Client Browser Parameters:', browserParams);
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
  };

  const handleMaterialChange = (newMaterial) => {
    setMaterial(newMaterial);
    updateSearchParams('Materiaal', newMaterial);
  };

  const handleVendorChange = (newVendor) => {
    setVendor(newVendor);
    updateSearchParams('Merk', newVendor);
  };

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    updateSearchParams('MinPrijs', min);
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
      name: '9 KT geelgoud',
      amount: 0,
    },
    {
      name: '14 KT geelgoud',
      amount: 0,
    },
    {
      name: '9 KT witgoud',
      amount: 0,
    },
    {
      name: '14 KT witgoud',
      amount: 0,
    },
    {
      name: '9 KT roségoud',
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
        {/* <button onClick={() => handleMaterialChange('Gold')}>
          Set Material to Gold
        </button>
        <button onClick={() => handleVendorChange('Elegant')}>
          Set Vendor to Elegant
        </button>
        <button onClick={() => handlePriceChange(50, 200)}>
          Set Price Range to 50-200
        </button> */}

        <Accordion type="single" collapsible className="w-full">
          {menu.map((menuSet, index) => (
            <div className="" key={`accordion-${index}`}>
              <AccordionItem value="item-1">
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
            <RadioGroup>
              {materials.map((material) => (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={material.name} id={material.name} />
                  <Label htmlFor={material.name}>{material.name}</Label>
                </div>
              ))}
            </RadioGroup>
            {/* <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={material}
            >
              {materials.map((material) => {
                if (
                  material.name.includes('WD options') ||
                  material.name.toLowerCase().includes('mws')
                ) {
                  return null;
                } else {
                  return (
                    <FormControlLabel
                      key={'materialfacet' + material.name}
                      value={material.name}
                      control={
                        <Radio
                          disabled={material.amount === 0}
                          sx={{'&.Mui-checked': {color: '#222'}}}
                        />
                      }
                      label={material.name + ` (${material.amount})`}
                      className="mb-1.5 last:mb-0 "
                      onChange={(e) => {
                        const params = new URLSearchParams(searchParams);
                        params.set('Materiaal', e.target.value);
                        replace(`${pathname}?${params.toString()}`);
                        setMaterial(e.target.value);
                      }}
                    />
                  );
                }
              })}

              <Button
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('Materiaal');
                  replace(`${pathname}?${params.toString()}`);
                  setMaterial(null);
                }}
                size="large"
                variant="outlined"
                className="mt-3"
              >
                Reset filter
              </Button>
            </RadioGroup> */}
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
            <RadioGroup>
              {Object.values(vendors).map((vendor) => (
                <div className="flex items-center space-x-2" key={vendor.name}>
                  <RadioGroupItem value={vendor.name} id={vendor.name} />
                  <Label htmlFor={vendor.name}>{vendor.name}</Label>
                </div>
              ))}
            </RadioGroup>
            {/* <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={vendor}
            >
              {Object.keys(vendors).map((vendorKey) => (
                <>
                  <FormControlLabel
                    key={'vendorfacet' + vendors[vendorKey].name}
                    value={vendors[vendorKey].name}
                    control={
                      <Radio
                        disabled={vendors[vendorKey].amount === 0}
                        sx={{'&.Mui-checked': {color: '#222'}}}
                      />
                    }
                    label={
                      vendors[vendorKey].name +
                      ` (${vendors[vendorKey].amount})`
                    }
                    className="mb-1.5 last:mb-0 "
                    onChange={(e) => {
                      const params = new URLSearchParams(searchParams);
                      params.set('Merk', e.target.value);
                      replace(`${pathname}?${params.toString()}`);
                      setVendor(e.target.value);
                    }}
                  />
                </>
              ))}
              <Button
                variant="outlined"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('Merk');
                  replace(`${pathname}?${params.toString()}`);
                  setVendor(null);
                }}
                size="large"
                className="mt-3"
              >
                Reset filter
              </Button>
            </RadioGroup> */}
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
        {/* <TextField
          type="number"
          value={minPrice}
          variant="outlined"
          onBlur={(e) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value === "") {
              params.delete("MinPrijs");
            } else {
              params.set("MinPrijs", e.target.value);
            }
            replace(`${pathname}?${params.toString()}`);
            setMinPrice(e.target.value);
          }}
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Tot €</span>
        </div>
        <TextField
          type="number"
          value={maxPrice}
          variant="outlined"
          onBlur={(e) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value === "") {
              params.delete("MaxPrijs");
            } else {
              params.set("MaxPrijs", e.target.value);
            }
            replace(`${pathname}?${params.toString()}`);
            setMaxPrice(e.target.value);
          }}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <div>
          <Button
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(9999);
              const params = new URLSearchParams(searchParams);
              params.delete("MinPrijs");
              params.delete("MaxPrijs");
              replace(`${pathname}?${params.toString()}`);
            }}
            size="large"
            variant="outlined"
            className="mt-3 w-full"
          >
            Reset filter
          </Button>
        </div>
        <Button
          className="bg-primary w-full mt-8"
          variant="contained"
          size="large"
          onClick={() => {
            window.scrollTo({
              top: 200,
              behavior: 'smooth',
            });
          }}
        >
          Producten zoeken
        </Button> */}
      </div>
    </>
  );
}
