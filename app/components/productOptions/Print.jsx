"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputFile from "../InputFile";

import {
  printKeuze1Options,
  printKeuze2Options,
  printKeuze3Options,
} from "./optionSets";

export default function Print({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const keuze1Value = value.find((item) => item.key === "Keuze1").value;
      const keuze2Value = value.find((item) => item.key === "Keuze2").value;
      const upload1Value = value.find((item) => item.key === "Upload1").value;
      const upload2Value = value.find((item) => item.key === "Upload2").value;
      const keuze3Value = value.find((item) => item.key === "Keuze3").value;

      switch (keuze1Value) {
        case "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden":
          setError((prevState) => ({
            ...prevState,
            ["Keuze3"]: "",
          }));
          if (keuze2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["Keuze2"]: "* Maak een keuze",
            }));
          } else if (keuze2Value == "Ja") {
            setError((prevState) => ({
              ...prevState,
              ["Keuze2"]: "",
            }));
            if (upload2Value == null) {
              setError((prevState) => ({
                ...prevState,
                ["Upload2"]: "* Upload een bestand",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Upload2"]: "",
              }));
            }
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Keuze2"]: "",
            }));
          }
          if (upload1Value == null) {
            setError((prevState) => ({
              ...prevState,
              ["Upload1"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Upload1"]: "",
            }));
          }
          break;
        case "Ik wil eerst een gratis vingerafdruk pakket ontvangen.":
        case "Ik wil eerst een gratis hand/voet/pootafdruk pakket ontvangen.":
          setError((prevState) => ({
            ...prevState,
            ["Keuze2"]: "",
            ["Keuze3"]: "",
            ["Upload1"]: "",
            ["Upload2"]: "",
          }));
          if (keuze3Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["Keuze3"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Keuze3"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Keuze2"]: "",
          }));
          break;
        default:
          break;
      }
      if (keuze1Value == "") {
        setError((prevState) => ({
          ...prevState,
          ["Keuze1"]: "* Kies een optie",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          ["Keuze1"]: "",
        }));
      }
    }
  }, [value]);

  useEffect(() => {
    const allValuescorrect = Object.values(error).every(
      (value) => value === ""
    );
    if (allValuescorrect) {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["print"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["print"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "Keuze1",
      value: value?.print?.value || "",
    },
    { key: "Keuze2", value: value?.keuze2?.value || "" },
    { key: "Upload1", value: value?.upload1?.value || "" },
    { key: "Upload2", value: value?.upload2?.value || "" },
    { key: "Keuze3", value: value?.keuze3?.value || "" },
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
    if (changedKey === "Keuze1") {
      if (
        newValue ==
        "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden"
      ) {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === "Keuze3" ? { ...item, value: "" } : item
          )
        );
      } else if (
        newValue == "Ik wil eerst een gratis vingerafdruk pakket ontvangen." ||
        newValue ==
          "Ik wil eerst een gratis hand/voet/pootafdruk pakket ontvangen."
      ) {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === "Keuze2" ? { ...item, value: "" } : item
          )
        );
      } else {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === "Keuze2" ? { ...item, value: "" } : item
          )
        );
      }
    }

    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(values);
  };

  const printKeuze = values.find((item) => item.key === "Keuze1").value;
  const printKeuze2 = values.find((item) => item.key === "Keuze2").value;

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["Keuze1"]}
          </p>
        )}
        <InputRadio
          value={values.find((item) => item.key === "Keuze1")?.value || ""}
          onChange={(newKeuze1TekstValue) =>
            handleChange("Keuze1", newKeuze1TekstValue)
          }
          title="Maak een keuze:"
          options={printKeuze1Options}
        />
      </div>
      {printKeuze ===
        "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden" && (
        <>
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["Upload1"]}
              </p>
            )}
            <InputFile
              key="Upload1"
              id={"Upload1"}
              value={values.find((item) => item.key === "Upload1")?.value || ""}
              onChange={handleChange}
              title="Bestand 1:"
              options={printKeuze2Options}
              setError={setError}
            />
          </div>
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["Keuze2"]}
              </p>
            )}
            <InputSelect
              value={values.find((item) => item.key === "Keuze2")?.value || ""}
              onChange={(newKeuze2Value) =>
                handleChange("Keuze2", newKeuze2Value)
              }
              title="Tweede bestand uploaden:"
              options={printKeuze2Options}
            />
          </div>
          {printKeuze2 == "Ja" && (
            <div className="relative">
              {showErrors && (
                <p className="absolute -bottom-6 left-0 text-red-700">
                  {error["Upload2"]}
                </p>
              )}
              <InputFile
                key="Uploadasd"
                id="Upload2"
                value={
                  values.find((item) => item.key === "Upload2")?.value || ""
                }
                onChange={handleChange}
                title="Bestand 2:"
                options={printKeuze2Options}
                setError={setError}
              />
            </div>
          )}
        </>
      )}

      {printKeuze !=
        "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden" &&
        printKeuze != "" && (
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["Keuze3"]}
              </p>
            )}
            <InputSelect
              value={values.find((item) => item.key === "Keuze3")?.value || ""}
              onChange={(newKeuze3Value) =>
                handleChange("Keuze3", newKeuze3Value)
              }
              title="Aantal bestanden:"
              options={printKeuze3Options}
            />
          </div>
        )}
    </>
  );
}
