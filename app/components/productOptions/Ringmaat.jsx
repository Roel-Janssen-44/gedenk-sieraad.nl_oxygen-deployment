"use client";

import { useState, useEffect } from "react";

import InputSelect from "../InputSelect";
import { ringmaatOptions } from "./optionSets";

export default function Ringmaat({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError("* Veld mag niet leeg zijn");
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Ringmaat"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Ringmaat"]: false,
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
      <InputSelect
        value={value}
        onChange={handleChange}
        title="Ringmaat:"
        options={ringmaatOptions}
      />
    </div>
  );
}
