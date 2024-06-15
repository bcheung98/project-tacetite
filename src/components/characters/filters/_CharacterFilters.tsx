// Component imports
import CharacterElementFilter from "./CharacterElementFilter"
import CharacterWeaponFilter from "./CharacterWeaponFilter"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Paper } from "@mui/material"

// Helper imports
import { Accordion, AccordionDetails, AccordionSummary } from "../../../helpers/CustomAccordion"

const CharacterFilters = () => {

    const theme = useTheme()

    return (
        <Box
            sx={{
                margin: "auto",
                width: "85%",
                marginLeft: "35px",
            }}
        >
            <Paper variant="outlined" square
                sx={{
                    color: `${theme.text.color}`,
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    border: `2px solid ${theme.border.color}`,
                    borderRadius: "25px 25px 5px 5px",
                }}
            >
                <Typography variant="h6"
                    sx={{
                        ml: "15px",
                        my: "10px",
                    }}
                >
                    Filters
                </Typography>

                {/* ELEMENT */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="element-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Attribute</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterElementFilter />
                    </AccordionDetails>
                </Accordion>

                {/* WEAPON */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="weapon-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Weapon Type</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterWeaponFilter />
                    </AccordionDetails>
                </Accordion>

            </Paper>
        </Box>
    )

}

export default CharacterFilters