// Compnent imports
import Image from "./Image"

// MUI imports
import { useTheme, SxProps, Box, Card, Typography } from "@mui/material"

// Helper imports
import { GetRarityColor } from "../../helpers/RarityColors"

interface MaterialImageProps {
    name: string,
    rarity: number,
    cost: string | number,
    img: string,
    size?: string
}

function MaterialImage({
    name,
    rarity = 1,
    cost,
    img,
    size = "72px"
}: MaterialImageProps) {

    const theme = useTheme()

    const cardStyle: SxProps = {
        width: size,
        height: "auto",
        background: `rgb(31, 31, 33)`,
        borderRadius: "5px",
        containerType: "inline-size",
        overflow: "hidden"
    }

    const cardImageStyle: React.CSSProperties = {
        width: size,
        height: size,
        padding: "5px",
        // background: `linear-gradient(rgb(43, 45, 49) 85%, ${GetBackgroundColor(rarity, 0.75)} 100%)`,
        backgroundSize: "contain",
        backgroundImage: `url(${process.env.REACT_APP_URL}/backgrounds/Background_${rarity}_Star.png)`
    }

    return (
        <Card sx={cardStyle} elevation={2}>
            <Box sx={{ height: size, overflow: "hidden" }}>
                <Image
                    src={`materials/${img}`}
                    alt={name}
                    style={cardImageStyle}
                    tooltip={{ title: name }}
                />
            </Box>
            <Box
                sx={{
                    borderTop: `2px solid ${GetRarityColor(rarity)}`,
                    textAlign: "right",
                    pr: "2px",
                    py: "1px"
                }}
            >
                <Typography
                    sx={{
                        color: `rgb(208, 208, 208)`,
                        fontFamily: `${theme.font.styled.family}`,
                        fontSize: cost.toLocaleString().length < 11 ? `calc(${size} / 5)` : `calc(${size} / 6)`,
                    }}
                >
                    {cost}
                </Typography>
            </Box>
        </Card>
    )

}

export default MaterialImage