import * as React from "react"
import { useSelector } from "react-redux"

// Component imports
import EchoCard from "./EchoCard"
import EchoList from "./EchoList"
import EchoFilters from "./EchoFilters"
import SearchBar from "../_custom/SearchBar"

// MUI imports
import { useTheme, useMediaQuery, Box, Typography, Button, ToggleButtonGroup, Dialog, SwipeableDrawer } from "@mui/material"
import Grid from "@mui/material/Grid2"
import AppsSharpIcon from "@mui/icons-material/AppsSharp"
import ListSharpIcon from "@mui/icons-material/ListSharp"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

// Helper imports
import { filterEchoes } from "../../helpers/FilterEchoes"
import { CustomToggleButton } from "../_styled/StyledToggleButton"

// Type imports
import { RootState } from "../../redux/store"
import { EchoFilterKeys } from "../../redux/reducers/EchoFilterReducer"

function EchoBrowser() {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    const echoes = useSelector((state: RootState) => state.echoes)
    const echoFilters = useSelector((state: RootState) => state.echoFilters)

    const activeFilters = Object.keys(echoFilters).filter((filter) => echoFilters[filter as EchoFilterKeys].length).length > 0

    const [searchValue, setSearchValue] = React.useState("")
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value)
    }

    const currentEchoes = React.useMemo(() =>
        filterEchoes(echoes.echoes, echoFilters, searchValue),
        [echoes.echoes, echoFilters, searchValue]
    )

    const [view, setView] = React.useState("grid")
    const handleView = (event: React.BaseSyntheticEvent, newView: string) => {
        if (newView !== null) {
            setView(newView)
        }
    }

    const [dialogOpen, setDialogOpen] = React.useState(false)
    const handleDialogOpen = () => {
        setDialogOpen(true)
    }
    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return
                }
                setDrawerOpen(open)
            }

    document.title = `Echoes ${process.env.REACT_APP_DOCUMENT_HEADER}`

    return (
        <React.Fragment>
            <Grid container rowSpacing={2} columnSpacing={4} sx={{ mb: "20px" }}>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <Box sx={{ display: "flex" }}>
                        <Typography
                            sx={{
                                mr: "25px",
                                fontFamily: theme.font.styled.family,
                                fontWeight: theme.font.styled.weight,
                                fontSize: "24px",
                                color: `${theme.text.color}`,
                                lineHeight: "40px"
                            }}
                        >
                            Echoes
                        </Typography>
                        <ToggleButtonGroup value={view} exclusive onChange={handleView}>
                            <CustomToggleButton value="grid" size="small">
                                <AppsSharpIcon sx={{ color: `white` }} />
                            </CustomToggleButton>
                            <CustomToggleButton value="list" size="small">
                                <ListSharpIcon sx={{ color: `white` }} />
                            </CustomToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid size="grow">
                    <Box sx={{ display: "flex" }}>
                        <Button
                            onClick={matches ? () => handleDialogOpen() : toggleDrawer(true)}
                            variant="contained"
                            startIcon={<FilterAltIcon sx={{ color: `${theme.text.color}` }} />}
                            sx={{
                                px: 3,
                                mr: "25px",
                                backgroundColor: activeFilters ? `rgb(211, 47, 47)` : "none"
                            }}
                        >
                            <Typography sx={{ fontFamily: `${theme.font.styled.family}`, fontSize: { xs: "12px", sm: "14px" } }}>
                                Filters
                            </Typography>
                        </Button>
                        <SearchBar placeholder="Search" onChange={handleInputChange} size={{ width: "80%", height: "40px" }} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid size="grow">
                    {
                        currentEchoes.length > 0 ?
                            <React.Fragment>
                                {
                                    view === "grid" ?
                                        <Grid container spacing={2}>
                                            {
                                                currentEchoes.sort((a, b) => echoClassId[b.class] - echoClassId[a.class] || a.name.localeCompare(b.name)).map((echo) => <EchoCard key={echo.id} echo={echo} />)
                                            }
                                        </Grid>
                                        :
                                        <EchoList echoes={currentEchoes} />
                                }
                            </React.Fragment>
                            :
                            null
                    }
                </Grid>
                {/* {
                    matches && filterPosition === "side" ?
                        <Grid size={2.75}>
                            <CharacterFilters />
                        </Grid>
                        :
                        null
                } */}
                {
                    matches ?
                        <Dialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            fullWidth
                        >
                            <EchoFilters handleClose={handleDialogClose} />
                        </Dialog>
                        :
                        <SwipeableDrawer
                            anchor="bottom"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            sx={{
                                [`& .MuiDrawer-paper`]: {
                                    borderTop: `2px solid ${theme.border.color}`,
                                    backgroundColor: `${theme.appbar.backgroundColor}`,
                                    height: "auto",
                                    maxHeight: "88%"
                                }
                            }}
                        >
                            <EchoFilters handleClose={toggleDrawer(false)} />
                        </SwipeableDrawer>
                }
            </Grid>
        </React.Fragment>
    )

}

export default EchoBrowser

export const echoClassId = {
    "Calamity": 5,
    "Overlord": 4,
    "Elite": 3,
    "Common": 2
}