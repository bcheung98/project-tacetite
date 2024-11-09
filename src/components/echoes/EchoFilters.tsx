import * as React from "react"
import { useSelector, useDispatch } from "react-redux"

// Component imports
import FilterButton from "../_custom/FilterButton"
import { Accordion, AccordionDetails, AccordionSummary } from "../_styled/StyledAccordion"
import { CustomSwitch } from "../_styled/StyledSwitch"
import { CustomTooltip } from "../_styled/StyledTooltip"

// MUI imports
import { useTheme, Typography, Box, AppBar, IconButton } from "@mui/material"
import Grid from "@mui/material/Grid2"
import CloseIcon from "@mui/icons-material/Close"
import HelpIcon from "@mui/icons-material/Help"

// Helper imports
import { EchoFilterKeys, setClass, setSonata, setUniqueSonata } from "../../redux/reducers/EchoFilterReducer"
import { SonataEffects } from "../../data/SonataEffects"

// Type imports
import { RootState } from "../../redux/store"

function EchoFilters(props: {
    handleClose?: (arg0: any) => void
}) {

    const theme = useTheme()

    const dispatch = useDispatch()

    const echoFilters = useSelector((state: RootState) => state.echoFilters)

    const handleClickSwitch = (selected: boolean) => {
        dispatch(setUniqueSonata(selected))
    }

    const [selected, setSelected] = React.useState(false)
    const handleSelect = () => {
        handleClickSwitch(!selected)
        setSelected(!selected)
    }

    const filters: {
        name: string,
        tag: EchoFilterKeys,
        component: React.ReactNode
    }[] = [
            {
                name: "Class",
                tag: "class",
                component:
                    <Grid container spacing={1}>
                        {echoClasses.map((cls, index) => <FilterButton key={index} variant="text" tag={`${cls} (Cost ${echoCosts[cls as keyof typeof echoCosts]})`} active={echoFilters.class.includes(cls)} onClick={() => dispatch(setClass(cls))} />)}
                    </Grid>
            },
            {
                name: "Sonata Effects",
                tag: "sonata",
                component:
                    <React.Fragment>
                        <Box sx={{ display: "flex", alignItems: "center", mb: "10px" }}>
                            <CustomSwitch checked={selected} onChange={handleSelect} />
                            <Typography sx={{ ml: "10px", mt: "-3px" }}>
                                Toggle "AND" Filter
                            </Typography>
                            <CustomTooltip title="If toggled, will select echoes  that only contain all selected Sonata Effects." arrow placement="top">
                                <HelpIcon sx={{ color: `${theme.text.color}`, ml: "10px", cursor: "pointer" }} fontSize="small" />
                            </CustomTooltip>
                        </Box>
                        <Grid container spacing={1}>
                            {Object.keys(SonataEffects).map((sonata, index) => <FilterButton key={index} tag={sonata} img={`echoes/sonata/${sonata}`} active={echoFilters.sonata.includes(sonata)} onClick={() => dispatch(setSonata(sonata))} />)}
                        </Grid>
                    </React.Fragment>
            }
        ]

    return (
        <Box
            sx={{
                color: `${theme.text.color}`,
                backgroundColor: `${theme.card.backgroundColor}`,
                border: { xs: "none", sm: `2px solid ${theme.border.color}` },
                borderRadius: "5px",
                width: "100%",
                overflowY: { xs: "none", sm: "auto" }
            }}
        >
            <AppBar position="static"
                sx={{
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderBottom: `1px solid ${theme.border.color}`,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        sx={{
                            px: 2,
                            py: 1.5,
                            fontFamily: theme.font.styled.family,
                            fontWeight: theme.font.styled.weight,
                            fontSize: "18px",
                            flexGrow: 1
                        }}
                    >
                        Filters
                    </Typography>
                    <IconButton onClick={props.handleClose}>
                        <CloseIcon sx={{ color: `white` }} />
                    </IconButton>
                </Box>
            </AppBar>
            {
                filters.map((filter, index) => (
                    <Accordion key={index}>
                        <AccordionSummary>
                            <Typography
                                sx={{
                                    fontFamily: theme.font.styled.family,
                                    fontWeight: theme.font.styled.weight,
                                    color: echoFilters[filter.tag].length > 0 ? `gold` : `${theme.text.color}`
                                }}
                            >
                                {filter.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pl: 1 }}>
                            {filter.component}
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </Box>
    )

}

export default EchoFilters

const echoClasses = ["Calamity", "Overlord", "Elite", "Common"]
const echoCosts = {
    "Calamity": 4,
    "Overlord": 4,
    "Elite": 3,
    "Common": 1
}
