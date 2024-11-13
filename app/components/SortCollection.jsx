'use client';

// import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {useState} from 'react';
// import { Select, MenuItem } from "@mui/material";

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

export default function SortCollection() {
  //   const searchParams = useSearchParams();
  //   const pathname = usePathname();
  //   const { replace } = useRouter();

  //   const [sort, setSort] = useState(searchParams.get("Sorteer") || "aanbevolen");

  //   const handleChange = (value) => {
  //     setSort(value);
  //     const params = new URLSearchParams(searchParams);
  //     params.set("Sorteer", value);
  //     replace(`${pathname}?${params.toString()}`);
  //   };

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
          })}
        </Select> */}
      </div>
    </div>
  );
}
