// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { formatBossMats, formatCommonMats, formatWeeklyBossMats } from "../../helpers/TooltipText"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const CharacterMaterialGrid = (props: any) => {

    const theme = useTheme()

    let { forgeryMat, commonMat, ascensionMat, bossMat, weeklyBossMat } = props.character.materials

    const materialImage = {
        height: "48px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "15px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
    }

    return (
        <Box
            sx={{
                display: "block",
                margin: "auto",
                width: "100%",
            }}
        >
            <Grid container spacing={0.6}>
                <Grid xs="auto">
                    <CustomTooltip title={forgeryMat} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/forgery/${forgeryMat}4.png`)} alt={forgeryMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid >
                    <CustomTooltip title={formatBossMats(bossMat)} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/boss/${bossMat}.png`)} alt={bossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid >
                    <CustomTooltip title={formatWeeklyBossMats(weeklyBossMat)} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/weekly/${weeklyBossMat}.png`)} alt={weeklyBossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid>
                    <CustomTooltip title={formatCommonMats(commonMat)} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/common/${commonMat}4.png`)} alt={commonMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid >
                    <CustomTooltip title={ascensionMat} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/ascension/${ascensionMat}.png`)} alt={ascensionMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
            </Grid>
        </Box>
    )

}

export default CharacterMaterialGrid