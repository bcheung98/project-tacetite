import React from "react";

// Component imports
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box, Card } from "@mui/material";

// Helper imports
import { range } from "helpers/utils";
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponPassive({ weapon }: WeaponProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { stats } = weapon;

    const [sliderValue, setSliderValue] = React.useState(1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = range(1, 5).map((level) => ({
        value: level,
        label: (
            <TextStyled
                variant={
                    sliderValue === level ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === level ? 1 : 0.25,
                }}
            >
                R{level}
            </TextStyled>
        ),
    }));

    const targets = document.getElementsByClassName("weapon-passive-value");
    stats.passive.scaling.forEach((subScaling: string[], index: number) => {
        let target = targets[index];
        if (target) {
            target.innerHTML = subScaling[sliderValue - 1];
        }
    });

    return (
        <Card
            sx={{
                p: "16px",
                backgroundColor: theme.background(2),
            }}
        >
            <TextStyled variant="h6-styled" sx={{ mb: "8px" }}>
                {stats.passive.name}
            </TextStyled>
            <Text sx={{ color: theme.text.description }}>
                {parseSkillDescription(
                    stats.passive.description,
                    "text-refinement",
                    "weapon-passive-value"
                )}
            </Text>
            <Box sx={{ width: { xs: "90%", md: "30vw" }, mt: "16px" }}>
                <StyledSlider
                    value={sliderValue}
                    marks={marks}
                    step={1}
                    min={1}
                    max={5}
                    onChange={handleSliderChange}
                    size={matches_md_up ? "medium" : "small"}
                    sx={{
                        minWidth: "100px",
                        maxWidth: "200px",
                        ml: "8px",
                    }}
                />
            </Box>
        </Card>
    );
}

export default WeaponPassive;
