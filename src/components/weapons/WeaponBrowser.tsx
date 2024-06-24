import * as React from "react"
import { connect } from "react-redux"

// Component imports
import WeaponCard from "./WeaponCard"
import WeaponFilters from "./filters/_WeaponFilters"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Paper, InputBase, Stack, ToggleButtonGroup } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imorts
import { filterWeapons } from "../../helpers/FilterWeapons"

// Type imports
import { RootState } from "../../redux/store"

const WeaponBrowser = (props: any) => {

    const theme = useTheme()

    const [searchValue, setSearchValue] = React.useState("")

    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value)
    }

    let { weapons, weaponFilters } = props;

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
                                    filterWeapons(weapons.weapons, weaponFilters, searchValue).sort((a, b) => b.rarity - a.rarity || a.name.localeCompare(b.name)).map((wep: { [key: string]: any }) => <WeaponCard key={wep.id} weapon={wep} />)
                                }
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
                <Grid xs={3}>
                    <Paper sx={{
                        border: `2px solid ${theme.border.color}`,
                        borderRadius: "5px",
                        backgroundColor: `${theme.paper.backgroundColor}`,
                        display: "flex",
                        margin: "auto",
                        height: "40px",
                        width: "84.5%",
                        marginBottom: "10px",
                        marginLeft: "35px",
                    }}>
                        <InputBase
                            sx={{
                                marginLeft: "10px",
                                flex: 1,
                                color: `${theme.text.color}`,
                                fontFamily: "Segoe UI, Roboto",
                                fontWeight: "500",
                            }}
                            placeholder="Search"
                            onChange={handleInputChange}
                        />
                    </Paper>
                    <WeaponFilters />
                </Grid>
            </Grid>
        </React.Fragment>
    )

}

const mapStateToProps = (state: RootState) => ({
    weapons: state.weapons,
    weaponFilters: state.weaponFilters
})

export default connect(mapStateToProps)(WeaponBrowser)