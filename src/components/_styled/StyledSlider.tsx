import { styled } from "@mui/material/styles"
import { Slider } from "@mui/material"
import { SwitchColor } from "../../helpers/ElementColors"

interface CustomSliderProps {
    element?: string
}

export const CustomSlider = styled(Slider)<CustomSliderProps>(({ element }) => ({
    color: `${SwitchColor(element)}`,
    height: 5,
    "& .MuiSlider-track": {
        border: "none",
    },
    "& .MuiSlider-thumb": {
        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "inherit",
        },
        "&:before": {
            display: "none",
        },
    }
}))