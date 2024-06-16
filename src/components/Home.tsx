import * as React from "react"

// Component imports
import VersionHighlights from "./VersionHighlights"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"

const Home = () => {

    const theme = useTheme()

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: `${theme.paper.backgroundColor}`,
                    border: `2px solid ${theme.border.color}`,
                    borderRadius: "5px",
                    display: "block",
                    margin: "auto",
                    mt: "20px",
                    width: "70%",
                    p: "20px",
                    textAlign: "center",
                    color: `${theme.text.color}`,
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>Welcome to PROJECT TACETITE</Typography>
            </Box>
            <VersionHighlights />
        </React.Fragment>
    )

}

export default Home