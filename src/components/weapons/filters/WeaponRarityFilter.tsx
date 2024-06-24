import * as React from "react"
import { useDispatch } from "react-redux"

// MUI imports
import { Box } from "@mui/material"

// Helper imports
import { setRarity } from "../../../redux/reducers/WeaponFilterReducer"

const WeaponRarityFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (rarity: string) => {
        dispatch(setRarity(rarity))
    }

    return (
        <React.Fragment>
            <Box><img className="filter-off" id="weapon-5-button" src={(`${process.env.REACT_APP_URL}/stars/5Star.png`)} alt="5" onClick={() => handleClick("5")} /></Box>
            <Box><img className="filter-off" id="weapon-4-button" src={(`${process.env.REACT_APP_URL}/stars/4Star.png`)} alt="4" onClick={() => handleClick("4")} /></Box>
            <Box><img className="filter-off" id="weapon-3-button" src={(`${process.env.REACT_APP_URL}/stars/3Star.png`)} alt="3" onClick={() => handleClick("3")} /></Box>
            <Box><img className="filter-off" id="weapon-2-button" src={(`${process.env.REACT_APP_URL}/stars/2Star.png`)} alt="2" onClick={() => handleClick("2")} /></Box>
            <Box><img className="filter-off" id="weapon-1-button" src={(`${process.env.REACT_APP_URL}/stars/1Star.png`)} alt="1" onClick={() => handleClick("1")} /></Box>
        </React.Fragment>
    )

}

export default WeaponRarityFilter