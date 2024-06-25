import * as React from "react"
import { connect } from "react-redux"

// Component imports
import EchoCard from "./EchoCard"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Paper, InputBase } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Type imports
import { RootState } from "../../redux/store"

const EchoBrowser = (props: any) => {

    const theme = useTheme()

    let { echoes } = props

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
            <Grid container sx={{ margin: "auto", width: "98%" }}>
                <Grid xs={9}>
                    <Grid container>
                        {echoes.echoes.length > 0 &&
                            <React.Fragment>
                                {
                                    echoes.echoes.map((echo: { [key: string]: any }) => <EchoCard key={echo.id} echo={echo} />)
                                }
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
                <Grid xs={3}>

                </Grid>
            </Grid>
        </React.Fragment>
    )

}

const mapStateToProps = (state: RootState) => ({
    echoes: state.echoes,
})

export default connect(mapStateToProps)(EchoBrowser)