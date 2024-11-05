"use client";

import { useState, useEffect, useRef } from "react";

import InputRadio from "../InputRadio";
import InputFile from "../InputFile";
import InputSelect from "../InputSelect";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import {
  gravureAfbeeldingOptions,
  vppakketKeuzeOptions,
  vppakketUploadOptions,
} from "./optionSets";

export default function Vppakketup({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);
  useEffect(() => {
    if (Array.isArray(value)) {
      const keuzeValue = values.find(
        (item) => item.key === "Vppakketkeuze"
      ).value;
      const gravure = values.find((item) => item.key === "Gravure").value;
      const uploadValue = values.find((item) => item.key === "Upload").value;

      if (keuzeValue == "") {
        setError((prevState) => ({
          ...prevState,
          ["Vppakketkeuze"]: "* Kies een optie",
        }));
      } else if (
        keuzeValue ==
        "Ik heb al een vingerafdruk/gravure en wil nu een bestand uploaden"
      ) {
        if (gravure != "") {
          setError((prevState) => ({
            ...prevState,
            ["Vppakketkeuze"]: "",
            ["Gravure"]: "",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["Gravure"]: "* Maak een keuze",
            ["Vppakketkeuze"]: "",
          }));
        }
        if (uploadValue == "" || uploadValue == null) {
          setError((prevState) => ({
            ...prevState,
            ["Upload"]: "* Upload een bestand",
            ["Vppakketkeuze"]: "",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["Vppakketkeuze"]: "",
            ["Upload"]: "",
          }));
        }
      } else {
        if (gravure != "") {
          setError((prevState) => ({
            ...prevState,
            ["Gravure"]: "",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["Gravure"]: "* Maak een keuze",
          }));
        }
        setError((prevState) => ({
          ...prevState,
          ["Vppakketkeuze"]: "",
          ["Upload"]: "",
        }));
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    { key: "Vppakketkeuze", value: value?.vppakketKeuze?.value || "" },
    {
      key: "Gravure",
      value: value?.gravure?.value || "",
    },
    { key: "Upload", value: value?.upload?.value || "" },
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
    const allValuescorrect = Object.values(error).every(
      (value) => value === ""
    );
    if (allValuescorrect) {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Vppakket"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Vppakket"]: true,
      }));
    }
  }, [error]);

  const vppakketKeuzeTekst = values.find(
    (item) => item.key === "Vppakketkeuze"
  ).value;
  const gravure = values.find((item) => item.key === "Gravure").value;
  const keuzeValue = values.find((item) => item.key === "Vppakketkeuze").value;

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["Vppakketkeuze"]}
          </p>
        )}
        <InputRadio
          value={
            values.find((item) => item.key === "Vppakketkeuze")?.value || ""
          }
          onChange={(keuzeValue) => handleChange("Vppakketkeuze", keuzeValue)}
          title="Maak een keuze:"
          options={vppakketKeuzeOptions}
        />
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Gravure"]}
            </p>
          )}
          <InputSelect
            value={gravure}
            onChange={(newTekstValue) => handleChange("Gravure", newTekstValue)}
            title="Gravure: "
            options={gravureAfbeeldingOptions}
          />
        </div>
        {keuzeValue ==
          "Ik heb al een vingerafdruk/gravure en wil nu een bestand uploaden" && (
          <>
            {(gravure == "Voet/handafdruk" ||
              gravure == "Poot/snuitafdruk" ||
              gravure == "snuitafdruk" ||
              gravure == "Echo" ||
              gravure == "Vingerafdruk" ||
              gravure == "Logo/handtekening" ||
              gravure == "Twee vingerafdrukken in hartvorm") && (
              <div className="relative">
                {showErrors && (
                  <p className="absolute -bottom-6 left-0 text-red-700">
                    {error["Upload"]}
                  </p>
                )}
                <InputFile
                  id={"Upload"}
                  setError={setError}
                  title="Bestand toevoegen:"
                  onChange={handleChange}
                  value={value}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
