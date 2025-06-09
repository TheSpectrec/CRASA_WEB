"use client"

import React, { useState, createContext, useContext } from "react"

const SelectContext = createContext()

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = useContext(SelectContext)

  return (
    <button
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <svg
        className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, className, ...props }) => {
  const { value } = useContext(SelectContext)

  return (
    <span className={className} {...props}>
      {value || placeholder}
    </span>
  )
}

const SelectContent = ({ className, children, ...props }) => {
  const { isOpen } = useContext(SelectContext)

  if (!isOpen) return null

  return (
    <div
      className={`absolute top-full z-50 w-full rounded-md border bg-white p-1 text-popover-foreground shadow-md ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  )
}

const SelectItem = ({ className, children, value, ...props }) => {
  const { onValueChange, setIsOpen } = useContext(SelectContext)

  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${className || ""}`}
      onClick={() => {
        onValueChange(value)
        setIsOpen(false)
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
