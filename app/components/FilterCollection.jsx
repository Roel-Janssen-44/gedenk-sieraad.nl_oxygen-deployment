'use client';

import {useState} from 'react';

import {Button} from '~/components/chadcn/Button';

// import FilterDrawer from "@/components/drawers/Filter";
// import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FilterCollectionFilters from '~/components/FilterCollectionFilters';

export default function FilterCollection({products}) {
  const [filterDrawerIsOpen, setFilterDrawerIsOpen] = useState(false);
  const toggleFilterDrawerIsOpen = () => {
    setFilterDrawerIsOpen(!filterDrawerIsOpen);
  };
  //
  return (
    <div className="w-auto">
      {/* Pc filters */}
      <div className="hidden xl:block xl:w-[265px]">
        <FilterCollectionFilters products={products} />
      </div>
      {/* Mobile filters */}
      <div className="block xl:hidden">
        {/* <FilterDrawer
          filterDrawerIsOpen={filterDrawerIsOpen}
          onClose={toggleFilterDrawerIsOpen}
          products={products}
        /> */}
      </div>
      <Button
        className="xl:hidden fixed top-1/2 -translate-y-1/2 left-0 rounded-none rounded-r bg-gray-200 hover:bg-primary focus:bg-primary text-gray-700 hover:text-white focus:text-white w-10 h-10"
        onClick={toggleFilterDrawerIsOpen}
      >
        *{/* <PlayArrowRoundedIcon fontSize="32px" /> */}
      </Button>
    </div>
  );
}
