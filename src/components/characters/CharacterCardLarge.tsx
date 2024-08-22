// Component imports
import CharacterMaterialGrid from "./CharacterMaterialGrid"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Card, CardMedia, CardContent, ButtonBase, Box } from "@mui/material"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const CharacterCardLarge = (props: any) => {

    const theme = useTheme()

    let { name, rarity, element, weapon } = props.character

    const smallIcon = {
        width: "32px",
        height: "32px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `2px solid ${theme.border.color}`,
        borderRadius: "32px",
        marginBottom: "10px",
        marginLeft: "3px",
    }

    return (
        <Card
            sx={{
                mr: "18px",
                mb: "20px",
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `2px solid ${theme.border.color}`,
                borderRadius: "25px 50px 25px 25px",
            }}
        >
            <ButtonBase disableRipple href={`/project-tacetite/character/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                <Box>
                    <Box
                        sx={{
                            display: "grid",
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                        }}
                    >
                        <CustomTooltip title={element} arrow placement="top">
                            <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/elements/icons/${element}.png`)} alt={element} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                        <CustomTooltip title={weapon} arrow placement="top">
                            <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`)} alt={weapon} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    </Box>
                    <CardMedia
                        image={`${process.env.REACT_APP_URL}/characters/avatars/${name.split(" ").join("_")}.png`}
                        sx={{ width: "220px", height: "303px" }}
                    />
                    <Box
                        sx={{
                            mt: "-60px",
                            textAlign: "center",
                            background: `linear-gradient(transparent, ${GetBackgroundColor(rarity)})`,
                            borderBottom: `7px solid ${GetRarityColor(rarity)}`,
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" sx={{ color: "white", textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000", fontWeight: "bold" }}>
                                {name}
                            </Typography>
                            <img src={(`${process.env.REACT_APP_URL}/stars/${rarity}Star.png`)} alt={rarity}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                    height: "25px"
                                }}
                                onError={ErrorLoadingImage}
                            />
                        </Box>
                    </Box>
                </Box>
            </ButtonBase>
            {
                props.showMaterials &&
                <CardContent sx={{ backgroundColor: `${theme.table.header.backgroundColor}`, mb: "-12px" }}>
                    <CharacterMaterialGrid character={props.character} size="32px" />
                </CardContent>
            }
        </Card>
    )

}

export default CharacterCardLarge