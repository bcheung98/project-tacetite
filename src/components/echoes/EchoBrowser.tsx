import * as React from "react"
import { connect } from "react-redux"

// Component imports
import EchoCard from "./EchoCard"
import EchoFilters from "./filters/_EchoFilters"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Paper, InputBase } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { filterEchoes } from "../../helpers/FilterEchoes"

// Type imports
import { RootState } from "../../redux/store"

const EchoBrowser = (props: any) => {

    const theme = useTheme()

    const [searchValue, setSearchValue] = React.useState("")

    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value)
    }

    let { echoes, echoFilters } = props

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
                                    filterEchoes(echoes.echoes, echoFilters, searchValue).sort((a, b) => b.cost - a.cost || a.name.localeCompare(b.name)).map((echo: { [key: string]: any }) => <EchoCard key={echo.id} echo={echo} />)
                                }
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
                <Grid xs={3}>
                    <Paper sx={{
                        border: `2px solid ${theme.border.color}`,
                        borderRadius: "5px",
                        backgroundColor: `${theme.paper.backgroundColor}`,
                        display: "flex",
                        margin: "auto",
                        height: "40px",
                        width: "84.5%",
                        marginBottom: "10px",
                        marginLeft: "35px",
                    }}>
                        <InputBase
                            sx={{
                                marginLeft: "10px",
                                flex: 1,
                                color: `${theme.text.color}`,
                                fontFamily: "Segoe UI, Roboto",
                                fontWeight: "500",
                            }}
                            placeholder="Search"
                            onChange={handleInputChange}
                        />
                    </Paper>
                    <EchoFilters />
                </Grid>
            </Grid>
        </React.Fragment>
    )

}

const mapStateToProps = (state: RootState) => ({
    echoes: state.echoes,
    echoFilters: state.echoFilters
})

export default connect(mapStateToProps)(EchoBrowser)