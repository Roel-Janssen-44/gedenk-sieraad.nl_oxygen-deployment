'use client';

import {useState} from 'react';
import {Button} from '~/components/chadcn/Button';
import {Play, X} from 'lucide-react';
import FilterCollectionFilters from '~/components/FilterCollectionFilters';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/chadcn/Drawer';

export default function FilterCollection({products, filterProducts}) {
  const [filterDrawerIsOpen, setFilterDrawerIsOpen] = useState(false);
  const toggleFilterDrawerIsOpen = () => {
    setFilterDrawerIsOpen(!filterDrawerIsOpen);
  };
  //
  return (
    <div className="w-auto">
      {/* Pc filters */}
      <div className="hidden xl:block xl:w-[265px]">
        <FilterCollectionFilters
          filterProducts={filterProducts}
          products={products}
        />
      </div>
      {/* Mobile filters */}
      <div className="block xl:hidden">
        <Drawer
          direction="left"
          onOpenChange={setFilterDrawerIsOpen}
          open={filterDrawerIsOpen}
        >
          <DrawerContent>
            <div className="max-w-[325px] p-4 w-full max-h-screen overflow-y-auto">
              <DrawerHeader className={'flex flex-row justify-between'}>
                <h3 className="font-semibold">Filter producten</h3>
                <div>
                  <X />
                </div>
              </DrawerHeader>
              <FilterCollectionFilters
                filterProducts={filterProducts}
                products={products}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <Button
        className="xl:hidden fixed top-1/2 -translate-y-1/2 left-0 rounded-none rounded-r bg-gray-200 hover:bg-primary focus:bg-primary text-gray-700 hover:text-white focus:text-white w-10 h-10"
        onClick={toggleFilterDrawerIsOpen}
      >
        <Play fill="#111827" />
      </Button>
    </div>
  );
}
