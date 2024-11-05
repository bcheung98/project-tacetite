import * as React from "react"
import { connect, useSelector } from "react-redux"

// Component imports
import DisplayCard from "./_custom/DisplayCard"
import EchoCard from "./echoes/EchoCard"

// MUI imports
import { useTheme, Box, Typography, Select, AppBar, SelectChangeEvent, IconButton, CardHeader } from "@mui/material"
import Grid from "@mui/material/Grid2"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

// Helper imports
import { CustomInput } from "./_styled/StyledInput"
import { CustomMenuItem } from "./_styled/StyledMenu"
import { echoClassId } from "./echoes/EchoBrowser"

// Type imports
import { RootState } from "../redux/store"
import { EchoData } from "../types/EchoData"
import { Character } from "../types/character"
import { Weapon } from "../types/weapon"
import { Echo } from "../types/echo"

const VersionHighlights = (props: any) => {

    const theme = useTheme()

    // MAKE SURE TO CHANGE THIS EVERY UPDATE!
    let updates = [
        { version: "1.3", name: "To The Shore's End" },
        { version: "1.2", name: "In the Turquoise Moonglow" },
        { version: "1.1", name: "Thaw of Eons" },
        { version: "1.0", name: "Global Release" }
    ]
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

    let version = updates[index].version

    const characters = useSelector((state: RootState) => state.characters.characters)
    const weapons = useSelector((state: RootState) => state.weapons.weapons)
    const echoes = useSelector((state: RootState) => state.echoes.echoes)

    const currentCharacters = props.characters.characters.filter((char: Character) => char.release.version === version).sort((a: any, b: any) => b.rarity - a.rarity)
    const currentWeapons = props.weapons.weapons.filter((wep: Weapon) => wep.release.version === version).sort((a: any, b: any) => b.rarity - a.rarity || a.name.localeCompare(b.name))
    const currentEchoes = props.echoes.echoes.filter((echo: Echo) => echo.release.version === version).sort((a: any, b: any) => echoClassId[b.class as keyof typeof echoClassId] - echoClassId[a.class as keyof typeof echoClassId] || a.name.localeCompare(b.name))

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
                    borderBottom: `2px solid ${theme.border.color}`,
                    borderRadius: "5px 5px 0px 0px",
                    p: "10px",
                    height: "70px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold", ml: "5px", lineHeight: "45px" }}>
                        {`Version Highlights`}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        {
                            index < updates.length - 1 ?
                                <Box sx={{ width: "32px" }}>
                                    <IconButton onClick={handleIndexChangeLeft}>
                                        <KeyboardArrowLeftIcon sx={{ color: `${theme.text.color}`, mt: "2px", ml: "-10px" }} />
                                    </IconButton>
                                </Box>
                                :
                                <Box sx={{ width: "32px" }} />
                        }
                        <Select
                            value={index.toString()}
                            label="Version"
                            onChange={handleIndexChange}
                            input={<CustomInput />}
                            sx={{
                                width: "75px",
                                "& .MuiSelect-icon": {
                                    color: `${theme.text.color}`
                                }
                            }}
                        >
                            {
                                updates.map((version, index) => (
                                    <CustomMenuItem key={index} value={index}>
                                        <Typography sx={{ fontWeight: "bold", fontSize: "11pt", color: `${theme.text.color}` }}>
                                            {version.version}
                                        </Typography>
                                    </CustomMenuItem>
                                ))
                            }
                        </Select>
                        {
                            index > 0 ?
                                <Box sx={{ width: "32px" }}>
                                    <IconButton onClick={handleIndexChangeRight}>
                                        <KeyboardArrowRightIcon sx={{ color: `${theme.text.color}`, mt: "2px" }} />
                                    </IconButton>
                                </Box>
                                :
                                <Box sx={{ width: "32px" }} />
                        }
                    </Box>
                </Box>
            </AppBar>

            <Box sx={{ px: "30px" }}>
                <Typography sx={{ fontSize: "18pt", fontWeight: "bold", color: `${theme.text.color}`, my: "20px" }}>
                    {updates[index].version} - <i>{updates[index].name}</i>
                </Typography>
                <Grid container spacing={2}>

                    {
                        currentCharacters.length > 0 || currentEchoes.length > 0 ?
                            <Grid size="grow">
                                {
                                    // NEW CHARACTERS
                                    <Box sx={{ mb: "25px" }}>
                                        <CardHeader
                                            avatar={<img src={`${process.env.REACT_APP_URL}/icons/Character.png`} alt="New Characters" style={{ width: "40px", marginRight: "-5px" }} />}
                                            title={
                                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                    New Characters
                                                </Typography>
                                            }
                                            sx={{ p: 0, mb: "30px" }}
                                        />
                                        <Grid container spacing={2}>
                                            {
                                                currentCharacters.map((char: Character, index: number) =>
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
                                        <br />
                                    </Box>
                                }

                                {
                                    // NEW ECHOES
                                    currentEchoes.length > 0 &&
                                    <Box>
                                        <CardHeader
                                            avatar={<img src={`${process.env.REACT_APP_URL}/icons/Echo.png`} alt="New Echoes" style={{ width: "40px", marginRight: "-5px" }} />}
                                            title={
                                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                    New Echoes
                                                </Typography>
                                            }
                                            sx={{ p: 0, mb: "30px" }}
                                        />
                                        <Grid container spacing={2}>
                                            {currentEchoes.map((echo: EchoData, index: number) => <EchoCard key={index} echo={echo} />)}
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
                        <Grid size={6}>
                            <Box sx={{ mx: "30px", my: "20px" }}>
                                <CardHeader
                                    avatar={<img src={`${process.env.REACT_APP_URL}/icons/Weapon.png`} alt="New Weapons" style={{ width: "40px", marginRight: "-5px" }} />}
                                    title={
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            New Weapons
                                        </Typography>
                                    }
                                    sx={{ p: 0, mb: "30px" }}
                                />
                                <Box>
                                    <Grid container spacing={2}>
                                        {
                                            currentWeapons.map((wep: Weapon, index: number) =>
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
                                </Box>
                            </Box>
                        </Grid>
                    }

                </Grid>
            </Box>
            <br />
        </Box>
    )

}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters,
    weapons: state.weapons,
    echoes: state.echoes
})

export default connect(mapStateToProps)(VersionHighlights)