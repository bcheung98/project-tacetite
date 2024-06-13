import React from "react"
import { useTheme } from "@mui/material/styles"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"

// MUI imports
import { Typography, Box, AppBar } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../../redux/store"

const CharacterPage = (props: any) => {

    const theme = useTheme()

    let { char_name } = useParams<{ char_name: string }>()
    let { characters } = props
    let character = characters.characters.find((char: { [key: string]: string }) => char.name.split(" ").join("_").toLowerCase() === char_name)

    if (character !== undefined) {

        let { name, title, rarity, element, weapon, description, birthday, nation, release, voiceActors } = character

        if (character.displayName) document.title = `${character.displayName} - Project Tacetite`
        if (character.fullName) document.title = `${character.fullName} - Project Tacetite`
        if (!character.displayName && !character.fullName) document.title = `${name} - Project Tacetite`

        return (
            <React.Fragment>
                <Grid container sx={{ mb: "20px" }}>
                    <Grid xs="auto">
                        <img src={(`${process.env.REACT_APP_URL}/characters/avatars/${name}.png`)} alt={name}
                            style={{
                                height: "550px",
                                objectFit: "contain",
                                marginLeft: "15px",
                                marginTop: "15px",
                                border: `2px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                                // cursor: "pointer",
                            }}
                            onError={ErrorLoadingImage}
                        />
                        <Box
                            sx={{
                                border: `2px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                color: `${theme.text.color}`,
                                backgroundColor: `${theme.paper.backgroundColor}`,
                                ml: "15px",
                                mt: "10px",
                                px: "10px",
                                py: "10px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}>
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="body2"><b>Nation</b></Typography>
                                    <Typography variant="body2"><b>Birthday</b></Typography>
                                    <Typography variant="body2"><b>Release Date</b></Typography>
                                    <Typography variant="body2"><b>Voice Actor (EN)</b></Typography>
                                    <Typography variant="body2"><b>Voice Actor (JP)</b></Typography>
                                </Box>
                                <Box sx={{ textAlign: "right" }}>
                                    <Typography variant="body2">{nation}</Typography>
                                    <Typography variant="body2">{birthday}</Typography>
                                    <Typography variant="body2">{`${release.date} (${release.version})`}</Typography>
                                    <Typography variant="body2">{voiceActors["en"]}</Typography>
                                    <Typography variant="body2">{voiceActors["jp"]}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs>
                        <Box
                            sx={{
                                p: "5px",
                                mx: "15px",
                                marginTop: "15px",
                                border: `2px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <CustomTooltip title={`${element}`} arrow placement="top">
                                    <img
                                        src={`${process.env.REACT_APP_URL}/elements/${element}.png`} alt={`${element}`}
                                        style={{
                                            marginRight: "-20px",
                                            height: "128px",
                                            width: "128px",
                                        }}
                                        onError={ErrorLoadingImage}
                                    />
                                </CustomTooltip>
                                <Box sx={{ ml: "20px" }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            mt: "10px",
                                            display: { xs: "none", md: "flex" },
                                            fontWeight: "bolder",
                                            color: `${theme.text.color}`,
                                            textDecoration: "none",
                                            textAlign: "center",
                                        }}
                                    >
                                        {character.displayName && character.displayName}
                                        {character.fullName && character.fullName}
                                        {!character.displayName && !character.fullName && name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            my: "2px",
                                            display: { xs: "none", md: "flex" },
                                            color: `${theme.text.color}`,
                                            fontWeight: "450",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "left",
                                            color: `${theme.text.color}`
                                        }}
                                    >
                                        <Box sx={{ marginLeft: "-5px" }}>
                                            <img style={{ height: "30px" }} src={`${process.env.REACT_APP_URL}/stars/${rarity}Star.png`} alt={rarity} onError={ErrorLoadingImage} />
                                        </Box>
                                        <Box sx={{ marginLeft: "5px" }}>
                                            <Typography variant="h6" sx={{ fontWeight: "450", mb: "5px" }}>
                                                • {weapon}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <hr style={{ border: `0.5px solid ${theme.border.color}`, margin: "0px 15px 15px 15px" }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: "20px",
                                    mx: "25px",
                                    fontFamily: "Genshin, sans-serif",
                                    color: `${theme.text.color}`,
                                }}
                            >
                                <i>{description}</i>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                p: 0,
                                mx: "15px",
                                marginTop: "15px",
                                border: `2px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                            }}
                        >
                            <AppBar position="static"
                                sx={{
                                    backgroundColor: `${theme.appbar.backgroundColor}`,
                                    borderBottom: `2px solid ${theme.border.color}`,
                                    borderRadius: "5px 5px 0px 0px",
                                }}
                            >

                            </AppBar>
                        </Box>
                    </Grid>
                </Grid>
            </React.Fragment>
        )

    }
    else {
        return (
            <React.Fragment>
                {null}
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        characters: state.characters
    }
}

export default connect(mapStateToProps)(CharacterPage)