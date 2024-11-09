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
import { CharacterFilterKeys, setAscensionMats, setBossMats, setCommonMats, setElement, setForgeryMats, setRarity, setTags, setUniqueTag, setWeapon, setWeeklyBossMats } from "../../redux/reducers/CharacterFilterReducer"
import { Tags } from "../../data/CharacterTags"
import { ForgeryMats, CommonMats, AscensionMats, BossMats, WeeklyBossMats } from "../../data/MaterialList"
import { formatForgeryMats, formatCommonMats, formatBossMats, formatWeeklyBossMats } from "../../helpers/TooltipText"

// Type imports
import { RootState } from "../../redux/store"

function CharacterFilters(props: {
    handleClose?: (arg0: any) => void
}) {

    const theme = useTheme()

    const dispatch = useDispatch()

    const characterFilters = useSelector((state: RootState) => state.characterFilters)

    const handleClickSwitch = (selected: boolean) => {
        dispatch(setUniqueTag(selected))
    }

    const [selected, setSelected] = React.useState(false)
    const handleSelect = () => {
        handleClickSwitch(!selected)
        setSelected(!selected)
    }

    const filters: {
        name: string,
        tag: CharacterFilterKeys,
        component: React.ReactNode
    }[] = [
            {
                name: "Attribute",
                tag: "element",
                component:
                    <Grid container spacing={1}>
                        {["Glacio", "Fusion", "Electro", "Aero", "Spectro", "Havoc"].map((element, index) => <FilterButton key={index} tag={element} img={`elements/icons/${element}`} active={characterFilters.element.includes(element)} onClick={() => dispatch(setElement(element))} />)}
                    </Grid>
            },
            {
                name: "Weapon",
                tag: "weapon",
                component:
                    <Grid container spacing={1}>
                        {["Broadblade", "Gauntlet", "Pistols", "Rectifier", "Sword"].map((weapon, index) => <FilterButton key={index} tag={weapon} img={`weapons/icons/${weapon}`} active={characterFilters.weapon.includes(weapon)} onClick={() => dispatch(setWeapon(weapon))} />)}
                    </Grid>
            },
            {
                name: "Rarity",
                tag: "rarity",
                component:
                    <Grid container spacing={1}>
                        {[5, 4].map((rarity, index) => <FilterButton key={index} variant="text" tag={[...Array(rarity).keys()].map(() => "✦").join("")} active={characterFilters.rarity.includes(rarity)} onClick={() => dispatch(setRarity(rarity))} />)}
                    </Grid>
            },
            {
                name: "Tags",
                tag: "tags",
                component:
                    <React.Fragment>
                        <Box sx={{ display: "flex", alignItems: "center", mb: "10px" }}>
                            <CustomSwitch checked={selected} onChange={handleSelect} />
                            <Typography sx={{ ml: "10px", mt: "-3px" }}>
                                Toggle "AND" Filter
                            </Typography>
                            <CustomTooltip title="If toggled, will select resonators that only contain all selected Tags." arrow placement="top">
                                <HelpIcon sx={{ color: `${theme.text.color}`, ml: "10px", cursor: "pointer" }} fontSize="small" />
                            </CustomTooltip>
                        </Box>
                        <Grid container spacing={1}>
                            {Object.keys(Tags).map((tag, index) => <FilterButton key={index} tag={tag} img={`tags/${tag}`} active={characterFilters.tags.includes(tag)} onClick={() => dispatch(setTags(tag))} />)}
                        </Grid>
                    </React.Fragment>
            },
            {
                name: "Forgery Material",
                tag: "forgeryMat",
                component:
                    <Grid container spacing={1}>
                        {ForgeryMats.map((material, index) => <FilterButton key={index} tag={formatForgeryMats(material)} img={`materials/forgery/${material}4`} active={characterFilters.forgeryMat.includes(material)} onClick={() => dispatch(setForgeryMats(material))} />)}
                    </Grid>
            },
            {
                name: "Common Material",
                tag: "commonMat",
                component:
                    <Grid container spacing={1}>
                        {CommonMats.map((material, index) => <FilterButton key={index} tag={formatCommonMats(material)} img={`materials/common/${material}4`} active={characterFilters.commonMat.includes(material)} onClick={() => dispatch(setCommonMats(material))} />)}
                    </Grid>
            },
            {
                name: "Ascension Material",
                tag: "ascensionMat",
                component:
                    <Grid container spacing={1}>
                        {AscensionMats.map((material, index) => <FilterButton key={index} tag={material} img={`materials/ascension/${material}`} active={characterFilters.ascensionMat.includes(material)} onClick={() => dispatch(setAscensionMats(material))} />)}
                    </Grid>
            },
            {
                name: "Boss Material",
                tag: "bossMat",
                component:
                    <Grid container spacing={1}>
                        {BossMats.map((material, index) => <FilterButton key={index} tag={formatBossMats(material)} img={`materials/boss/${material}`} active={characterFilters.bossMat.includes(material)} onClick={() => dispatch(setBossMats(material))} />)}
                    </Grid>
            },
            {
                name: "Weekly Boss Material",
                tag: "weeklyBossMat",
                component:
                    <Grid container spacing={1}>
                        {WeeklyBossMats.map((material, index) => <FilterButton key={index} tag={formatWeeklyBossMats(material)} img={`materials/weekly/${material}`} active={characterFilters.weeklyBossMat.includes(material)} onClick={() => dispatch(setWeeklyBossMats(material))} />)}
                    </Grid>
            },
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
                                    color: characterFilters[filter.tag].length > 0 ? `gold` : `${theme.text.color}`
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

export default CharacterFilters