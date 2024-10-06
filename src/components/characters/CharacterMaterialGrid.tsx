import React from "react"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { formatBossMats, formatCommonMats, formatWeeklyBossMats } from "../../helpers/TooltipText"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const CharacterMaterialGrid = (props: any) => {

    const theme = useTheme()

    let { forgeryMat, commonMat, ascensionMat, bossMat, weeklyBossMat } = props.character.materials

    const materialImage: React.CSSProperties = {
        height: "45px",
        border: `1px solid ${theme.border.color}`,
        borderRadius: "10px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        boxSizing: "content-box",
    }

    return (
        <Grid container rowSpacing={0.5} columnSpacing={1}>
            <Grid size="auto">
                <CustomTooltip title={forgeryMat} arrow placement="top">
                    <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/forgery/${forgeryMat.split(" ").join("_")}4.png`)} alt={forgeryMat} onError={ErrorLoadingImage} />
                </CustomTooltip>
            </Grid>
            <Grid>
                <CustomTooltip title={formatBossMats(bossMat)} arrow placement="top">
                    <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/boss/${bossMat.split(" ").join("_")}.png`)} alt={bossMat} onError={ErrorLoadingImage} />
                </CustomTooltip>
            </Grid>
            <Grid>
                <CustomTooltip title={formatWeeklyBossMats(weeklyBossMat)} arrow placement="top">
                    <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/weekly/${weeklyBossMat.split(" ").join("_")}.png`)} alt={weeklyBossMat} onError={ErrorLoadingImage} />
                </CustomTooltip>
            </Grid>
            <Grid>
                <CustomTooltip title={formatCommonMats(commonMat)} arrow placement="top">
                    <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/common/${commonMat.split(" ").join("_")}4.png`)} alt={commonMat} onError={ErrorLoadingImage} />
                </CustomTooltip>
            </Grid>
            <Grid>
                <CustomTooltip title={ascensionMat} arrow placement="top">
                    <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/ascension/${ascensionMat.split(" ").join("_")}.png`)} alt={ascensionMat} onError={ErrorLoadingImage} />
                </CustomTooltip>
            </Grid>
        </Grid>
    )

}

export default CharacterMaterialGrid