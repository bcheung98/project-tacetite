import React from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import parse from "html-react-parser"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Box, Avatar, AppBar, Dialog, CardHeader } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { GetBackgroundColor, GetRarityColor } from "../../../helpers/RarityColors"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import { TabPanel, StyledTabs, StyledTab } from "../../../helpers/CustomTabs"
import { Tags } from "../../../helpers/CharacterTags"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../../redux/store"

const WeaponPage = (props: any) => {

    const theme = useTheme()

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    let { wep_name } = useParams<{ wep_name: string }>()
    let { weapons } = props
    let weapon = weapons.weapons.find((wep: { [key: string]: string }) => wep.name.split(" ").join("_").toLowerCase() === wep_name)

    if (weapon !== undefined) {

        let { name, rarity, type, stats, description } = weapon

        if (weapon.displayName) document.title = `${weapon.displayName} - Project Tacetite`
        else document.title = `${name} - Project Tacetite`

        return (
            <React.Fragment>
                <Grid container sx={{ mb: "20px", mt: "10px" }}>
                    <Grid xs="auto">
                        <img
                            src={(`${process.env.REACT_APP_URL}/weapons/${name}.png`)}
                            alt={name}
                            style={{
                                marginLeft: "15px",
                                marginTop: "5px",
                                border: `2px solid ${GetRarityColor(rarity)}`,
                                borderRadius: "15px",
                                backgroundColor: `${theme.materialImage.backgroundColor}`,
                                backgroundSize: "100%",
                                boxShadow: `inset 0 0 50px 20px ${GetBackgroundColor(rarity)}`,
                            }}
                            onError={ErrorLoadingImage}
                        />
                    </Grid>
                    <Grid xs>
                        <Box
                            sx={{
                                p: "15px",
                                mx: "15px",
                                mt: "5px",
                                border: `2px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <CustomTooltip title={`${type}`} arrow placement="bottom">
                                    <Avatar variant="square" src={`${process.env.REACT_APP_URL}/weapons/icons/${type}.png`} alt={type} onError={ErrorLoadingImage} sx={{ marginRight: "-20px", height: "100px", width: "100px", backgroundColor: `${theme.paper.backgroundColor}` }} />
                                </CustomTooltip>
                                <Box sx={{ ml: "30px" }}>
                                    <Typography
                                        variant="h4"
                                        noWrap
                                        sx={{
                                            fontWeight: "bold",
                                            color: `${theme.text.color}`,
                                            textAlign: "center",
                                        }}
                                    >
                                        {weapon.displayName ? weapon.displayName : name}
                                    </Typography>
                                    <Box sx={{ mt: "5px" }}>
                                        <Typography sx={{ color: "rgb(255, 208, 112)", textShadow: "#e3721b 1px 1px 10px", userSelect: "none" }} variant="h4">
                                            {[...Array(rarity).keys()].map(() => "✦")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <hr style={{ border: `0.5px solid ${theme.border.color}`, margin: "15px" }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    mx: "15px",
                                    fontWeight: "500",
                                    color: `${theme.text.color}`,
                                }}
                            >
                                <i>{description}</i>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                p: "15px",
                                mx: "15px",
                                my: "15px",
                                border: `2px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                                color: `${theme.text.color}`,
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold", mx: "15px", }}>
                                {weapon.stats.passive.name}
                            </Typography>
                            <br />
                            <Typography variant="body1" sx={{ fontSize: "11pt", mx: "15px", }}>
                                {parse(weapon.stats.passive.description)}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                {null}
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        weapons: state.weapons
    }
}

export default connect(mapStateToProps)(WeaponPage)