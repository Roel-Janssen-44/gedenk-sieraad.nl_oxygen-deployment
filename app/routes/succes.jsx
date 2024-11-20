export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export default function Succespage() {
  return (
    <div className="container text-center">
      <h1
        style={{fontSize: 48, fontWeight: 'light'}}
        className="text-5xl font-tangerine"
      >
        Wij hebben uw bericht succesvol ontvangen
      </h1>
      <p>We zullen zo spoedig mogelijk contact opnemen.</p>
    </div>
  );
}
