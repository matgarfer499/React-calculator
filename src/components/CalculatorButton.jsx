export function CalculatorButton({ onClick, value, className }) {
  return (
    <button onClick={onClick} className={className} value={value}>
      {value}
    </button>
  );
}

export default CalculatorButton;
