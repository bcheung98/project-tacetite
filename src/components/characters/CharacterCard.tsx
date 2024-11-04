// Component imports
import CharacterMaterialGrid from "./CharacterMaterialGrid"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Card, CardContent, ButtonBase, Box } from "@mui/material"

// Helper imports
import { CustomTooltip } from "../_styled/StyledTooltip"
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const CharacterCard = (props: any) => {

    const theme = useTheme()

    let { name, rarity, element, weapon } = props.character

    const characterIconBackground: React.CSSProperties = {
        margin: "auto",
        marginLeft: "2px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        backgroundSize: "100%",
        border: `2px solid ${GetRarityColor(rarity)}`,
        borderRadius: "15px",
        boxSizing: "content-box",
        width: "96px",
        height: "96px",
        boxShadow: `inset 0 0 30px 5px ${GetBackgroundColor(rarity)}`,
    }

    return (
        <Card variant="outlined"
            sx={{
                width: 300,
                height: 175,
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "15px 25px 15px 15px",
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: "flex", mx: "12px", mt: "10px" }}>
                    <Box sx={{ flexGrow: 1, mb: "5px" }}>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Typography variant="h6" sx={{ fontWeight: "700", color: `${theme.text.color}` }}>
                                {name}
                            </Typography>
                        </ButtonBase>
                    </Box>
                    <Box>
                        <CustomTooltip title={element} arrow placement="top">
                            <img style={{ height: "32px" }} src={(`${process.env.REACT_APP_URL}/elements/icons/${element}.png`)} alt={element} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                        <CustomTooltip title={weapon} arrow placement="top">
                            <img style={{ height: "32px", marginLeft: "2px" }} src={(`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`)} alt={weapon} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", mx: "10px", mt: "5px" }}>
                    <Box sx={{ mr: "15px", textAlign: "center", display: "inline-block", }}>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <img src={`${process.env.REACT_APP_URL}/characters/icons/${name.split(" ").join("_")}.png`} alt={name} style={characterIconBackground} onError={ErrorLoadingImage} />
                        </ButtonBase>
                    </Box>
                    <Box>
                        <CharacterMaterialGrid character={props.character} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )

}

export default CharacterCard