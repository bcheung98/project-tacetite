import * as React from "react"
import { useTheme } from "@mui/material/styles"

// MUI imports
import { Typography, Box } from "@mui/material"

const CharacterForteTab = (props: any) => {

    const theme = useTheme()

    let key = props.skillKey
    let skills = props.skills

    return (
        <React.Fragment>
            <Typography variant="subtitle1" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                <i>{FormatSkillKey(key)}</i>
            </Typography>
            <Typography variant="h4" sx={{ color: `${theme.text.color}`, mb: "5px" }}>
                <b>{skills[key].name}</b>
            </Typography>
            <Typography variant="body1" sx={{ color: `${theme.text.color}` }}>

            </Typography>
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