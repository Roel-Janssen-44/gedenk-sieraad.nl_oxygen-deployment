"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, Modal } from "@mui/material";

import InputImageSwatch from "../InputImageSwatch";
import InputRadio from "../InputRadio";
import { harsKleurOptions, glitterOptions } from "./optionSets";

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
        (item) => item.key === "Harskleur"
      ).value;
      const glitterValue = value.find((item) => item.key === "Glitter").value;

      if (harsKleurValue != "" && glitterValue != "") {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ["hars"]: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ["hars"]: true,
        }));
        if (harsKleurValue == "") {
          setError((prevState) => ({
            ...prevState,
            ["Harskleur"]: "* Kies een harskleur",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["Harskleur"]: "",
          }));
        }
        if (glitterValue == "") {
          setError((prevState) => ({
            ...prevState,
            ["Glitter"]: "* Kies een optie",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["Glitter"]: "",
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    { key: "Harskleur", value: value?.harsKleur?.value || "" },
    { key: "Glitter", value: value?.glitter?.value || "" },
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
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(values);
  };

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["Harskleur"]}
          </p>
        )}
        <InputImageSwatch
          value={values.find((item) => item.key === "Harskleur")?.value || ""}
          onChange={(newHarsValue) => handleChange("Harskleur", newHarsValue)}
          title="Harskleur:"
          options={harsKleurOptions}
        />
      </div>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["Glitter"]}
          </p>
        )}
      </div>

      <div className="flex flex-row">
        <InputRadio
          value={values.find((item) => item.key === "Glitter")?.value || ""}
          onChange={(newGlitterValue) =>
            handleChange("Glitter", newGlitterValue)
          }
          title="Glitter:"
          options={glitterOptions}
        />
        <Button onClick={handleOpen}>
          <Image
            src={"/images/glitter.webp"}
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
            src={"/images/glitter.webp"}
            className="mx-auto my-auto rounded-lg"
            width={528}
            height={528}
          />
        </div>
      </Modal>
    </>
  );
}
