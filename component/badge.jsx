import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  return open ? <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">{children}</div> : null;
}

export function DialogContent({ children, className }) {
  return <div className={`bg-white p-6 rounded shadow-lg ${className}`}>{children}</div>;
}

export function DialogHeader({ children, className }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

export function DialogDescription({ children, className }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export function DialogTrigger({ asChild, children, onClick }) {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export function DialogFooter({ children, className }) {
  return <div className={`mt-4 flex justify-end ${className}`}>{children}</div>;
}
