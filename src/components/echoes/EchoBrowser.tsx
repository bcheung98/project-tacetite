import * as React from "react"
import { connect } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Type imports
import { RootState } from "../../redux/store"

const EchoBrowser = (props: any) => {

    const theme = useTheme()

    document.title = "Echoes - Project Tacetite"

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h4"
                    sx={{
                        mx: "25px",
                        my: "20px",
                        display: { xs: "none", md: "flex" },
                        letterSpacing: ".2rem",
                        color: `${theme.text.color}`,
                        fontWeight: "500",
                        textAlign: "center",
                    }}
                >
                    ECHOES
                </Typography>
            </Box>
        </React.Fragment>
    )

}

export default EchoBrowser