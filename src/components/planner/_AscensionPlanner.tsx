import * as React from "react"
import { useSelector } from "react-redux"

// Component imports
import CharacterSelector from "./CharacterSelector"
import CharacterAscensionCard from "./characters/_CharacterAscensionCard"
import WeaponSelector from "./WeaponSelector"
import WeaponAscensionCard from "./weapons/_WeaponAscensionCard"
import AscensionTotalCost from "./AscensionTotalCost"

// MUI imports
import { useTheme, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Type imports
import { RootState } from "../../redux/store"

function AscensionPlanner() {

    const theme = useTheme()

    const characters = useSelector((state: RootState) => state.ascensionPlanner.characterCosts)
    const weapons = useSelector((state: RootState) => state.ascensionPlanner.weaponCosts)

    document.title = `Ascension Planner ${process.env.REACT_APP_DOCUMENT_HEADER}`

    return (
        <React.Fragment>
            <Typography
                sx={{
                    mb: "20px",
                    fontFamily: `${theme.font.styled.family}`,
                    fontSize: "24px",
                    color: `${theme.text.color}`,
                    lineHeight: "40px"
                }}
            >
                Ascension Planner
            </Typography>
            <Grid container spacing={5}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <CharacterSelector />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <WeaponSelector />
                </Grid>
            </Grid>
            <AscensionTotalCost />
            <Grid container spacing={5}>
                {
                    [...characters, ...weapons].map(item =>
                        <Grid key={item.name} size={{ xs: 12, md: 5 }}>
                            {"element" in item ? <CharacterAscensionCard key={item.name} character={item} /> : <WeaponAscensionCard key={item.name} weapon={item} />}
                        </Grid>
                    )
                }
            </Grid>
        </React.Fragment>
    )

}

export default AscensionPlanner