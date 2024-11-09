// Component imports
import CharacterMaterialGrid from "./CharacterMaterialGrid"
import DisplayCard from "../_custom/DisplayCard"
import Image from "../_custom/Image"

// MUI imports
import { useTheme, Typography, Card, CardContent, ButtonBase, Box } from "@mui/material"

// Type imports
import { CharacterProps } from "../../types/character"

function CharacterCard({ character }: CharacterProps) {

    const theme = useTheme()

    const { name, rarity, element, weapon } = character

    return (
        <Card variant="outlined"
            sx={{
                width: 300,
                height: 175,
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
                fontFamily: `${theme.font.styled.family}`
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: "flex", mx: "12px", mt: "10px" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Typography sx={{ fontFamily: theme.font.styled.family, fontWeight: theme.font.styled.weight, fontSize: "20px", color: `${theme.text.color}` }}>
                                {name}
                            </Typography>
                        </ButtonBase>
                    </Box>
                    <Box>
                        <Image src={`elements/icons/${element}`} alt={element} style={{ width: "32px" }} tooltip={{ title: element }} />
                        <Image src={`weapons/icons/${weapon}`} alt={weapon} style={{ width: "32px", marginLeft: "2px" }} tooltip={{ title: weapon }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", mx: "10px", mt: "5px" }}>
                    <Box sx={{ mr: "10px" }}>
                        <DisplayCard name={name} type="character" rarity={rarity} size="96px" disableTooltip disableZoomOnHover />
                    </Box>
                    <Box>
                        <CharacterMaterialGrid materials={character.materials} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )

}

export default CharacterCard