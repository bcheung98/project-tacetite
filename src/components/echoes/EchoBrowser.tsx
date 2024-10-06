import * as React from "react"
import { connect } from "react-redux"

// Component imports
import EchoCard from "./EchoCard"
import EchoList from "./EchoList"
import EchoFilters from "./filters/_EchoFilters"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Paper, InputBase, ToggleButtonGroup } from "@mui/material"
import Grid from "@mui/material/Grid2"
import AppsSharpIcon from "@mui/icons-material/AppsSharp"
import ListSharpIcon from "@mui/icons-material/ListSharp"

// Helper imports
import { filterEchoes } from "../../helpers/FilterEchoes"
import { CustomToggleButton } from "../../helpers/CustomToggleButton"

// Type imports
import { RootState } from "../../redux/store"

const EchoBrowser = (props: any) => {

    const theme = useTheme()

    const [searchValue, setSearchValue] = React.useState("")
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value)
    }

    const [view, setView] = React.useState("grid")
    const handleView = (event: React.BaseSyntheticEvent, newView: string) => {
        if (newView !== null) {
            setView(newView)
        }
    }

    let { echoes, echoFilters } = props

    document.title = `Echoes ${process.env.REACT_APP_DOCUMENT_HEADER}`

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    mb: "20px",
                    height: "30px",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        mr: "25px",
                        fontWeight: "500",
                        color: `${theme.text.color}`,
                        textDecoration: "none",
                    }}
                >
                    Echoes
                </Typography>
                <ToggleButtonGroup value={view} exclusive onChange={handleView} sx={{ border: `2px solid ${theme.border.color}` }}>
                    <CustomToggleButton value="grid" size="small">
                        <AppsSharpIcon sx={{ color: "white" }} />
                    </CustomToggleButton>
                    <CustomToggleButton value="list" size="small">
                        <ListSharpIcon sx={{ color: "white" }} />
                    </CustomToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Grid container spacing={3}>
                <Grid size="grow">
                    {
                        echoes.echoes.length > 0 ?
                            <React.Fragment>
                                {
                                    view === "grid" ?
                                        <Grid container rowSpacing={2} columnSpacing={1.5}>
                                            {filterEchoes(echoes.echoes, echoFilters, searchValue).sort((a, b) => echoClassId[b.class as keyof typeof echoClassId] - echoClassId[a.class as keyof typeof echoClassId] || a.name.localeCompare(b.name)).map((echo: { [key: string]: any }) => <EchoCard key={echo.id} echo={echo} />)}
                                        </Grid>
                                        :
                                        <EchoList echoes={filterEchoes(echoes.echoes, echoFilters, searchValue)} />
                                }
                            </React.Fragment>
                            :
                            null
                    }
                </Grid>
                <Grid size={2.75}>
                    <Paper
                        sx={{
                            border: `2px solid ${theme.border.color}`,
                            borderRadius: "5px",
                            backgroundColor: `${theme.paper.backgroundColor}`,
                            display: "flex",
                            height: "40px",
                            mb: "10px",
                        }}
                    >
                        <InputBase
                            sx={{
                                ml: "10px",
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

export const echoClassId = {
    "Calamity": 5,
    "Overlord": 4,
    "Elite": 3,
    "Common": 1
}