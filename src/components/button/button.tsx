type ButtonProps = {
  onClick?: (() => void) | undefined;
  label: string;
  fullWidth?: boolean;
  transparent?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

export function Button({
  onClick,
  label,
  fullWidth = false,
  transparent = false,
  variant = "default",
}: ButtonProps) {
  const buttonVariants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-100",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
    link: "text-blue-600 underline hover:text-blue-800",
  };

  const transparentStyle = transparent
    ? "bg-transparent text-gray-900 hover:bg-gray-100"
    : buttonVariants[variant];

  return (
    <button
      onClick={onClick}
      className={`${
        fullWidth
          ? "w-full flex items-center justify-center"
          : "flex items-center justify-center"
      } rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${transparentStyle} h-10 px-4 py-2`}
    >
      {label}
    </button>
  );
}
