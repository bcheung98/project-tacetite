import * as React from "react"
import { useSelector } from "react-redux"

// Component imports
import Image from "./_custom/Image"
import DisplayCard from "./_custom/DisplayCard"
import EchoCard from "./echoes/EchoCard"
import { CustomInput } from "./_styled/StyledInput"
import { CustomMenuItem } from "./_styled/StyledMenu"

// MUI imports
import { useTheme, Box, Typography, Select, AppBar, SelectChangeEvent, IconButton, CardHeader } from "@mui/material"
import Grid from "@mui/material/Grid2"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

// Helper imports
import { updates } from "../data/versions"
import { echoClassId } from "./echoes/EchoBrowser"

// Type imports
import { RootState } from "../redux/store"

function VersionHighlights() {

    const theme = useTheme()

    const [index, setIndex] = React.useState(0)
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value))
    }
    const handleIndexChangeLeft = () => {
        if (index + 1 < updates.length) setIndex(index + 1)
    }
    const handleIndexChangeRight = () => {
        if (index - 1 >= 0) setIndex(index - 1)
    }

    const version = updates[index].version

    const characters = useSelector((state: RootState) => state.characters.characters)
    const weapons = useSelector((state: RootState) => state.weapons.weapons)
    const echoes = useSelector((state: RootState) => state.echoes.echoes)

    const currentCharacters = characters.filter(char => char.release.version === version).sort((a, b) => b.rarity - a.rarity)
    const currentWeapons = weapons.filter(wep => wep.release.version === version).sort((a, b) => b.rarity - a.rarity)
    const currentEchoes = echoes.filter(echo => echo.release.version === version).sort((a, b) => echoClassId[b.class] - echoClassId[a.class] || a.name.localeCompare(b.name))

    document.title = `Wuthering Waves ${process.env.REACT_APP_DOCUMENT_HEADER}`

    return (
        <Box
            sx={{
                backgroundColor: `${theme.paper.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
                color: `${theme.text.color}`,
            }}
        >
            <AppBar position="static"
                sx={{
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderBottom: `1px solid ${theme.border.color}`,
                    borderRadius: "5px 5px 0px 0px",
                    p: "10px",
                    minHeight: "70px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography sx={{ fontSize: "20px", fontWeight: theme.font.styled.weight, ml: "5px", lineHeight: "45px" }}>
                        Version Highlights
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "24px" }}>
                            {
                                index < updates.length - 1 &&
                                <IconButton onClick={handleIndexChangeLeft} sx={{ px: 0 }}>
                                    <KeyboardArrowLeftIcon sx={{ color: `${theme.text.color}`, mt: "2px", mr: 0 }} />
                                </IconButton>
                            }
                        </Box>
                        <Select
                            value={index.toString()}
                            label="Version"
                            onChange={handleIndexChange}
                            input={<CustomInput />}
                            sx={{
                                width: "75px",
                                "& .MuiSelect-icon": {
                                    color: `white`
                                }
                            }}
                        >
                            {
                                updates.map((version, index) => (
                                    <CustomMenuItem key={index} value={index}>
                                        <Typography sx={{ fontWeight: theme.font.styled.weight, fontSize: { xs: "14px", sm: "16px" } }}>
                                            {version.version}
                                        </Typography>
                                    </CustomMenuItem>
                                ))
                            }
                        </Select>
                        <Box sx={{ width: "24px" }}>
                            {
                                index > 0 &&
                                <IconButton onClick={handleIndexChangeRight} sx={{ px: 0 }}>
                                    <KeyboardArrowRightIcon sx={{ color: `${theme.text.color}`, mt: "2px" }} />
                                </IconButton>
                            }
                        </Box>
                    </Box>
                </Box>
            </AppBar>

            <Box sx={{ px: "30px" }}>
                <Typography sx={{ fontSize: { xs: "20px", sm: "24px" }, fontWeight: theme.font.styled.weight, my: "20px" }}>
                    {updates[index].version} - <i>{updates[index].name}</i>
                </Typography>

                <Grid container spacing={5}>
                    {
                        currentCharacters.length > 0 || currentEchoes.length > 0 ?
                            // NEW CHARACTERS
                            <Grid size={{ sm: 12, md: 6 }}>
                                <CardHeader
                                    avatar={<Image src="icons/Character" alt="New Characters" style={{ width: "40px", marginRight: "-5px" }} />}
                                    title={
                                        <Typography variant="h6" sx={{ fontWeight: theme.font.styled.weight }}>
                                            New Characters
                                        </Typography>
                                    }
                                    sx={{ p: 0, mb: "30px" }}
                                />
                                <Grid container spacing={2}>
                                    {
                                        currentCharacters.map((char, index) =>
                                            <DisplayCard
                                                key={index}
                                                id={`${char.name}-versionHighlights`}
                                                name={char.name}
                                                displayName={char.displayName}
                                                type="character"
                                                variant="avatar"
                                                rarity={char.rarity}
                                                info={{ element: char.element, weapon: char.weapon }}
                                            />
                                        )
                                    }
                                </Grid>
                                {
                                    // NEW ECHOES
                                    currentEchoes.length > 0 &&
                                    <Box sx={{ mt: currentCharacters.length > 0 ? "50px" : "0px" }}>
                                        <CardHeader
                                            avatar={<Image src="icons/Echo" alt="New Echoes" style={{ width: "40px", marginRight: "-5px" }} />}
                                            title={
                                                <Typography variant="h6" sx={{ fontWeight: theme.font.styled.weight }}>
                                                    New Echoes
                                                </Typography>
                                            }
                                            sx={{ p: 0, mb: "30px" }}
                                        />
                                        <Grid container spacing={2}>
                                            {currentEchoes.map((echo, index) => <EchoCard key={index} echo={echo} />)}
                                        </Grid>
                                    </Box>
                                }
                            </Grid>
                            :
                            null
                    }
                    {
                        // NEW WEAPONS
                        currentWeapons.length > 0 &&
                        <Grid size={{ sm: 12, md: "grow" }}>
                            <CardHeader
                                avatar={<Image src="icons/Weapon" alt="New Weapons" style={{ width: "40px", marginRight: "-5px" }} />}
                                title={
                                    <Typography variant="h6" sx={{ fontWeight: theme.font.styled.weight }}>
                                        New Weapons
                                    </Typography>
                                }
                                sx={{ p: 0, mb: "30px" }}
                            />
                            <Grid container spacing={2}>
                                {
                                    currentWeapons.map((wep, index) =>
                                        <DisplayCard
                                            key={index}
                                            id={`${wep.name}-versionHighlights`}
                                            name={wep.name}
                                            displayName={wep.displayName}
                                            type="weapon"
                                            variant="avatar"
                                            rarity={wep.rarity}
                                            info={{ weapon: wep.type }}
                                        />
                                    )
                                }
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Box>
            <br />
        </Box>
    )

}

export default VersionHighlights