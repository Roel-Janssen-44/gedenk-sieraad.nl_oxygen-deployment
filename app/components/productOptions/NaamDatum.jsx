"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputFile from "../InputFile";
import InputTextField from "../InputTextField";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import {
  naamdatumOptions,
  lettertypeOptions,
  voorvoegselOptions,
} from "./optionSets";
import InputDate from "../InputDate";

export default function NaamDatum({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const graveerTekstAchterzijde = value.find(
        (item) => item.key === "Naamdatum"
      ).value;
      const voorvoegselValue = value.find(
        (item) => item.key === "Voorvoegsel"
      ).value;
      const naamValue = value.find((item) => item.key === "Naam").value;
      const datumValue = value.find((item) => item.key === "Datum").value;
      const lettertypeValue = value.find(
        (item) => item.key === "Lettertype"
      ).value;

      switch (graveerTekstAchterzijde) {
        case "Geen":
          setError([]);
          setOptionErrors((prevState) => ({
            ...prevState,
            ["Naamdatum"]: false,
          }));
          break;
        case "Naam":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "* Vul een naam in",
            }));
          } else if (naamValue.length > 14) {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "* Vul maximaal 14 karakters in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "",
            }));
          }

          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "* Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }

          if (voorvoegselValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Voorvoegsel"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Voorvoegsel"]: "",
            }));
          }

          setError((prevState) => ({
            ...prevState,
            ["Datum"]: "",
            ["Naamdatum"]: "",
          }));
          break;

        case "Datum":
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datum"]: "* Vul een datum in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datum"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "* Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          if (voorvoegselValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Voorvoegsel"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Voorvoegsel"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Naam"]: "",
            ["Naamdatum"]: "",
          }));
          break;
        case "Naam + datum":
          setError((prevState) => ({
            ...prevState,
            ["Naamdatum"]: "",
          }));
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "* Vul een naam in",
            }));
          } else if (naamValue.length > 14) {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "* Vul maximaal 14 karakters in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "",
            }));
          }
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datum"]: "* Vul een datum in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datum"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "* Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          if (voorvoegselValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Voorvoegsel"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Voorvoegsel"]: "",
            }));
          }
          break;
        default:
          if (graveerTekstAchterzijde == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamdatum"]: "* Kies een optie",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamdatum"]: "",
            }));
          }
          break;
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
        ["Naamdatum"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Naamdatum"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "Naamdatum",
      value: value?.graveerTekstAchterzijde?.value || "",
    },
    { key: "Naam", value: value?.naam?.value || "" },
    { key: "Datum", value: value?.datum?.value || "" },
    { key: "Lettertype", value: value?.lettertype?.value || "" },
    { key: "Voorvoegsel", value: value?.voorvoegsel?.value || "" },
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

  const graveerTekstAchterzijdeTekst = values.find(
    (item) => item.key === "Naamdatum"
  ).value;

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["Naamdatum"]}
          </p>
        )}

        <InputSelect
          value={values.find((item) => item.key === "Naamdatum")?.value || ""}
          onChange={(newGraveerTekstValue) =>
            handleChange("Naamdatum", newGraveerTekstValue)
          }
          title="Graveertekst:"
          options={naamdatumOptions}
        />
      </div>
      {(graveerTekstAchterzijdeTekst === "Naam" ||
        graveerTekstAchterzijdeTekst === "Naam + datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Naam"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "Naam")?.value || ""}
            onChange={(newNaamValue) => handleChange("Naam", newNaamValue)}
            title="Naam:"
          />
        </div>
      )}
      {(graveerTekstAchterzijdeTekst === "Datum" ||
        graveerTekstAchterzijdeTekst === "Naam + datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Datum"]}
            </p>
          )}
          <InputDate
            onChange={(newDatumValue) => handleChange("Datum", newDatumValue)}
            title="Datum:"
          />
        </div>
      )}
      {graveerTekstAchterzijdeTekst != "Geen" &&
        graveerTekstAchterzijdeTekst != "" && (
          <>
            <div className="relative">
              {showErrors && (
                <p className="absolute -bottom-6 left-0 text-red-700">
                  {error["Voorvoegsel"]}
                </p>
              )}
              <InputSelect
                value={
                  values.find((item) => item.key === "Voorvoegsel")?.value || ""
                }
                onChange={(newVoorvoegselValue) =>
                  handleChange("Voorvoegsel", newVoorvoegselValue)
                }
                title="Graveertekst voorvoegsel:"
                options={voorvoegselOptions}
              />
            </div>
            <div className="relative">
              {showErrors && (
                <p className="absolute -bottom-6 left-0 text-red-700">
                  {error["Lettertype"]}
                </p>
              )}
              <InputImageSwatchLarge
                value={
                  values.find((item) => item.key === "Lettertype")?.value || ""
                }
                onChange={(newLettertypeValue) =>
                  handleChange("Lettertype", newLettertypeValue)
                }
                title="Lettertype:"
                options={lettertypeOptions}
              />
            </div>
          </>
        )}
    </>
  );
}
