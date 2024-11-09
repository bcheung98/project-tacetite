import * as React from "react"
import { useSelector } from "react-redux"

// Component imports
import CharacterCard from "./CharacterCard"
import DisplayCard from "../_custom/DisplayCard"
import CharacterList from "./CharacterList"
import CharacterFilters from "./CharacterFilters"
import SearchBar from "../_custom/SearchBar"

// MUI imports
import { useTheme, useMediaQuery, Box, Typography, Button, ToggleButtonGroup, Dialog, SwipeableDrawer } from "@mui/material"
import Grid from "@mui/material/Grid2"
import AppsSharpIcon from "@mui/icons-material/AppsSharp"
import ViewModuleSharpIcon from "@mui/icons-material/ViewModuleSharp"
import ListSharpIcon from "@mui/icons-material/ListSharp"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

// Helper imports
import { filterCharacters } from "../../helpers/FilterCharacters"
import { CustomToggleButton } from "../_styled/StyledToggleButton"

// Type imports
import { RootState } from "../../redux/store"
import { CharacterFilterKeys } from "../../redux/reducers/CharacterFilterReducer"

function CharacterBrowser() {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    const characters = useSelector((state: RootState) => state.characters)
    const characterFilters = useSelector((state: RootState) => state.characterFilters)

    const activeFilters = Object.keys(characterFilters).filter((filter) => characterFilters[filter as CharacterFilterKeys].length).length > 0

    const [searchValue, setSearchValue] = React.useState("")
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value)
    }

    const currentCharacters = React.useMemo(() =>
        filterCharacters(characters.characters, characterFilters, searchValue),
        [characters.characters, characterFilters, searchValue]
    )

    const defaultView = "grid"
    const [view, setView] = React.useState(defaultView)
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

    document.title = `Resonators ${process.env.REACT_APP_DOCUMENT_HEADER}`

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
                            Characters
                        </Typography>
                        <ToggleButtonGroup value={view} exclusive onChange={handleView}>
                            <CustomToggleButton value="card" size="small">
                                <AppsSharpIcon sx={{ color: `white` }} />
                            </CustomToggleButton>
                            <CustomToggleButton value="grid" size="small">
                                <ViewModuleSharpIcon sx={{ color: `white` }} />
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
                        currentCharacters.length > 0 ?
                            <React.Fragment>
                                {
                                    view === "card" &&
                                    <Grid container spacing={2.5}>
                                        {
                                            currentCharacters.map(char =>
                                                <DisplayCard
                                                    key={char.id}
                                                    id={`${char.name}-characterBrowser`}
                                                    name={char.name}
                                                    displayName={char.displayName}
                                                    type="character"
                                                    variant="avatar"
                                                    rarity={char.rarity}
                                                    info={{ element: char.element, weapon: char.weapon }}
                                                />
                                            )
                                        }
                                    </Grid>
                                }
                                {
                                    view === "grid" &&
                                    <Grid container spacing={2}>
                                        {
                                            currentCharacters.map(char =>
                                                <CharacterCard key={char.id} character={char} />
                                            )
                                        }
                                    </Grid>
                                }
                                {
                                    view === "list" &&
                                    <CharacterList characters={currentCharacters} />
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
                            <CharacterFilters handleClose={handleDialogClose} />
                        </Dialog>
                        :
                        <SwipeableDrawer
                            anchor="bottom"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            sx={{
                                [`& .MuiDrawer-paper`]: {
                                    borderTop: `2px solid ${theme.border.colorAlt}`,
                                    backgroundColor: `${theme.appbar.backgroundColor}`,
                                    height: "auto",
                                    maxHeight: "88%"
                                }
                            }}
                        >
                            <CharacterFilters handleClose={toggleDrawer(false)} />
                        </SwipeableDrawer>
                }
            </Grid>
        </React.Fragment>
    )

}

export default CharacterBrowser