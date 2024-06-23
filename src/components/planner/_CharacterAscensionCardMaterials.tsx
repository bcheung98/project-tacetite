import { connect } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { formatXPMats, formatCommonMats, formatWeeklyBossMats, formatBossMats } from "../../helpers/TooltipText"
import { Backgrounds } from "../../helpers/Backgrounds"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../redux/store"

const CharacterAscensionCardMaterials = (props: any) => {

    const theme = useTheme()

    let { name } = props.character
    let { forgeryMat, commonMat, ascensionMat, bossMat, weeklyBossMat } = props.character.materials
    let costs = props.costs.find((char: any) => char.name === name).costs

    const MaterialStyle = {
        mx: "15px",
        my: "10px",
        display: "flex",
    }

    const MaterialImageRootBig = {
        width: "72px",
        mr: "15px",
        mb: "15px",
        backgroundColor: "rgb(34, 35, 36)",
        border: `1px solid ${theme.border.color}`,
        borderRadius: "5px",
    }

    const MaterialImageBig = (rarity: string) => {
        return {
            backgroundImage: "url(" + Backgrounds[rarity as keyof typeof Backgrounds] + ")",
            width: "72px",
            backgroundColor: `${theme.materialImage.backgroundColor}`,
            backgroundSize: "contain",
            borderRadius: "5px 5px 0px 0px"
        }
    }

    const MaterialTextContainer = {
        textAlign: "center",
        mt: "-5px",
    }

    const MaterialText = {
        color: "rgb(208, 208, 208)"
    }

    let costArray = Object.keys(costs).map(key => costs[key][0])
    const [credits, xp1, xp2, xp3, xp4, boss_mat, forgery1, forgery2, forgery3, forgery4, common1, common2, common3, common4, ascension_mat, weekly_boss_mat] = costArray

    return (
        <Grid container sx={MaterialStyle}>
            {
                /* Credits */
                credits !== 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title="Shell Credits" arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/Credits.png`} style={MaterialImageBig("3")} alt="Shell Credits" onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {credits.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* Boss Material */
                boss_mat !== 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatBossMats(`${bossMat}`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/boss/${bossMat}.png`} style={MaterialImageBig("4")} alt={bossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {boss_mat}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* Ascension Material */
                ascension_mat !== 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={ascensionMat} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/ascension/${ascensionMat}.png`} style={MaterialImageBig("1")} alt={bossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {ascension_mat}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T1 Common Material */
                common1 !== 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}1`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat}1.png`} style={MaterialImageBig("2")} alt={commonMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common1}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T2 Common Material */
                common2 !== 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}2`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat}2.png`} style={MaterialImageBig("3")} alt={commonMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common2}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T3 Common Material */
                common3 !== 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}3`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat}3.png`} style={MaterialImageBig("4")} alt={commonMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common3}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T4 Common Material */
                common4 !== 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}4`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat}4.png`} style={MaterialImageBig("5")} alt={commonMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common4}
                        </Typography>
                    </Box>
                </Box>
            }
        </Grid>
    )

}

const mapStateToProps = (state: RootState) => {
    return {
        costs: state.ascensionPlanner.characterCosts
    }
}

export default connect(mapStateToProps)(CharacterAscensionCardMaterials)