import React, { useEffect } from "react"
import { connect } from "react-redux"
import { AppDispatch } from "./redux/store"

// Fetch imports
import { fetchCharacters } from "./redux/actions/fetchCharacters"

// Component imports
import CharacterBrowser from "./components/characters/CharacterBrowser"

// Type imports
import { RootState } from "./redux/store"

const App = (props: any) => {

    useEffect(() => {
        fetchCharacters()
    }, [])

    let { fetchCharacters } = props

    return (
        <div>
            <CharacterBrowser />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)