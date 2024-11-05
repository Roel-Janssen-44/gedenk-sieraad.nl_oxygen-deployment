"use client";

import { useState, useEffect, useRef } from "react";

import {
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
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

export default function Positie({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  const handleCheckmarkChange = (name, event) => {
    setCheckmark((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, status: event.target.checked } : item
      )
    );
  };
  const [checkmark, setCheckmark] = useState([
    { name: "Links", status: false },
    { name: "Midden", status: false },
    { name: "Rechts", status: false },
    { name: "Achter", status: false },
  ]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const gravureLinks = value.find(
        (item) => item.key === "Gravurelinks"
      ).value;
      const initialenValueLinks = value.find(
        (item) => item.key === "Initialenlinks"
      ).value;
      const datumValueLinks = value.find(
        (item) => item.key === "Datumlinks"
      ).value;
      const naamValueLinks = value.find(
        (item) => item.key === "Naamlinks"
      ).value;
      const woord1ValueLinks = value.find(
        (item) => item.key === "1 woordlinks"
      ).value;
      const woord2ValueLinks = value.find(
        (item) => item.key === "2 woordenlinks"
      ).value;
      const woord3ValueLinks = value.find(
        (item) => item.key === "3 woordenlinks"
      ).value;
      const woord4ValueLinks = value.find(
        (item) => item.key === "4 woordenlinks"
      ).value;
      const uploadValueLinks = value.find(
        (item) => item.key === "Uploadlinks"
      ).value;

      const gravureMidden = value.find(
        (item) => item.key === "Gravuremidden"
      ).value;
      const initialenValueMidden = value.find(
        (item) => item.key === "Initialenmidden"
      ).value;
      const datumValueMidden = value.find(
        (item) => item.key === "Datummidden"
      ).value;
      const naamValueMidden = value.find(
        (item) => item.key === "Naammidden"
      ).value;
      const woord1ValueMidden = value.find(
        (item) => item.key === "1 woordmidden"
      ).value;
      const woord2ValueMidden = value.find(
        (item) => item.key === "2 woordenmidden"
      ).value;
      const woord3ValueMidden = value.find(
        (item) => item.key === "3 woordenmidden"
      ).value;
      const woord4ValueMidden = value.find(
        (item) => item.key === "4 woordenmidden"
      ).value;
      const uploadValueMidden = value.find(
        (item) => item.key === "Uploadmidden"
      ).value;

      const gravureRechts = value.find(
        (item) => item.key === "Gravurerechts"
      ).value;
      const initialenValueRechts = value.find(
        (item) => item.key === "Initialenrechts"
      ).value;
      const datumValueRechts = value.find(
        (item) => item.key === "Datumrechts"
      ).value;
      const naamValueRechts = value.find(
        (item) => item.key === "Naamrechts"
      ).value;
      const woord1ValueRechts = value.find(
        (item) => item.key === "1 woordrechts"
      ).value;
      const woord2ValueRechts = value.find(
        (item) => item.key === "2 woordenrechts"
      ).value;
      const woord3ValueRechts = value.find(
        (item) => item.key === "3 woordenrechts"
      ).value;
      const woord4ValueRechts = value.find(
        (item) => item.key === "4 woordenrechts"
      ).value;
      const uploadValueRechts = value.find(
        (item) => item.key === "Uploadrechts"
      ).value;

      const gravureAchter = value.find(
        (item) => item.key === "Gravureachter"
      ).value;
      const initialenValueAchter = value.find(
        (item) => item.key === "Initialenachter"
      ).value;
      const datumValueAchter = value.find(
        (item) => item.key === "Datumachter"
      ).value;
      const naamValueAchter = value.find(
        (item) => item.key === "Naamachter"
      ).value;
      const woord1ValueAchter = value.find(
        (item) => item.key === "1 woordachter"
      ).value;
      const woord2ValueAchter = value.find(
        (item) => item.key === "2 woordenachter"
      ).value;
      const woord3ValueAchter = value.find(
        (item) => item.key === "3 woordenachter"
      ).value;
      const woord4ValueAchter = value.find(
        (item) => item.key === "4 woordenachter"
      ).value;
      const uploadValueAchter = value.find(
        (item) => item.key === "Uploadachter"
      ).value;

      const lettertypeValue = value.find(
        (item) => item.key === "Lettertype"
      ).value;

      const extraWoordLinks = values.find(
        (item) => item.key === "Extrawoordlinks"
      ).value;
      const extraWoordMidden = values.find(
        (item) => item.key === "Extrawoordmidden"
      ).value;
      const extraWoordRechts = values.find(
        (item) => item.key === "Extrawoordrechts"
      ).value;
      const extraWoordAchter = values.find(
        (item) => item.key === "Extrawoordachter"
      ).value;

      switch (gravureLinks) {
        case "Initialen/letters/tekens":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (initialenValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Initialenlinks"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else if (initialenValueLinks.length > 6) {
            setError((prevState) => ({
              ...prevState,
              ["Initialenlinks"]: "* Gebruik maximaal 6 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Initialenlinks"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Naamlinks"]: "",
            ["Datumlinks"]: "",
            ["Gravurelinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Woord4links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "Geen":
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Extrawoordlinks"]: "",
            // ["lettertypeLinks"]: "",
            ["Naamlinks"]: "",
            ["Datumlinks"]: "",
            ["Gravurelinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Woord4links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          // setError((prevState) => ({
          //   ...prevState,
          //   ["Gravurelinks"]: "",
          //   ["Initialenlinks"]: "",
          //   ["Naamlinks"]: "",
          //   ["Datumlinks"]: "",
          //   ["Gravurelinks"]: "",
          //   ["Woord1links"]: "",
          //   ["Woord3links"]: "",
          //   ["Woord4links"]: "",
          //   // ["lettertypeLinks"]: "",
          // }));
          if (extraWoordLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Extrawoordlinks"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Extrawoordlinks"]: "",
            }));
            if (extraWoordLinks == "1 extra woord") {
              if (woord1ValueLinks == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1links"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1ValueLinks.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1links"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1ValueLinks.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1links"]: "* Gebruik maximaal 11 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1links"]: "",
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
                ["Gravurelinks"]: "",
                ["Extrawoordlinks"]: "",
                ["Initialenlinks"]: "",
                ["Naamlinks"]: "",
                ["Datumlinks"]: "",
                ["Gravurelinks"]: "",
                // ["Woord1links"]: "",
                ["Woord2links"]: "",
                ["Woord3links"]: "",
                ["Woord4links"]: "",
                ["Uploadlinks"]: "",
              }));
            } else if (extraWoordLinks == "2 extra woorden") {
              if (woord2ValueLinks == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2links"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2ValueLinks.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2links"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2ValueLinks.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2links"]: "* Gebruik maximaal 18 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2links"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["Gravurelinks"]: "",
                ["Extrawoordlinks"]: "",
                ["Initialenlinks"]: "",
                ["Naamlinks"]: "",
                ["Datumlinks"]: "",
                ["Gravurelinks"]: "",
                ["Woord1links"]: "",
                ["Woord3links"]: "",
                ["Woord4links"]: "",
                ["Uploadlinks"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Gravurelinks"]: "",
                ["Extrawoordlinks"]: "",
                ["Initialenlinks"]: "",
                ["Naamlinks"]: "",
                ["Datumlinks"]: "",
                ["Gravurelinks"]: "",
                ["Woord1links"]: "",
                ["Woord2links"]: "",
                ["Woord3links"]: "",
                ["Woord4Links"]: "",
                ["Uploadlinks"]: "",
              }));
            }
          }

          break;
        case "Datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (datumValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datumlinks"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datumlinks"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Naamlinks"]: "",
            ["Gravurelinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Woord4Links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "Naam":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (naamValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamlinks"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamlinks"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Datumlinks"]: "",
            ["Gravurelinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Woord4Links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "Naam en datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (naamValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamlinks"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamlinks"]: "",
            }));
          }
          if (datumValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datumlinks"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datumlinks"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Gravurelinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Woord4links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "1 woord":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (woord1ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord1links"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueLinks.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1links"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueLinks.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1links"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord1links"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Naamlinks"]: "",
            ["Datumlinks"]: "",
            ["Gravurelinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Woord4links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "2 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (woord2ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord2links"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueLinks.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2links"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueLinks.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2links"]: "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord2links"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Naamlinks"]: "",
            ["Datumlinks"]: "",
            ["Gravurelinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Woord1links"]: "",
            ["Woord3links"]: "",
            ["Woord4links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "3 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (woord3ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord3links"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueLinks.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3links"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueLinks.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3links"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord3links"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Naamlinks"]: "",
            ["Datumlinks"]: "",
            ["Gravurelinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord4links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "4 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadlinks"]: "",
          }));
          if (woord4ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord4links"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueLinks.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4links"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueLinks.split(" ").length > 4) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4links"]:
                "Dit veld mag niet meer dan drie spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord4links"]: "",
            }));
          }
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurelinks"]: "",
            ["Initialenlinks"]: "",
            ["Naamlinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Datumlinks"]: "",
            ["Gravurelinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Uploadlinks"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueLinks == "" || uploadValueLinks == null) {
            setError((prevState) => ({
              ...prevState,
              ["Uploadlinks"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Uploadlinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Initialenlinks"]: "",
            ["Naamlinks"]: "",
            ["Datumlinks"]: "",
            ["Extrawoordlinks"]: "",
            ["Woord1links"]: "",
            ["Woord2links"]: "",
            ["Woord3links"]: "",
            ["Woord4links"]: "",
            // ["lettertypeLinks"]: "",
          }));
          break;
        default:
          if (
            gravureLinks == "" &&
            checkmark.find((item) => item.name === "Links").status
          ) {
            setError((prevState) => ({
              ...prevState,
              ["Gravurelinks"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Gravurelinks"]: "",
            }));
          }
      }

      switch (gravureMidden) {
        case "Initialen/letters/tekens":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (initialenValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Initialenmidden"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else if (initialenValueMidden.length > 6) {
            setError((prevState) => ({
              ...prevState,
              ["Initialenmidden"]: "* Gebruik maximaal 6 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Initialenmidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Naammidden"]: "",
            ["Datummidden"]: "",
            ["Gravuremidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "Geen":
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Extrawoordmidden"]: "",
            // ["lettertypeMidden"]: "",
            ["Naammidden"]: "",
            ["Datummidden"]: "",
            ["Gravuremidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          // setError((prevState) => ({
          //   ...prevState,
          //   ["Gravuremidden"]: "",
          //   ["Initialenmidden"]: "",
          //   ["Naammidden"]: "",
          //   ["Datummidden"]: "",
          //   ["Gravuremidden"]: "",
          //   ["Woord1midden"]: "",
          //   ["Woord3midden"]: "",
          //   ["Woord4midden"]: "",
          //   // ["lettertypeMidden"]: "",
          // }));
          if (extraWoordMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "",
            }));
            if (extraWoordMidden == "1 extra woord") {
              if (woord1ValueMidden == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1midden"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1ValueMidden.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1midden"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1ValueMidden.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1midden"]: "* Gebruik maximaal 11 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1midden"]: "",
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
                ["Gravuremidden"]: "",
                ["Extrawoordmidden"]: "",
                ["Initialenmidden"]: "",
                ["Naammidden"]: "",
                ["Datummidden"]: "",
                ["Gravuremidden"]: "",
                // ["Woord1midden"]: "",
                ["Woord2midden"]: "",
                ["Woord3midden"]: "",
                ["Woord4midden"]: "",
                ["Uploadmidden"]: "",
              }));
            } else if (extraWoordMidden == "2 extra woorden") {
              if (woord2ValueMidden == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2midden"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2ValueMidden.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2midden"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2ValueMidden.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2midden"]: "* Gebruik maximaal 18 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2midden"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["Gravuremidden"]: "",
                ["Extrawoordmidden"]: "",
                ["Initialenmidden"]: "",
                ["Naammidden"]: "",
                ["Datummidden"]: "",
                ["Gravuremidden"]: "",
                ["Woord1midden"]: "",
                ["Woord3midden"]: "",
                ["Woord4midden"]: "",
                ["Uploadmidden"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Gravuremidden"]: "",
                ["Extrawoordmidden"]: "",
                ["Initialenmidden"]: "",
                ["Naammidden"]: "",
                ["Datummidden"]: "",
                ["Gravuremidden"]: "",
                ["Woord1midden"]: "",
                ["Woord2midden"]: "",
                ["Woord3midden"]: "",
                ["Woord4midden"]: "",
                ["Uploadmidden"]: "",
              }));
            }
          }

          break;
        case "Datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (datumValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datummidden"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datummidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Naammidden"]: "",
            ["Gravuremidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "Naam":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (naamValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naammidden"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naammidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Datummidden"]: "",
            ["Gravuremidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "Naam en datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (naamValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naammidden"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naammidden"]: "",
            }));
          }
          if (datumValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datummidden"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datummidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Gravuremidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "1 woord":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (woord1ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord1midden"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueMidden.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1midden"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueMidden.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1midden"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord1midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Naammidden"]: "",
            ["Datummidden"]: "",
            ["Gravuremidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "2 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (woord2ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord2midden"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueMidden.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2midden"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueMidden.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2midden"]:
                "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord2midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Naammidden"]: "",
            ["Datummidden"]: "",
            ["Gravuremidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Woord1midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "3 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (woord3ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord3midden"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueMidden.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3midden"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueMidden.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3midden"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord3midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Naammidden"]: "",
            ["Datummidden"]: "",
            ["Gravuremidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord4midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "4 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadmidden"]: "",
          }));
          if (woord4ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord4midden"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueMidden.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4midden"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueMidden.split(" ").length > 4) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4midden"]:
                "Dit veld mag niet meer dan drie spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord4midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravuremidden"]: "",
            ["Initialenmidden"]: "",
            ["Naammidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Datummidden"]: "",
            ["Gravuremidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Uploadmidden"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueMidden == "" || uploadValueMidden == null) {
            setError((prevState) => ({
              ...prevState,
              ["Uploadmidden"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Uploadmidden"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Initialenmidden"]: "",
            ["Naammidden"]: "",
            ["Datummidden"]: "",
            ["Extrawoordmidden"]: "",
            ["Woord1midden"]: "",
            ["Woord2midden"]: "",
            ["Woord3midden"]: "",
            ["Woord4midden"]: "",
            // ["lettertypeMidden"]: "",
          }));
          break;
        default:
          if (
            gravureMidden == "" &&
            checkmark.find((item) => item.name === "Midden").status
          ) {
            setError((prevState) => ({
              ...prevState,
              ["Gravuremidden"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Gravuremidden"]: "",
            }));
          }
      }

      switch (gravureRechts) {
        case "Initialen/letters/tekens":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (initialenValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Initialenrechts"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else if (initialenValueRechts.length > 6) {
            setError((prevState) => ({
              ...prevState,
              ["Initialenrechts"]: "* Gebruik maximaal 6 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Initialenrechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Naamrechts"]: "",
            ["Datumrechts"]: "",
            ["Gravurerechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "Geen":
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Extrawoordrechts"]: "",
            // ["lettertypeRechts"]: "",
            ["Naamrechts"]: "",
            ["Datumrechts"]: "",
            ["Gravurerechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          // setError((prevState) => ({
          //   ...prevState,
          //   ["Gravurerechts"]: "",
          //   ["Initialenrechts"]: "",
          //   ["Naamrechts"]: "",
          //   ["Datumrechts"]: "",
          //   ["Gravurerechts"]: "",
          //   ["Woord1rechts"]: "",
          //   ["Woord3rechts"]: "",
          //   ["Woord4rechts"]: "",
          //   // ["lettertypeRechts"]: "",
          // }));
          if (extraWoordRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "",
            }));
            if (extraWoordRechts == "1 extra woord") {
              if (woord1ValueRechts == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1rechts"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1ValueRechts.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1rechts"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1ValueRechts.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1rechts"]: "* Gebruik maximaal 11 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1rechts"]: "",
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
                ["Gravurerechts"]: "",
                ["Extrawoordrechts"]: "",
                ["Initialenrechts"]: "",
                ["Naamrechts"]: "",
                ["Datumrechts"]: "",
                ["Gravurerechts"]: "",
                // ["Woord1rechts"]: "",
                ["Woord2rechts"]: "",
                ["Woord3rechts"]: "",
                ["Woord4rechts"]: "",
                ["Uploadrechts"]: "",
              }));
            } else if (extraWoordRechts == "2 extra woorden") {
              if (woord2ValueRechts == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2rechts"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2ValueRechts.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2rechts"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2ValueRechts.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2rechts"]: "* Gebruik maximaal 18 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2rechts"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["Gravurerechts"]: "",
                ["Extrawoordrechts"]: "",
                ["Initialenrechts"]: "",
                ["Naamrechts"]: "",
                ["Datumrechts"]: "",
                ["Gravurerechts"]: "",
                ["Woord1rechts"]: "",
                ["Woord3rechts"]: "",
                ["Woord4rechts"]: "",
                ["Uploadrechts"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Gravurerechts"]: "",
                ["Extrawoordrechts"]: "",
                ["Initialenrechts"]: "",
                ["Naamrechts"]: "",
                ["Datumrechts"]: "",
                ["Gravurerechts"]: "",
                ["Woord1rechts"]: "",
                ["Woord2rechts"]: "",
                ["Woord3rechts"]: "",
                ["Woord4rechts"]: "",
                ["Uploadrechts"]: "",
              }));
            }
          }

          break;
        case "Datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (datumValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datumrechts"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datumrechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Naamrechts"]: "",
            ["Gravurerechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "Naam":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (naamValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamrechts"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamrechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Datumrechts"]: "",
            ["Gravurerechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "Naam en datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (naamValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamrechts"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamrechts"]: "",
            }));
          }
          if (datumValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datumrechts"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datumrechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Gravurerechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "1 woord":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (woord1ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord1rechts"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueRechts.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1rechts"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueRechts.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1rechts"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord1rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Naamrechts"]: "",
            ["Datumrechts"]: "",
            ["Gravurerechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "2 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (woord2ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord2rechts"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueRechts.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2rechts"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueRechts.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2rechts"]:
                "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord2rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Naamrechts"]: "",
            ["Datumrechts"]: "",
            ["Gravurerechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "3 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (woord3ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord3rechts"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueRechts.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3rechts"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueRechts.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3rechts"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord3rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Naamrechts"]: "",
            ["Datumrechts"]: "",
            ["Gravurerechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord4rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "4 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadrechts"]: "",
          }));
          if (woord4ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord4rechts"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueRechts.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4rechts"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueRechts.split(" ").length > 4) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4rechts"]:
                "Dit veld mag niet meer dan drie spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord4rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravurerechts"]: "",
            ["Initialenrechts"]: "",
            ["Naamrechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Datumrechts"]: "",
            ["Gravurerechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Uploadrechts"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueRechts == "" || uploadValueRechts == null) {
            setError((prevState) => ({
              ...prevState,
              ["Uploadrechts"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Uploadrechts"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Initialenrechts"]: "",
            ["Naamrechts"]: "",
            ["Datumrechts"]: "",
            ["Extrawoordrechts"]: "",
            ["Woord1rechts"]: "",
            ["Woord2rechts"]: "",
            ["Woord3rechts"]: "",
            ["Woord4rechts"]: "",
            // ["lettertypeRechts"]: "",
          }));
          break;
        default:
          if (
            gravureRechts == "" &&
            checkmark.find((item) => item.name === "Rechts").status
          ) {
            setError((prevState) => ({
              ...prevState,
              ["Gravurerechts"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Gravurerechts"]: "",
            }));
          }
      }

      switch (gravureAchter) {
        case "Initialen/letters/tekens":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (initialenValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Initialenachter"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else if (initialenValueAchter.length > 6) {
            setError((prevState) => ({
              ...prevState,
              ["Initialenachter"]: "* Gebruik maximaal 6 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Initialenachter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Extrawoordachter"]: "",
            ["Naamachter"]: "",
            ["Datumachter"]: "",
            ["Gravureachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "Geen":
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Extrawoordachter"]: "",
            // ["lettertypeAchter"]: "",
            ["Naamachter"]: "",
            ["Datumachter"]: "",
            ["Gravureachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          // setError((prevState) => ({
          //   ...prevState,
          //   ["Gravureachter"]: "",
          //   ["Initialenachter"]: "",
          //   ["Naamachter"]: "",
          //   ["Datumachter"]: "",
          //   ["Gravureachter"]: "",
          //   ["Woord1achter"]: "",
          //   ["Woord3achter"]: "",
          //   ["Woord4achter"]: "",
          //   // ["lettertypeAchter"]: "",
          // }));
          if (extraWoordAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "",
            }));
            if (extraWoordAchter == "1 extra woord") {
              if (woord1ValueAchter == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1achter"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1ValueAchter.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1achter"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1ValueAchter.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1achter"]: "* Gebruik maximaal 11 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord1achter"]: "",
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
                ["Gravureachter"]: "",
                ["Extrawoordachter"]: "",
                ["Initialenachter"]: "",
                ["Naamachter"]: "",
                ["Datumachter"]: "",
                ["Gravureachter"]: "",
                // ["Woord1achter"]: "",
                ["Woord2achter"]: "",
                ["Woord3achter"]: "",
                ["Woord4achter"]: "",
                ["Uploadachter"]: "",
              }));
            } else if (extraWoordAchter == "2 extra woorden") {
              if (woord2ValueAchter == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2achter"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2ValueAchter.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2achter"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2ValueAchter.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2achter"]: "* Gebruik maximaal 18 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["Woord2achter"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["Gravureachter"]: "",
                ["Extrawoordachter"]: "",
                ["Initialenachter"]: "",
                ["Naamachter"]: "",
                ["Datumachter"]: "",
                ["Gravureachter"]: "",
                ["Woord1achter"]: "",
                ["Woord3achter"]: "",
                ["Woord4achter"]: "",
                ["Uploadachter"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Gravureachter"]: "",
                ["Extrawoordachter"]: "",
                ["Initialenachter"]: "",
                ["Naamachter"]: "",
                ["Datumachter"]: "",
                ["Gravureachter"]: "",
                ["Woord1achter"]: "",
                ["Woord2achter"]: "",
                ["Woord3achter"]: "",
                ["Woord4achter"]: "",
                ["Uploadachter"]: "",
              }));
            }
          }

          break;
        case "Datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (datumValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datumachter"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datumachter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Naamachter"]: "",
            ["Gravureachter"]: "",
            ["Extrawoordachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "Naam":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (naamValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamachter"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamachter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Datumachter"]: "",
            ["Gravureachter"]: "",
            ["Extrawoordachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "Naam en datum":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (naamValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamachter"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamachter"]: "",
            }));
          }
          if (datumValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Datumachter"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Datumachter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Gravureachter"]: "",
            ["Extrawoordachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "1 woord":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (woord1ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord1achter"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueAchter.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1achter"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueAchter.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["Woord1achter"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord1achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Naamachter"]: "",
            ["Datumachter"]: "",
            ["Gravureachter"]: "",
            ["Extrawoordachter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "2 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (woord2ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord2achter"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueAchter.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2achter"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueAchter.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["Woord2achter"]:
                "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord2achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Naamachter"]: "",
            ["Datumachter"]: "",
            ["Gravureachter"]: "",
            ["Extrawoordachter"]: "",
            ["Woord1achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "3 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (woord3ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord3achter"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueAchter.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3achter"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueAchter.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["Woord3achter"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord3achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Naamachter"]: "",
            ["Datumachter"]: "",
            ["Gravureachter"]: "",
            ["Extrawoordachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord4achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "4 woorden":
          setError((prevState) => ({
            ...prevState,
            ["Uploadachter"]: "",
          }));
          if (woord4ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["Woord4achter"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueAchter.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4achter"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueAchter.split(" ").length > 4) {
            setError((prevState) => ({
              ...prevState,
              ["Woord4achter"]:
                "Dit veld mag niet meer dan drie spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Woord4achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["Gravureachter"]: "",
            ["Initialenachter"]: "",
            ["Naamachter"]: "",
            ["Extrawoordachter"]: "",
            ["Datumachter"]: "",
            ["Gravureachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Uploadachter"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueAchter == "" || uploadValueAchter == null) {
            setError((prevState) => ({
              ...prevState,
              ["Uploadachter"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Uploadachter"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["Initialenachter"]: "",
            ["Naamachter"]: "",
            ["Datumachter"]: "",
            ["Extrawoordachter"]: "",
            ["Woord1achter"]: "",
            ["Woord2achter"]: "",
            ["Woord3achter"]: "",
            ["Woord4achter"]: "",
            // ["lettertypeAchter"]: "",
          }));
          break;
        default:
          if (
            gravureAchter == "" &&
            checkmark.find((item) => item.name === "Achter").status
          ) {
            setError((prevState) => ({
              ...prevState,
              ["Gravureachter"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Gravureachter"]: "",
            }));
          }
      }

      // Lettertype check
      if (
        gravureLinks == "Initialen/letters/tekens" ||
        gravureLinks == "Naam" ||
        gravureLinks == "Naam en datum" ||
        gravureLinks == "Datum" ||
        gravureLinks == "1 woord" ||
        gravureLinks == "2 woorden" ||
        gravureLinks == "3 woorden" ||
        gravureLinks == "4 woorden" ||
        gravureMidden == "Initialen/letters/tekens" ||
        gravureMidden == "Naam" ||
        gravureMidden == "Naam en datum" ||
        gravureMidden == "Datum" ||
        gravureMidden == "1 woord" ||
        gravureMidden == "2 woorden" ||
        gravureMidden == "3 woorden" ||
        gravureMidden == "4 woorden" ||
        gravureRechts == "Initialen/letters/tekens" ||
        gravureRechts == "Naam" ||
        gravureRechts == "Naam en datum" ||
        gravureRechts == "Datum" ||
        gravureRechts == "1 woord" ||
        gravureRechts == "2 woorden" ||
        gravureRechts == "3 woorden" ||
        gravureRechts == "4 woorden" ||
        gravureAchter == "Initialen/letters/tekens" ||
        gravureAchter == "Naam" ||
        gravureAchter == "Naam en datum" ||
        gravureAchter == "Datum" ||
        gravureAchter == "1 woord" ||
        gravureAchter == "2 woorden" ||
        gravureAchter == "3 woorden" ||
        gravureAchter == "4 woorden"
      ) {
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
      }

      if (
        gravureLinks == "Geen tekst" ||
        gravureLinks == "Initialen/letters/tekens" ||
        gravureLinks == "Hartje ♥ symbool" ||
        gravureLinks == "Infinity ∞ teken" ||
        gravureLinks == "Naam en datum" ||
        gravureLinks == "Naam" ||
        gravureLinks == "Datum" ||
        gravureLinks == "1 woord" ||
        gravureLinks == "2 woorden" ||
        gravureLinks == "3 woorden" ||
        gravureLinks == "4 woorden" ||
        gravureLinks == "Voet/handafdruk" ||
        gravureLinks == "Poot/snuitafdruk" ||
        gravureLinks == "Echo" ||
        gravureLinks == "Vingerafdruk" ||
        gravureLinks == "Logo/handtekening" ||
        gravureLinks == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["Gravurelinks"]: "",
        }));
      }
      if (
        gravureMidden == "Geen tekst" ||
        gravureMidden == "Initialen/letters/tekens" ||
        gravureMidden == "Hartje ♥ symbool" ||
        gravureMidden == "Infinity ∞ teken" ||
        gravureMidden == "Naam en datum" ||
        gravureMidden == "Naam" ||
        gravureMidden == "Datum" ||
        gravureMidden == "1 woord" ||
        gravureMidden == "2 woorden" ||
        gravureMidden == "3 woorden" ||
        gravureMidden == "4 woorden" ||
        gravureMidden == "Voet/handafdruk" ||
        gravureMidden == "Poot/snuitafdruk" ||
        gravureMidden == "Echo" ||
        gravureMidden == "Vingerafdruk" ||
        gravureMidden == "Logo/handtekening" ||
        gravureMidden == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["Gravuremidden"]: "",
        }));
      }
      if (
        gravureRechts == "Geen tekst" ||
        gravureRechts == "Initialen/letters/tekens" ||
        gravureRechts == "Hartje ♥ symbool" ||
        gravureRechts == "Infinity ∞ teken" ||
        gravureRechts == "Naam en datum" ||
        gravureRechts == "Naam" ||
        gravureRechts == "Datum" ||
        gravureRechts == "1 woord" ||
        gravureRechts == "2 woorden" ||
        gravureRechts == "3 woorden" ||
        gravureRechts == "4 woorden" ||
        gravureRechts == "Voet/handafdruk" ||
        gravureRechts == "Poot/snuitafdruk" ||
        gravureRechts == "Echo" ||
        gravureRechts == "Vingerafdruk" ||
        gravureRechts == "Logo/handtekening" ||
        gravureRechts == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["Gravurerechts"]: "",
        }));
      }
      if (
        gravureAchter == "Geen tekst" ||
        gravureAchter == "Initialen/letters/tekens" ||
        gravureAchter == "Hartje ♥ symbool" ||
        gravureAchter == "Infinity ∞ teken" ||
        gravureAchter == "Naam en datum" ||
        gravureAchter == "Naam" ||
        gravureAchter == "Datum" ||
        gravureAchter == "1 woord" ||
        gravureAchter == "2 woorden" ||
        gravureAchter == "3 woorden" ||
        gravureAchter == "4 woorden" ||
        gravureAchter == "Voet/handafdruk" ||
        gravureAchter == "Poot/snuitafdruk" ||
        gravureAchter == "Echo" ||
        gravureAchter == "Vingerafdruk" ||
        gravureAchter == "Logo/handtekening" ||
        gravureAchter == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["Gravureachter"]: "",
        }));
      }
    }
  }, [value]);

  useEffect(() => {
    if (!error) return;

    const allValuescorrect = Object.values(error).every(
      (value) => value === ""
    );
    if (allValuescorrect) {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["positie"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["positie"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "Gravurelinks",
      value: value?.gravureLinks?.value || "",
    },
    { key: "Initialenlinks", value: value?.initialenLinks?.value || "" },
    { key: "Datumlinks", value: value?.datumLinks?.value || "" },
    { key: "Naamlinks", value: value?.naamLinks?.value || "" },
    { key: "1 woordlinks", value: value?.woord1Links?.value || "" },
    { key: "2 woordenlinks", value: value?.woord2Links?.value || "" },
    { key: "3 woordenlinks", value: value?.woord3Links?.value || "" },
    { key: "4 woordenlinks", value: value?.woord4Links?.value || "" },
    { key: "Uploadlinks", value: value?.uploadLinks?.value || "" },
    { key: "Extrawoordlinks", value: value?.extraWoordLinks?.value || "" },
    {
      key: "Gravuremidden",
      value: value?.gravureMidden?.value || "",
    },
    { key: "Initialenmidden", value: value?.initialenMidden?.value || "" },
    { key: "Datummidden", value: value?.datumMidden?.value || "" },
    { key: "Naammidden", value: value?.naamMidden?.value || "" },
    { key: "1 woordmidden", value: value?.woord1Midden?.value || "" },
    { key: "2 woordenmidden", value: value?.woord2Midden?.value || "" },
    { key: "3 woordenmidden", value: value?.woord3Midden?.value || "" },
    { key: "4 woordenmidden", value: value?.woord4Midden?.value || "" },
    { key: "Uploadmidden", value: value?.uploadMidden?.value || "" },
    { key: "Extrawoordmidden", value: value?.extraWoordMidden?.value || "" },
    {
      key: "Gravurerechts",
      value: value?.gravureRechts?.value || "",
    },
    { key: "Initialenrechts", value: value?.initialenRechts?.value || "" },
    { key: "Datumrechts", value: value?.datumRechts?.value || "" },
    { key: "Naamrechts", value: value?.naamRechts?.value || "" },
    { key: "1 woordrechts", value: value?.woord1Rechts?.value || "" },
    { key: "2 woordenrechts", value: value?.woord2Rechts?.value || "" },
    { key: "3 woordenrechts", value: value?.woord3Rechts?.value || "" },
    { key: "4 woordenrechts", value: value?.woord4Rechts?.value || "" },
    { key: "Uploadrechts", value: value?.uploadRechts?.value || "" },
    { key: "Extrawoordrechts", value: value?.extraWoordRechts?.value || "" },
    {
      key: "Gravureachter",
      value: value?.gravureAchter?.value || "",
    },
    { key: "Initialenachter", value: value?.initialenAchter?.value || "" },
    { key: "Datumachter", value: value?.datumAchter?.value || "" },
    { key: "Naamachter", value: value?.naamAchter?.value || "" },
    { key: "1 woordachter", value: value?.woord1Achter?.value || "" },
    { key: "2 woordenachter", value: value?.woord2Achter?.value || "" },
    { key: "3 woordenachter", value: value?.woord3Achter?.value || "" },
    { key: "4 woordenachter", value: value?.woord4Achter?.value || "" },
    { key: "Uploadachter", value: value?.uploadAchter?.value || "" },
    { key: "Extrawoordachter", value: value?.extraWoordAchter?.value || "" },

    { key: "Lettertype", value: value?.lettertype?.value || "" },
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

  const gravureLinks = values.find((item) => item.key === "Gravurelinks").value;
  const gravureMidden = values.find(
    (item) => item.key === "Gravuremidden"
  ).value;
  const gravureRechts = values.find(
    (item) => item.key === "Gravurerechts"
  ).value;
  const gravureAchter = values.find(
    (item) => item.key === "Gravureachter"
  ).value;

  const extraWoordLinks = values.find(
    (item) => item.key === "Extrawoordlinks"
  ).value;
  const extraWoordMidden = values.find(
    (item) => item.key === "Extrawoordmidden"
  ).value;
  const extraWoordRechts = values.find(
    (item) => item.key === "Extrawoordrechts"
  ).value;
  const extraWoordAchter = values.find(
    (item) => item.key === "Extrawoordachter"
  ).value;

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center text-sm mb-2">
          <span className="font-bold min-w-[140px]">Positie: </span>
        </div>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormGroup>
            {checkmark.map((option, index) => (
              <div key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.status}
                      onChange={(e) => handleCheckmarkChange(option.name, e)}
                      value={option.name}
                      sx={{ "&.Mui-checked": { color: "#222" } }}
                    />
                  }
                  label={option.name == "Achter" ? "Achterzijde" : option.name}
                />
              </div>
            ))}
          </FormGroup>
        </RadioGroup>
      </div>
      {checkmark.map((option, index) => {
        if (option.status) {
          const gravureOption =
            values.find(
              (item) => item.key === `Gravure${option.name.toLowerCase()}`
            )?.value || "";
          return (
            <div className="flex flex-col gap-6" key={option.name}>
              <div className="relative">
                {showErrors && (
                  <p className="absolute  -bottom-6 left-0 text-red-700">
                    {error[`Gravure${option.name.toLowerCase()}`]}
                  </p>
                )}
                <InputSelect
                  value={gravureOption}
                  onChange={(newTekstValue) => {
                    handleChange(
                      `Gravure${option.name.toLowerCase()}`,
                      newTekstValue
                    );
                  }}
                  title={`Gravure ${option.name.toLowerCase()}: `}
                  options={gravureOptions}
                />
              </div>
              {(gravureOption == "Hartje ♥ symbool" ||
                gravureOption == "Infinity ∞ teken") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Extrawoord${option.name}`]}
                    </p>
                  )}
                  <InputSelect
                    value={
                      values.find(
                        (item) =>
                          item.key === `Extrawoord${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(newExtraWoordValue) =>
                      handleChange(
                        `Extrawoord${option.name.toLowerCase()}`,
                        newExtraWoordValue
                      )
                    }
                    title={`Extra woorden ${option.name.toLowerCase()}:`}
                    options={extraWoordenOptions}
                  />
                </div>
              )}
              {gravureOption == "Initialen/letters/tekens" && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Initialen${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find(
                        (item) =>
                          item.key === `Initialen${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(newInitialenValue) =>
                      handleChange(
                        `Initialen${option.name.toLowerCase()}`,
                        newInitialenValue
                      )
                    }
                    title="Initialen/letters/tekens:"
                  />
                </div>
              )}
              {(gravureOption == "Naam" ||
                gravureOption == "Naam en datum") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Naam${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find(
                        (item) =>
                          item.key === `Naam${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(newNaamValue) =>
                      handleChange(
                        `Naam${option.name.toLowerCase()}`,
                        newNaamValue
                      )
                    }
                    title="Naam:"
                  />
                </div>
              )}
              {(gravureOption == "Datum" ||
                gravureOption == "Naam en datum") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Datum${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputDate
                    value={
                      values.find(
                        (item) =>
                          item.key === `Datum${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(newDateValue) =>
                      handleChange(
                        `Datum${option.name.toLowerCase()}`,
                        newDateValue
                      )
                    }
                    title="Datum:"
                  />
                </div>
              )}
              {(gravureOption == "1 woord" ||
                values.find(
                  (item) =>
                    item.key === `Extrawoord${option.name.toLowerCase()}`
                )?.value == "1 extra woord") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Woord1${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find(
                        (item) =>
                          item.key === `1 woord${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(new1WoordValue) =>
                      handleChange(
                        `1 woord${option.name.toLowerCase()}`,
                        new1WoordValue
                      )
                    }
                    title="1 Woord:"
                  />
                </div>
              )}

              {(gravureOption == "2 woorden" ||
                values.find(
                  (item) =>
                    item.key === `Extrawoord${option.name.toLowerCase()}`
                )?.value == "2 extra woorden") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Woord2${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find(
                        (item) =>
                          item.key === `2 woorden${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(new2WoordenValue) =>
                      handleChange(
                        `2 woorden${option.name.toLowerCase()}`,
                        new2WoordenValue
                      )
                    }
                    title="2 Woorden:"
                  />
                </div>
              )}
              {gravureOption == "3 woorden" && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Woord3${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find(
                        (item) =>
                          item.key === `3 woorden${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(new3WoordenValue) =>
                      handleChange(
                        `3 woorden${option.name.toLowerCase()}`,
                        new3WoordenValue
                      )
                    }
                    title="3 Woorden:"
                  />
                </div>
              )}
              {gravureOption == "4 woorden" && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Woord4${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find(
                        (item) =>
                          item.key === `4 woorden${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                    onChange={(new4WoordenValue) =>
                      handleChange(
                        `4 woorden${option.name.toLowerCase()}`,
                        new4WoordenValue
                      )
                    }
                    title="4 Woorden:"
                  />
                </div>
              )}

              {(gravureOption == "Voet/handafdruk" ||
                gravureOption == "Poot/snuitafdruk" ||
                gravureOption == "snuitafdruk" ||
                gravureOption == "Echo" ||
                gravureOption == "Vingerafdruk" ||
                gravureOption == "Logo/handtekening" ||
                gravureOption == "Twee vingerafdrukken in hartvorm") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`Upload${option.name.toLowerCase()}`]}
                    </p>
                  )}
                  <InputFile
                    id={`Upload${option.name.toLowerCase()}`}
                    setError={setError}
                    title="Bestand toevoegen:"
                    onChange={handleChange}
                    value={
                      values.find(
                        (item) =>
                          item.key === `Upload${option.name.toLowerCase()}`
                      )?.value || ""
                    }
                  />
                </div>
              )}
            </div>
          );
        }
      })}
      {(gravureLinks == "Initialen/letters/tekens" ||
        gravureLinks == "Naam" ||
        gravureLinks == "Naam en datum" ||
        gravureLinks == "Datum" ||
        gravureLinks == "1 woord" ||
        gravureLinks == "2 woorden" ||
        gravureLinks == "3 woorden" ||
        gravureLinks == "4 woorden" ||
        gravureMidden == "Initialen/letters/tekens" ||
        gravureMidden == "Naam" ||
        gravureMidden == "Naam en datum" ||
        gravureMidden == "Datum" ||
        gravureMidden == "1 woord" ||
        gravureMidden == "2 woorden" ||
        gravureMidden == "3 woorden" ||
        gravureMidden == "4 woorden" ||
        gravureRechts == "Initialen/letters/tekens" ||
        gravureRechts == "Naam" ||
        gravureRechts == "Naam en datum" ||
        gravureRechts == "Datum" ||
        gravureRechts == "1 woord" ||
        gravureRechts == "2 woorden" ||
        gravureRechts == "3 woorden" ||
        gravureRechts == "4 woorden" ||
        gravureAchter == "Initialen/letters/tekens" ||
        gravureAchter == "Naam" ||
        gravureAchter == "Naam en datum" ||
        gravureAchter == "Datum" ||
        gravureAchter == "1 woord" ||
        gravureAchter == "2 woorden" ||
        gravureAchter == "3 woorden" ||
        gravureAchter == "4 woorden" ||
        extraWoordLinks == "1 extra woord" ||
        extraWoordLinks == "2 extra woorden" ||
        extraWoordMidden == "1 extra woord" ||
        extraWoordMidden == "2 extra woorden" ||
        extraWoordRechts == "1 extra woord" ||
        extraWoordRechts == "2 extra woorden" ||
        extraWoordAchter == "1 extra woord" ||
        extraWoordAchter == "2 extra woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6  left-0 text-red-700">
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
