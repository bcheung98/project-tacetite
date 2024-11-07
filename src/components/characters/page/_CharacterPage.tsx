import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// Component imports
import CharacterStatsTable from "./CharacterStatsTable"
import CharacterAscension from "./CharacterAscension"
import CharacterForteDisplay from "./CharacterForteDisplay"
import CharacterResonanceChainDisplay from "./CharacterResonanceChainDisplay"
import Image from "../../_custom/Image"
import { CustomTooltip } from "../../_styled/StyledTooltip"
import { TabPanel, StyledTabs, StyledTab } from "../../_styled/StyledTabs"

// MUI imports
import { useTheme, useMediaQuery, Typography, Box, AppBar, Dialog, TableContainer, Table, TableBody, TableRow, TableCell, IconButton } from "@mui/material"
import Grid from "@mui/material/Grid2"
import InfoOutlined from "@mui/icons-material/InfoOutlined"
import CloseIcon from "@mui/icons-material/Close"

// Helper imports
import { Tags } from "../../../data/CharacterTags"

// Type imports
import { RootState } from "../../../redux/store"
import { Character, CharacterProps } from "../../../types/character"

function CharacterPage() {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const { char_name } = useParams<{ char_name: string }>()
    const characters = useSelector((state: RootState) => state.characters.characters)
    const character = characters.find((char: Character) => char.name.split(" ").join("_").toLowerCase() === char_name)

    if (character !== undefined) {

        const { name, birthday, nation, release, voiceActors } = character

        const rows = [
            { key: "Nation", value: nation },
            { key: "Birthday", value: birthday },
            { key: "Release", value: `${release.date} (${release.version})` },
            { key: "Voice Actor (EN)", value: voiceActors["en"] },
            { key: "Voice Actor (JP)", value: voiceActors["jp"] },
        ]

        if (character.displayName) document.title = `${character.displayName} ${process.env.REACT_APP_DOCUMENT_HEADER}`
        if (character.fullName) document.title = `${character.fullName} ${process.env.REACT_APP_DOCUMENT_HEADER}`
        if (!character.displayName && !character.fullName) document.title = `${name} ${process.env.REACT_APP_DOCUMENT_HEADER}`

        return (
            <React.Fragment>
                <Grid container spacing={3} sx={{ mb: "20px" }}>
                    <Grid size={{ xs: 12, sm: "auto" }}>
                        {!matches && <CharacterInfoMain character={character} />}
                        <Image
                            src={`characters/avatars/${name}`}
                            alt={name}
                            style={{
                                width: matches ? "30vw" : "90vw",
                                height: "600px",
                                objectFit: "cover",
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                backgroundColor: `${theme.paper.backgroundColor}`,
                                // cursor: "pointer",
                            }}
                        />
                        <Box
                            sx={{
                                py: "10px",
                                mt: "10px",
                                width: { xs: "90vw", sm: "30vw" },
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "5px",
                                color: `${theme.text.color}`,
                                backgroundColor: `${theme.paper.backgroundColor}`,
                            }}
                        >
                            <TableContainer>
                                <Table size="small">
                                    <TableBody>
                                        {
                                            rows.map((row) =>
                                                <TableRow key={row.key}>
                                                    <TableCell sx={{ color: `${theme.text.color}`, border: "none", py: "1.5px" }}>
                                                        <b>{row.key}</b>
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ color: `${theme.text.color}`, border: "none", py: "1.5px" }}>
                                                        {row.value}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: "grow" }} sx={{ mb: "20px" }}>
                        <Box>
                            {matches && <CharacterInfoMain character={character} />}
                            <Box
                                sx={{
                                    p: 0,
                                    mt: "15px",
                                    border: `1px solid ${theme.border.color}`,
                                    borderRadius: "5px",
                                    backgroundColor: `${theme.paper.backgroundColor}`,
                                }}
                            >
                                <AppBar position="static"
                                    sx={{
                                        backgroundColor: `${theme.appbar.backgroundColor}`,
                                        borderBottom: `1px solid ${theme.border.color}`,
                                        borderRadius: "5px 5px 0px 0px",
                                    }}
                                >
                                    <StyledTabs value={tabValue} onChange={handleTabChange}>
                                        <StyledTab label="Stats" />
                                        <StyledTab label="Ascension" />
                                    </StyledTabs>
                                </AppBar>
                                <TabPanel value={tabValue} index={0}>
                                    <CharacterStatsTable character={character} />
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    <CharacterAscension character={character} />
                                </TabPanel>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <CharacterForteDisplay character={character} />
                <CharacterResonanceChainDisplay character={character} />
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

export default CharacterPage

function CharacterInfoMain({ character }: CharacterProps) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    const { name, title, rarity, element, weapon, tags, description } = character

    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    p: "5px",
                    mb: "15px",
                    width: { xs: "90vw", sm: "auto" },
                    border: `1px solid ${theme.border.color}`,
                    borderRadius: "5px",
                    backgroundColor: `${theme.paper.backgroundColor}`,
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <Image
                        src={`elements/ui/${element}`}
                        alt={element}
                        style={{
                            margin: matches ? "auto 10px auto 10px" : "auto 0 auto 0",
                            width: matches ? "128px" : "96px",
                        }}
                        tooltip={{ title: element }}
                    />
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: `${theme.font.styled.family}`,
                                fontSize: { xs: "24px", sm: "32px" },
                                fontWeight: theme.font.styled.weight
                            }}
                        >
                            {character.displayName && character.displayName}
                            {character.fullName && character.fullName}
                            {!character.displayName && !character.fullName && name}
                        </Typography>
                        <Typography
                            sx={{
                                my: "2px",
                                fontFamily: `${theme.font.styled.family}`,
                                fontSize: { xs: "16px", sm: "18px" },
                                color: `${theme.text.color}`,
                                fontStyle: "italic",
                            }}
                        >
                            {title}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ ml: "-2.5px" }}>
                                <Typography sx={{ color: theme.text.star, fontSize: { xs: "24px", sm: "30px" }, textShadow: "#e3721b 1px 1px 10px", userSelect: "none" }}>
                                    {[...Array(rarity).keys()].map(() => "✦")}
                                </Typography>
                            </Box>
                            <Box sx={{ mx: "5px" }}>
                                <Typography sx={{ fontSize: "24px", fontFamily: "Rowdies", userSelect: "none" }}>
                                    •
                                </Typography>
                            </Box>
                            <Image
                                src={`weapons/icons/${weapon}`}
                                alt={weapon}
                                style={{ height: matches ? "30px" : "24px" }}
                                tooltip={{ title: weapon, placement: "bottom" }}
                            />
                        </Box>
                    </Box>
                </Box>
                <hr style={{ border: `0.5px solid ${theme.border.color}`, margin: "10px 15px 15px 15px" }} />
                <Box sx={{ m: "20px", display: "flex", alignItems: "center" }}>
                    <Grid container spacing={1} sx={{ mr: "15px" }}>
                        {
                            tags.map((tag: string, index: number) =>
                                <Image
                                    key={index}
                                    src={`tags/${tag}`}
                                    alt={tag}
                                    style={{
                                        width: "40px",
                                        padding: "4px",
                                        border: `2px solid ${Tags[tag as keyof typeof Tags].color}`,
                                        borderRadius: "5px",
                                        backgroundColor: `${theme.materialImage.backgroundColor}`,
                                    }}
                                    tooltip={{ title: tag }}
                                />
                            )
                        }
                    </Grid>
                    <CustomTooltip title="Click to view Combat Roles" arrow placement="top">
                        <InfoOutlined
                            fontSize="large"
                            sx={{
                                color: `${theme.text.color}`,
                                cursor: "pointer"
                            }}
                            onClick={handleClickOpen}
                        />
                    </CustomTooltip>
                </Box>
                <hr style={{ border: `0.5px solid ${theme.border.color}`, margin: "10px 15px 15px 15px" }} />
                <Typography
                    sx={{
                        mb: "20px",
                        mx: "20px",
                        fontFamily: `${theme.font.styled.family}`,
                        fontSize: { xs: "13.5px", sm: "15px" },
                        color: `${theme.text.color}`,
                    }}
                >
                    <i>{description}</i>
                </Typography>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
            >
                <Box
                    sx={{
                        width: { xs: "70vw", sm: "100%" },
                        backgroundColor: `${theme.paper.backgroundColor}`,
                        border: `2px solid ${theme.border.color}`,
                        borderRadius: "5px",
                    }}
                >
                    <AppBar position="static"
                        sx={{
                            backgroundColor: `${theme.appbar.backgroundColor}`,
                            borderBottom: `1px solid ${theme.border.color}`,
                            borderRadius: "5px 5px 0px 0px",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                                sx={{
                                    px: 2,
                                    py: 1.5,
                                    fontFamily: theme.font.styled.family,
                                    fontWeight: theme.font.styled.weight,
                                    fontSize: "20px",
                                    flexGrow: 0.99
                                }}
                            >
                                Combat Roles
                            </Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ color: `white` }} />
                            </IconButton>
                        </Box>
                    </AppBar>
                    {
                        tags.map((tag: string, index: number) => (
                            <Box sx={{ mx: "20px" }} key={index}>
                                <Box sx={{ display: "flex", alignItems: { xs: "start", sm: "center" }, my: "20px" }}>
                                    <Image
                                        key={index}
                                        src={`tags/${tag}`}
                                        alt={tag}
                                        style={{
                                            width: matches ? "48px" : "32px",
                                            height: matches ? "48px" : "32px",
                                            padding: "4px",
                                            marginTop: matches ? "0px" : "5px",
                                            border: `2px solid ${Tags[tag as keyof typeof Tags].color}`,
                                            borderRadius: "5px",
                                            backgroundColor: `${theme.materialImage.backgroundColor}`,
                                        }}
                                    />
                                    <Box sx={{ ml: "15px" }}>
                                        <Typography sx={{ fontSize: { xs: "18px", sm: "20px" }, fontWeight: theme.font.styled.weight }}>
                                            {tag}
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                                            {Tags[tag as keyof typeof Tags].description}
                                        </Typography>
                                    </Box>
                                </Box>
                                {index !== tags.length - 1 && <hr style={{ border: `.5px solid ${theme.border.color}` }} />}
                            </Box>
                        ))
                    }
                </Box>
            </Dialog>
        </React.Fragment>
    )

}