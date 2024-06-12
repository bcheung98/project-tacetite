import React, { useEffect } from "react"
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

// MUI imports
import { defaultTheme as theme } from "./theme"
import { ThemeProvider } from "@mui/material/styles"

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
                    <Route path="/characters" component={CharacterBrowser} />
                </Switch>
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