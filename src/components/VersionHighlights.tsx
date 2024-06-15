import * as React from "react"
import { connect } from "react-redux"

// Component imports
import CharacterCardLarge from "./characters/CharacterCardLarge"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Select, MenuItem, AppBar } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomSelect } from "../helpers/CustomSelect"

// Type imports
import { RootState } from "../redux/store"

const VersionHighlights = (props: any) => {

    const theme = useTheme()

    // MAKE SURE TO CHANGE THIS EVERY UPDATE!
    let updates = [
        { version: "1.0", name: "Version 1.0" }
    ]
    const [version, setVersion] = React.useState(updates[0].version);
    const handleVersionChange = (e: any) => {
        setVersion(e.target.value)
    }

    let characters = props.characters.characters.filter((char: any) => char.release.version === version)

    return (
        <Box
            sx={{
                backgroundColor: `${theme.paper.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
                display: "block",
                margin: "auto",
                mt: "20px",
                width: "85vw",
                color: `${theme.text.color}`,
            }}
        >
            <AppBar position="static"
                sx={{
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderBottom: `1px solid ${theme.border.color}`,
                    borderRadius: "5px 5px 0px 0px",
                    p: "10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography variant="h5" component="p" sx={{ fontWeight: "bold", mt: "5px" }}>
                        {`Version Highlights`}
                    </Typography>
                    <Select value={version} label="Version" onChange={handleVersionChange} input={<CustomSelect />}>
                        {
                            updates.map((version, index) => {
                                return (
                                    <MenuItem key={index} value={version.version}>
                                        <Typography sx={{ fontWeight: "bold" }}>{version.version} - {version.name}</Typography>
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </Box>
            </AppBar>

            <Grid container spacing={2}>

                {/* NEW CHARACTERS */}
                {
                    characters.length > 0 &&
                    <Grid xs>
                        <Box sx={{ mx: "30px", my: "20px" }}>
                            <Typography variant="h6" component="p" sx={{ fontWeight: "bold", mb: "30px", ml: "-10px" }}>
                                New Characters
                            </Typography>
                            <Box>
                                <Grid container spacing={2}>
                                    {
                                        characters.sort((a: any, b:any) => a.id > b.id ? 1 : -1).map((char: any, index: number) => <CharacterCardLarge key={index} character={char} />)
                                    }
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                }

            </Grid>

        </Box>
    )

}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

export default connect(mapStateToProps)(VersionHighlights)