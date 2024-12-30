// Component imports
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Divider, Card } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { EchoProps } from "types/echo";

function EchoInfo({ echo }: EchoProps) {
    const theme = useTheme();

    const { displayName, code, cost, description } = echo;

    return (
        <Card
            sx={{
                p: "16px",
                backgroundColor: theme.background(2),
            }}
        >
            <Box sx={{ mb: "8px" }}>
                <TextStyled variant="h4-styled">{`${displayName} (${code})`}</TextStyled>
            </Box>
            <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                <InfoChip
                    color="tertiary"
                    label={`${echo.class} Class`}
                    padding="0px"
                />
                <InfoChip
                    color="tertiary"
                    label={`Cost: ${cost}`}
                    padding="0px"
                />
            </FlexBox>
            <Divider sx={{ my: "16px" }} />
            <TextStyled sx={{ fontStyle: "italic" }}>
                {parseSkillDescription(description)}
            </TextStyled>
        </Card>
    );
}

export default EchoInfo;
