type ButtonProps = {
  onClick: () => void;
  label: string;
};

export function Button({ onClick, label }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2"
    >
      {label}
    </button>
  );
}
