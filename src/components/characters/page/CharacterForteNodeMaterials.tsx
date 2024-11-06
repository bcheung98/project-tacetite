// Component imports
import MaterialImage from "../../_custom/MaterialImage"

// MUI imports
import Grid from "@mui/material/Grid2"

// Helper imports
import { characterForteNode } from "../../../data/levelUpCosts"
import { formatCommonMats, formatForgeryMats, formatWeeklyBossMats } from "../../../helpers/TooltipText"

// Type imports
import { Materials } from "../../../types/materials"

interface CharacterForteNodeMaterialsProps {
    skillKey: string,
    nodeIndex: number,
    materials: Materials
}

function CharacterForteNodeMaterials({
    skillKey,
    nodeIndex,
    materials
}: CharacterForteNodeMaterialsProps) {

    const { forgeryMat = "", commonMat = "", weeklyBossMat = "" } = materials

    const costs = characterForteNode(skillKey, nodeIndex)
    const costData = Object.entries(costs).map(([key, value]) => {
        let [name, rarity, img] = ["", 0, ""]
        let keyNum = Number(key.slice(-1))
        if (key === "credits") {
            name = "Shell Credit"
            rarity = 3
            img = "Credits"
        }
        if (key.slice(0, -1) === "forgeryMat") {
            name = formatForgeryMats(`${forgeryMat}${keyNum}`)
            rarity = keyNum + 1
            img = `forgery/${forgeryMat}${keyNum}`
        }
        if (key.slice(0, -1) === "commonMat") {
            name = formatCommonMats(`${commonMat}${keyNum}`)
            rarity = keyNum + 1
            img = `common/${commonMat}${keyNum}`
        }
        if (key === "weeklyBossMat") {
            name = formatWeeklyBossMats(`${weeklyBossMat}${keyNum}`)
            rarity = 4
            img = `weekly/${weeklyBossMat}`
        }
        return { name: name, rarity: rarity, cost: value.toLocaleString(), img: img }
    })

    return (
        <Grid container rowSpacing={1} columnSpacing={2}>
            {
                costData.map((material, index) =>
                    <MaterialImage key={index} name={material.name} rarity={material.rarity} cost={material.cost} img={material.img} />
                )
            }
        </Grid>
    )

}

export default CharacterForteNodeMaterials