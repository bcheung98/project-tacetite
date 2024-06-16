// Component imports
import CharacterElementFilter from "./CharacterElementFilter"
import CharacterWeaponFilter from "./CharacterWeaponFilter"
import CharacterRarityFilter from "./CharacterRarityFilter"
import CharacterTagsFilter from "./CharacterTagsFilter"
import CharacterForgeryMatFilters from "./CharacterForgeryMatFilters"
import CharacterCommonMatFilters from "./CharacterCommonMatFilters"
import CharacterAscensionMatFilters from "./CharacterAscensionMatFilters"
import CharacterBossMatFilters from "./CharacterBossMatFilters"
import CharacterWeeklyBossMatFilters from "./CharacterWeeklyBossMatFilters"

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

                {/* RARITY */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="rarity-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Rarity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterRarityFilter />
                    </AccordionDetails>
                </Accordion>

                {/* TAGS */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="tags-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Tags</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterTagsFilter />
                    </AccordionDetails>
                </Accordion>

                {/* FORGERY MATS */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="forgeryMats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Forgery Material</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterForgeryMatFilters />
                    </AccordionDetails>
                </Accordion>

                {/* COMMON MATS */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="commonMats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Common Material</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterCommonMatFilters />
                    </AccordionDetails>
                </Accordion>

                {/* ASCENSION MATS */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="ascensionMats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Ascension Material</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterAscensionMatFilters />
                    </AccordionDetails>
                </Accordion>

                {/* BOSS MATS */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="bossMats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Boss Material</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterBossMatFilters />
                    </AccordionDetails>
                </Accordion>

                {/* WEEKLY BOSS MATS */}
                <Accordion>
                    <AccordionSummary>
                        <Typography variant="body1" className="filter-text-off" id="weeklyBossMats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Weekly Boss Material</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CharacterWeeklyBossMatFilters />
                    </AccordionDetails>
                </Accordion>

            </Paper>
        </Box>
    )

}

export default CharacterFilters