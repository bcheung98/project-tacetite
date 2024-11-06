import parse from "html-react-parser"

// Component imports
import Image from "../../_custom/Image"

// MUI imports
import { useTheme, Typography, Box, AppBar } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { ElementalBorderColor } from "../../../helpers/ElementColors"

// Type imports
import { CharacterProps } from "../../../types/character"
import { Skill } from "../../../types/skill"

function CharacterResonanceChainDisplay({ character }: CharacterProps) {

    const theme = useTheme()

    const { name, element, resonanceChain } = character

    return (
        <Box
            sx={{
                mt: "15px",
                color: `${theme.text.color}`,
                backgroundColor: `${theme.paper.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
            }}
        >
            <AppBar position="static"
                sx={{
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderBottom: `1px solid ${theme.border.color}`,
                    borderRadius: "5px 5px 0px 0px",
                }}
            >
                <Typography
                    sx={{
                        m: 2,
                        color: `${theme.text.color}`,
                        fontSize: "20px",
                        fontWeight: theme.font.styled.weight
                    }}
                >
                    Resonance Chain
                </Typography>
            </AppBar>
            <Grid container rowSpacing={2} columnSpacing={6} sx={{ p: 3 }}>
                {
                    Object.entries(resonanceChain).map(([key, rc]: [string, Skill]) =>
                        <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{
                                p: 2,
                                backgroundColor: `${theme.table.body.backgroundColor}`,
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "5px",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                <Image
                                    src={`characters/resonance_chains/${name.toLowerCase()}_${key}`}
                                    alt={rc.name}
                                    style={{
                                        width: "48px",
                                        padding: "4px",
                                        border: `2px solid ${ElementalBorderColor(element)}`,
                                        borderRadius: "64px"
                                    }}
                                />
                                <Box sx={{ ml: "15px" }}>
                                    <Typography sx={{ fontSize: { xs: "16px", sm: "20px" }, fontWeight: theme.font.styled.weight }}>
                                        {rc.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: "13.5px", sm: "16px" }, fontWeight: theme.font.styled.weight }}>
                                        <i>{key.toUpperCase()}</i>
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ fontSize: { xs: "13.5px", sm: "16px" } }}>
                                {parse(rc.description)}
                            </Typography>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )

}

export default CharacterResonanceChainDisplay