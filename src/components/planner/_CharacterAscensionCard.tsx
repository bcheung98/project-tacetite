import * as React from "react"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, CardHeader, ButtonBase } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { Accordion, AccordionDetails, AccordionSummary } from "../../helpers/CustomAccordion"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const CharacterAscensionCard = (props: any) => {

    const theme = useTheme()

    let { name, rarity, element, weapon } = props.character

    const smallIcon = {
        width: "24px",
        height: "24px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "24px",
        marginBottom: "10px",
    }

    return (
        <Box
            sx={{
                width: "750px",
                border: `2px solid ${theme.border.color}`,
                borderRadius: "5px",
                backgroundColor: `${theme.paper.backgroundColor}`,
                mr: "30px",
                mb: "30px",
                p: 1,
            }}
        >
            <CardHeader
                avatar={
                    <Box sx={{ position: "relative" }}>
                        <ButtonBase disableRipple href={`/project-tacetite/character/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <img alt={name} src={(`${process.env.REACT_APP_URL}/characters/icons/${name.split(" ").join("_")}.png`)} style={{ width: "64px", border: `2px solid ${theme.border.color}`, borderRadius: "64px" }} onError={ErrorLoadingImage} />
                        </ButtonBase>
                        <Box sx={{ position: "absolute", top: "50px", left: "-5px" }}>
                            <CustomTooltip title={element} arrow placement="top">
                                <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/elements/icons/${element}.png`)} alt={element} onError={ErrorLoadingImage} />
                            </CustomTooltip>
                        </Box>
                        <Box sx={{ position: "absolute", top: "50px", left: "45px" }}>
                            <CustomTooltip title={weapon} arrow placement="top">
                                <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`)} alt={weapon} onError={ErrorLoadingImage} />
                            </CustomTooltip>
                        </Box>
                    </Box>
                }
                title={
                    <React.Fragment>
                        <ButtonBase disableRipple href={`/project-tacetite/character/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Typography variant="h6" sx={{ color: `${theme.text.color}` }}>
                                {props.character.displayName && props.character.displayName}
                                {props.character.fullName && props.character.fullName}
                                {!props.character.displayName && !props.character.fullName && name}
                            </Typography>
                        </ButtonBase>
                        <Typography sx={{ color: "rgb(255, 208, 112)", textShadow: "#e3721b 1px 1px 10px", userSelect: "none" }} variant="h6">
                            {[...Array(rarity).keys()].map(() => "✦")}
                        </Typography>
                    </React.Fragment>
                }
            />
        </Box>
    )

}

export default CharacterAscensionCard