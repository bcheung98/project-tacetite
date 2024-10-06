// Component imports
import CharacterElementFilter from "./CharacterElementFilter"
import CharacterWeaponFilter from "./CharacterWeaponFilter"
import CharacterRarityFilter from "./CharacterRarityFilter"
import CharacterTagsFilter from "./CharacterTagsFilter"
import CharacterForgeryMatFilter from "./CharacterForgeryMatFilter"
import CharacterCommonMatFilter from "./CharacterCommonMatFilter"
import CharacterAscensionMatFilter from "./CharacterAscensionMatFilter"
import CharacterBossMatFilter from "./CharacterBossMatFilter"
import CharacterWeeklyBossMatFilter from "./CharacterWeeklyBossMatFilter"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Paper } from "@mui/material"

// Helper imports
import { Accordion, AccordionDetails, AccordionSummary } from "../../../helpers/CustomAccordion"

const CharacterFilters = () => {

    const theme = useTheme()

    return (
        <Paper
            variant="outlined"
            square
            sx={{
                color: `${theme.text.color}`,
                backgroundColor: `${theme.appbar.backgroundColor}`,
                border: `2px solid ${theme.border.color}`,
                borderRadius: "5px",
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
                    <Typography variant="body1" className="filter-text-off" id="forgerymats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Forgery Material</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CharacterForgeryMatFilter />
                </AccordionDetails>
            </Accordion>

            {/* COMMON MATS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="commonmats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Common Material</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CharacterCommonMatFilter />
                </AccordionDetails>
            </Accordion>

            {/* ASCENSION MATS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="ascensionmats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Ascension Material</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CharacterAscensionMatFilter />
                </AccordionDetails>
            </Accordion>

            {/* BOSS MATS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="bossmats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Boss Material</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CharacterBossMatFilter />
                </AccordionDetails>
            </Accordion>

            {/* WEEKLY BOSS MATS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="weeklybossmats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Weekly Boss Material</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CharacterWeeklyBossMatFilter />
                </AccordionDetails>
            </Accordion>

        </Paper>
    )

}

export default CharacterFilters