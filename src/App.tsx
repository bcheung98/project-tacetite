import React, { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { connect } from "react-redux"

// Fetch imports
import { fetchCharacters } from "./redux/actions/fetchCharacters"

// Component imports
import Home from "./components/Home"
import CharacterBrowser from "./components/characters/CharacterBrowser"

// Type imports
import { RootState } from "./redux/store"
import { AppDispatch } from "./redux/store"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/characters",
        element: <CharacterBrowser />
    }
])

const App = (props: any) => {

    useEffect(() => {
        fetchCharacters()
    }, [])

    let { fetchCharacters } = props

    return (
        <RouterProvider router={router} />
    )
}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)