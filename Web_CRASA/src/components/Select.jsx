"use client"

import { useState } from "react"

function Select({ value, onChange, options, placeholder = "Seleccionar..." }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <span className={`text-xs text-gray-500 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors duration-150 ${
                value === option.value ? "bg-blue-50 text-blue-700" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
