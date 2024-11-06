// Component imports
import MaterialImage from "../../_custom/MaterialImage"

// MUI imports
import Grid from "@mui/material/Grid2"

// Helper imports
import { formatBossMats, formatCommonMats } from "../../../helpers/TooltipText"
import { characterLevel } from "../../../data/levelUpCosts"

// Type imports
import { Materials } from "../../../types/materials"

interface CharacterAscensionMaterialsProps {
    name: string,
    values: number[],
    materials: Materials
}

function CharacterAscensionMaterials({
    name,
    values,
    materials
}: CharacterAscensionMaterialsProps) {

    const [start, stop] = values
    const { bossMat = "", ascensionMat = "", commonMat = "", } = materials

    const materialArray = characterLevel(name)

    const costs = Object.keys(materialArray).map((material) => (materialArray[material].slice(start, stop).reduce((a, c) => a + c)))

    const costData = [
        { name: "Shell Credit", rarity: 3, img: "Credits" },
        { name: formatBossMats(bossMat), rarity: 4, img: `boss/${bossMat}` },
        { name: ascensionMat, rarity: 4, img: `ascension/${ascensionMat}` },
        { name: formatCommonMats(`${commonMat}1`), rarity: 2, img: `common/${commonMat}1` },
        { name: formatCommonMats(`${commonMat}2`), rarity: 3, img: `common/${commonMat}2` },
        { name: formatCommonMats(`${commonMat}3`), rarity: 4, img: `common/${commonMat}3` },
        { name: formatCommonMats(`${commonMat}4`), rarity: 5, img: `common/${commonMat}4` }
    ]

    return (
        <Grid container rowSpacing={1} columnSpacing={2}>
            {
                costData.map((material, index) => (
                    costs[index] !== 0 &&
                    <MaterialImage key={index} name={material.name} rarity={material.rarity} cost={costs[index].toLocaleString()} img={material.img} />
                ))
            }
        </Grid>
    )
}

export default CharacterAscensionMaterials