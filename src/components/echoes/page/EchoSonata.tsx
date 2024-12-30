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
            <Stack spacing={4}>
                {echo.sonata.map((sonata, index) => (
                    <Stack key={index} spacing={2}>
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
                                {parseSkillDescription(
                                    sonataEffects[sonata]["2pc"]
                                )}
                            </span>
                            <br />
                            {"5-Pc: "}
                            <span style={{ color: theme.text.description }}>
                                {parseSkillDescription(
                                    sonataEffects[sonata]["5pc"]
                                )}
                            </span>
                        </Text>
                    </Stack>
                ))}
            </Stack>
        </MainContentBox>
    );
}

export default EchoSonata;
