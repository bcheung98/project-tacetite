// Component imports
import CharacterSkillLevelUpCost from "./CharacterSkillLevelUpCost";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack } from "@mui/material";

// Helper imports
import { elements } from "data/common";
import { getElementColor } from "helpers/elementColors";
import { characterBonusStats } from "data/characterBonusStats";

// Type imports
import { Element } from "types/_common";
import { BonusStat } from "types/character";
import { CharacterMaterials } from "types/materials";
import { LevelUpCostSkillKeys } from "custom/LevelUpCosts";

interface CharacterBonusStatsProps {
    bonusStat: BonusStat;
    element: Element;
    materials: CharacterMaterials;
}

function CharacterBonusStats({
    bonusStat = "",
    element,
    materials,
}: CharacterBonusStatsProps) {
    const theme = useTheme();

    return (
        <Stack spacing={4}>
            {[0, 1].map((index) => (
                <Stack key={index} spacing={2}>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Image
                            src={`stat_icons/${bonusStat}`}
                            alt={bonusStat}
                            style={theme.styles.skillIcon(element, 40)}
                        />
                        <Box>
                            <TextStyled variant="h6-styled">
                                {`${bonusStat}+`}
                            </TextStyled>
                            <Text sx={{ color: theme.text.description }}>
                                <span
                                    style={{
                                        color: elements.includes(
                                            bonusStat.split(" ")[0] as Element
                                        )
                                            ? getElementColor(theme, element)
                                            : theme.text.description,
                                    }}
                                >
                                    {bonusStat}
                                </span>
                                {` increased by ${characterBonusStats[bonusStat][index]}`}
                            </Text>
                        </Box>
                    </Stack>
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

export default CharacterBonusStats;
