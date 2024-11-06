import Creool from './productOptions/Creool';
import Aspakket from './productOptions/Aspakket';
import Hars from './productOptions/Hars';
import Tekst from './productOptions/Tekst';
// import Armbandmaat from './productOptions/Armbandmaat';
// import Woord from './productOptions/Woord';
// import Upload from './productOptions/Upload';
// import Vppakket from './productOptions/Vppakket';
// import Vppakketup from './productOptions/Vppakketup';
// import ParaCord from './productOptions/ParaCord';
// import Satijnen from './productOptions/Satijnen';
// import Ringmaat from './productOptions/Ringmaat';
// import RingmaatSeeyou from './productOptions/RingmaatSeeyou';
// import Letter from './productOptions/Letter';
// import Vulset from './productOptions/Vulset';
// import Aszijde from './productOptions/Aszijde';
// import NaamDatum from './productOptions/NaamDatum';
// import Poot from './productOptions/Poot';
// import Print from './productOptions/Print';
// import Gravure from './productOptions/Gravure';
// import Positie from './productOptions/Positie';

const tagsOrder = [
  'ringmaat',
  'ringmaatsy',
  'cord',
  'satijn',
  'creool',
  'armbandmaat',
  'vulset',
  'kleuren',
  'hars',
  'gravure',
  'upload',
  'aspakket',
  'vppakket',
  'vppakketup',
  'aszijde',
  'tekst',
  'poot',
  'woord',
  'letter',
  'positie',
  'naamdatum',
  'print',
];

// To do Vpring

export default function ExtraProductOptions({
  tags,
  extraOptions,
  setExtraOptions,
  setOptionErrors,
  showErrors,
}) {
  const handleChange = (newValue, option) => {
    const existingOptionIndex = extraOptions.findIndex((o) => o.key === option);
    if (existingOptionIndex !== -1) {
      setExtraOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[existingOptionIndex].value = newValue;
        return updatedOptions;
      });
    } else {
      setExtraOptions((prevOptions) => [
        ...prevOptions,
        {key: option, value: newValue},
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {tagsOrder
        .filter((tag) => tags.includes(tag))
        .map((tag, index) => {
          const Component = components[tag];
          if (Component) {
            return (
              <Component
                key={index}
                value={
                  extraOptions.find((option) => option.key === tag)?.value || ''
                }
                onChange={(value) => handleChange(value, tag)}
                setOptionErrors={setOptionErrors}
                showErrors={showErrors}
              />
            );
          }
          return null;
        })}
    </div>
  );
}

const components = {
  //   gravure: Gravure,
  creool: Creool,
  hars: Hars,
  aspakket: Aspakket,
  //   kleuren: Hars,
  tekst: Tekst,
  //   armbandmaat: Armbandmaat,
  //   woord: Woord,
  //   upload: Upload,
  //   vppakket: Vppakket,
  //   vppakketup: Vppakketup,
  //   cord: ParaCord,
  //   satijn: Satijnen,
  //   ringmaat: Ringmaat,
  //   ringmaatsy: RingmaatSeeyou,
  //   letter: Letter,
  //   vulset: Vulset,
  //   aszijde: Aszijde,
  //   naamdatum: NaamDatum,
  //   poot: Poot,
  //   print: Print,
  //   positie: Positie,
};
