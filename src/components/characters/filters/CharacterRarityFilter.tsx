import * as React from "react"
import { useDispatch } from "react-redux"

// MUI imports
import { Box } from "@mui/material"

// Helper imports
import { setRarity } from "../../../redux/reducers/CharacterFilterReducer"

const CharacterRarityFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (rarity: string) => {
        dispatch(setRarity(rarity))
    }

    return (
        <React.Fragment>
            <Box><img className="filter-off" id="5-button" src={(`${process.env.REACT_APP_URL}/stars/5Star.png`)} alt="5" onClick={() => handleClick("5")} /></Box>
            <Box><img className="filter-off" id="4-button" src={(`${process.env.REACT_APP_URL}/stars/4Star.png`)} alt="4" onClick={() => handleClick("4")} /></Box>
        </React.Fragment>
    )

}

export default CharacterRarityFilter