// Component imports
import EchoClassFilter from "./EchoClassFilter"
import EchoSonataFilter from "./EchoSonataFilter"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Paper } from "@mui/material"

// Helper imports
import { Accordion, AccordionDetails, AccordionSummary } from "../../_styled/StyledAccordion"

const EchoFilters = (props: any) => {

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

            {/* CLASS */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="echo-class-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Class</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EchoClassFilter />
                </AccordionDetails>
            </Accordion>

            {/* SONATA */}
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" className="filter-text-off" id="echo-sonata-filter-text" sx={{ color: `${theme.text.color}`, fontWeight: "bold" }}>Sonata Effects</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EchoSonataFilter />
                </AccordionDetails>
            </Accordion>

        </Paper>
    )

}

export default EchoFilters