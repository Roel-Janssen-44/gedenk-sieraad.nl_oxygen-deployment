import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/chadcn/Select';

export default function InputSelect({
  value,
  multiple,
  onChange,
  title,
  options,
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      {multiple && (
        <>
          <Select
            multiple
            id={title + '-option_select'}
            value={value == '' ? [] : value}
            onChange={(e) => onChange(e)}
            className="min-w-[140px] max-w-full"
            displayEmpty
            size="small"
            variant="outlined"
          >
            <SelectTrigger className="min-w-[140px] w-auto">
              <SelectValue placeholder="-selecteer-" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => {
                return (
                  <SelectItem
                    key={title + '-' + option.value}
                    value={option.value}
                  >
                    {option.value}{' '}
                    {option.price !== 0 && `(€${option.price || ''})`}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </>
      )}
      {!multiple && (
        <Select
          id={title + '-option_select'}
          value={value == null ? '-selecteer-' : value}
          onValueChange={(e) => onChange(e)}
          className="min-w-[140px] max-w-full"
          displayEmpty
          size="small"
          variant="outlined"
        >
          <SelectTrigger className="min-w-[140px] w-auto">
            <SelectValue placeholder="-selecteer-" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => {
              let price = option.price;
              if (price != 0) {
                price = `(+ €${option.price || ''}`;
                if (price.includes('(') && !price.includes('.')) {
                  price += ',-)';
                } else {
                  price += ')';
                }
              }
              return (
                <SelectItem
                  key={title + '-' + option.value}
                  value={option.value}
                >
                  {option.value} {price || ''}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
