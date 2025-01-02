import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack } from "@mui/material";

// Helper imports
import { range } from "helpers/utils";
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { EchoProps } from "types/echo";

function EchoSkill({ echo }: EchoProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { name, skill } = echo;

    const [sliderValue, setSliderValue] = React.useState(5);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = range(2, 5).map((rarity) => ({
        value: rarity,
        label: (
            <TextStyled
                variant={
                    sliderValue === rarity ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === rarity ? 1 : 0.25,
                }}
            >
                {rarity}✦
            </TextStyled>
        ),
    }));

    const targets = document.getElementsByClassName("echo-skill-value");
    skill.scaling.forEach((subScaling: string[], index: number) => {
        let target = targets[index];
        if (target) {
            target.innerHTML = subScaling[sliderValue - 1];
        }
    });

    return (
        <MainContentBox
            title={
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Image
                        src={`echoes/skills/${name}`}
                        alt={name}
                        style={{
                            width: "48px",
                            height: "48px",
                            padding: "4px",
                            border: `2px solid ${theme.border.color.primary}`,
                            borderRadius: "64px",
                            backgroundColor: theme.icon.backgroundColor,
                        }}
                    />
                    <TextStyled variant="h6-styled">Echo Skill</TextStyled>
                </Stack>
            }
        >
            <Stack spacing={2}>
                <Text component="span" sx={{ color: theme.text.description }}>
                    {parseSkillDescription(
                        skill.description,
                        "text-value",
                        "echo-skill-value"
                    )}
                </Text>
                <Text sx={{ color: theme.text.description }}>
                    {"Cooldown: "}
                    <span style={{ color: theme.text.highlight }}>
                        {skill.cooldown}s
                    </span>
                </Text>
                <Box sx={{ width: { xs: "90%", md: "30vw" }, mt: "16px" }}>
                    <StyledSlider
                        value={sliderValue}
                        marks={marks}
                        step={1}
                        min={2}
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
            </Stack>
        </MainContentBox>
    );
}

export default EchoSkill;
