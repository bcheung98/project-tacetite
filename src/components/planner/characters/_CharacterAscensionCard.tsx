import * as React from "react"

// Component imports
import CharacterAscensionCardMaterials from "./_CharacterAscensionCardMaterials"
import CharacterAscensionLevel from "./CharacterAscensionLevel"
import CharacterAscensionBasicATK from "./CharacterAscensionBasicATK"
import CharacterAscensionSkill from "./CharacterAscensionSkill"
import CharacterAscensionUltimate from "./CharacterAscensionUltimate"
import CharacterAscensionCircuit from "./CharacterAscensionCircuit"
import CharacterAscensionIntro from "./CharacterAscensionIntro"
import Image from "../../_custom/Image"
import { Accordion, AccordionDetails, AccordionSummary } from "../../_styled/StyledAccordion"

// MUI imports
import { useTheme, useMediaQuery, Box, Typography, CardHeader, ButtonBase } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { GetBackgroundColor, GetRarityColor } from "../../../helpers/RarityColors"

// Type imports
import { CharacterCostObject } from "../../../types/costs"

function CharacterAscensionCard({ character }: { character: CharacterCostObject }) {

    const theme = useTheme()

    const { name, rarity, element, weapon } = character

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
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Image
                                src={`characters/icons/${name}`}
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
                        <Box sx={{ position: "absolute", top: "50px", left: "-5px" }}>
                            <Image style={smallIcon} src={`elements/icons/${element}`} alt={element} tooltip={{ title: element }} />
                        </Box>
                        <Box sx={{ position: "absolute", top: "50px", left: "45px" }}>
                            <Image style={smallIcon} src={`weapons/icons/${weapon}`} alt={weapon} tooltip={{ title: weapon }} />
                        </Box>
                    </Box>
                }
                title={
                    <React.Fragment>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Typography variant="h6" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                                {character.fullName && character.fullName}
                                {character.displayName && !character.fullName && character.displayName}
                                {!character.displayName && !character.fullName && name}
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
                <CharacterAscensionCardMaterials character={character} />
            </Box>
            <hr style={{ border: `.5px solid ${theme.border.color}`, marginTop: "15px", marginBottom: "15px" }} />
            <Accordion>
                <AccordionSummary sx={{ mb: "5px" }}>
                    <Typography variant="body1" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                        Edit
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CharacterAscensionLevel character={character} />
                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid size={{ xs: 12, lg: 6 }}>
                            <CharacterAscensionBasicATK character={character} />
                            <CharacterAscensionUltimate character={character} />
                            <CharacterAscensionIntro character={character} />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 6 }}>
                            <CharacterAscensionSkill character={character} />
                            <CharacterAscensionCircuit character={character} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}

export default CharacterAscensionCard

export const SkillIconStyle = (selected: boolean): React.CSSProperties => {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    return {
        opacity: selected ? 1 : 0.35,
        width: matches ? "32px" : "40px",
        height: matches ? "32px" : "40px",
        padding: "4px",
        margin: "0 10px 0 10px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "64px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
    }
}

export const NodeIconStyle = (selected: boolean): React.CSSProperties => {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    return {
        opacity: selected ? 1 : 0.35,
        width: matches ? "28px" : "36px",
        height: matches ? "28px" : "36px",
        padding: "4px",
        marginRight: "25px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "64px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        cursor: "pointer"
    }
}