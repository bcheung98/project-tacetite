import * as React from "react"
import { useSelector } from "react-redux"
import { exportComponentAsJPEG } from "react-component-export-image"

// Component imports
import MaterialImage from "../_custom/MaterialImage"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Button, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { formatXPMats, formatForgeryMats, formatCommonMats, formatWeeklyBossMats, formatBossMats } from "../../helpers/TooltipText"

// Type imports
import { RootState } from "../../redux/store"

function AscensionTotalCost() {

    const theme = useTheme()

    const componentRef = React.useRef() as React.RefObject<React.ReactInstance>

    const totalCosts = useSelector((state: RootState) => state.ascensionPlanner.totalCost)

    // Rarities for each type of material
    // [Start rarity, end rarity]
    const materialRarities = {
        characterXP: [2, 5],
        weaponXP: [2, 5],
        bossMat: [4, 4],
        weeklyBossMat: [4, 4],
        ascensionMat: [1, 1],
        forgeryMat: [2, 5],
        commonMat: [2, 5],
    }

    let costData: { name: string, rarity: number, cost: number, img: string }[] = []
    Object.entries(totalCosts).forEach(([key, value]) => {
        if (key === "credits") {
            costData.push({ name: "Shell Credit", rarity: 3, cost: value, img: "Credits" })
        }
        else {
            let rarityIndex = materialRarities[key as keyof typeof materialRarities]
            let rarity = rarityIndex[0]
            let maxRarity = rarityIndex[1]
            Object.keys(value).forEach((mat) => {
                costData.push({ name: getMaterialName(key, mat), rarity: rarity, cost: value[mat], img: `${getImagePath(key)}/${mat.split(" ").join("_")}` })
                rarity += 1
                if (rarity > maxRarity) {
                    rarity = rarityIndex[0]
                }
            })
        }
    })

    return (
        <React.Fragment>
            {
                Object.values(costData).map((obj) => obj.cost).reduce((a, c) => a + c) > 0 &&
                <React.Fragment>
                    <Button
                        variant="contained"
                        sx={{
                            my: "20px",
                            p: 1,
                        }}
                        onClick={() => exportComponentAsJPEG(componentRef, { fileName: "Materials.jpg" })}
                    >
                        Download as Image
                    </Button>
                    <Box
                        sx={{
                            border: `1px solid ${theme.border.color}`,
                            borderRadius: "5px",
                            backgroundColor: `${theme.paper.backgroundColor}`,
                            mb: "30px",
                            p: 2
                        }}
                        ref={componentRef}
                    >
                        <Typography variant="h6" sx={{ fontFamily: `${theme.font.styled.family}`, color: `${theme.text.color}` }}>
                            Total Materials Required
                        </Typography>
                        <Grid container spacing={1} sx={{ my: "15px" }}>
                            {
                                costData.map((material, index) => (
                                    material.cost !== 0 &&
                                    <MaterialImage key={index} name={material.name} rarity={material.rarity} cost={material.cost.toLocaleString()} img={material.img} size="64px" />
                                ))
                            }
                        </Grid>
                    </Box>
                </React.Fragment>
            }
        </React.Fragment>
    )

}

export default AscensionTotalCost

const getMaterialName = (type: string, material: string) => {
    switch (type) {
        case "characterXP":
        case "weaponXP":
            return formatXPMats(material)
        case "bossMat":
            return formatBossMats(material)
        case "weeklyBossMat":
            return formatWeeklyBossMats(material)
        case "forgeryMat":
            return formatForgeryMats(material)
        case "commonMat":
            return formatCommonMats(material)
        default:
            return material
    }
}

const getImagePath = (type: string) => {
    let path = ""
    switch (type) {
        case "characterXP":
        case "weaponXP":
            path = "xp"
            break
        case "bossMat":
            path = "boss"
            break
        case "weeklyBossMat":
            path = "weekly"
            break
        case "ascensionMat":
            path = "ascension"
            break
        case "forgeryMat":
            path = "forgery"
            break
        case "commonMat":
            path = "common"
            break
        default:
            break
    }
    return path
}