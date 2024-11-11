'use client';

import {useState, useEffect} from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';

import {cn} from '~/lib/utils';
import {Checkbox} from '~/components/chadcn/Checkbox';

export function MultiSelect({value, onChange, title, options}) {
  const [error, setError] = useState(null);
  const [optionList, setOptionList] = useState(options);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState(value || []);

  const handleChange = (optionField, newValue) => {
    if (newValue) {
      if (title.includes('Para koord')) {
        if (selectedOptions.length >= 2) {
          setError('Selecteer maximaal 2 opties.');
          return;
        }
      } else if (title.includes('Satijn')) {
        if (selectedOptions.length >= 4) {
          setError('Selecteer maximaal 4 opties.');
          return;
        }
      }

      setError(null);
      setSelectedOptions((prevOptions) =>
        prevOptions.includes(optionField)
          ? prevOptions
          : [...prevOptions, optionField],
      );
    } else {
      setError(null);
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== optionField),
      );
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      {optionList.map((option, index) => (
        <div key={index} className="flex flex-row gap-1 items-center mb-2">
          <Checkbox
            className="cursor-pointer"
            onCheckedChange={(e) => handleChange(option.value, e)}
            id={'multiselect' + option.value}
            checked={selectedOptions.includes(option.value)}
          />
          <label
            htmlFor={'multiselect' + option.value}
            className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.value == 'Achter' ? 'Achterzijde' : option.value}
          </label>
        </div>
      ))}
      {error && <p className="text-orange-500 mb-2">{error}</p>}
    </>
  );
}
