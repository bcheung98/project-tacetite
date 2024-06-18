import * as React from "react"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Autocomplete, ClickAwayListener, CardHeader } from "@mui/material"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"

// Helper imports

const CharacterSelector = (props: any) => {

    const theme = useTheme()

    const smallIcon = {
        width: "16px",
        height: "16px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "16px",
        marginBottom: "10px",
    }

    return (
        <></>
    )

}

export default CharacterSelector