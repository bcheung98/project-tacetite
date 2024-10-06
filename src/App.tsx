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
import theme from "./themes/theme"
import { ThemeProvider } from "@mui/material/styles"
import { Box, Fade, useScrollTrigger, Fab } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

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
                        </Switch>
                    </Box>
                </Box>
                <BottomNav />
                <ScrollTop {...props}>
                    <Fab
                        size="medium"
                        disableRipple
                        sx={{
                            backgroundColor: `${theme.button.selected}`,
                            "&:hover": {
                                backgroundColor: `${theme.button.hover}`
                            }
                        }}
                    >
                        <KeyboardArrowUpIcon sx={{ color: `${theme.text.color}` }} />
                    </Fab>
                </ScrollTop>
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

interface ScrollTopProps {
    children: React.ReactNode
}

const ScrollTop: React.FC<ScrollTopProps> = (props) => {
    const { children } = props
    const trigger = useScrollTrigger({ threshold: 600 })

    const handleClick = (event: React.BaseSyntheticEvent) => {
        const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor")
        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
            })
        }
    }

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                sx={{ position: "fixed", bottom: 128, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    )
}