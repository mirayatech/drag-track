import React from "react";

type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  rounded?: "rounded-md" | "rounded-lg";
  shadow?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  type,
  name,
  value,
  placeholder,
  onChange,
  rounded = "rounded-md",
  shadow = false,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`border p-2 w-full ${rounded} ${shadow} `}
    ></input>
  );
}
