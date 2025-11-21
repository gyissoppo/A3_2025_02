export default function CurrencyDisplay({ rates }) {
  return (
    <div>
      <p>💵 Dólar: R$ {Number(rates.usd).toFixed(2)}</p>
      <p>💶 Euro: R$ {Number(rates.eur).toFixed(2)}</p>
    </div>
  );
}
