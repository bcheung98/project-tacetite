import { useSelector } from "react-redux"

// Component imports
import MaterialImage from "../../_custom/MaterialImage"

// MUI imports
import Grid from "@mui/material/Grid2"

// Helper imports
import { formatForgeryMats, formatCommonMats, formatWeeklyBossMats, formatBossMats } from "../../../helpers/TooltipText"
import { CharacterCost, CharacterCostObject } from "../../../types/costs"

// Type imports
import { RootState } from "../../../redux/store"
import { reduceCosts } from "../../../redux/reducers/AscensionPlannerReducer"

function CharacterAscensionCardMaterials({ character }: { character: CharacterCostObject }) {

    const characterCosts = useSelector((state: RootState) => state.ascensionPlanner.characterCosts)

    const { name } = character
    const { forgeryMat = "", commonMat = "", ascensionMat = "", bossMat = "", weeklyBossMat = "" } = character.materials
    const costs = characterCosts.find((char: CharacterCostObject) => char.name === name)?.costs as CharacterCost

    let costArray: number[] = []
    Object.entries(reduceCosts(costs)).forEach(([key, value]) => {
        if (key === "credits") {
            costArray.push(value)
        }
        else {
            Object.entries(value).forEach(([k, v]) => {
                !k.startsWith("weaponXP") && costArray.push(v as number)
            })
        }
    })

    const costData = [
        { name: "Shell Credit", rarity: 3, img: "Credits" },
        { name: "Basic Resonance Potion", rarity: 2, img: "xp/characterXP1" },
        { name: "Medium Resonance Potion", rarity: 3, img: "xp/characterXP2" },
        { name: "Advanced Resonance Potion", rarity: 4, img: "xp/characterXP3" },
        { name: "Premium Resonance Potion", rarity: 5, img: "xp/characterXP4" },
        { name: formatBossMats(bossMat), rarity: 4, img: `boss/${bossMat}` },
        { name: formatWeeklyBossMats(weeklyBossMat), rarity: 4, img: `weekly/${weeklyBossMat}` },
        { name: ascensionMat, rarity: 1, img: `ascension/${ascensionMat}` },
        { name: formatForgeryMats(`${forgeryMat}1`), rarity: 2, img: `forgery/${forgeryMat}1` },
        { name: formatForgeryMats(`${forgeryMat}2`), rarity: 3, img: `forgery/${forgeryMat}2` },
        { name: formatForgeryMats(`${forgeryMat}3`), rarity: 4, img: `forgery/${forgeryMat}3` },
        { name: formatForgeryMats(`${forgeryMat}4`), rarity: 5, img: `forgery/${forgeryMat}4` },
        { name: formatCommonMats(`${commonMat}1`), rarity: 2, img: `common/${commonMat}1` },
        { name: formatCommonMats(`${commonMat}2`), rarity: 3, img: `common/${commonMat}2` },
        { name: formatCommonMats(`${commonMat}3`), rarity: 4, img: `common/${commonMat}3` },
        { name: formatCommonMats(`${commonMat}4`), rarity: 5, img: `common/${commonMat}4` }
    ]

    return (
        <Grid container spacing={2} sx={{ my: "15px" }}>
            {
                costData.map((material, index) => (
                    costArray[index] !== 0 &&
                    <MaterialImage key={index} name={material.name} rarity={material.rarity} cost={costArray[index].toLocaleString()} img={material.img} size="64px" />
                ))
            }
        </Grid>
    )
}

export default CharacterAscensionCardMaterials