import React from "react"

// Component imports
import CharacterAscensionMaterials from "./CharacterAscensionMaterials"
import { CustomSlider } from "../../_styled/StyledSlider"

// MUI imports
import { useTheme, Typography, Box } from "@mui/material"

// Type imports
import { Character } from "../../../types/character"

function CharacterAscension({ character }: { character: Character }) {

    const theme = useTheme()

    const levels = ["20", "40", "50", "60", "70", "80", "90"]

    const minDistance = 1
    let maxValue = levels.length
    const [sliderValue, setSliderValue] = React.useState([1, maxValue])
    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance)
                setSliderValue([clamped, clamped + minDistance])
            }
            else {
                const clamped = Math.max(newValue[1], minDistance + 1)
                setSliderValue([clamped - minDistance, clamped])
            }
        }
        else {
            setSliderValue(newValue)
        }
    }

    return (
        <React.Fragment>
            <CharacterAscensionMaterials name={character.name} materials={character.materials} values={sliderValue} />
            <Box sx={{ display: { xs: "block", sm: "flex" }, alignItems: "center", width: "50%", mt: "10px" }}>
                <Typography sx={{ color: theme.text.color, fontSize: "18px", minWidth: "125px", mr: "20px" }}>
                    Lv. {levels[sliderValue[0] - 1]} → Lv. {levels[sliderValue[1] - 1]}
                </Typography>
                <CustomSlider
                    value={sliderValue}
                    step={1}
                    min={1}
                    max={maxValue}
                    onChange={handleSliderChange}
                    element={character.element}
                    disableSwap
                    sx={{ minWidth: "200px", ml: "10px" }}
                />
            </Box>
        </React.Fragment>
    )
}

export default CharacterAscension