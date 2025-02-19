'use client';

import {useState, useEffect, useRef} from 'react';
import InputRadio from '~/components/InputRadio';
import InputSelect from '~/components/InputSelect';
import {satijnenOptions} from './optionSets';
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

export default function Satijnen({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const paraCrodSingle = value.find(
        (item) => item.key === 'Satijnensingle',
      ).value;
      const satijnenMulti = value.find(
        (item) => item.key === 'Satijnenmulti',
      ).value;

      if (paraCrodSingle != '' && satijnenMulti.length == 4) {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ['satijnen']: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ['satijnen']: true,
        }));
        if (paraCrodSingle == '') {
          setError((prevState) => ({
            ...prevState,
            ['Satijnensingle']: '* Kies een optie',
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ['Satijnensingle']: '',
          }));
        }
        if (satijnenMulti.length !== 4) {
          setError((prevState) => ({
            ...prevState,
            ['Satijnenmulti']: '* Selecteer vier extra satijnens',
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ['Satijnenmulti']: '',
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    {key: 'Satijnensingle', value: value?.satijnenSingle?.value || ''},
    {key: 'Satijnenmulti', value: value?.satijnenMulti?.value || []},
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
    if (changedKey == 'Satijnenmulti') {
      if (newValue.length > 4) {
        setError((prevState) => ({
          ...prevState,
          ['Satijnenmulti']: '* Selecteer maximaal vier extra satijnen',
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
            {error['Satijnensingle']}
          </p>
        )}
        <div className="flex flex-row gap-6">
          <div className="min-w-[150px]">
            <InputRadio
              value={
                values.find((item) => item.key === 'Satijnensingle')?.value ||
                ''
              }
              onChange={(satijnensingle) =>
                handleChange('Satijnensingle', satijnensingle)
              }
              title="Para koord 1e keuze:"
              options={satijnenOptions}
            />
          </div>
          <div className="w-auto h-auto pt-10">
            <Dialog>
              <DialogTrigger className="cursor-pointer">
                <img src={'/images/satijnen.jpeg'} width={190} height={250} />
              </DialogTrigger>
              <DialogContent>
                <img
                  src={'/images/satijnen.jpeg'}
                  className="mx-auto my-auto h-auto w-[200px] rounded-lg"
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
            {error['Satijnenmulti']}
          </p>
        )}
        <InputSelect
          multiple={true}
          value={
            values.find((item) => item.key === 'Satijnenmulti')?.value || ''
          }
          onChange={(satijnenmulti) =>
            handleChange('Satijnenmulti', satijnenmulti)
          }
          title="Satijnen armbandjes (4 extra kleuren):"
          options={satijnenOptions}
        />
      </div>
    </>
    // <>
    //   <div className="relative">
    //     {showErrors && (
    //       <p className="absolute  -bottom-6 left-0 text-red-700">
    //         {error['Satijnensingle']}
    //       </p>
    //     )}
    //     <div className="flex flex-row gap-6">
    //       <div className="min-w-[150px]">
    //         <InputSelect
    //           value={
    //             values.find((item) => item.key === 'Satijnensingle')?.value ||
    //             ''
    //           }
    //           onChange={(satijnenSingle) =>
    //             handleChange('Satijnensingle', satijnenSingle)
    //           }
    //           title="Satijnen armbandje 1e keuze:"
    //           options={satijnenOptions}
    //         />
    //       </div>
    //       <div className="w-auto h-auto pt-7">
    //         <div className="w-auto h-auto sticky top-10">
    //           <Button
    //             onClick={handleOpen}
    //             className="bg-gray-100 aspect-sqaure w-28 rounded-lg"
    //           >
    //             <Image src={'/images/satijnen.jpeg'} width={50} height={150} />
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="relative">
    //     {showErrors && (
    //       <p className="absolute -bottom-6 left-0 text-red-700">
    //         {error['Satijnenmulti']}
    //       </p>
    //     )}
    //     <InputSelect
    //       multiple={true}
    //       value={
    //         values.find((item) => item.key === 'Satijnenmulti')?.value || ''
    //       }
    //       onChange={(satijnenMulti) =>
    //         handleChange('Satijnenmulti', satijnenMulti)
    //       }
    //       title="Satijnen armbandjes (4 extra kleuren):"
    //       options={satijnenOptions}
    //     />
    //   </div>
    //   <Snackbar
    //     open={openSnackbar}
    //     autoHideDuration={3000}
    //     onClose={closeSnackbar}
    //     message="Selecteer maximaal twee extra satijnens"
    //   >
    //     <Alert severity="error" sx={{width: '100%'}}>
    //       Selecteer maximaal vier extra satijnen
    //       <IconButton
    //         size="small"
    //         aria-label="close"
    //         color="inherit"
    //         onClick={closeSnackbar}
    //       >
    //         <CloseIcon fontSize="small" />
    //       </IconButton>
    //     </Alert>
    //   </Snackbar>
    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <div className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[750px] max-h-[750px]">
    //       <Image
    //         src={'/images/satijnen.jpeg'}
    //         className="mx-auto my-auto h-full w-auto rounded-lg"
    //         width={750}
    //         height={750}
    //       />
    //     </div>
    //   </Modal>
    // </>
  );
}
