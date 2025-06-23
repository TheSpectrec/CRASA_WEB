"use client"

import { Card } from "@/components/ui/card"

function Tabs({ selectedTab, onTabChange, tabs }) {
  return (
    <Card className="p-0">
      <div className="px-6 pt-6">
        <div className="grid grid-cols-2 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const activeClasses = {
              red: "bg-red-50 text-red-800",
              blue: "bg-blue-50 text-blue-800",
              green: "bg-green-50 text-green-800",
            }

            return (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                  selectedTab === tab.id ? `${activeClasses[tab.color]} shadow-sm` : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-6">
        {tabs.map((tab) => (
          <div key={tab.id} className={selectedTab === tab.id ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Tabs
