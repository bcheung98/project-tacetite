// Component imports
import Image from "../_custom/Image"

// MUI imports
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { formatBossMats, formatCommonMats, formatWeeklyBossMats } from "../../helpers/TooltipText"

// Type imports
import { Materials } from "../../types/materials"

interface CharacterMaterialGridProps {
    materials: Materials,
    size?: string
}

function CharacterMaterialGrid({
    materials,
    size = "48px"
}: CharacterMaterialGridProps) {

    const theme = useTheme()

    const { forgeryMat = "", commonMat = "", ascensionMat = "", bossMat = "", weeklyBossMat = "" } = materials

    const images = [
        { src: `materials/forgery/${forgeryMat}4`, tag: forgeryMat },
        { src: `materials/boss/${bossMat}`, tag: formatBossMats(bossMat) },
        { src: `materials/weekly/${weeklyBossMat}`, tag: formatWeeklyBossMats(weeklyBossMat) },
        { src: `materials/common/${commonMat}4`, tag: formatCommonMats(commonMat) },
        { src: `materials/ascension/${ascensionMat}`, tag: ascensionMat }
    ]

    return (
        <Grid container rowSpacing={0.5} columnSpacing={1}>
            {
                images.map(img =>
                    <Grid size={4}>
                        <Image
                            src={img.src}
                            alt={img.tag}
                            style={{
                                width: size,
                                padding: "4px",
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.materialImage.backgroundColor}`,
                            }}
                            tooltip={{ title: img.tag }}
                        />
                    </Grid>
                )
            }
        </Grid>
    )

}

export default CharacterMaterialGrid