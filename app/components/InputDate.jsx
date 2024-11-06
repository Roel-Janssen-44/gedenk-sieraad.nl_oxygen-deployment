// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import 'dayjs/locale/nl';
// import dayjs from 'dayjs';
import React from 'react';
import {CalendarIcon} from 'lucide-react';
import {Button} from '~/components/chadcn/button';
import {Calendar} from '~/components/chadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/chadcn/Popover';
import {format} from 'date-fns';
import {cn} from '~/lib/utils';

export default function InputDate({value, onChange, title, options}) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      Todo - Implement InputDate
      {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl"> */}
      {/* <DatePicker
          captionLayout="dropdown"

          className="py-0 w-auto max-w-[145px]"
          onChange={(value) => {
            const day = String(value.$D).padStart(2, "0");
            const month = String(value.$M + 1).padStart(2, "0");
            const year = value.$y;
            const newDate = `${day}-${month}-${year}`;
            onChange(newDate);
          }}
        /> */}
      {/* </LocalizationProvider> */}
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {value ? value : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value | undefined}
            onSelect={(e) => {
              if (e) {
                const formattedDate = e.toLocaleDateString('nl-NL'); // Format as "DD-MM-YYYY"
                onChange(formattedDate);
              }
            }}
            initialFocus
            captionLayout="dropdown"

          />
        </PopoverContent>
      </Popover> */}
    </div>
  );
}
