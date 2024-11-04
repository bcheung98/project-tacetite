// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Card, CardMedia, CardContent, ButtonBase, Box } from "@mui/material"

// Helper imports
import { CustomTooltip } from "../_styled/StyledTooltip"
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const WeaponCard = (props: any) => {

    const theme = useTheme()

    let { name, rarity, type } = props.weapon

    const smallIcon = {
        width: "32px",
        height: "32px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `2px solid ${theme.border.color}`,
        borderRadius: "32px",
        marginBottom: "10px",
        marginLeft: "3px",
    }

    const size = "150px"

    return (
        <Card
            sx={{
                width: size,
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "15px 25px 15px 15px",
            }}
        >
            <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/weapons/${name.split(" ").join("_").toLowerCase()}`} target="_blank">
                <Box>
                    <Box
                        sx={{
                            display: "grid",
                            position: "absolute",
                            top: "10px",
                            left: "5px",
                        }}
                    >
                        <CustomTooltip title={type} arrow placement="top">
                            <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/weapons/icons/${type}.png`)} alt={type} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    </Box>
                    <CardMedia
                        image={`${process.env.REACT_APP_URL}/weapons/${name.split(" ").join("_")}.png`}
                        sx={{ width: size, height: size }}
                    />
                    <Box
                        sx={{
                            mt: "-50px",
                            textAlign: "center",
                            background: `linear-gradient(transparent, ${GetBackgroundColor(rarity)})`,
                            borderBottom: `7px solid ${GetRarityColor(rarity)}`,
                        }}
                    >
                        <Box sx={{ height: "50px" }} />
                    </Box>
                </Box>
            </ButtonBase>
            <CardContent
                sx={{
                    textAlign: "center",
                    backgroundColor: `${theme.table.header.backgroundColor}`,
                    height: "100%"
                }}
            >
                <Box sx={{ textAlign: "center", mt: "-10px" }}>
                    <Typography sx={{ color: `${theme.text.star}`, textShadow: "#e3721b 1px 1px 10px", fontSize: "16pt", userSelect: "none" }} variant="h6">
                        {[...Array(rarity).keys()].map(() => "✦")}
                    </Typography>
                    <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/weapons/${name.split(" ").join("_").toLowerCase()}`} target="_blank">
                        <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                            {props.weapon.displayName ? props.weapon.displayName : name}
                        </Typography>
                    </ButtonBase>
                </Box>
            </CardContent>
        </Card>
    )

}

export default WeaponCard