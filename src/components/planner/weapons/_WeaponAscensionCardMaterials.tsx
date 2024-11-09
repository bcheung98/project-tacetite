import { useSelector } from "react-redux"

// Component imports
import MaterialImage from "../../_custom/MaterialImage"

// MUI imports
import Grid from "@mui/material/Grid2"

// Helper imports
import { formatForgeryMats, formatCommonMats } from "../../../helpers/TooltipText"
import { WeaponCost, WeaponCostObject } from "../../../types/costs"

// Type imports
import { RootState } from "../../../redux/store"

function WeaponAscensionCardMaterials({ weapon }: { weapon: WeaponCostObject }) {

    const weaponCosts = useSelector((state: RootState) => state.ascensionPlanner.weaponCosts)

    const { name } = weapon
    const { forgeryMat = "", commonMat = "" } = weapon.materials
    const costs = weaponCosts.find((wep: WeaponCostObject) => wep.name === name)?.costs as WeaponCost

    let costArray: number[] = []
    Object.entries(costs).forEach(([key, value]) => {
        if (key === "credits" || key === "tracksOfDestiny") {
            costArray.push(value)
        }
        else {
            Object.entries(value).forEach(([k, v]) => {
                costArray.push(v as number)
            })
        }
    })

    const costData = [
        { name: "Shell Credit", rarity: 3, img: "Credits" },
        { name: "Basic Energy Core", rarity: 2, img: "xp/weaponXP1" },
        { name: "Medium Energy Core", rarity: 3, img: "xp/weaponXP2" },
        { name: "Advanced Energy Core", rarity: 4, img: "xp/weaponXP3" },
        { name: "Premium Energy Core", rarity: 5, img: "xp/weaponXP4" },
        { name: formatForgeryMats(`${forgeryMat}1`), rarity: 2, img: `forgery/${forgeryMat}1` },
        { name: formatForgeryMats(`${forgeryMat}2`), rarity: 3, img: `forgery/${forgeryMat}2` },
        { name: formatForgeryMats(`${forgeryMat}3`), rarity: 4, img: `forgery/${forgeryMat}3` },
        { name: formatForgeryMats(`${forgeryMat}4`), rarity: 5, img: `forgery/${forgeryMat}4` },
        { name: formatCommonMats(`${commonMat}1`), rarity: 2, img: `common/${commonMat}1` },
        { name: formatCommonMats(`${commonMat}2`), rarity: 3, img: `common/${commonMat}2` },
        { name: formatCommonMats(`${commonMat}3`), rarity: 4, img: `common/${commonMat}3` },
        { name: formatCommonMats(`${commonMat}4`), rarity: 5, img: `common/${commonMat}4` },
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

export default WeaponAscensionCardMaterials