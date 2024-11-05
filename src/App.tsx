import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

// Fetch imports
import { fetchCharacters, fetchWeapons, fetchEchoes, fetchCharacterBanners, fetchWeaponBanners } from "./redux/actions/fetch"

// Component imports
import Nav from "./components/Nav"
import NavBottom from "./components/NavBottom"
import VersionHighlights from "./components/VersionHighlights"
import CharacterBrowser from "./components/characters/CharacterBrowser"
import CharacterPage from "./components/characters/page/_CharacterPage"
import WeaponBrowser from "./components/weapons/WeaponBrowser"
import WeaponPage from "./components/weapons/page/_WeaponPage"
import EchoBrowser from "./components/echoes/EchoBrowser"
import AscensionPlanner from "./components/planner/_AscensionPlanner"
import BannerArchive from "./components/banners/BannerArchive"
import ScrollTopFab from "./components/_custom/ScrollTopFab"

// MUI imports
import { Box, CssBaseline, ThemeProvider } from "@mui/material"

// Helper imports
import theme from "./themes/theme"

// Type imports
import { AppDispatch } from "./redux/store"

function App({
    fetchCharacters,
    fetchWeapons,
    fetchEchoes,
    fetchCharacterBanners,
    fetchWeaponBanners
}: ConnectedProps<typeof connector>) {

    useEffect(() => {
        fetchCharacters()
        fetchWeapons()
        fetchEchoes()
        fetchCharacterBanners()
        fetchWeaponBanners()
    }, [fetchCharacters, fetchWeapons, fetchEchoes, fetchCharacterBanners, fetchWeaponBanners])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router basename={`${process.env.REACT_APP_BASENAME}`}>
                <Box id="back-to-top-anchor" />
                <Box sx={{ display: "flex" }}>
                    <Nav />
                    <Box sx={{ mx: "20px", mt: "100px", minHeight: "90vh", minWidth: "30vw", width: "95vw" }}>
                        <Switch>
                            <Route exact path="/" component={VersionHighlights} />
                            <Route exact path="/characters" component={CharacterBrowser} />
                            <Route path="/characters/:char_name" children={<CharacterPage />} />
                            <Route exact path="/weapons" component={WeaponBrowser} />
                            <Route path="/weapons/:wep_name" children={<WeaponPage />} />
                            <Route exact path="/echoes" component={EchoBrowser} />
                            <Route exact path="/planner" component={AscensionPlanner} />
                            <Route exact path="/banners/" component={BannerArchive} />
                        </Switch>
                    </Box>
                </Box>
                <NavBottom />
                <ScrollTopFab />
            </Router>
        </ThemeProvider>
    )

}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters()),
    fetchWeapons: () => dispatch(fetchWeapons()),
    fetchEchoes: () => dispatch(fetchEchoes()),
    fetchCharacterBanners: () => dispatch(fetchCharacterBanners()),
    fetchWeaponBanners: () => dispatch(fetchWeaponBanners())
})

const connector = connect(null, mapDispatchToProps)

export default connector(App)