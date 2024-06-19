import { alpha, styled } from "@mui/material/styles"
import { Switch } from "@mui/material"
import { SwitchColor } from "./ElementColors"

interface CustomSwitchProps {
    element: string
}

export const CustomSwitch = styled(Switch)<CustomSwitchProps>(({ element }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: `${SwitchColor(element)}`,
        "&:hover": {
            backgroundColor: alpha(`${SwitchColor(element)}`, 0),
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: `${SwitchColor(element)}`,
    },
}))