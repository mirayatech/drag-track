type ButtonProps = {
  onClick?: (() => void) | undefined;
  label: string;
  fullWidth?: boolean;
  transparent?: boolean;
};

export function Button({
  onClick,
  label,
  fullWidth = false,
  transparent = false,
}: ButtonProps) {
  const transparentStyle = transparent
    ? "bg-transparent text-gray-900 hover:bg-gray-100"
    : "bg-gray-900 text-white hover:bg-gray-80";

  return (
    <button
      onClick={onClick}
      className={`${
        fullWidth
          ? "w-full flex items-center justify-center"
          : "flex items-center justify-center"
      }  rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${transparentStyle} h-10 px-4 py-2`}
    >
      {label}
    </button>
  );
}
