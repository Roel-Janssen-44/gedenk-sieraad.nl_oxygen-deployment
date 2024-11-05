"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InputRadio from "../InputRadio";
import { vulsetOptions } from "./optionSets";
import { Button, Modal } from "@mui/material";

export default function Vulset({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError("* Kies een optie");
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Vulset"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Vulset"]: false,
      }));
    }
  }, [value]);

  const handleChange = (newValue) => {
    onChange(newValue);
  };
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
        <Button onClick={handleOpen}>
          <Image
            src={"/images/vulset.webp"}
            className="rounded"
            width={150}
            height={150}
          />
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[528px] max-h-[528px]">
          <Image
            src={"/images/vulset.webp"}
            className="mx-auto my-auto rounded-lg"
            width={528}
            height={528}
          />
        </div>
      </Modal>
    </div>
  );
}
