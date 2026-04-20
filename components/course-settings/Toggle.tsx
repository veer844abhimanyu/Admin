type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition ${
        checked ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}