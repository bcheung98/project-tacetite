import { connect } from "react-redux"

// Component imports
import CharacterSelector from "./CharacterSelector"
import CharacterAscensionCard from "./_CharacterAscensionCard"
import WeaponSelector from "./WeaponSelector"
import WeaponAscensionCard from "./_WeaponAscensionCard"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Type imports
import { RootState } from "../../redux/store"

const AscensionPlanner = (props: any) => {

    const theme = useTheme()

    let { characters, weapons } = props

    document.title = "Ascension Planner - Project Tacetite"

    return (
        <Box>
            <Typography variant="h4"
                sx={{
                    mx: "25px",
                    my: "20px",
                    display: { xs: "none", md: "flex" },
                    letterSpacing: ".2rem",
                    color: `${theme.text.color}`,
                    fontWeight: "500",
                    textAlign: "center",
                }}
            >
                ASCENSION PLANNER
            </Typography>
            <Box sx={{ display: "block", my: "30px" }}>
                <Box sx={{ display: "flex" }}>
                    <CharacterSelector />
                    <WeaponSelector />
                </Box>
            </Box>

            <Box sx={{ mx: "20px" }}>
                <Grid container>
                    <Grid>
                        {characters.map((character: any) => <CharacterAscensionCard key={character.id} character={character} />)}
                    </Grid>
                    <br />
                    <Grid>
                        {weapons.map((weapon: any) => <WeaponAscensionCard key={weapon.id} weapon={weapon} />)}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}

const mapStateToProps = (state: RootState) => ({
    characters: state.ascensionPlanner.characters,
    weapons: state.ascensionPlanner.weapons
})

export default connect(mapStateToProps)(AscensionPlanner)