"use client";

import { useState, useEffect } from "react";

import InputSelect from "../InputSelect";
import { letterOptions } from "./optionSets";

export default function Letter({
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
        ["Letter"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Letter"]: false,
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
        title="Letter:"
        options={letterOptions}
      />
    </div>
  );
}
