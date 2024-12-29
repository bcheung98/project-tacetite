// Component imports
import CharacterSkillLevelUpCost from "./CharacterSkillLevelUpCost";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";
import { getElementColor } from "helpers/elementColors";

// Type imports
import { Element } from "types/_common";
import { CharacterMaterials } from "types/materials";
import { LevelUpCostSkillKeys } from "custom/LevelUpCosts";
import { Skill } from "types/skill";

interface CharacterPassiveProps {
    name: string;
    element: Element;
    passives: [Skill, Skill];
    materials: CharacterMaterials;
}

function CharacterPassive({
    name,
    passives,
    element,
    materials,
}: CharacterPassiveProps) {
    const theme = useTheme();

    return (
        <Stack spacing={4}>
            {[0, 1].map((index) => (
                <Stack key={index} spacing={2}>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Image
                            src={`characters/skills/${name.toLowerCase()}_passive${
                                index + 1
                            }`}
                            alt={`${name.toLowerCase()}_passive${index - 1}`}
                            style={{
                                width: "48px",
                                height: "48px",
                                padding: "4px",
                                border: `2px solid ${getElementColor(
                                    theme,
                                    element
                                )}`,
                                borderRadius: "64px",
                                backgroundColor: theme.appbar.backgroundColor,
                            }}
                        />
                        <TextStyled variant="h6-styled">
                            {passives[index].name}
                        </TextStyled>
                    </Stack>
                    <Text sx={{ color: theme.text.description }}>
                        {parseSkillDescription(passives[index].description)}
                    </Text>
                    <CharacterSkillLevelUpCost
                        type="bonusStat"
                        skillKey={
                            `bonusStat${index + 1}` as LevelUpCostSkillKeys
                        }
                        element={element}
                        materials={materials}
                    />
                </Stack>
            ))}
        </Stack>
    );
}

export default CharacterPassive;
