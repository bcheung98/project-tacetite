import * as React from "react"
import parse from "html-react-parser"

// Component imports
import CharacterForteScalingTable from "./CharacterForteScalingTable"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Box, CardHeader, Paper } from "@mui/material"

// Helper imports
import { Accordion, AccordionDetails, AccordionSummary } from "../../../helpers/CustomAccordion"
import { ElementalBorderColor } from "../../../helpers/ElementColors"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterForteTab = (props: any) => {

    const theme = useTheme()

    let key = props.skillKey
    let skills = props.skills

    const skillIcon = {
        width: "56px",
        height: "56px",
        border: `2px solid ${ElementalBorderColor(props.element)}`,
        borderRadius: "56px",
        backgroundColor: `${theme.materialImage.backgroundColor}`
    }

    const skillIconSmall = {
        width: "34px",
        height: "34px",
        padding: "5px",
        border: `2px solid ${ElementalBorderColor(props.element)}`,
        borderRadius: "56px",
        backgroundColor: `${theme.materialImage.backgroundColor}`
    }

    return (
        <React.Fragment>
            <Typography variant="subtitle1" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                <i>{FormatSkillKey(key)}</i>
            </Typography>
            <Typography variant="h4" sx={{ color: `${theme.text.color}`, mb: "20px" }}>
                <b>{skills[key].name}</b>
            </Typography>
            <Typography variant="body1" sx={{ color: `${theme.text.color}` }}>
                {parse(skills[key].description)}
            </Typography>
            <br />
            {
                ["attack", "skill", "ultimate", "circuit", "intro"].includes(key) &&
                <Paper variant="outlined"
                    sx={{
                        color: `${theme.text.color}`,
                        border: "none",
                    }}
                >
                    <Accordion sx={{ ml: "-20px" }}>
                        <AccordionSummary>
                            <Typography variant="body1" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Attribute Scaling</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CharacterForteScalingTable stats={skills[key].scaling} />
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            }
            {
                skills[key].nodes &&
                <React.Fragment>
                    <hr style={{ border: `1px solid ${theme.border.color}`, marginTop: "25px", marginBottom: "15px" }} />
                    {
                        skills[key].nodes.map((node: { name: string, type: string, description: string }, index: number) => {
                            return (
                                <Box key={index} sx={{ ml: "-20px", mb: "20px" }}>
                                    {
                                        key === "circuit" ?
                                            <CardHeader
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                avatar={
                                                    <img src={`${process.env.REACT_APP_URL}/characters/skills/${props.character.split(" ").join("_").toLowerCase()}_passive${index + 1}.png`} alt={`Passive ${index}`} style={skillIcon} onError={ErrorLoadingImage} />
                                                }
                                                title={
                                                    <Typography variant="h5" sx={{ color: `${theme.text.color}`, mb: "5px" }}>
                                                        <b>{node.name}</b>
                                                    </Typography>
                                                }
                                            />
                                            :
                                            <CardHeader
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                avatar={
                                                    <img src={`${process.env.REACT_APP_URL}/stat_icons/${node.type.split(" ").join("_")}.png`} alt={`${node.type}+`} style={skillIconSmall} onError={ErrorLoadingImage} />
                                                }
                                                title={
                                                    <Typography variant="h6" sx={{ color: `${theme.text.color}`, mb: "5px", fontWeight: "bold" }}>
                                                        {node.type}+
                                                    </Typography>
                                                }
                                            />
                                    }
                                    <Typography variant="body1" sx={{ color: `${theme.text.color}`, mx: "20px" }}>
                                        {parse(node.description)}
                                    </Typography>
                                </Box>
                            )
                        })
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )

}

export default CharacterForteTab

const FormatSkillKey = (key: string) => {
    switch (key) {
        case "attack":
            key = "Basic Attack"
            break
        case "skill":
            key = "Resonance Skill"
            break
        case "ultimate":
            key = "Resonance Liberation"
            break
        case "circuit":
            key = "Forte Circuit"
            break
        case "intro":
            key = "Intro Skill"
            break
        case "outro":
            key = "Outro Skill"
            break
        default:
            break
    }
    return key
}