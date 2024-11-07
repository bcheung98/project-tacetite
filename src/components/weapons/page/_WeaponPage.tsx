import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import parse from "html-react-parser"

// Component imports
import WeaponStatsTable from "./WeaponStatsTable"
import WeaponAscension from "./WeaponAscension"
import { CustomTooltip } from "../../_styled/StyledTooltip"
import { CustomSlider } from "../../_styled/StyledSlider"
import { TabPanel, StyledTabs, StyledTab } from "../../_styled/StyledTabs"

// MUI imports
import { useTheme, Typography, Box, Avatar, AppBar } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { GetBackgroundColor, GetRarityColor } from "../../../helpers/RarityColors"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../../redux/store"
import { Weapon } from "../../../types/weapon"

function WeaponPage() {

    const theme = useTheme()

    const { wep_name } = useParams<{ wep_name: string }>()
    const weapons = useSelector((state: RootState) => state.weapons.weapons)
    const weapon = weapons.find((wep: Weapon) => wep.name.split(" ").join("_").toLowerCase() === wep_name)

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const maxValue = 5
    const [sliderValue, setSliderValue] = React.useState(1)
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number)
    }
    let scaling
    if (weapon !== undefined) {
        scaling = weapon.stats.passive.scaling
    }
    let targets = document.getElementsByClassName("text-refinement")
    if (scaling !== undefined) {
        scaling.forEach((subScaling: string[], index: number) => {
            let target = targets[index]
            if (target !== undefined) { target.innerHTML = subScaling[sliderValue - 1] }
        })
    }

    if (weapon !== undefined) {

        const { name, rarity, type, stats, description } = weapon

        if (weapon.displayName) document.title = `${weapon.displayName} ${process.env.REACT_APP_DOCUMENT_HEADER}`
        else document.title = `${name} ${process.env.REACT_APP_DOCUMENT_HEADER}`

        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid size="auto">
                        <img
                            src={(`${process.env.REACT_APP_URL}/weapons/${name.split(" ").join("_")}.png`)}
                            alt={name}
                            style={{
                                border: `2px solid ${GetRarityColor(rarity)}`,
                                borderRadius: "15px",
                                backgroundColor: `${theme.materialImage.backgroundColor}`,
                                backgroundSize: "100%",
                                boxShadow: `inset 0 0 50px 20px ${GetBackgroundColor(rarity)}`,
                            }}
                            onError={ErrorLoadingImage} />
                    </Grid>
                    <Grid size="grow">
                        <Box
                            sx={{
                                px: "5px",
                                py: "15px",
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CustomTooltip title={`${type}`} arrow placement="bottom">
                                    <Avatar variant="square" src={`${process.env.REACT_APP_URL}/weapons/icons/${type}.png`} alt={type} onError={ErrorLoadingImage} sx={{ marginRight: "-20px", height: "96px", width: "96px", backgroundColor: `${theme.paper.backgroundColor}` }} />
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
                                        <Typography sx={{ color: `${theme.text.star}`, textShadow: "#e3721b 1px 1px 10px", userSelect: "none" }} variant="h4">
                                            {[...Array(rarity).keys()].map(() => "✦")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <hr style={{ border: `0.5px solid ${theme.border.color}`, margin: "15px" }} />
                            <Typography
                                variant="body1"
                                sx={{
                                    m: "15px",
                                    fontWeight: "500",
                                    color: `${theme.text.color}`,
                                }}
                            >
                                <i>{description}</i>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                px: "5px",
                                py: "15px",
                                my: "15px",
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                                color: `${theme.text.color}`,
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold", mx: "15px", }}>
                                {stats.passive.name}
                            </Typography>
                            <br />
                            <Typography variant="body1" sx={{ color: `${theme.text.color}`, mx: "15px" }}>
                                {parse(stats.passive.description)}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", width: "20%", mt: "15px", mx: "15px", }}>
                                <Typography variant="h6" sx={{ fontWeight: "500", color: `${theme.text.color}`, minWidth: "50px" }}>
                                    R{sliderValue}
                                </Typography>
                                <CustomSlider
                                    value={sliderValue}
                                    step={1}
                                    min={1}
                                    max={maxValue}
                                    onChange={handleSliderChange}
                                    element=""
                                    sx={{ minWidth: "100px" }} />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                p: 0,
                                marginTop: "15px",
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                            }}
                        >
                            <AppBar position="static"
                                sx={{
                                    backgroundColor: `${theme.appbar.backgroundColor}`,
                                    borderBottom: `1px solid ${theme.border.color}`,
                                    borderRadius: "5px 5px 0px 0px",
                                }}
                            >
                                <StyledTabs value={tabValue} onChange={handleTabChange}>
                                    <StyledTab label="Stats" />
                                    <StyledTab label="Ascension" />
                                </StyledTabs>
                            </AppBar>
                            <TabPanel value={tabValue} index={0}>
                                <WeaponStatsTable weapon={weapon} />
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <WeaponAscension weapon={weapon} />
                            </TabPanel>
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

export default WeaponPage