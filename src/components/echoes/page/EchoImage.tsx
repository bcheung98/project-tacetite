import React from "react";

// Component imports
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import { StyledSwitch } from "styled/StyledSwitch";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card } from "@mui/material";

// Helper imports
import { echoes } from "data/common";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { EchoProps } from "types/echo";

function EchoImage({ echo }: EchoProps) {
    const theme = useTheme();

    const rarity = echoes[echo.class].rarity;

    const [selected, setSelected] = React.useState(false);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const imgSrc = !selected
        ? `echoes/icons/${echo.name}`
        : `echoes/icons/${echo.name}_Phantom`;

    return (
        <Card
            sx={{
                backgroundColor: theme.background(2),
                width: "256px",
                height: echo.hasPhantom ? "auto" : "256px",
            }}
        >
            <Image
                src={imgSrc}
                alt={echo.name}
                style={{
                    width: "256px",
                    height: "256px",
                    border: `2px solid ${getRarityColor(rarity)}`,
                    borderRadius: "4px",
                    backgroundColor: theme.background(2),
                    boxShadow: `inset 0 0 64px 8px ${getBackgroundColor(
                        rarity
                    )}`,
                    // backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
                    // backgroundSize: "100%",
                    // backgroundPosition: "center",
                }}
            />
            {echo.hasPhantom && (
                <FlexBox
                    sx={{
                        alignItems: "center",
                        flexWrap: "wrap",
                        mb: "8px",
                    }}
                >
                    <StyledSwitch
                        checked={selected}
                        onChange={handleSelect}
                        sx={{ mt: "4px" }}
                    />
                    <TextStyled>Phantom</TextStyled>
                </FlexBox>
            )}
        </Card>
    );
}

export default EchoImage;
