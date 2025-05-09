import React from "react";

export function Select({ children, className, ...props }) {
  return (
    <select className={`border rounded px-3 py-2 w-full ${className}`} {...props}>
      {children}
    </select>
  );
}
