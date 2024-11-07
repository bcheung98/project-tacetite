// Component imports
import MaterialImage from "../../_custom/MaterialImage"

// MUI imports
import Grid from "@mui/material/Grid2"

// Helper imports
import { formatForgeryMats, formatCommonMats } from "../../../helpers/TooltipText"
import { weaponLevel } from "../../../data/levelUpCosts"

// Type imports
import { Materials } from "../../../types/materials"

interface WeaponAscensionMaterialsProps {
    rarity: number,
    values: number[],
    materials: Materials
}

function WeaponAscensionMaterials({
    rarity,
    values,
    materials
}: WeaponAscensionMaterialsProps) {

    const [start, stop] = values
    const { forgeryMat = "", commonMat = "" } = materials

    const materialArray = weaponLevel(rarity - 1)

    const costs = Object.keys(materialArray).map((material) => materialArray[material].slice(start, stop).reduce((a, c) => a + c))

    const costData = [
        { name: "Shell Credit", rarity: 3, img: "Credits" },
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
        <Grid container rowSpacing={1} columnSpacing={2}>
            {
                costData.map((material, index) =>
                    costs[index] !== 0 &&
                    <MaterialImage key={index} name={material.name} rarity={material.rarity} cost={costs[index].toLocaleString()} img={material.img} />
                )
            }
        </Grid>
    )
}

export default WeaponAscensionMaterials