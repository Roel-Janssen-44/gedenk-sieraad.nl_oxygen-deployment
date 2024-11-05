import {useState} from 'react';

import {Label} from '~/components/chadcn/Label';
import {RadioGroup, RadioGroupItem} from '~/components/chadcn/Radio';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/chadcn/modal';

export default function InputRadio({onChange, title, options, multiple}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <RadioGroup multiple onValueChange={(e) => onChange(e)}>
        {options.map((option, index) => {
          return (
            <div key={option.value + index}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>
                  {option.value +
                    ' ' +
                    (option?.price != 0 ? `(€${option?.price})` : '')}
                </Label>
              </div>

              {option?.imageUrl && (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <img
                        aria-hidden
                        src={option.imageUrl}
                        className="rounded"
                        alt="Option descriptive image"
                        width={125}
                        height={125}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <div className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[528px] max-h-[528px]">
                        <img
                          aria-hidden
                          src={option.imageUrl}
                          alt="Option descriptive image"
                          width={528}
                          height={528}
                          className="rouned-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
