"use client";

import { useState, useEffect, useRef } from "react";

import InputFile from "../InputFile";
import InputSelect from "../InputSelect";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import {
  gravureOptions,
  extraWoordenOptions,
  lettertypeOptions,
} from "./optionSets";

export default function Gravure({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const gravure = value.find((item) => item.key === "Gravure").value;
      const lettertypeValue = value.find(
        (item) => item.key === "Lettertype"
      ).value;
      const initialenValue = value.find(
        (item) => item.key === "Initialen"
      ).value;
      const extraWoordValue = value.find(
        (item) => item.key === "ExtraWoord"
      ).value;
      const datumValue = value.find((item) => item.key === "Datum").value;
      const naamValue = value.find((item) => item.key === "Naam").value;
      const woord1Value = value.find((item) => item.key === "1 woord").value;
      const woord2Value = value.find((item) => item.key === "2 woorden").value;
      const woord3Value = value.find((item) => item.key === "3 woorden").value;
      const woord4Value = value.find((item) => item.key === "4 woorden").value;
      const uploadValue = value.find((item) => item.key === "Upload").value;

      switch (gravure) {
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
          }));
          break;
        case "Geen tekst":
        case "Geen":
          setError((prevState) => ({
            ...prevState,
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Lettertype"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          if (extraWoordValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["ExtraWoord"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["ExtraWoord"]: "",
            }));
            if (extraWoordValue == "1 extra woord") {
              if (woord1Value == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1Value.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1Value.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1"]: "* Gebruik maximaal 11 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1"]: "",
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
                ["Gravure"]: "",
                ["ExtraWoord"]: "",
                ["Initialen"]: "",
                ["Naam"]: "",
                ["Datum"]: "",
                ["Gravure"]: "",
                ["Woord2"]: "",
                ["Woord3"]: "",
                ["Woord4"]: "",
                ["Upload"]: "",
              }));
            } else if (extraWoordValue == "2 extra woorden") {
              if (woord2Value == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2Value.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2Value.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2"]: "* Gebruik maximaal 18 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2"]: "",
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
                ["Gravure"]: "",
                ["ExtraWoord"]: "",
                ["Initialen"]: "",
                ["Naam"]: "",
                ["Datum"]: "",
                ["Gravure"]: "",
                ["Woord1"]: "",
                ["Woord3"]: "",
                ["Woord4"]: "",
                ["Upload"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Gravure"]: "",
                ["ExtraWoord"]: "",
                ["Initialen"]: "",
                ["Naam"]: "",
                ["Datum"]: "",
                ["Gravure"]: "",
                ["Woord1"]: "",
                ["Woord3"]: "",
                ["Woord4"]: "",
                ["Lettertype"]: "",
                ["Upload"]: "",
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Datum"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
          }));
          break;

        case "1 woord":
          if (woord1Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord1"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1Value.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1Value.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord1"]: "",
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Gravure"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
          }));
          break;
        case "2 woorden":
          if (woord2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord2"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2Value.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2Value.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2"]: "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord2"]: "",
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
          }));
          break;
        case "3 woorden":
          if (woord3Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord3"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3Value.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3Value.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3"]: "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord3"]: "",
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord4"]: "",
            ["Upload"]: "",
          }));
          break;
        case "4 woorden":
          if (woord4Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord4"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4Value.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4Value.split(" ").length > 4) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4"]: "Dit veld mag niet meer dan drie spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord4"]: "",
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
            ["Gravure"]: "",
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Gravure"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Upload"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValue == "" || uploadValue == null) {
            setError((prevState) => ({
              ...prevState,
              ["Upload"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Upload"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["ExtraWoord"]: "",
            ["Initialen"]: "",
            ["Naam"]: "",
            ["Datum"]: "",
            ["Woord1"]: "",
            ["Woord2"]: "",
            ["Woord3"]: "",
            ["Woord4"]: "",
            ["Lettertype"]: "",
          }));
          break;

        default:
          if (gravure == "") {
            setError((prevState) => ({
              ...prevState,
              ["Gravure"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Gravure"]: "",
            }));
          }
      }

      if (
        gravure == "Geen tekst" ||
        gravure == "Initialen/letters/tekens" ||
        gravure == "Hartje ♥ symbool" ||
        gravure == "Infinity ∞ teken" ||
        gravure == "Naam en datum" ||
        gravure == "Naam" ||
        gravure == "Datum" ||
        gravure == "1 woord" ||
        gravure == "2 woorden" ||
        gravure == "3 woorden" ||
        gravure == "4 woorden" ||
        gravure == "Voet/handafdruk" ||
        gravure == "Poot/snuitafdruk" ||
        gravure == "Echo" ||
        gravure == "Vingerafdruk" ||
        gravure == "Logo/handtekening" ||
        gravure == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["Gravure"]: "",
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
        ["Gravure"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Gravure"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "Gravure",
      value: value?.gravure?.value || "",
    },
    { key: "Lettertype", value: value?.lettertype?.value || "" },
    { key: "Initialen", value: value?.initialen?.value || "" },
    { key: "ExtraWoord", value: value?.extraWoord?.value || "" },
    { key: "Datum", value: value?.datum?.value || "" },
    { key: "Naam", value: value?.naam?.value || "" },
    { key: "1 woord", value: value?.woord1?.value || "" },
    { key: "2 woorden", value: value?.woord2?.value || "" },
    { key: "3 woorden", value: value?.woord3?.value || "" },
    { key: "4 woorden", value: value?.woord4?.value || "" },
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
    if (changedKey === "tekstBinnenZijdeRing") {
      if (
        !newValue.includes("Initialen/letters/tekens") ||
        !newValue.includes("Hartje ♥ symbool")
      ) {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === "ExtraWoord" ? { ...item, value: "" } : item
          )
        );
        setError((prevState) => ({
          ...prevState,
          ["ExtraWoord"]: "",
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
  const gravure = values.find((item) => item.key === "Gravure").value;
  const extraWoordValue = values.find(
    (item) => item.key === "ExtraWoord"
  ).value;

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
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
          options={gravureOptions}
        />
      </div>

      {(gravure == "Hartje ♥ symbool" || gravure == "Infinity ∞ teken") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["ExtraWoord"]}
            </p>
          )}
          <InputSelect
            value={extraWoordValue}
            onChange={(newExtraWoordValue) =>
              handleChange("ExtraWoord", newExtraWoordValue)
            }
            title="Extra woorden:"
            options={extraWoordenOptions}
          />
        </div>
      )}
      {gravure == "Initialen/letters/tekens" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
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
      {(gravure == "Naam" || gravure == "Naam en datum") && (
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
      {(gravure == "Datum" || gravure == "Naam en datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
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
      {(gravure == "1 woord" || extraWoordValue == "1 extra woord") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Woord1"]}
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
      {(gravure == "2 woorden" || extraWoordValue == "2 extra woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Woord2"]}
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
      {gravure == "3 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Woord3"]}
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
      {gravure == "4 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Woord4"]}
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
      {(gravure == "Initialen/letters/tekens" ||
        gravure == "Naam" ||
        gravure == "Datum" ||
        gravure == "Naam en datum" ||
        gravure == "1 woord" ||
        gravure == "2 woorden" ||
        gravure == "3 woorden" ||
        gravure == "4 woorden" ||
        extraWoordValue == "1 extra woord" ||
        extraWoordValue == "2 extra woorden") && (
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
      )}
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
  );
}
