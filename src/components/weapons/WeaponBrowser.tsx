import * as React from "react"
import { connect } from "react-redux"

// Component imports
import WeaponCard from "./WeaponCard"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Paper, InputBase, Stack, ToggleButtonGroup } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Type imports
import { RootState } from "../../redux/store"

const WeaponBrowser = (props: any) => {

    const theme = useTheme();

    let { weapons } = props;

    document.title = "Weapons - Project Tacetite"

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
                    WEAPONS
                </Typography>
            </Box>
            <Grid container sx={{ margin: "auto", width: "98%" }}>
                <Grid xs={9}>
                    <Grid container>
                        {weapons.weapons.length > 0 &&
                            <React.Fragment>
                                {
                                    weapons.weapons.map((wep: { [key: string]: any }) => <WeaponCard key={wep.id} weapon={wep} />)
                                }
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
                <Grid xs={3}>

                </Grid>
            </Grid>
        </React.Fragment>
    )

}

const mapStateToProps = (state: RootState) => ({
    weapons: state.weapons,
})

export default connect(mapStateToProps)(WeaponBrowser)