import { connect } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import { CustomTooltip } from "../_styled/StyledTooltip"
import { formatXPMats, formatForgeryMats, formatCommonMats, formatBossMats, formatWeeklyBossMats } from "../../helpers/TooltipText"
// import { Backgrounds } from "../../helpers/Backgrounds"
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
        backgroundColor: "rgb(31, 30, 31)",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "5px",
    }

    const MaterialImageBig = (rarity: number) => {
        return {
            // backgroundImage: "url(" + Backgrounds[rarity as keyof typeof Backgrounds] + ")",
            width: "72px",
            backgroundColor: `${theme.materialImage.backgroundColor}`,
            backgroundSize: "contain",
            borderRadius: "3px 3px 0px 0px",
            boxShadow: `inset 0 0 35px 10px ${GetBackgroundColor(rarity)}`,
        }
    }

    const MaterialTextContainer = (rarity: number) => {
        return {
            borderTop: `5px solid ${GetRarityColor(rarity)}`,
            textAlign: "center",
            mt: "-5px",
        }
    }

    const MaterialText = {
        color: "rgb(208, 208, 208)"
    }

    let costArray = Object.keys(costs).map(key => costs[key][0] + costs[key].slice(1, 6).map((arr: number[]) => arr.reduce((a: number, c: number) => Number(a) + Number(c))).reduce((a: number, c: number) => Number(a) + Number(c)))
    const [credits, xp1, xp2, xp3, xp4, boss_mat, forgery1, forgery2, forgery3, forgery4, common1, common2, common3, common4, ascension_mat, weekly_boss_mat] = costArray

    return (
        <Grid container sx={MaterialStyle}>
            {
                /* Credits */
                credits > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title="Shell Credits" arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/Credits.png`} style={MaterialImageBig(3)} alt="Shell Credits" onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(3)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {credits.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T1 Character XP Material */
                xp1 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Character1")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/xp/Character1.png`} style={MaterialImageBig(2)} alt={formatXPMats("Character1")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(2)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {xp1}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T2 Character XP Material */
                xp2 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Character2")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/xp/Character2.png`} style={MaterialImageBig(3)} alt={formatXPMats("Character2")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(3)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {xp2}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T3 Character XP Material */
                xp3 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Character3")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/xp/Character3.png`} style={MaterialImageBig(4)} alt={formatXPMats("Character3")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(4)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {xp3}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T4 Character XP Material */
                xp4 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Character4")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/xp/Character4.png`} style={MaterialImageBig(5)} alt={formatXPMats("Character4")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(5)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {xp4}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* Boss Material */
                boss_mat > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatBossMats(`${bossMat}`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/boss/${bossMat.split(" ").join("_")}.png`} style={MaterialImageBig(name.startsWith("Rover-") ? 5 : 4)} alt={bossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(name.startsWith("Rover-") ? 5 : 4)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {boss_mat}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* Ascension Material */
                ascension_mat > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={ascensionMat} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/ascension/${ascensionMat.split(" ").join("_")}.png`} style={MaterialImageBig(1)} alt={ascensionMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(1)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {ascension_mat}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T1 Forgery Material */
                forgery1 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatForgeryMats(`${forgeryMat}1`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/forgery/${forgeryMat.split(" ").join("_")}1.png`} style={MaterialImageBig(2)} alt={`${forgeryMat}1`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(2)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {forgery1}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T2 Forgery Material */
                forgery2 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatForgeryMats(`${forgeryMat}2`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/forgery/${forgeryMat.split(" ").join("_")}2.png`} style={MaterialImageBig(3)} alt={`${forgeryMat}2`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(3)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {forgery2}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T3 Forgery Material */
                forgery3 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatForgeryMats(`${forgeryMat}3`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/forgery/${forgeryMat.split(" ").join("_")}3.png`} style={MaterialImageBig(4)} alt={`${forgeryMat}3`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(4)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {forgery3}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T4 Forgery Material */
                forgery4 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatForgeryMats(`${forgeryMat}4`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/forgery/${forgeryMat.split(" ").join("_")}4.png`} style={MaterialImageBig(5)} alt={`${forgeryMat}4`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(5)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {forgery4}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T1 Common Material */
                common1 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}1`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat.split(" ").join("_")}1.png`} style={MaterialImageBig(2)} alt={`${commonMat}1`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(2)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common1}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T2 Common Material */
                common2 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}2`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat.split(" ").join("_")}2.png`} style={MaterialImageBig(3)} alt={`${commonMat}2`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(3)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common2}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T3 Common Material */
                common3 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}3`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat.split(" ").join("_")}3.png`} style={MaterialImageBig(4)} alt={`${commonMat}3`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(4)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common3}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T4 Common Material */
                common4 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatCommonMats(`${commonMat}4`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/common/${commonMat.split(" ").join("_")}4.png`} style={MaterialImageBig(5)} alt={`${commonMat}4`} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(5)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {common4}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* Weekly Boss Material */
                weekly_boss_mat > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatWeeklyBossMats(`${weeklyBossMat}`)} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/weekly/${weeklyBossMat.split(" ").join("_")}.png`} style={MaterialImageBig(4)} alt={weeklyBossMat} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(4)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {weekly_boss_mat}
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