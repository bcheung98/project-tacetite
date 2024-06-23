import * as React from "react"
import { useDispatch } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"

// Helper imports
import { CustomSlider } from "../../helpers/CustomSlider"
import { CustomSwitch } from "../../helpers/CustomSwitch"
import { updateCharacterCosts } from "../../redux/reducers/AscensionPlannerReducer"
import { CharacterCosts } from "../../helpers/AscensionCostIndex"

const CharacterAscensionLevel = (props: any) => {

    const theme = useTheme()

    const dispatch = useDispatch()

    let { name, element } = props.character

    const levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]
    const minDistance = 1
    let maxValue = levels.length
    const [sliderValue, setSliderValue] = React.useState([1, maxValue]);
    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setSliderValue([clamped, clamped + minDistance]);
            }
            else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setSliderValue([clamped - minDistance, clamped]);
            }
        }
        else {
            setSliderValue(newValue);
        }
    }

    let materialArray = CharacterCosts("level")
    const getCost = (start: number, stop: number) => {
        if (selected) {
            let costArray = materialArray.map((material, index) => (materialArray[index].slice(start, stop).reduce((a, c) => a + c)))
            return {
                credits: costArray[0],
                bossMat: costArray[1],
                ascensionMat: costArray[2],
                common1: costArray[3],
                common2: costArray[4],
                common3: costArray[5],
                common4: costArray[6],
                xp1: costArray[7],
                xp2: costArray[8],
                xp3: costArray[9],
                xp4: costArray[10]
            }
        }
        else {
            return {
                credits: 0,
                bossMat: 0,
                ascensionMat: 0,
                common1: 0,
                common2: 0,
                common3: 0,
                common4: 0,
                xp1: 0,
                xp2: 0,
                xp3: 0,
                xp4: 0,
            }
        }
    }

    React.useEffect(() => {
        dispatch(updateCharacterCosts([name, "level", getCost(sliderValue[0], sliderValue[1])]))
    })

    const [selected, setSelected] = React.useState(true);
    const handleSelect = () => {
        setSelected(!selected)
    }

    return (
        <Box
            sx={{
                mb: "30px",
                mx: "15px",
            }}
            style={selected ? { opacity: "1" } : { opacity: "0.35" }}
        >
            <Box sx={{ display: "flex", alignItems: "center", mb: "10px" }}>
                <CustomSwitch checked={selected} onChange={handleSelect} element={element} />
                <Typography variant="h6" sx={{ color: `${theme.text.color}`, fontWeight: "bold", ml: "15px" }}>
                    Level
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
                <Typography variant="body1" sx={{ color: `${theme.text.color}`, mr: "25px", width: "75px", fontWeight: "bold" }}>
                    Lv. {levels[sliderValue[0] - 1]}
                </Typography>
                <CustomSlider disabled={!selected} value={sliderValue} step={1} min={1} max={maxValue} onChange={handleSliderChange} element={element} disableSwap />
                <Typography variant="body1" sx={{ color: `${theme.text.color}`, ml: "25px", width: "75px", fontWeight: "bold" }}>
                    Lv. {levels[sliderValue[1] - 1]}
                </Typography>
            </Box>
        </Box>
    )

}

export default CharacterAscensionLevel