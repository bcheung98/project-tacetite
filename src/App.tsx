import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux/store"
import { fetchCharacters } from "./redux/actions/fetchCharacters"

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

export default App