import { useTheme } from "@mui/material/styles"

// MUI imports
import { Box } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const CharacterMaterialGrid = (props: any) => {

    const theme = useTheme()

    let { forgeryMat, commonMat, herbMat, bossMat, weeklyBossMat } = props.character.materials

    const materialImage = {
        height: props.size,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "15px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
    }

    return (
        <Box sx={{ ml: "10px" }}>
            <Grid container spacing={1}>
                <Grid xs="auto">
                    <CustomTooltip title={forgeryMat} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/talent_mats/${forgeryMat}3.png`)} alt={forgeryMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid >
                    <CustomTooltip title={weeklyBossMat} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/weekly_boss_mats/${weeklyBossMat.split(" ").join("_")}.png`)} alt={weeklyBossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid>
                    <CustomTooltip title={commonMat} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/common_mats/${commonMat.split(" ").join("_")}3.png`)} alt={commonMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid >
                    <CustomTooltip title={bossMat} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/boss_mats/${bossMat.split(" ").join("_")}.png`)} alt={bossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
                <Grid >
                    <CustomTooltip title={herbMat} arrow placement="top">
                        <img style={materialImage} src={(`${process.env.REACT_APP_URL}/materials/local_specialties/${herbMat.split(" ").join("_")}.png`)} alt={herbMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                </Grid>
            </Grid>
        </Box>
    )

}

CharacterMaterialGrid.defaultProps = {
    size: "48px",
}

export default CharacterMaterialGrid