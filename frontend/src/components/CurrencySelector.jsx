export default function CurrencySelector({ currency, setCurrency, rates }) {
  const allowed = ["EUR", "USD", "RSD"];
  const codes = rates
    ? Object.keys(rates)
        .filter(code => allowed.includes(code))
        .sort()
    : [];

  return (
    <div className="dropdown" data-bs-theme="dark">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="currencyDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {currency}
      </button>
      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="currencyDropdown">
        {codes.map(code => (
          <li key={code}>
            <button
              className={`dropdown-item${code === currency ? ' active' : ''}`}
              type="button"
              onClick={() => setCurrency(code)}
            >
              {code}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
