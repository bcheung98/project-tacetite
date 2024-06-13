import { useTheme } from "@mui/material/styles"

// Component imports
import CharacterMaterialGrid from "./CharacterMaterialGrid"

// MUI imports
import { Typography, Card, CardContent, ButtonBase, Box } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const CharacterCard = (props: any) => {

    const theme = useTheme()

    let { name, rarity, element, weapon } = props.character

    const characterIconBackground = {
        margin: "auto",
        marginLeft: "2px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        backgroundSize: "100%",
        border: `1px solid ${theme.border.color}`,
        borderRadius: "15px",
        width: "100px",
        height: "100px",
        boxShadow: `inset 0 0 30px ${GetBackgroundColor(rarity)}`,
        borderBottom: `8px solid ${GetRarityColor(rarity)}`,
    }

    return (
        <Card variant="outlined"
            sx={{
                width: 320,
                height: 195,
                mr: "15px",
                mb: "15px",
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "25px 25px 50px 25px",
            }}
        >
            <CardContent sx={{ py: "10px" }}>
                <Box
                    sx={{
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <ButtonBase disableRipple href={`/project-tacetite/character/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                        <Typography variant="h5" sx={{ color: `${theme.text.color}`, fontWeight: "500" }}>
                            {name}
                        </Typography>
                    </ButtonBase>
                    <Box
                        sx={{
                            display: "flex",
                            position: "absolute",
                            right: "-5px"
                        }}
                    >
                        <CustomTooltip title={element} arrow placement="top">
                            <img style={{ height: "36px", width: "36px", marginRight: "1px" }} src={(`${process.env.REACT_APP_URL}/elements/${element}.png`)} alt={element} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                        <CustomTooltip title={weapon} arrow placement="top">
                            <img style={{ height: "36px", width: "36px" }} src={(`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`)} alt={weapon} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    </Box>
                </Box>
                <Grid container sx={{ mt: "12px" }}>
                    <Grid xs>
                        <Box sx={{ width: "105px" }}>
                            <ButtonBase disableRipple href={`/project-tacetite/character/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                                <img src={`${process.env.REACT_APP_URL}/characters/icons/${name}.png`} alt={name} style={characterIconBackground} onError={ErrorLoadingImage} />
                            </ButtonBase>
                            <img src={(`${process.env.REACT_APP_URL}/stars/${rarity}Star.png`)} alt={rarity}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    marginTop: "5px",
                                    width: "95%",
                                }}
                                onError={ErrorLoadingImage}
                            />
                        </Box>
                    </Grid>
                    <Grid xs={7}>
                        <CharacterMaterialGrid character={props.character} />
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )

}

export default CharacterCard