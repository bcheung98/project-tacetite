import React, { useEffect } from "react"
import { connect } from "react-redux"
import { AppDispatch, useAppDispatch, useAppSelector } from "./redux/store"

// Fetch imports
import { fetchCharacters } from "./redux/actions/fetchCharacters"

// Type imports
import { RootState } from "./redux/store"

const App = () => {

    const { loading, characters } = useAppSelector(state => state.characters)
    const characterDispatch = useAppDispatch()

    useEffect(() => {
        characterDispatch(fetchCharacters())
    }, [])

    return (
        <div>
            <>
                {loading ?
                    "...loading"
                    :
                    <ul>
                        {
                            characters.map((char) => <li key={char.id}>{char.name}</li>)
                        }
                    </ul>
                }
            </>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);