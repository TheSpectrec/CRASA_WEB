// Generador de colores para las gráficas
export const generateColors = (count) => {
    const baseColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#8AC926",
      "#1982C4",
      "#6A4C93",
      "#FF595E",
      "#FFCA3A",
      "#C44569",
      "#F8B500",
      "#6C5CE7",
      "#A29BFE",
      "#FD79A8",
      "#00B894",
      "#E17055",
    ]
  
    const colors = []
    for (let i = 0; i < count; i++) {
      if (i < baseColors.length) {
        colors.push(baseColors[i])
      } else {
        const hue = (i * 137.508) % 360
        const saturation = 70 + (i % 30)
        const lightness = 45 + (i % 20)
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
      }
    }
    return colors
  }
  
  export const CHART_COLORS = {
    primary: "#36A2EB",
    secondary: "#FF6384",
    tertiary: "#FFCE56",
    bars: {
      2023: "#FF6384",
      2024: "#36A2EB",
      2025: "#FFCE56",
    },
  }
  