"use client";

import { useState, useEffect } from "react";

import InputFile from "@/components/InputFile";

export default function Upload({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  const [values, setValues] = useState([
    { key: "Upload", value: value?.Upload?.value || "" },
  ]);

  useEffect(() => {
    if (values[0].value == null) {
      setError("* Upload een afbeelding");
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Upload"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Upload"]: false,
      }));
    }
  }, [values]);

  const handleChange = (changedKey, newValue) => {
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(newValue, "Upload");
  };

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <div className="relative">
      {showErrors && (
        <p className="absolute  -bottom-6 left-0 text-red-700">{error}</p>
      )}
      <InputFile
        id={"Upload"}
        setError={setError}
        title="Bestand toevoegen:"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
