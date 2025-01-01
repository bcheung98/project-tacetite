// Component imports
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUpCost from "./CharacterSkillLevelUpCost";
import CharacterBonusStats from "./CharacterBonusStats";
import CharacterPassive from "./CharacterPassive";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Divider, Stack } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { Element } from "types/_common";
import {
    CharacterBonusStats as CharacterBonusStatsType,
    CharacterSkillKey,
    CharacterSkills,
} from "types/character";
import { CharacterMaterials } from "types/materials";
import { LevelUpCostSkillKeys } from "custom/LevelUpCosts";

interface CharacterSkillTabProps {
    mode: "table" | "slider";
    name: string;
    skills: CharacterSkills;
    skillKey: CharacterSkillKey;
    element: Element;
    materials: CharacterMaterials;
    bonusStats: CharacterBonusStatsType;
}

export interface CharacterSkillScalingProps {
    mode: "table" | "slider";
    scaling: string[][];
    element: Element;
}

export interface CharacterSkillLevelUpProps {
    type: "skill" | "bonusStat" | "passive";
    skillKey: LevelUpCostSkillKeys;
    element: Element;
    materials: CharacterMaterials;
}

function CharacterSkillTab({
    mode,
    name,
    skills,
    skillKey,
    element,
    materials,
    bonusStats,
}: CharacterSkillTabProps) {
    const theme = useTheme();

    const skill = skills[skillKey];
    const bonusStat = getCharacterStatBonus(skillKey, bonusStats);

    return (
        <Stack spacing={3} divider={<Divider />} sx={{ pb: "16px" }}>
            <Box>
                <TextStyled sx={{ mb: "8px", fontStyle: "italic" }}>
                    {formatSkillKey(skillKey)}
                </TextStyled>
                <TextStyled variant="h5-styled" sx={{ mb: "16px" }}>
                    {skill.name}
                </TextStyled>
                <Text component="span" sx={{ color: theme.text.description }}>
                    {parseSkillDescription(skill.description)}
                </Text>
                <Stack spacing={2} sx={{ mt: "24px" }}>
                    {"scaling" in skill && (
                        <CharacterSkillScaling
                            mode={mode}
                            scaling={skill.scaling}
                            element={element}
                        />
                    )}
                    {skillKey !== "outro" && (
                        <CharacterSkillLevelUpCost
                            type="skill"
                            skillKey={skillKey}
                            element={element}
                            materials={materials}
                        />
                    )}
                </Stack>
            </Box>
            {!["circuit", "outro"].includes(skillKey) && (
                <CharacterBonusStats
                    bonusStat={bonusStat}
                    element={element}
                    materials={materials}
                />
            )}
            {skillKey === "circuit" && (
                <CharacterPassive
                    name={name}
                    passives={[skills.passive1, skills.passive2]}
                    element={element}
                    materials={materials}
                />
            )}
        </Stack>
    );
}

export default CharacterSkillTab;

function formatSkillKey(skill: CharacterSkillKey) {
    switch (skill) {
        case "attack":
            return "Basic Attack";
        case "skill":
            return "Resonance Skill";
        case "ultimate":
            return "Resonance Liberation";
        case "circuit":
            return "Forte Circuit";
        case "intro":
            return "Intro Skill";
        case "outro":
            return "Outro Skill";
    }
}

function getCharacterStatBonus(
    skill: CharacterSkillKey,
    bonusStats: CharacterBonusStatsType
) {
    switch (skill) {
        case "skill":
        case "ultimate":
        case "circuit":
        case "outro":
            return bonusStats[0];
        case "attack":
        case "intro":
            return bonusStats[1];
    }
}
