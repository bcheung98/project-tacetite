import { useTheme } from "@mui/material/styles"

export const ElementalBorderColor = (element: string | undefined) => {

    const theme = useTheme()

    switch (element) {
        case "Aero":
            return "#2fc79f"
        case "Electro":
            return "#f127ff"
        case "Fusion":
            return "#f0744e"
        case "Glacio":
            return "#31d0fc"
        case "Havoc":
            return "#f11f81"
        case "Spectro":
            return "#f3e483"
        default:
            return `${theme.text.highlight}`
    }
}

export const SwitchColor = (element: string) => {
    switch (element) {
        case "Aero":
            return "#2fc79f"
        case "Electro":
            return "#f127ff"
        case "Fusion":
            return "#f0744e"
        case "Glacio":
            return "#31d0fc"
        case "Havoc":
            return "#f11f81"
        case "Spectro":
            return "#f3e483"
        default:
            return "#1976d2"
    }
}