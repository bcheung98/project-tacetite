import PropTypes from "prop-types"
import { styled } from "@mui/material/styles"
import { Popper, ButtonBase, InputBase } from "@mui/material"
import { autocompleteClasses } from "@mui/material/Autocomplete"

interface PopperComponentProps {
    anchorEl?: any,
    disablePortal?: boolean,
    open: boolean,
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: "none",
        margin: 0,
        color: "inherit",
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: `${theme.paper.backgroundColor}`,
        color: `${theme.text.color}`,
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: "auto",
            alignItems: "flex-start",
            padding: 8,
            borderBottom: `1px solid  ${theme.border.color}`,
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: "relative",
    },
}))

export function PopperComponent(props: PopperComponentProps) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />
}

PopperComponent.propTypes = {
    anchorEl: PropTypes.any,
    disablePortal: PropTypes.bool,
    open: PropTypes.bool.isRequired,
}

export const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.border.color}`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: `${theme.text.color}`,
    backgroundColor: `${theme.appbar.backgroundColor}`
}))

export const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: "100%",
    borderBottom: `1px solid  ${theme.border.color}`,
    "& input": {
        borderRadius: 4,
        backgroundColor: `${theme.table.body.backgroundColor}`,
        padding: 8,
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        border: `1px solid ${theme.border.color}`,
        fontSize: 14,
        color: `${theme.text.color}`,
        "&:focus": {
            borderColor: `${theme.border.color}`,
        },
    },
}))

export const Button = styled(ButtonBase)(({ theme }) => ({
    fontSize: 13,
    width: "100%",
    textAlign: "left",
    paddingLeft: 8,
    paddingBottom: 8,
    color: `${theme.text.color}`,
    fontWeight: 600,
    "&:hover,&:focus": {
        color: `${theme.text.color}`,
    },
    "& span": {
        width: "100%",
    },
}))