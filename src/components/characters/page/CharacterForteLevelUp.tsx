import React from "react"

// Component imports
import CharacterForteLevelUpMaterials from "./CharacterForteLevelUpMaterials"
import { CustomSlider } from "../../_styled/StyledSlider"

// MUI imports
import { useTheme, Typography, Box } from "@mui/material"

// Type imports
import { Materials } from "../../../types/materials"

interface CharacterForteLevelUpProps {
    materials: Materials,
    element: string,
}

function CharacterForteLevelUp({
    materials,
    element,
}: CharacterForteLevelUpProps) {

    const theme = useTheme()

    const maxValue = 10
    const minDistance = 1
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
        <Box sx={{ ml: { xs: "5px", sm: "30px" }, my: "10px" }}>
            <CharacterForteLevelUpMaterials materials={materials} values={sliderValue} />
            <Box sx={{ display: { xs: "block", sm: "flex" }, alignItems: "center", width: "40%", mt: "10px" }}>
                <Typography sx={{ color: theme.text.color, fontSize: "18px", minWidth: "125px" }}>
                    Lv. {sliderValue[0]} → Lv. {sliderValue[1]}
                </Typography>
                <CustomSlider
                    value={sliderValue}
                    step={1}
                    min={1}
                    max={maxValue}
                    onChange={handleSliderChange}
                    element={element}
                    disableSwap
                    sx={{ minWidth: "200px", ml: "10px" }}
                />
            </Box>
        </Box>
    )

}

export default CharacterForteLevelUp