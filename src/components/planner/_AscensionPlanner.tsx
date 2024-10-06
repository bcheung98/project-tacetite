import * as React from "react"
import { connect } from "react-redux"

// Component imports
import CharacterSelector from "./CharacterSelector"
import CharacterAscensionCard from "./_CharacterAscensionCard"
import WeaponSelector from "./WeaponSelector"
import WeaponAscensionCard from "./_WeaponAscensionCard"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Type imports
import { RootState } from "../../redux/store"

const AscensionPlanner = (props: any) => {

    const theme = useTheme()

    let { characters, weapons } = props

    document.title = `Ascension Planner ${process.env.REACT_APP_DOCUMENT_HEADER}`

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    mb: "20px",
                    height: "30px",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        mr: "25px",
                        fontWeight: "500",
                        color: `${theme.text.color}`,
                        textDecoration: "none",
                    }}
                >
                    Ascension Planner
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <CharacterSelector />
                <WeaponSelector />
            </Grid>
            <br />
            <Grid container spacing={2}>
                {
                    characters.length > 0 ?
                        <Grid size={6}>
                            <Grid container spacing={5}>
                                {characters.map((character: any) => <CharacterAscensionCard key={character.name} character={character} />)}
                            </Grid>
                        </Grid>
                        :
                        null
                }
                {
                    weapons.length > 0 ?
                        <Grid size={6}>
                            <Grid container spacing={5}>
                                {weapons.map((weapon: any) => <WeaponAscensionCard key={weapon.name} weapon={weapon} />)}
                            </Grid>
                        </Grid>
                        :
                        null
                }
            </Grid>
        </React.Fragment>
    )

}

const mapStateToProps = (state: RootState) => ({
    characters: state.ascensionPlanner.characters,
    weapons: state.ascensionPlanner.weapons
})

export default connect(mapStateToProps)(AscensionPlanner)