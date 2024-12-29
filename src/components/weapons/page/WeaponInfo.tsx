import parse from "html-react-parser";

// Component imports
import RarityStars from "custom/RarityStars";
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Divider, Card } from "@mui/material";

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
            <FlexBox
                sx={{ flexWrap: "wrap", columnGap: "16px", rowGap: "8px" }}
            >
                <Image
                    src={`weapons/icons/${type}`}
                    alt={type}
                    style={{ width: "64px" }}
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
            <Divider sx={{ my: "16px" }} />
            <TextStyled sx={{ fontStyle: "italic" }}>
                {parse(description)}
            </TextStyled>
        </Card>
    );
}

export default WeaponInfo;
