import { MenuList, MenuItem } from "@mui/material"
import { styled } from "@mui/material/styles"

export const CustomMenuList = styled(MenuList)(({ theme }) => ({
    "&.MuiMenu-paper": {
        backgroundColor: `${theme.menu.backgroundColor}`,
    },
}))

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