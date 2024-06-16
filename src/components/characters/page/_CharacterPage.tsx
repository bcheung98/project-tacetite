import React from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"

// Component imports
import CharacterStatsTable from "./CharacterStatsTable"
import CharacterForteDisplay from "./CharacterForteDisplay"
import CharacterResonanceChainDisplay from "./CharacterResonanceChainDisplay"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Box, AppBar, Dialog, CardHeader } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import { TabPanel, StyledTabs, StyledTab } from "../../../helpers/CustomTabs"
import { Tags } from "../../../helpers/CharacterTags"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../../redux/store"

const CharacterPage = (props: any) => {

    const theme = useTheme()

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const [open, setOpen] = React.useState(false)
    const [tag, setTag] = React.useState("")
    const handleClickOpen = (e: React.BaseSyntheticEvent) => {
        setTag(e.target.alt)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    let { char_name } = useParams<{ char_name: string }>()
    let { characters } = props
    let character = characters.characters.find((char: { [key: string]: string }) => char.name.split(" ").join("_").toLowerCase() === char_name)

    if (character !== undefined) {

        let { name, title, rarity, element, weapon, tags, description, birthday, nation, release, voiceActors } = character

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
                                <Box sx={{ textAlign: "right", maxWidth: "200px" }}>
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
                                <CustomTooltip title={`${element}`} arrow placement="bottom">
                                    <img
                                        src={`${process.env.REACT_APP_URL}/elements/ui/${element}.png`} alt={`${element}`}
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
                                        variant="h6"
                                        sx={{
                                            my: "2px",
                                            display: { xs: "none", md: "flex" },
                                            color: `${theme.text.color}`,
                                            fontWeight: "500",
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
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                mt: "-6px",
                                                ml: "-5px",
                                                color: "rgb(255, 208, 112)",
                                                textShadow: "#e3721b 1px 1px 10px"
                                            }}
                                        >
                                            {[...Array(rarity).keys()].map(() => "✦")}
                                        </Typography>
                                        <Box sx={{ marginLeft: "5px" }}>
                                            <Typography variant="h6" sx={{ fontWeight: "500", mb: "5px" }}>
                                                • {weapon}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <hr style={{ border: `0.5px solid ${theme.border.color}`, margin: "15px" }} />
                            <Box sx={{ ml: "20px" }}>
                                {
                                    tags.map((tag: string, index: number) => (
                                        <CustomTooltip key={index} title={tag} arrow placement="top">
                                            <img src={`${process.env.REACT_APP_URL}/tags/${tag}.png`} alt={tag} key={tag}
                                                style={{
                                                    height: "36px",
                                                    marginRight: "10px",
                                                    padding: "2.5px",
                                                    border: `2px solid ${Tags[tag as keyof typeof Tags].color}`,
                                                    borderRadius: "15px",
                                                    backgroundColor: `${theme.materialImage.backgroundColor}`,
                                                    cursor: "pointer",
                                                }}
                                                onClick={(e) => handleClickOpen(e)}
                                                onError={ErrorLoadingImage}
                                            />
                                        </CustomTooltip>
                                    ))
                                }
                            </Box>
                            <hr style={{ border: `0.5px solid ${theme.border.color}`, margin: "15px" }} />
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: "20px",
                                    mx: "25px",
                                    fontWeight: "500",
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
                                <StyledTabs value={tabValue} onChange={handleTabChange}>
                                    <StyledTab label="Stats" />
                                    {/* <StyledTab label="Ascension" /> */}
                                </StyledTabs>
                            </AppBar>
                            <TabPanel value={tabValue} index={0}>
                                <CharacterStatsTable character={character} />
                            </TabPanel>
                            {/* <TabPanel value={tabValue} index={1}>

                            </TabPanel> */}
                        </Box>
                    </Grid>
                </Grid>
                <CharacterForteDisplay character={character} />
                <CharacterResonanceChainDisplay character={character} />
                {
                    tag !== "" &&
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth={false}
                    >
                        <Box
                            sx={{
                                p: "15px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                                border: `2px solid ${theme.border.color}`,
                                borderRadius: "5px",
                            }}
                        >
                            <CardHeader
                                sx={{ ml: "-15px" }}
                                avatar={
                                    <img src={`${process.env.REACT_APP_URL}/tags/${tag}.png`} alt={tag} key={tag}
                                        style={{
                                            height: "40px",
                                            padding: "2.5px",
                                            border: `2px solid ${Tags[tag as keyof typeof Tags].color}`,
                                            backgroundColor: `${theme.materialImage.backgroundColor}`,
                                            borderRadius: "15px",
                                        }}
                                        onError={ErrorLoadingImage}
                                    />
                                }
                                title={
                                    <Typography variant="h5" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>
                                        {tag}
                                    </Typography>
                                }
                            />
                            <hr style={{ border: `.5px solid ${theme.border.color}`, marginTop: "15px", marginBottom: "10px" }} />
                            <Typography variant="body1" sx={{ color: `${theme.text.color}`, mb: "5px" }}>
                                {Tags[tag as keyof typeof Tags].description}
                            </Typography>
                        </Box>
                    </Dialog>
                }
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