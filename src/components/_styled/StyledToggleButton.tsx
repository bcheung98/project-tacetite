import { styled } from "@mui/material/styles"
import { ToggleButton } from "@mui/material"

export const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    border: `1px solid ${theme.border.color}`,
    "&.MuiToggleButton-root": {
        "&.Mui-selected": {
            backgroundColor: `${theme.button.selected}`,
        }
    }
}))