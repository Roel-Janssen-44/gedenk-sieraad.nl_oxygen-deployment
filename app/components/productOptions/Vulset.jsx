'use client';

import {useState, useEffect} from 'react';
import InputRadio from '../InputRadio';
import {vulsetOptions} from './optionSets';
import {Button} from '~/components/chadcn/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/chadcn/Modal';

export default function Vulset({value, onChange, setOptionErrors, showErrors}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError('* Kies een optie');
      setOptionErrors((prevState) => ({
        ...prevState,
        ['Vulset']: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ['Vulset']: false,
      }));
    }
  }, [value]);

  const handleChange = (newValue) => {
    onChange(newValue);
  };
  // return <p>kashjbd</p>;
  return (
    <div className="relative">
      {showErrors && (
        <p className="absolute  -bottom-6 left-0 text-red-700">{error}</p>
      )}
      <div className="flex flex-row">
        <InputRadio
          value={value}
          onChange={handleChange}
          title="Vulset:"
          options={vulsetOptions}
        />
        <Dialog>
          <DialogTrigger className="cursor-pointer">
            <img
              src={'/images/vulset.webp'}
              className="rounded"
              width={150}
              height={150}
            />
          </DialogTrigger>
          <DialogContent>
            <img
              src={'/images/vulset.webp'}
              className="mx-auto my-auto rounded-lg"
              width={528}
              height={528}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
