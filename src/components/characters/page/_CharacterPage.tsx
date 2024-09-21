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
import InfoOutlined from "@mui/icons-material/InfoOutlined"

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
    const handleClickOpen = () => {
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

        if (character.displayName) document.title = `${character.displayName} ${process.env.REACT_APP_DOCUMENT_HEADER}`
        if (character.fullName) document.title = `${character.fullName} ${process.env.REACT_APP_DOCUMENT_HEADER}`
        if (!character.displayName && !character.fullName) document.title = `${name} ${process.env.REACT_APP_DOCUMENT_HEADER}`

        return (
            <React.Fragment>
                <Grid container sx={{ mb: "20px" }}>
                    <Grid xs="auto">
                        <img src={(`${process.env.REACT_APP_URL}/characters/avatars/${name.split(" ").join("_")}.png`)} alt={name}
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
                                            <img src={`${process.env.REACT_APP_URL}/tags/${tag.split(" ").join("_")}.png`} alt={tag} key={tag}
                                                style={{
                                                    height: "36px",
                                                    marginRight: "10px",
                                                    padding: "2.5px",
                                                    border: `2px solid ${Tags[tag as keyof typeof Tags].color}`,
                                                    borderRadius: "15px",
                                                    backgroundColor: `${theme.materialImage.backgroundColor}`,
                                                }}
                                                onError={ErrorLoadingImage}
                                            />
                                        </CustomTooltip>
                                    ))
                                }
                                <CustomTooltip title="Click to view Combat Roles" arrow placement="top">
                                    <InfoOutlined
                                        fontSize="large"
                                        sx={{
                                            color: `${theme.text.color}`,
                                            ml: "5px",
                                            mb: "5px",
                                            cursor: "pointer"
                                        }}
                                        onClick={handleClickOpen}
                                    />
                                </CustomTooltip>
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
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth={false}
                >
                    <Box
                        sx={{
                            backgroundColor: `${theme.paper.backgroundColor}`,
                            border: `2px solid ${theme.border.color}`,
                            borderRadius: "5px",
                            width: "45vw"
                        }}
                    >
                        <AppBar position="static"
                            sx={{
                                backgroundColor: `${theme.appbar.backgroundColor}`,
                                borderBottom: `2px solid ${theme.border.color}`,
                                borderRadius: "5px 5px 0px 0px",
                            }}
                        >
                            <Typography sx={{ m: 2, color: `${theme.text.color}`, fontWeight: "bold" }} variant="h5">
                                Combat Roles
                            </Typography>
                        </AppBar>
                        {
                            tags.map((tag: string, index: number) => (
                                <Box sx={{ mx: "20px" }} key={index}>
                                    <CardHeader
                                        sx={{ ml: "-15px" }}
                                        avatar={
                                            <img src={`${process.env.REACT_APP_URL}/tags/${tag.split(" ").join("_")}.png`} alt={tag} key={tag}
                                                style={{
                                                    height: "48px",
                                                    padding: 2,
                                                    marginRight: "5px",
                                                    marginTop: "3px",
                                                    border: `2px solid ${Tags[tag as keyof typeof Tags].color}`,
                                                    backgroundColor: `${theme.materialImage.backgroundColor}`,
                                                    borderRadius: "15px",
                                                }}
                                                onError={ErrorLoadingImage}
                                            />
                                        }
                                        title={
                                            <Box sx={{ mb: "3px" }}>
                                                <Typography variant="h5" sx={{ color: `${theme.text.color}`, fontWeight: "bold", mb: "7px" }}>
                                                    {tag}
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: "rgb(225, 225, 225)" }}>
                                                    {Tags[tag as keyof typeof Tags].description}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    {index !== tags.length - 1 && <hr style={{ border: `.5px solid ${theme.border.color}`, margin: 0 }} />}
                                </Box>
                            ))
                        }
                    </Box>
                </Dialog>
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