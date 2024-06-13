import { useEffect } from "react"
import { connect } from "react-redux"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Fetch imports
import { fetchCharacters } from "./redux/actions/fetchCharacters"

// Component imports
import Nav from "./components/Nav"
import Home from "./components/Home"
import CharacterBrowser from "./components/characters/CharacterBrowser"
import CharacterPage from "./components/characters/page/_CharacterPage"

// MUI imports
import { defaultTheme as theme } from "./theme"
import { ThemeProvider } from "@mui/material/styles"
import { AppBar, Typography, Box, IconButton } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

// Type imports
import { RootState } from "./redux/store"
import { AppDispatch } from "./redux/store"

const App = (props: any) => {

    useEffect(() => {
        fetchCharacters()
    }, [])

    let { fetchCharacters } = props

    return (
        <ThemeProvider theme={theme}>
            <Router basename="project-tacetite">
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/characters" component={CharacterBrowser} />
                    <Route path="/character/:char_name" children={<CharacterPage />} />
                </Switch>
                <AppBar position="static" sx={{
                    mt: 10,
                    mb: -5,
                    pt: 2,
                    textAlign: "center",
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderTop: `2px solid ${theme.border.color}`,
                }}>
                    <Typography sx={{ fontWeight: "bold", mb: "5px" }} variant="body2">Project Tacetite is not affiliated with Kuro Games.<br />Wuthering Waves, images and data are registered trademarks of Kuro Games.</Typography>
                    <Box>
                        <IconButton disableRipple href={"https://github.com/bcheung98/project-tacetite"} target="_blank" color="inherit">
                            <GitHubIcon />
                        </IconButton>
                    </Box>
                </AppBar>
            </Router>
        </ThemeProvider>
    )
}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)