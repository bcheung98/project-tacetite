import * as React from "react"
import { useDispatch } from "react-redux"

// Component imports
import { CustomSlider } from "../../_styled/StyledSlider"
import { CustomSwitch } from "../../_styled/StyledSwitch"

// MUI imports
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material"

// Helper imports
import { updateCharacterCosts, updateTotalCosts } from "../../../redux/reducers/AscensionPlannerReducer"
import { getCharacterLevelCost } from "../../../data/levelUpCosts"

// Type imports
import { CharacterCostObject } from "../../../types/costs"

function CharacterAscensionLevel({ character }: { character: CharacterCostObject }) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    const dispatch = useDispatch()

    const { name, element } = character

    const levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]
    const minDistance = 1
    const maxValue = levels.length
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

    const [selected, setSelected] = React.useState(true)
    const handleSelect = () => {
        setSelected(!selected)
    }

    React.useEffect(() => {
        dispatch(updateCharacterCosts({ name: name, type: "level", costs: getCharacterLevelCost(name, sliderValue, selected) }))
        dispatch(updateTotalCosts())
    })

    return (
        <Box sx={{ mb: { xs: "5px", sm: "20px" } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomSwitch checked={selected} onChange={handleSelect} element={element} size="small" sx={{ ml: "-5px" }} />
                <Typography sx={{ fontSize: { xs: "14px", sm: "16px" }, ml: "10px", opacity: selected ? 1 : 0.35 }}>
                    Level
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", my: { xs: "5px", sm: "10px" }, opacity: selected ? 1 : 0.35 }}>
                <Typography sx={{ fontSize: { xs: "12px", sm: "16px" }, minWidth: { xs: "50px", sm: "60px" } }}>
                    Lv. {levels[sliderValue[0] - 1]}
                </Typography>
                <CustomSlider
                    disabled={!selected}
                    value={sliderValue}
                    step={1}
                    min={1}
                    max={maxValue}
                    onChange={handleSliderChange}
                    element={element}
                    disableSwap
                    size={matches ? "small" : "medium"}
                />
                <Typography sx={{ fontSize: { xs: "12px", sm: "16px" }, ml: "25px", width: "90px" }}>
                    Lv. {levels[sliderValue[1] - 1]}
                </Typography>
            </Box>
        </Box>
    )

}

export default CharacterAscensionLevel