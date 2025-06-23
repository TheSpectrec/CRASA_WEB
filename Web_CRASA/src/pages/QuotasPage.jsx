"use client"

import { useState, useEffect } from 'react'
import { salesData } from '../contexts/SalesData'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import  Tabs  from '@/components/ui/tabs'
import Select from "../components/Select"

import SalesTable from '../components/SalesTable'
import SalesSummary from '../components/SalesSummary'

function QuotasPage() {
    const [selectedSeller, setSelectedSeller] = useState('QUINTILIANO')
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() // 0-11
        const currentYear = currentDate.getFullYear()

        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ]

        return `${monthNames[currentMonth]} ${currentYear}`
    })

    const [selectedBrand, setSelectedBrand] = useState('COSTEÑA')

    // Get unique seller names from the data
    const sellers = [...new Set(salesData.map((item) => item.seller))]

    // Available months
    const months = (() => {
        const currentYear = new Date().getFullYear()
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ]

        return monthNames.map((month) => `${month} ${currentYear}`)
    })()

    // Filter data for the selected seller
    const filteredData = salesData.filter((item) => item.seller === selectedSeller)

    // Get unique brands for the selected seller
    const sellerBrands = [...new Set(filteredData.map((item) => item.brand))]

    // Update selected brand when seller changes
    useEffect(() => {
        if (sellerBrands.length > 0 && !sellerBrands.includes(selectedBrand)) {
            setSelectedBrand(sellerBrands[0])
        }
    }, [selectedSeller, selectedBrand])

    // Get data fot each brand
    const brandData = {}
    const brandTotals = {}

    sellerBrands.forEach((brand) => {
        const data = filteredData.filter((item) => item.brand === brand)
        brandData[brand] = data

        brandTotals[brand] = {
            quota: data.reduce((sum, item) => sum + item.quota, 0),
            progress: data.reduce((sum, item) => sum + item.progress, 0),
            difference: data.reduce((sum, item) => sum + item.difference, 0),
        }
    })

    // Brand colors 
    const brandColors = {
        COSTEÑA: 'red',
        JUMEX: 'blue',
        TOTIS: 'green',
    }

    return (
        <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Cuotas</h1>
              <p className="text-gray-500">Seguimiento de avance por vendedor</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mes:</label>
                <Select
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  options={months.map((month) => ({ value: month, label: month }))}
                />
              </div>

              <div className="w-full sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendedor:</label>
                <Select
                  value={selectedSeller}
                  onChange={setSelectedSeller}
                  options={sellers.map((seller) => ({ value: seller, label: seller }))}
                />
              </div>
            </div>
          </div>

          <div className={`grid gap-6 mb-8 ${sellerBrands.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            {sellerBrands.map((brand) => (
              <SalesSummary
                key={brand}
                title={brand}
                color={brandColors[brand]}
                quota={brandTotals[brand].quota}
                progress={brandTotals[brand].progress}
                difference={brandTotals[brand].difference}
              />
            ))}
          </div>
        </div>

        {sellerBrands.length > 1 ? (
          <Tabs
            selectedTab={selectedBrand}
            onTabChange={setSelectedBrand}
            tabs={sellerBrands.map((brand) => ({
              id: brand,
              label: brand,
              color: brandColors[brand],
              content: (
                <Card>
                  <SalesTable data={brandData[brand]} color={brandColors[brand]} />
                </Card>
              ),
            }))}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <Card>
              <SalesTable data={brandData[sellerBrands[0]]} color={brandColors[sellerBrands[0]]} />
            </Card>
          </div>
        )}
      </div>
    </div>
    )
}

export default QuotasPage