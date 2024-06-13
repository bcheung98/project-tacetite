import * as React from "react"
import { useTheme } from "@mui/material/styles"
import { connect } from "react-redux"

// Component imports
import CharacterCard from "./CharacterCard"

// MUI imports
import { Box, Typography, Paper, InputBase, Stack, ToggleButtonGroup } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Type imports
import { RootState } from "../../redux/store"

const CharacterBrowser = (props: any) => {

    const theme = useTheme();

    let { characters } = props;

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
                        textDecoration: "none",
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
                                    characters.characters.map((char: { [key: string]: any }) => <CharacterCard key={char.id} character={char} showMaterials />)

                                }
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )

}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

export default connect(mapStateToProps)(CharacterBrowser)