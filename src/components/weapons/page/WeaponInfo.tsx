import parse from "html-react-parser";

// Component imports
import RarityStars from "custom/RarityStars";
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Divider, Card, Stack } from "@mui/material";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponInfo({ weapon }: WeaponProps) {
    const theme = useTheme();

    const { displayName, rarity, type, description } = weapon;

    return (
        <Card
            sx={{
                p: "16px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "16px", rowGap: "8px" }}
                >
                    <Image
                        src={`weapons/icons/${type}`}
                        alt={type}
                        style={{
                            width: "64px",
                            backgroundColor: theme.appbar.backgroundColor,
                            borderRadius: "64px",
                        }}
                        tooltip={type}
                    />
                    <Box>
                        <Box sx={{ mb: "8px" }}>
                            <TextStyled variant="h4-styled">
                                {displayName}
                            </TextStyled>
                        </Box>
                        <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                            <InfoChip
                                color="tertiary"
                                label={
                                    <RarityStars
                                        rarity={rarity}
                                        variant="h5-styled"
                                    />
                                }
                                padding="0px"
                            />
                        </FlexBox>
                    </Box>
                </FlexBox>
                <TextStyled
                    variant="subtitle1-styled"
                    sx={{ fontStyle: "italic" }}
                >
                    {parse(description)}
                </TextStyled>
            </Stack>
        </Card>
    );
}

export default WeaponInfo;
