"use client"

import React, { useState, createContext, useContext } from "react"
import { Search } from "lucide-react"

const CommandContext = createContext()

const Command = ({ children, ...props }) => {
  const [search, setSearch] = useState("")

  return (
    <CommandContext.Provider value={{ search, setSearch }}>
      <div
        className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground"
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  )
}

const CommandInput = ({ placeholder, ...props }) => {
  const { search, setSearch } = useContext(CommandContext)

  return (
    <div className="flex items-center border-b px-3">
      <Search className="mr-2 h-4 w-4 opacity-50" />
      <input
        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        {...props}
      />
    </div>
  )
}

const CommandList = ({ children, ...props }) => {
  return (
    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden" {...props}>
      {children}
    </div>
  )
}

const CommandEmpty = ({ children, ...props }) => {
  const { search } = useContext(CommandContext)

  return (
    <div className="py-6 text-center text-sm" {...props}>
      {children}
    </div>
  )
}

const CommandGroup = ({ children, ...props }) => {
  const { search } = useContext(CommandContext)

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (!search) return true
    const text = child.props.children?.toLowerCase() || ""
    return text.includes(search.toLowerCase())
  })

  if (filteredChildren.length === 0) return null

  return (
    <div className="overflow-hidden p-1 text-foreground" {...props}>
      {filteredChildren}
    </div>
  )
}

const CommandItem = ({ children, onSelect, ...props }) => {
  return (
    <div
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
      onClick={onSelect}
      {...props}
    >
      {children}
    </div>
  )
}

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList }
