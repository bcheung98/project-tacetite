import { MenuItem } from "@mui/material"
import { styled } from "@mui/material/styles"

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    "&.MuiMenuItem-root": {
        backgroundColor: `${theme.menu.backgroundColor}`,
        color: `${theme.text.color}`,
        "&:hover": {
            backgroundColor: `${theme.menu.hover}`,
        },
        "&.Mui-selected": {
            backgroundColor: `${theme.menu.selected}`,
            "&:hover": {
                backgroundColor: `${theme.menu.selectedHover}`,
            },
        }
    },
}))