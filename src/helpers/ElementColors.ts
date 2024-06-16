export const ElementalBorderColor = (element: string) => {
    switch (element) {
        case "Aero":
            return "#2fc79f"
        case "Electro":
            return "#a732b0"
        case "Fusion":
            return "#f0744e"
        case "Glacio":
            return "#31d0fc"
        case "Havoc":
            return "#f11f81"
        case "Spectro":
            return "#f3e483"
        default:
            return "gray"
    }
}