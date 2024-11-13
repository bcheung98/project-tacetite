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
import { createDateObject } from "../../../helpers/dates"

// Type imports
import { RootState } from "../../../redux/store"
import { Character, CharacterProps } from "../../../types/character"

function CharacterPage() {

    const theme = useTheme()

    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"))

    const { char_name } = useParams<{ char_name: string }>()
    const characters = useSelector((state: RootState) => state.characters.characters)
    const character = characters.find((char: Character) => char.name.split(" ").join("_").toLowerCase() === char_name)

    if (character !== undefined) {

        const { name } = character

        if (character.displayName) document.title = `${character.displayName} ${process.env.REACT_APP_DOCUMENT_HEADER}`
        if (character.fullName) document.title = `${character.fullName} ${process.env.REACT_APP_DOCUMENT_HEADER}`
        if (!character.displayName && !character.fullName) document.title = `${name} ${process.env.REACT_APP_DOCUMENT_HEADER}`

        return (
            <React.Fragment>
                <Box sx={{ mb: "15px" }}>
                    {
                        matches_md_up ?
                            <Grid container spacing={3}>
                                <Grid size={4}>
                                    <CharacterImage character={character} />
                                    <Box sx={{ my: "10px" }} />
                                    <CharacterInfoMisc character={character} />
                                </Grid>
                                <Grid size="grow">
                                    <CharacterInfoMain character={character} />
                                    <Box sx={{ my: "15px" }} />
                                    <CharacterTable character={character} />
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={2} columns={1}>
                                <CharacterInfoMain character={character} />
                                <CharacterImage character={character} />
                                <CharacterTable character={character} />
                                <CharacterInfoMisc character={character} />
                            </Grid>
                    }
                </Box>
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

    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"))

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
                            margin: matches_sm_up ? "auto 10px auto 10px" : "auto 0 auto 0",
                            width: matches_sm_up ? "128px" : "96px",
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
                                style={{ height: matches_sm_up ? "30px" : "24px" }}
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
                                        border: `2px solid ${Tags[tag].color}`,
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
                                            width: matches_sm_up ? "48px" : "32px",
                                            height: matches_sm_up ? "48px" : "32px",
                                            padding: "4px",
                                            marginTop: "5px",
                                            border: `2px solid ${Tags[tag].color}`,
                                            borderRadius: "5px",
                                            backgroundColor: `${theme.materialImage.backgroundColor}`,
                                        }}
                                    />
                                    <Box sx={{ ml: "15px" }}>
                                        <Typography sx={{ fontSize: { xs: "18px", sm: "20px" }, fontWeight: theme.font.styled.weight }}>
                                            {tag}
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                                            {Tags[tag].description}
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

function CharacterInfoMisc({ character }: CharacterProps) {

    const theme = useTheme()

    const { nation, birthday, voiceActors, release } = character

    const rows = [
        { key: "Nation", value: nation },
        { key: "Birthday", value: birthday },
        // { key: "Release", value: `${release.date !== "" ? createDateObject(release.date as string).date : ""} (${release.version})` },
        { key: "Release", value: `${release.date} (${release.version})` },
        { key: "Voice Actor (EN)", value: voiceActors["en"] },
        { key: "Voice Actor (JP)", value: voiceActors["jp"] },
    ]

    return (
        <Box
            sx={{
                py: "10px",
                width: "100%",
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
                            rows.map((row) => (
                                <TableRow key={row.key}>
                                    <TableCell sx={{ color: `${theme.text.color}`, border: "none", py: "1.5px" }}>
                                        <b>{row.key}</b>
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: `${theme.text.color}`, border: "none", py: "1.5px" }}>
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}

function CharacterImage({ character }: CharacterProps) {

    const theme = useTheme()

    const { name } = character

    return (
        <Box>
            <Image
                src={`characters/avatars/${name}`}
                alt={name}
                style={{
                    width: "100%",
                    height: "600px",
                    border: `1px solid ${theme.border.color}`,
                    borderRadius: "5px",
                    backgroundColor: `${theme.paper.backgroundColor}`,
                    objectFit: "cover",
                    // cursor: "pointer",
                }}
            />
        </Box>
    )

}

function CharacterTable({ character }: CharacterProps) {

    const theme = useTheme()

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (event: React.BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Box
            sx={{
                p: 0,
                width: "100%",
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
    )

}