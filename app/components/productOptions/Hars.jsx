'use client';

import {useState, useEffect, useRef} from 'react';

import {Button} from '~/components/chadcn/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/chadcn/Modal';
import InputImageSwatch from '../InputImageSwatch';
import InputRadio from '../InputRadio';
import {harsKleurOptions, glitterOptions} from './optionSets';

export default function HarsKleur({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const harsKleurValue = value.find(
        (item) => item.key === 'Harskleur',
      ).value;
      const glitterValue = value.find((item) => item.key === 'Glitter').value;

      if (harsKleurValue != '' && glitterValue != '') {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ['hars']: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ['hars']: true,
        }));
        if (harsKleurValue == '') {
          setError((prevState) => ({
            ...prevState,
            ['Harskleur']: '* Kies een harskleur',
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ['Harskleur']: '',
          }));
        }
        if (glitterValue == '') {
          setError((prevState) => ({
            ...prevState,
            ['Glitter']: '* Kies een optie',
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ['Glitter']: '',
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    {key: 'Harskleur', value: value?.harsKleur?.value || ''},
    {key: 'Glitter', value: value?.glitter?.value || ''},
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
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? {...item, value: newValue} : item,
      ),
    );

    onChange(values);
  };

  // useEffect(() => {
  //   onChange(values);
  // }, []);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error['Harskleur']}
          </p>
        )}
        <InputImageSwatch
          value={values.find((item) => item.key === 'Harskleur')?.value || ''}
          onChange={(newHarsValue) => handleChange('Harskleur', newHarsValue)}
          title="Harskleur:"
          options={harsKleurOptions}
        />
      </div>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error['Glitter']}
          </p>
        )}
      </div>

      <div className="flex flex-row">
        <InputRadio
          value={values.find((item) => item.key === 'Glitter')?.value || ''}
          onChange={(newGlitterValue) =>
            handleChange('Glitter', newGlitterValue)
          }
          title="Glitter:"
          options={glitterOptions}
        />
        <Dialog>
          <DialogTrigger>
            <img
              src={'/images/glitter.webp'}
              className="rounded cursor-pointer"
              width={150}
              height={150}
            />
          </DialogTrigger>
          <DialogContent>
            <img
              src={'/images/glitter.webp'}
              className="rounded"
              width={528}
              height={528}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
