import * as React from "react"
import parse from "html-react-parser"

// Component imports
import Image from "../../_custom/Image"
import CharacterForteScalingTable from "./CharacterForteScalingTable"
import CharacterForteLevelUp from "./CharacterForteLevelUp"
import { Accordion, AccordionDetails, AccordionSummary } from "../../_styled/StyledAccordion"

// MUI imports
import { useTheme, Typography, Box, CardHeader } from "@mui/material"

// Helper imports
import { ElementalBorderColor } from "../../../helpers/ElementColors"

// Type imports
import { CharacterForte, CharacterForteNode, ICharacterForte } from "../../../types/character"
import { Materials } from "../../../types/materials"
import CharacterForteNodeMaterials from "./CharacterForteNodeMaterials"

interface CharacterForteTabProps {
    skillKey: string,
    skills: ICharacterForte,
    name: string,
    element: string,
    materials: Materials
}

function CharacterForteTab({
    skillKey,
    skills,
    name,
    element,
    materials
}: CharacterForteTabProps) {

    const theme = useTheme()

    const key = skillKey as keyof ICharacterForte
    const forte = skills[key] as CharacterForte

    const skillIcon = (key: string) => {
        const size = key === "circuit" ? "48px" : "36px"
        return {
            width: size,
            height: size,
            padding: "2px",
            border: `2px solid ${ElementalBorderColor(element)}`,
            borderRadius: "64px",
            backgroundColor: `${theme.materialImage.backgroundColor}`
        }
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Typography sx={{ mb: "5px", fontSize: "16px", fontWeight: theme.font.styled.weight }}>
                <i>{FormatSkillKey(key)}</i>
            </Typography>
            <Typography sx={{ mb: "20px", fontSize: "32px", fontWeight: theme.font.styled.weight }}>
                {forte.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
                {parse(forte.description)}
            </Typography>
            <br />
            {
                ["attack", "skill", "ultimate", "circuit", "intro"].includes(key) &&
                <Box sx={{ ml: "-20px" }}>
                    <Accordion>
                        <AccordionSummary>
                            <Typography sx={{ fontSize: "16px", fontWeight: theme.font.styled.weight }}>Attribute Scaling</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CharacterForteScalingTable stats={forte.scaling} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Typography sx={{ fontSize: "16px", fontWeight: theme.font.styled.weight }}>Level Up Cost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CharacterForteLevelUp materials={materials} element={element} skillKey={key} />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            }
            {
                forte.nodes &&
                <React.Fragment>
                    <hr style={{ border: `1px solid ${theme.border.color}`, marginTop: "25px", marginBottom: "15px" }} />
                    {
                        forte.nodes.map((node, index) => {
                            let nodeData = getNodeInfo(key, node, index, name)
                            return (
                                <Box key={index} sx={{ mb: "10px" }}>
                                    <CardHeader
                                        avatar={
                                            <Image src={nodeData.img} alt={nodeData.name} style={skillIcon(key)} />
                                        }
                                        title={
                                            <Typography sx={{ fontSize: key === "circuit" ? "20px" : "18px", fontWeight: theme.font.styled.weight }}>
                                                {nodeData.name}
                                            </Typography>
                                        }
                                        sx={{ px: 0 }}
                                    />
                                    <Typography>
                                        {parse(node.description)}
                                    </Typography>
                                    <Accordion sx={{ ml: "-20px", mt: "10px" }}>
                                        <AccordionSummary>
                                            <Typography sx={{ fontSize: "16px", fontWeight: theme.font.styled.weight }}>Unlock Cost</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ ml: "30px" }}>
                                            <CharacterForteNodeMaterials skillKey={key} nodeIndex={index + 1} materials={materials} />
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            )
                        })
                    }
                </React.Fragment>
            }
        </Box>
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

const getNodeInfo = (key: string, node: CharacterForteNode, index: number, name: string) => {
    let nodeName, imgSrc
    if (key === "circuit") {
        nodeName = node.name as string
        imgSrc = `characters/skills/${name.toLowerCase()}_passive${index + 1}`
    }
    else {
        nodeName = `${node.type}+`
        imgSrc = `stat_icons/${node.type}`
    }
    return { name: nodeName, img: imgSrc }
}