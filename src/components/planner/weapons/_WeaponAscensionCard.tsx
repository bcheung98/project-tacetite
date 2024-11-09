import * as React from "react"

// Component imports
import WeaponAscensionCardMaterials from "./_WeaponAscensionCardMaterials"
import WeaponAscensionLevel from "./WeaponAscensionLevel"
import Image from "../../_custom/Image"
import { Accordion, AccordionDetails, AccordionSummary } from "../../_styled/StyledAccordion"

// MUI imports
import { useTheme, Box, Typography, CardHeader, ButtonBase } from "@mui/material"

// Helper imports
import { GetBackgroundColor, GetRarityColor } from "../../../helpers/RarityColors"

// Type imports
import { WeaponCostObject } from "../../../types/costs"

function WeaponAscensionCard({ weapon }: { weapon: WeaponCostObject }) {

    const theme = useTheme()

    const { name, rarity, type } = weapon

    const smallIcon = {
        width: "24px",
        height: "24px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "24px",
        padding: "2px",
        marginBottom: "10px",
    }

    return (
        <Box
            sx={{
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
                backgroundColor: `${theme.paper.backgroundColor}`,
                p: 1,
            }}
        >
            <CardHeader
                avatar={
                    <Box sx={{ position: "relative" }}>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/weapons/${weapon.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Image
                                src={`weapons/${name.split(" ").join("_")}`}
                                alt={name}
                                style={{
                                    width: "64px",
                                    border: `2px solid ${GetRarityColor(rarity)}`,
                                    borderRadius: "64px",
                                    backgroundColor: `${theme.materialImage.backgroundColor}`,
                                    backgroundSize: "100%",
                                    boxShadow: `inset 0 0 25px 5px ${GetBackgroundColor(rarity)}`,
                                }}
                            />
                        </ButtonBase>
                        <Box sx={{ position: "absolute", top: "50px", left: "45px" }}>
                            <Image style={smallIcon} src={`weapons/icons/${type}`} alt={type} tooltip={{ title: type }} />
                        </Box>
                    </Box>
                }
                title={
                    <React.Fragment>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/weapons/${weapon.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Typography variant="h6" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                                {weapon.displayName ? weapon.displayName : name}
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
                <WeaponAscensionCardMaterials weapon={weapon} />
            </Box>
            <hr style={{ border: `.5px solid ${theme.border.color}`, marginTop: "15px", marginBottom: "15px" }} />
            <Accordion>
                <AccordionSummary sx={{ mb: "5px" }}>
                    <Typography variant="body1" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                        Edit
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WeaponAscensionLevel weapon={weapon} />
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}

export default WeaponAscensionCard