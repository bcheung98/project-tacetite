import * as React from "react"

// Component imports
import CharacterForteTab from "./CharacterForteTab"

// MUI imports
import { useTheme, useMediaQuery, alpha, Box, Typography, AppBar, Card } from "@mui/material"

// Helper imports
import { TabPanel, StyledTabs, StyledTab } from "../../_styled/StyledTabs"
import { ElementalBorderColor } from "../../../helpers/ElementColors"

// Type imports
import { CharacterProps } from "../../../types/character"
import Image from "../../_custom/Image"

function CharacterForteDisplay({ character }: CharacterProps) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    const { name, weapon, element, forte, materials } = character

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const skillIcon = (index: number) => {
        const selected = index === tabValue
        return {
            width: "48px",
            height: "48px",
            padding: "2px",
            margin: "5px auto 5px auto",
            borderWidth: selected ? "thick" : "2px",
            borderStyle: selected ? "double" : "solid",
            borderColor: selected ? ElementalBorderColor(element) : alpha(ElementalBorderColor(element), 0.3),
            borderRadius: "64px",
            boxShadow: selected ? `0 0 12px 2px ${ElementalBorderColor(element)}` : "none",
        } as React.CSSProperties
    }

    return (
        <Card
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
            <Box>
                <StyledTabs
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleTabChange}
                    scrollButtons="auto"
                    allowScrollButtonsMobile={!matches}
                    sx={{
                        height: "100%",
                        "& .MuiTabScrollButton-root": {
                            color: `${theme.text.color}`,
                            backgroundColor: `${theme.table.header.backgroundColor}`,
                        },
                        ".MuiTabs-scrollButtons.Mui-disabled": {
                            opacity: 0.3
                        },
                        "& .MuiTabs-indicatorSpan": {
                            width: "100%",
                            backgroundColor: ElementalBorderColor(element),
                        },
                    }}
                >
                    {
                        Object.keys(forte).map((key, index) =>
                            <StyledTab
                                key={key}
                                label={
                                    <Image
                                        src={key === "attack" ? `characters/skills/basic_attacks/${weapon}` : `characters/skills/${name.toLowerCase()}_${key}`}
                                        alt={key}
                                        style={skillIcon(index)}
                                    />
                                }
                            />
                        )
                    }
                </StyledTabs>
            </Box>
            {
                Object.keys(forte).map((key, index) =>
                    <TabPanel key={key} index={index} value={tabValue}>
                        <CharacterForteTab skillKey={key} skills={forte} name={name} element={element} materials={materials} />
                    </TabPanel>
                )
            }
        </Card>
    )

}

export default CharacterForteDisplay