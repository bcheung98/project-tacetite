import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Card } from "@mui/material";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";

// Type imports
import { Rarity } from "types/_common";

interface MaterialImageProps {
    name: string;
    rarity: Rarity;
    cost: number;
    imgSrc: string;
    size?: string;
    labelColor?: string;
}

function MaterialImage({
    name,
    rarity,
    cost,
    imgSrc,
    size = "72px",
    labelColor,
}: MaterialImageProps) {
    const theme = useTheme();

    const cardStyle: CSSProperties = {
        width: size,
        backgroundColor: theme.appbar.backgroundColor,
    };

    const imgStyle: CSSProperties = {
        width: size,
        height: size,
        backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "contain",
        borderBottom: `2px solid ${getRarityColor(rarity)}`,
    };

    const labelStyle: CSSProperties = {
        padding: "0px 2px 4px",
        textAlign: "center",
        backgroundColor: labelColor || theme.appbar.backgroundColor,
    };

    return (
        <Card sx={cardStyle}>
            <Image
                src={`materials/${imgSrc}`}
                alt={name}
                style={imgStyle}
                tooltip={name}
            />
            <Box sx={labelStyle}>
                <TextStyled
                    sx={{
                        fontSize:
                            cost.toLocaleString().length < 11
                                ? `calc(${size} / 6) !important`
                                : `calc(${size} / 7) !important`,
                        color: theme.appbar.color,
                    }}
                >
                    {cost.toLocaleString()}
                </TextStyled>
            </Box>
        </Card>
    );
}

export default MaterialImage;
