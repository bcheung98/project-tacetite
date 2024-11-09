import * as React from "react"
import { useDispatch } from "react-redux"
import parse from "html-react-parser"
import Xarrow from "react-xarrows"

// Component imports
import { CustomSlider } from "../../_styled/StyledSlider"
import { CustomSwitch } from "../../_styled/StyledSwitch"
import Image from "../../_custom/Image"

// MUI imports
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material"

// Helper imports
import { updateCharacterCosts, updateTotalCosts } from "../../../redux/reducers/AscensionPlannerReducer"
import { getCharacterForteCost, getCharacterForteCostNode } from "../../../data/levelUpCosts"
import { NodeIconStyle, SkillIconStyle } from "./_CharacterAscensionCard"

// Type imports
import { CharacterCostObject } from "../../../types/costs"

function CharacterAscensionUltimate({ character }: { character: CharacterCostObject }) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    const dispatch = useDispatch()

    const { name, element, forte } = character

    const minDistance = 1
    const maxValue = 10
    const levels = [...Array(maxValue).keys()].map((i) => i + 1)
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

    const [selectedMainNode, setSelectedMainNode] = React.useState(true)
    const handleSelectMainNode = () => {
        setSelectedMainNode(!selectedMainNode)
    }
    const [selectedNode1, setSelectedNode1] = React.useState(true)
    const handleSelectNode1 = () => {
        setSelectedNode1(!selectedNode1)
    }
    const [selectedNode2, setSelectedNode2] = React.useState(true)
    const handleSelectNode2 = () => {
        setSelectedNode2(!selectedNode2)
    }

    function Nodes() {
        return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Image
                    id={`${name}-ultimate-node1`}
                    src={`stat_icons/${forte.ultimate.nodes[0].type}`}
                    alt={forte.ultimate.nodes[0].type}
                    style={NodeIconStyle(selectedNode1)}
                    tooltip={{ title: parse(forte.ultimate.nodes[0].description) }}
                    onClick={handleSelectNode1}
                />
                <Xarrow start={`${name}-ultimate-node1`} end={`${name}-ultimate-node2`} showHead={false} path="grid" color="lightgray" strokeWidth={3} />
                <Image
                    id={`${name}-ultimate-node2`}
                    src={`stat_icons/${forte.ultimate.nodes[1].type}`}
                    alt={forte.ultimate.nodes[1].type}
                    style={NodeIconStyle(selectedNode2)}
                    tooltip={{ title: parse(forte.ultimate.nodes[1].description) }}
                    onClick={handleSelectNode2}
                />
            </Box>
        )
    }

    React.useEffect(() => {
        dispatch(updateCharacterCosts({ name: name, type: "ultimate", subType: "main", costs: getCharacterForteCost(sliderValue, selectedMainNode) }))
        dispatch(updateCharacterCosts({ name: name, type: "ultimate", subType: "node1", costs: getCharacterForteCostNode("ultimate", 1, selectedNode1) }))
        dispatch(updateCharacterCosts({ name: name, type: "ultimate", subType: "node2", costs: getCharacterForteCostNode("ultimate", 2, selectedNode2) }))
        dispatch(updateTotalCosts())
    })

    return (
        <Box sx={{ mb: "25px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomSwitch checked={selectedMainNode} onChange={handleSelectMainNode} element={element} size="small" sx={{ ml: "-5px" }} />
                <Image
                    id={`${name}-ultimate-main`}
                    src={`characters/skills/${name.toLowerCase()}_ultimate`}
                    alt={`${name.toLowerCase()}_ultimate`}
                    style={SkillIconStyle(selectedMainNode)}
                />
                <Typography sx={{ fontSize: { xs: "14px", sm: "16px" }, opacity: selectedMainNode ? 1 : 0.35 }}>
                    Resonance Liberation
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", my: { xs: "5px", sm: "10px" }, opacity: selectedMainNode ? 1 : 0.35 }}>
                <Typography sx={{ fontSize: { xs: "12px", sm: "16px" }, minWidth: { xs: "50px", sm: "60px" } }}>
                    Lv. {levels[sliderValue[0] - 1]}
                </Typography>
                <CustomSlider
                    disabled={!selectedMainNode}
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
            <Nodes />
        </Box>
    )

}

export default CharacterAscensionUltimate