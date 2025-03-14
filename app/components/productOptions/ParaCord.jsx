'use client';

import {useState, useEffect, useRef} from 'react';
import InputRadio from '~/components/InputRadio';
import InputSelect from '~/components/InputSelect';
import {paraCordOptions} from './optionSets';
import {Button} from '~/components/chadcn/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/chadcn/Modal';
import {cn} from '~/lib/utils';

export default function ParaCord({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const paraCrodSingle = value.find(
        (item) => item.key === 'Paracordsingle',
      ).value;
      const paracordMulti = value.find(
        (item) => item.key === 'Paracordmulti',
      ).value;

      if (paraCrodSingle != '' && paracordMulti.length == 2) {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ['Paracord']: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ['Paracord']: true,
        }));
        if (paraCrodSingle == '') {
          setError((prevState) => ({
            ...prevState,
            ['Paracordsingle']: '* Kies een optie',
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ['Paracordsingle']: '',
          }));
        }
        if (paracordMulti.length !== 2) {
          setError((prevState) => ({
            ...prevState,
            ['Paracordmulti']: '* Selecteer twee extra paracords',
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ['Paracordmulti']: '',
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    {key: 'Paracordsingle', value: value?.paracordSingle?.value || ''},
    {key: 'Paracordmulti', value: value?.paracordMulti?.value || []},
  ]);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    onChange(values);
  }, [values]);

  const handleChange = (changedKey, newValue) => {
    if (changedKey == 'Paracordmulti') {
      if (newValue.length > 2) {
        setError((prevState) => ({
          ...prevState,
          ['Paracordmulti']: '* Selecteer maximaal twee extra paracords',
        }));
        setValues((prevValues) => prevValues.map((item) => item));
      } else {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === changedKey ? {...item, value: newValue} : item,
          ),
        );
      }
    } else {
      setValues((prevValues) =>
        prevValues.map((item) =>
          item.key === changedKey ? {...item, value: newValue} : item,
        ),
      );
    }

    onChange(values);
  };

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error['Paracordsingle']}
          </p>
        )}
        <div className="flex flex-row gap-6">
          <div className="min-w-[150px]">
            <InputRadio
              value={
                values.find((item) => item.key === 'Paracordsingle')?.value ||
                ''
              }
              onChange={(paracordSingle) =>
                handleChange('Paracordsingle', paracordSingle)
              }
              title="Para koord 1e keuze:"
              options={paraCordOptions}
            />
          </div>
          <div className="w-auto h-auto pt-10">
            <Dialog>
              <DialogTrigger className="cursor-pointer">
                <img src={'/images/paracords.jpg'} width={190} height={250} />
              </DialogTrigger>
              <DialogContent>
                <img
                  src={'/images/paracords.jpg'}
                  className="mx-auto my-auto h-full w-auto rounded-lg"
                  width={200}
                  height={200}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error['Paracordmulti']}
          </p>
        )}
        <InputSelect
          multiple={true}
          value={
            values.find((item) => item.key === 'Paracordmulti')?.value || ''
          }
          onChange={(paracordMulti) =>
            handleChange('Paracordmulti', paracordMulti)
          }
          title="Para koord (2 extra kleuren):"
          options={paraCordOptions}
        />
      </div>
    </>
  );
}
