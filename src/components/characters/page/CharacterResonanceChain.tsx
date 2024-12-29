// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { objectKeys } from "helpers/utils";
import { parseSkillDescription } from "helpers/parseSkillDescription";
import { getElementColor } from "helpers/elementColors";

// Type imports
import { CharacterProps } from "types/character";

function CharacterResonanceChain({ character }: CharacterProps) {
    const theme = useTheme();

    const { name, element, resonanceChain } = character;

    return (
        <MainContentBox title="Resonance Chain">
            <Grid container rowSpacing={2} columnSpacing={6}>
                {objectKeys(resonanceChain).map((key, index) => (
                    <Grid
                        key={key}
                        size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{
                            p: 2,
                            backgroundColor: theme.background(2),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <Stack
                            key={index}
                            spacing={2}
                            direction="row"
                            alignItems="center"
                            sx={{ mb: "8px" }}
                        >
                            <Image
                                src={`characters/resonance_chains/${name.toLowerCase()}_${key}`}
                                alt={key}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    padding: "4px",
                                    border: `2px solid ${getElementColor(
                                        theme,
                                        element
                                    )}`,
                                    borderRadius: "64px",
                                }}
                            />
                            <Box>
                                <TextStyled variant="h6-styled">
                                    {resonanceChain[key].name}
                                </TextStyled>
                                <TextStyled sx={{ fontStyle: "italic" }}>
                                    {key.toUpperCase()}
                                </TextStyled>
                            </Box>
                        </Stack>
                        <Text sx={{ color: theme.text.description }}>
                            {parseSkillDescription(
                                resonanceChain[key].description
                            )}
                        </Text>
                    </Grid>
                ))}
            </Grid>
        </MainContentBox>
    );
}

export default CharacterResonanceChain;
