// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack } from "@mui/material";

// Helper imports
import { sonataEffects } from "data/sonataEffects";
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { EchoProps } from "types/echo";

function EchoSonata({ echo }: EchoProps) {
    const theme = useTheme();

    return (
        <MainContentBox title="Sonata Effect">
            <Stack spacing={2}>
                {echo.sonata.map((sonata, index) => (
                    <Stack
                        key={index}
                        spacing={2}
                        sx={{
                            p: 2,
                            backgroundColor: theme.background(1, "light"),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Image
                                src={`echoes/sonata/${sonata}`}
                                alt={sonata}
                                style={{ width: "40px" }}
                            />
                            <TextStyled variant="h6-styled">
                                {sonata}
                            </TextStyled>
                        </Stack>
                        <Text>
                            {"2-Pc: "}
                            <span style={{ color: theme.text.description }}>
                                {parseSkillDescription({
                                    description: sonataEffects[sonata]["2pc"],
                                })}
                            </span>
                            <br />
                            {"5-Pc: "}
                            <span style={{ color: theme.text.description }}>
                                {parseSkillDescription({
                                    description: sonataEffects[sonata]["5pc"],
                                })}
                            </span>
                        </Text>
                    </Stack>
                ))}
            </Stack>
        </MainContentBox>
    );
}

export default EchoSonata;
