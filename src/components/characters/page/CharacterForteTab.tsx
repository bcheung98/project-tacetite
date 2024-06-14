import * as React from "react"
import parse from "html-react-parser"

// Component imports
import CharacterForteScalingTable from "./CharacterForteScalingTable"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Box, CardHeader, Paper, AppBar } from "@mui/material"

// Helper imports
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterForteTab = (props: any) => {

    const theme = useTheme()

    let key = props.skillKey
    let skills = props.skills

    const skillIcon = {
        width: "56px",
        height: "56px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "56px",
        backgroundColor: `${theme.paper.backgroundColor}`
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
                    <CharacterForteScalingTable stats={skills[key].scaling} />
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
                                                    <img src={`${process.env.REACT_APP_URL}/characters/skills/${props.character.split(" ").join("_").toLowerCase()}_passive${index}.png`} alt={`Passive ${index}`} style={skillIcon} onError={ErrorLoadingImage} />
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
                                                    <img src={`${process.env.REACT_APP_URL}/stat_icons/${node.type}`} alt={`${node.type}+`} style={skillIcon} onError={ErrorLoadingImage} />
                                                }
                                                title={
                                                    <Typography variant="h6" sx={{ color: `${theme.text.color}`, mb: "5px" }}>
                                                        <b>{node.type}+</b>
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