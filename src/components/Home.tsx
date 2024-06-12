import * as React from "react"
import { useTheme } from "@mui/material/styles"

// MUI imports
import { Box, Typography } from "@mui/material"

const Home = () => {

    const theme = useTheme()

    return (
        <React.Fragment>
            <Box>
                <Box
                    sx={{
                        backgroundColor: `${theme.paper.backgroundColor}`,
                        border: `1px solid ${theme.border.color}`,
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
                    <Typography variant="h3" component="p">Welcome to PROJECT TACETITE</Typography>
                </Box>
            </Box>
        </React.Fragment>
    )

}

export default Home