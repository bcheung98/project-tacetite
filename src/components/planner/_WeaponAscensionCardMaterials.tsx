import { connect } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { formatXPMats, formatForgeryMats, formatCommonMats } from "../../helpers/TooltipText"
// import { Backgrounds } from "../../helpers/Backgrounds"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../redux/store"

const WeaponAscensionCardMaterials = (props: any) => {

    const theme = useTheme()

    let { name } = props.weapon
    let { forgeryMat, commonMat } = props.weapon.materials
    let costs = props.costs.find((wep: any) => wep.name === name).costs

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

    const [credits, wep_xp1, wep_xp2, wep_xp3, wep_xp4, forgery1, forgery2, forgery3, forgery4, common1, common2, common3, common4] = Object.keys(costs).map((key: string) => costs[key])

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
                /* T1 Weapon XP Material */
                wep_xp1 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Weapon1")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/wep_xp/Weapon1.png`} style={MaterialImageBig(2)} alt={formatXPMats("Weapon1")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(2)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {wep_xp1}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T2 Weapon XP Material */
                wep_xp2 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Weapon2")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/wep_xp/Weapon2.png`} style={MaterialImageBig(3)} alt={formatXPMats("Weapon2")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(3)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {wep_xp2}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T3 Weapon XP Material */
                wep_xp3 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Weapon3")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/wep_xp/Weapon3.png`} style={MaterialImageBig(4)} alt={formatXPMats("Weapon3")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(4)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {wep_xp3}
                        </Typography>
                    </Box>
                </Box>
            }
            {
                /* T4 Weapon XP Material */
                wep_xp4 > 0 &&
                <Box sx={MaterialImageRootBig}>
                    <CustomTooltip title={formatXPMats("Weapon4")} arrow placement="top">
                        <img src={`${process.env.REACT_APP_URL}/materials/wep_xp/Weapon4.png`} style={MaterialImageBig(5)} alt={formatXPMats("Weapon4")} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                    <Box sx={MaterialTextContainer(5)}>
                        <Typography variant="subtitle2" sx={MaterialText}>
                            {wep_xp4}
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
        </Grid>
    )

}

const mapStateToProps = (state: RootState) => {
    return {
        costs: state.ascensionPlanner.weaponCosts
    }
}

export default connect(mapStateToProps)(WeaponAscensionCardMaterials)