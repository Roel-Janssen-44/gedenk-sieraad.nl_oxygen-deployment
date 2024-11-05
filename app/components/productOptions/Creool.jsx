import {useState, useEffect} from 'react';

import InputSelect from '../InputSelect';
import {creoolOptions} from './optionSets';

export default function Creool({value, onChange, setOptionErrors, showErrors}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError('* Veld mag niet leeg zijn');
      setOptionErrors((prevState) => ({
        ...prevState,
        ['Creool']: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ['Creool']: false,
      }));
    }
  }, [value]);

  const handleChange = (newValue) => {
    onChange(newValue);
  };

  // return <p>khabsd</p>;

  return (
    <div className="relative">
      {showErrors && (
        <p className="absolute  -bottom-6 left-0 text-red-700">{error}</p>
      )}
      <InputSelect
        value={value}
        onChange={handleChange}
        title="Creool:"
        options={creoolOptions}
      />
    </div>
  );
}
