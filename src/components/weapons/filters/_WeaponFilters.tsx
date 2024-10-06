// Component imports
import WeaponTypeFilter from "./WeaponTypeFilter"
import WeaponRarityFilter from "./WeaponRarityFilter"
import WeaponSubstatFilter from "./WeaponSubstatFilter"
import WeaponForgeryMatFilter from "./WeaponForgeryMatFilter"
import WeaponCommonMatFilter from "./WeaponCommonMatFilter"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Paper } from "@mui/material"

// Helper imports
import { Accordion, AccordionDetails, AccordionSummary } from "../../../helpers/CustomAccordion"

const WeaponFilters = () => {

    const theme = useTheme()

    return (
        <Paper variant="outlined" square
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

            {/* WEAPON TYPE */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="weapon-weapontype-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Weapon Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WeaponTypeFilter />
                </AccordionDetails>
            </Accordion>

            {/* RARITY */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="weapon-rarity-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Rarity</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WeaponRarityFilter />
                </AccordionDetails>
            </Accordion>

            {/* SUBSTATS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="weapon-substats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Substat</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WeaponSubstatFilter />
                </AccordionDetails>
            </Accordion>

            {/* FORGERY MATS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="weapon-forgerymats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Forgery Material</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WeaponForgeryMatFilter />
                </AccordionDetails>
            </Accordion>

            {/* COMMON MATS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="weapon-commonmats-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Common Material</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WeaponCommonMatFilter />
                </AccordionDetails>
            </Accordion>

        </Paper>
    )

}

export default WeaponFilters