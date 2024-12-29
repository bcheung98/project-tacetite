// Component imports
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Card, Divider } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";
import RarityStars from "custom/RarityStars";
import CharacterCombatRoles from "./CharacterCombatRoles";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const {
        fullName,
        title,
        rarity,
        element,
        weapon,
        combatRoles,
        description,
    } = character;

    return (
        <Card
            sx={{
                p: "16px 32px",
                backgroundColor: theme.background(2),
            }}
        >
            <FlexBox
                sx={{ flexWrap: "wrap", columnGap: "32px", rowGap: "8px" }}
            >
                <Image
                    src={`elements/${element}`}
                    alt={element}
                    style={{ width: "64px" }}
                    tooltip={element}
                />
                <Box>
                    <Box sx={{ mb: "8px" }}>
                        <TextStyled variant="h4-styled">{fullName}</TextStyled>
                        {title && (
                            <TextStyled sx={{ mt: "4px", fontStyle: "italic" }}>
                                {title}
                            </TextStyled>
                        )}
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
                        <InfoChip
                            color="tertiary"
                            src={`weapons/icons/${weapon}`}
                            label={weapon}
                        />
                    </FlexBox>
                </Box>
            </FlexBox>
            <Divider sx={{ my: "16px" }} />
            <CharacterCombatRoles roles={combatRoles} />
            <Divider sx={{ my: "16px" }} />
            <TextStyled sx={{ fontStyle: "italic" }}>{description}</TextStyled>
        </Card>
    );
}

export default CharacterInfoMain;
