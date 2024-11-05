"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import {
  tekstBinnenZijdeRingOptions,
  extraWoordenOptions,
  lettertypeOptions,
} from "./optionSets";

export default function Tekst({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);
  useEffect(() => {
    if (Array.isArray(value)) {
      const tekstBinnenZijdeRing = value.find(
        (item) => item.key === "Tekstbinnenzijdering"
      ).value;
      const lettertypeValue = value.find(
        (item) => item.key === "Lettertype"
      ).value;
      const initialenValue = value.find(
        (item) => item.key === "Initialen"
      ).value;
      const extraWoordValue = value.find(
        (item) => item.key === "Extrawoord"
      ).value;
      const datumValue = value.find((item) => item.key === "Datum").value;
      const naamValue = value.find((item) => item.key === "Naam").value;
      const woord1Value = value.find((item) => item.key === "1 woord").value;
      const woord2Value = value.find((item) => item.key === "2 woorden").value;
      const woord3Value = value.find((item) => item.key === "3 woorden").value;
      const woord4Value = value.find((item) => item.key === "4 woorden").value;

      switch (tekstBinnenZijdeRing) {
        case "Initialen/letters/tekens":
          if (initialenValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Initialen"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else if (initialenValue.length > 6) {
            setError((prevState) => ({
              ...prevState,
              ["Initialen"]: "* Gebruik maximaal 6 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Initialen"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Lettertype"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          if (extraWoordValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Extrawoord"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Extrawoord"]: "",
            }));
            if (extraWoordValue == "1 extra woord") {
              if (woord1Value == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1Value.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1Value.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1"]: "* Gebruik maximaal 11 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1"]: "",
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
              setError((prevState) => ({
                ...prevState,
                ["Tekstbinnenzijdering"]: "",
                ["Extrawoord"]: "",
                ["Initialen"]: "",
                ["Naam"]: "",
                ["Datum"]: "",
                ["Tekstbinnenzijdering"]: "",
                ["woord2"]: "",
                ["woord3"]: "",
                ["woord4"]: "",
              }));
            } else if (extraWoordValue == "2 extra woorden") {
              if (woord2Value == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2Value.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2Value.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2"]: "* Gebruik maximaal 18 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2"]: "",
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
              setError((prevState) => ({
                ...prevState,
                ["Tekstbinnenzijdering"]: "",
                ["Extrawoord"]: "",
                ["Initialen"]: "",
                ["Naam"]: "",
                ["Datum"]: "",
                ["Tekstbinnenzijdering"]: "",
                ["woord1"]: "",
                ["woord3"]: "",
                ["woord4"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Tekstbinnenzijdering"]: "",
                ["Extrawoord"]: "",
                ["Initialen"]: "",
                ["Naam"]: "",
                ["Datum"]: "",
                ["Tekstbinnenzijdering"]: "",
                ["woord1"]: "",
                ["woord3"]: "",
                ["woord4"]: "",
                ["Lettertype"]: "",
              }));
            }
          }

          break;
        case "Datum":
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datum"]: "Veld datum mag niet leeg zijn",
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
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "Naam":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "Veld naam mag niet leeg zijn",
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
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Datum"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "Naam en datum":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naam"]: "Veld naam mag niet leeg zijn",
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
              ["Datum"]: "Veld datum mag niet leeg zijn",
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
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "1 woord":
          if (woord1Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1Value.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1Value.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "2 woorden":
          if (woord2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2Value.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2Value.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "3 woorden":
          if (woord3Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3Value.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3Value.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord4"]: "",
          }));
          break;
        case "4 woorden":
          if (woord4Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4Value.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4Value.split(" ").length > 4) {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "Dit veld mag niet meer dan drie spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Lettertype"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Tekstbinnenzijdering"]: "",
            ["Extrawoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Tekstbinnenzijdering"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
          }));
          break;
        default:
          if (tekstBinnenZijdeRing == "") {
            setError((prevState) => ({
              ...prevState,
              ["Tekstbinnenzijdering"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Tekstbinnenzijdering"]: "",
            }));
          }
      }

      if (
        tekstBinnenZijdeRing == "Geen tekst" ||
        tekstBinnenZijdeRing == "Initialen/letters/tekens" ||
        tekstBinnenZijdeRing == "Hartje ♥ symbool" ||
        tekstBinnenZijdeRing == "Infinity ∞ teken" ||
        tekstBinnenZijdeRing == "Naam en datum" ||
        tekstBinnenZijdeRing == "Naam" ||
        tekstBinnenZijdeRing == "Datum" ||
        tekstBinnenZijdeRing == "1 woord" ||
        tekstBinnenZijdeRing == "2 woorden" ||
        tekstBinnenZijdeRing == "3 woorden" ||
        tekstBinnenZijdeRing == "4 woorden"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["Tekstbinnenzijdering"]: "",
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
        ["tekst"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["tekst"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "Tekstbinnenzijdering",
      value: value?.tekstBinnenZijdeRing?.value || "",
    },
    { key: "Lettertype", value: value?.lettertype?.value || "" },
    { key: "Initialen", value: value?.initialen?.value || "" },
    { key: "Extrawoord", value: value?.extraWoord?.value || "" },
    { key: "Datum", value: value?.datum?.value || "" },
    { key: "Naam", value: value?.naam?.value || "" },
    { key: "1 woord", value: value?.woord1?.value || "" },
    { key: "2 woorden", value: value?.woord2?.value || "" },
    { key: "3 woorden", value: value?.woord3?.value || "" },
    { key: "4 woorden", value: value?.woord4?.value || "" },
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
    if (changedKey === "Tekstbinnenzijdering") {
      if (
        !newValue.includes("Initialen/letters/tekens") ||
        !newValue.includes("Hartje ♥ symbool")
      ) {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === "Extrawoord" ? { ...item, value: "" } : item
          )
        );
        setError((prevState) => ({
          ...prevState,
          ["Extrawoord"]: "",
        }));
      }
    }
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );
    onChange(values);
  };
  const tekstBinnenZijdeRingValue = values.find(
    (item) => item.key === "Tekstbinnenzijdering"
  ).value;
  const extraWoordValue = values.find(
    (item) => item.key === "Extrawoord"
  ).value;

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["Tekstbinnenzijdering"]}
          </p>
        )}
        <InputSelect
          value={tekstBinnenZijdeRingValue}
          onChange={(newTekstValue) =>
            handleChange("Tekstbinnenzijdering", newTekstValue)
          }
          title="Tekst binnenzijde ring:"
          options={tekstBinnenZijdeRingOptions}
        />
      </div>

      {(tekstBinnenZijdeRingValue == "Hartje ♥ symbool" ||
        tekstBinnenZijdeRingValue == "Infinity ∞ teken") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["Extrawoord"]}
            </p>
          )}
          <InputSelect
            value={extraWoordValue}
            onChange={(newExtraWoordValue) =>
              handleChange("Extrawoord", newExtraWoordValue)
            }
            title="Extra woorden:"
            options={extraWoordenOptions}
          />
        </div>
      )}
      {tekstBinnenZijdeRingValue == "Initialen/letters/tekens" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["Initialen"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "Initialen")?.value || ""}
            onChange={(newInitialenValue) =>
              handleChange("Initialen", newInitialenValue)
            }
            title="Initialen/letters/tekens:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "Naam" ||
        tekstBinnenZijdeRingValue == "Naam en datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
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
      {(tekstBinnenZijdeRingValue == "Datum" ||
        tekstBinnenZijdeRingValue == "Naam en datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["Datum"]}
            </p>
          )}
          <InputDate
            value={values.find((item) => item.key === "Datum")?.value || ""}
            onChange={(newDateValue) => handleChange("Datum", newDateValue)}
            title="Datum:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "1 woord" ||
        extraWoordValue == "1 extra woord") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord1"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "1 woord")?.value || ""}
            onChange={(new1WoordValue) =>
              handleChange("1 woord", new1WoordValue)
            }
            title="1 Woord:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "2 woorden" ||
        extraWoordValue == "2 extra woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord2"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "2 woorden")?.value || ""}
            onChange={(new2WoordenValue) =>
              handleChange("2 woorden", new2WoordenValue)
            }
            title="2 Woorden:"
          />
        </div>
      )}
      {tekstBinnenZijdeRingValue == "3 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord3"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "3 woorden")?.value || ""}
            onChange={(new3WoordenValue) =>
              handleChange("3 woorden", new3WoordenValue)
            }
            title="3 Woorden:"
          />
        </div>
      )}
      {tekstBinnenZijdeRingValue == "4 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord4"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "4 woorden")?.value || ""}
            onChange={(new4WoordenValue) =>
              handleChange("4 woorden", new4WoordenValue)
            }
            title="4 Woorden:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "Initialen/letters/tekens" ||
        tekstBinnenZijdeRingValue == "Naam" ||
        tekstBinnenZijdeRingValue == "Datum" ||
        tekstBinnenZijdeRingValue == "Naam en datum" ||
        tekstBinnenZijdeRingValue == "1 woord" ||
        tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden" ||
        extraWoordValue == "1 extra woord" ||
        extraWoordValue == "2 extra woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
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
      )}
    </>
  );
}
