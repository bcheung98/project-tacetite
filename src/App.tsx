import { useEffect } from "react"
import { connect } from "react-redux"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

// Fetch imports
import { fetchCharacters, fetchEchoes, fetchWeapons } from "./redux/actions/fetch"

// Component imports
import Nav from "./components/Nav"
import BottomNav from "./components/BottomNav"
import VersionHighlights from "./components/VersionHighlights"
import CharacterBrowser from "./components/characters/CharacterBrowser"
import CharacterPage from "./components/characters/page/_CharacterPage"
import WeaponBrowser from "./components/weapons/WeaponBrowser"
import WeaponPage from "./components/weapons/page/_WeaponPage"
import EchoBrowser from "./components/echoes/EchoBrowser"
import AscensionPlanner from "./components/planner/_AscensionPlanner"

// MUI imports
import { defaultTheme as theme } from "./theme"
import { ThemeProvider } from "@mui/material/styles"
import { Box } from "@mui/material"

// Type imports
import { AppDispatch } from "./redux/store"

const App = (props: any) => {

    useEffect(() => {
        fetchCharacters()
        fetchWeapons()
        fetchEchoes()
    }, [])

    let { fetchCharacters, fetchWeapons, fetchEchoes } = props

    return (
        <ThemeProvider theme={theme}>
            <Router basename="project-tacetite">
                <Box sx={{ display: "flex" }}>
                    <Nav />
                    <Box sx={{ pt: 10 }}>
                        <Switch>
                            <Route exact path="/" component={VersionHighlights} />
                            <Route exact path="/characters" component={CharacterBrowser} />
                            <Route path="/character/:char_name" children={<CharacterPage />} />
                            <Route exact path="/weapons" component={WeaponBrowser} />
                            <Route path="/weapon/:wep_name" children={<WeaponPage />} />
                            <Route exact path="/echoes" component={EchoBrowser} />
                            <Route path="/planner" component={AscensionPlanner} />
                        </Switch>
                    </Box>
                </Box>
                <BottomNav />
            </Router>
        </ThemeProvider>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters()),
    fetchWeapons: () => dispatch(fetchWeapons()),
    fetchEchoes: () => dispatch(fetchEchoes()),
})

export default connect(null, mapDispatchToProps)(App)