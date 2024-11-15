'use client';

// import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {useState, useEffect} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/chadcn/Select';
import {getClientBrowserParameters} from '@shopify/hydrogen-react';
import InputSelect from './InputSelect';

const options = [
  {
    label: 'Aanbevolen',
    value: 'aanbevolen',
    price: 0,
  },
  {
    label: 'Bestsellers',
    value: 'bestsellers',
    price: 0,
  },
  {
    label: 'Prijs, laag naar hoog',
    value: 'laag naar hoog',
    price: 0,
  },
  {
    label: 'Prijs, hoog naar laag',
    value: 'hoog naar laag',
    price: 0,
  },
];

export default function SortCollection({sortProducts}) {
  // const [sort, setSort] = useState(null);
  useEffect(() => {
    const browserParams = getClientBrowserParameters();
    const searchParams = new URLSearchParams(browserParams.search);
    // setSort(searchParams.get('Sorteer'));
  }, []);

  const updateSearchParams = (key, value) => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url);
    sortProducts(value);
  };

  const handleSortChange = (newSort) => {
    // setSort(newSort);
    updateSearchParams('Sorteer', newSort);
  };

  return (
    <div className="flex justify-center xl:justify-end items-center bg-gray-200 p-8 py-4">
      <span className="font-medium mr-4">Sorteren:</span>
      <div>
        {/* <Select
          value={sort}
          onChange={(e) => handleChange(e.target.value)}
          className="min-w-[140px] max-w-full"
          displayEmpty
          size="small"
          variant="outlined"
        >
          {options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })} */}

        <Select
          onValueChange={handleSortChange}
          className="min-w-[140px] max-w-full"
        >
          <SelectTrigger className="min-w-[140px] w-auto border-2 border-gray-900">
            <SelectValue placeholder="Aanbevolen" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => {
              return (
                <SelectItem
                  key={'select-sort-' + option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectContent>
          {/* </Select> */}
        </Select>
      </div>
    </div>
  );
}
