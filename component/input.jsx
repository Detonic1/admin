import React from "react";

export function Input({ type = "text", className, ...props }) {
  return (
    <input
      type={type}
      className={`border rounded px-3 py-2 w-full ${className}`}
      {...props}
    />
  );
}
