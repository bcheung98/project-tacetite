import * as React from "react"

// Component imports
import CharacterForteTab from "./CharacterForteTab"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Box, AppBar } from "@mui/material"

// Helper imports
import { TabPanel, StyledTabs, StyledTab } from "../../_styled/StyledTabs"
import { ElementalBorderColor } from "../../../helpers/ElementColors"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

function CharacterForteDisplay(props: any) {

    const theme = useTheme()

    let { name, weapon, element, forte, materials } = props.character

    const skillIcon = {
        width: "48px",
        height: "48px",
        padding: "2px",
        border: `2px solid ${ElementalBorderColor(element)}`,
        borderRadius: "48px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
    }

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Box
            sx={{
                backgroundColor: `${theme.paper.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
            }}
        >
            <AppBar position="static"
                sx={{
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderBottom: `2px solid ${theme.border.color}`,
                    borderRadius: "5px 5px 0px 0px",
                }}
            >
                <Typography
                    sx={{
                        m: 2,
                        color: `${theme.text.color}`,
                        fontSize: "20px",
                        fontWeight: theme.font.styled.weight
                    }}
                >
                    Forte
                </Typography>
            </AppBar>
            <Box sx={{ mt: "10px" }}>
                <StyledTabs value={tabValue} onChange={handleTabChange}>
                    <StyledTab label={<img src={`${process.env.REACT_APP_URL}/characters/skills/basic_attacks/${weapon}.png`} style={skillIcon} alt="Basic ATK" onError={ErrorLoadingImage} />} />
                    <StyledTab label={<img src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_skill.png`} style={skillIcon} alt="Resonance Skill" onError={ErrorLoadingImage} />} />
                    <StyledTab label={<img src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_ultimate.png`} style={skillIcon} alt="Resonance Liberation" onError={ErrorLoadingImage} />} />
                    <StyledTab label={<img src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_circuit.png`} style={skillIcon} alt="Forte Circuit" onError={ErrorLoadingImage} />} />
                    <StyledTab label={<img src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_intro.png`} style={skillIcon} alt="Intro Skill" onError={ErrorLoadingImage} />} />
                    <StyledTab label={<img src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_outro.png`} style={skillIcon} alt="Outro Skill" onError={ErrorLoadingImage} />} />
                </StyledTabs>
            </Box>
            {
                Object.keys(forte).map((key, index) => (
                    <TabPanel key={key} index={index} value={tabValue}>
                        <CharacterForteTab skillKey={key} skills={forte} name={name} element={element} materials={materials} />
                    </TabPanel>
                ))
            }
        </Box>
    )

}

export default CharacterForteDisplay