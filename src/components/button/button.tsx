type ButtonProps = {
  onClick?: (() => void) | undefined;
  label: string;
  fullWidth?: boolean;
  bgLight?: boolean;
  danger?: boolean;
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
  variant = "default",
  bgLight = false,
  danger = false,
}: ButtonProps) {
  const buttonVariants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-slate-300 bg-white hover:bg-slate-100",
    secondary: "bg-slate-700 text-white hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-200 hover:text-slate-800 font-semibold",
    link: "text-blue-600 underline hover:text-blue-800",
  };

  const dangerClass = "bg-red-500 text-white hover:bg-red-600";

  return (
    <button
      onClick={onClick}
      className={`${
        fullWidth
          ? "w-full flex items-center justify-center text-center"
          : "flex items-center justify-center "
      } gap-3 rounded md:rounded-md text-xs font-bold md:text-sm md:font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        danger ? dangerClass : buttonVariants[variant]
      } md:h-10 py-2 px-3 md:px-4 md:py-2 ${
        bgLight && !danger ? "bg-slate-200 hover:bg-slate-200" : ""
      }`}
    >
      {label}
    </button>
  );
}
