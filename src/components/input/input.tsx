import React, { useEffect, useRef } from "react";

type InputProps = {
  type: string;
  name: string;
  value?: string;
  shadow?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  type,
  name,
  value = "",
  placeholder = "",
  onChange = () => {},
  shadow = false,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`border p-2 w-full rounded md:rounded-md outline-none ${
        shadow ? "shadow" : ""
      } text-xs  md:text-sm `}
    />
  );
}
