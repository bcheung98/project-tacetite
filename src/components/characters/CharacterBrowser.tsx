import * as React from "react"
import { connect } from "react-redux"

// Component imports
import CharacterCard from "./CharacterCard"
import CharacterFilters from "./filters/_CharacterFilters"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Paper, InputBase, Stack, ToggleButtonGroup } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { filterCharacters } from "../../helpers/FilterCharacters"

// Type imports
import { RootState } from "../../redux/store"

const CharacterBrowser = (props: any) => {

    const theme = useTheme();

    let { characters, characterFilters } = props;

    document.title = "Characters - Project Tacetite"

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                }}
            >
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
                    RESONATORS
                </Typography>
            </Box>
            <Grid container sx={{ margin: "auto", width: "98%" }}>
                <Grid xs={9}>
                    <Grid container>
                        {characters.characters.length > 0 &&
                            <React.Fragment>
                                {
                                    filterCharacters(characters.characters, characterFilters, "").map((char: { [key: string]: any }) => <CharacterCard key={char.id} character={char} />)
                                }
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
                <Grid xs={3}>
                    <CharacterFilters />
                </Grid>
            </Grid>
        </React.Fragment>
    )

}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters,
    characterFilters: state.characterFilters
})

export default connect(mapStateToProps)(CharacterBrowser)