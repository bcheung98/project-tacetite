import * as React from "react"

// Component imports
import WeaponAscensionCardMaterials from "./_WeaponAscensionCardMaterials"
import WeaponAscensionLevel from "./WeaponAscensionLevel"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, CardHeader, ButtonBase } from "@mui/material"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import { Accordion, AccordionDetails, AccordionSummary } from "../../helpers/CustomAccordion"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const WeaponAscensionCard = (props: any) => {

    const theme = useTheme()

    let { name, rarity, type } = props.weapon

    const smallIcon = {
        width: "24px",
        height: "24px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "24px",
        marginBottom: "10px",
    }

    return (
        <Box
            sx={{
                width: "750px",
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
                backgroundColor: `${theme.paper.backgroundColor}`,
                p: 1,
            }}
        >
            <CardHeader
                avatar={
                    <Box sx={{ position: "relative" }}>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/weapons/${props.weapon.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <img
                                src={(`${process.env.REACT_APP_URL}/weapons/${name.split(" ").join("_")}.png`)}
                                alt={name}
                                style={{
                                    width: "64px",
                                    border: `2px solid ${GetRarityColor(rarity)}`,
                                    borderRadius: "64px",
                                    backgroundColor: `${theme.materialImage.backgroundColor}`,
                                    backgroundSize: "100%",
                                    boxShadow: `inset 0 0 25px 5px ${GetBackgroundColor(rarity)}`,
                                }}
                                onError={ErrorLoadingImage}
                            />
                        </ButtonBase>
                        <Box sx={{ position: "absolute", top: "50px", left: "45px" }}>
                            <CustomTooltip title={type} arrow placement="top">
                                <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/weapons/icons/${type}.png`)} alt={type} onError={ErrorLoadingImage} />
                            </CustomTooltip>
                        </Box>
                    </Box>
                }
                title={
                    <React.Fragment>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/weapons/${props.weapon.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Typography variant="h6" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                                {props.weapon.displayName ? props.weapon.displayName : name}
                            </Typography>
                        </ButtonBase>
                        <Typography sx={{ color: `${theme.text.star}`, textShadow: "#e3721b 1px 1px 10px", userSelect: "none" }} variant="h6">
                            {[...Array(rarity).keys()].map(() => "✦")}
                        </Typography>
                    </React.Fragment>
                }
            />
            <hr style={{ border: `.5px solid ${theme.border.color}`, marginTop: "15px", marginBottom: "15px" }} />
            <Box sx={{ ml: "15px" }}>
                <Typography variant="body1" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                    Materials Required
                </Typography>
                <WeaponAscensionCardMaterials weapon={props.weapon} />
            </Box>
            <hr style={{ border: `.5px solid ${theme.border.color}`, marginTop: "15px", marginBottom: "15px" }} />
            <Accordion>
                <AccordionSummary sx={{ mb: "5px" }}>
                    <Typography variant="body1" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                        Edit
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WeaponAscensionLevel weapon={props.weapon} />
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}

export default WeaponAscensionCard