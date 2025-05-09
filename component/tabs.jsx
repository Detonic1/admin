import React, { useState } from "react";

export function Tabs({ children, value, onValueChange, defaultValue, className }) {
  const [active, setActive] = useState(defaultValue || value);

  const handleTabChange = (val) => {
    setActive(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          activeTab: active,
          onTabChange: handleTabChange,
        })
      )}
    </div>
  );
}

export function TabsList({ children }) {
  return <div className="flex border-b">{children}</div>;
}

export function TabsTrigger({ value, activeTab, onTabChange, children }) {
  const isActive = activeTab === value;
  return (
    <button
      className={`px-4 py-2 ${
        isActive
          ? "border-b-2 border-blue-600 font-bold"
          : "text-gray-500 hover:text-blue-600"
      }`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children }) {
  return activeTab === value ? <div className="py-4">{children}</div> : null;
}
