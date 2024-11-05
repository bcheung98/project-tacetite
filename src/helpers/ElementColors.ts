import { useTheme } from "@mui/material/styles"

export const ElementalBorderColor = (element: string | undefined) => {

    const theme = useTheme()

    switch (element) {
        case "Aero":
            return "#55ffb5"
        case "Electro":
            return "#ac70f1"
        case "Fusion":
            return "#f0744e"
        case "Glacio":
            return "#49abf7"
        case "Havoc":
            return "#c989b1"
        case "Spectro":
            return "#fae56c"
        default:
            return `${theme.text.highlight}`
    }
}

export const SwitchColor = (element: string | undefined) => {

    const theme = useTheme()

    switch (element) {
        case "Aero":
            return "#55ffb5"
        case "Electro":
            return "#ac70f1"
        case "Fusion":
            return "#f0744e"
        case "Glacio":
            return "#49abf7"
        case "Havoc":
            return "#c989b1"
        case "Spectro":
            return "#fae56c"
        default:
            return `${theme.text.highlight}`
    }
}