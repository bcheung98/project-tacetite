import * as React from "react"
import { useSelector, useDispatch } from "react-redux"

// Component imports
import FilterButton from "../_custom/FilterButton"
import { Accordion, AccordionDetails, AccordionSummary } from "../_styled/StyledAccordion"

// MUI imports
import { useTheme, Typography, Box, AppBar, IconButton } from "@mui/material"
import Grid from "@mui/material/Grid2"
import CloseIcon from "@mui/icons-material/Close"

// Helper imports
import { setWeaponType, setCommonMats, setForgeryMats, setRarity, setSubstats } from "../../redux/reducers/WeaponFilterReducer"
import { ForgeryMats, CommonMats } from "../../data/MaterialList"
import { formatForgeryMats, formatCommonMats } from "../../helpers/TooltipText"

// Type imports
import { RootState } from "../../redux/store"
import { WeaponFilterKeys } from "../../redux/reducers/WeaponFilterReducer"

function WeaponFilters(props: {
    handleClose?: (arg0: any) => void
}) {

    const theme = useTheme()

    const dispatch = useDispatch()

    const weaponFilters = useSelector((state: RootState) => state.weaponFilters)

    const filters: {
        name: string,
        tag: WeaponFilterKeys,
        component: React.ReactNode
    }[] = [
            {
                name: "Weapon Type",
                tag: "weaponType",
                component:
                    <Grid container spacing={1}>
                        {["Broadblade", "Gauntlet", "Pistols", "Rectifier", "Sword"].map((weapon, index) => <FilterButton key={index} tag={weapon} img={`weapons/icons/${weapon}`} active={weaponFilters.weaponType.includes(weapon)} onClick={() => dispatch(setWeaponType(weapon))} />)}
                    </Grid>
            },
            {
                name: "Rarity",
                tag: "rarity",
                component:
                    <Grid container spacing={1}>
                        {[5, 4, 3, 2, 1].map((rarity, index) => <FilterButton key={index} variant="text" tag={[...Array(rarity).keys()].map(() => "✦").join("")} active={weaponFilters.rarity.includes(rarity)} onClick={() => dispatch(setRarity(rarity))} />)}
                    </Grid>
            },
            {
                name: "Substat",
                tag: "substats",
                component:
                    <Grid container spacing={1}>
                        {["ATK", "Crit Rate", "Crit DMG", "DEF", "Energy Regen", "HP"].map((substat, index) => <FilterButton key={index} tag={substat} img={`stat_icons/${substat}`} active={weaponFilters.substats.includes(substat)} onClick={() => dispatch(setSubstats(substat))} />)}
                    </Grid>
            },
            {
                name: "Forgery Material",
                tag: "forgeryMat",
                component:
                    <Grid container spacing={1}>
                        {ForgeryMats.map((material, index) => <FilterButton key={index} tag={formatForgeryMats(material)} img={`materials/forgery/${material}4`} active={weaponFilters.forgeryMat.includes(material)} onClick={() => dispatch(setForgeryMats(material))} />)}
                    </Grid>
            },
            {
                name: "Common Material",
                tag: "commonMat",
                component:
                    <Grid container spacing={1}>
                        {CommonMats.map((material, index) => <FilterButton key={index} tag={formatCommonMats(material)} img={`materials/common/${material}4`} active={weaponFilters.commonMat.includes(material)} onClick={() => dispatch(setCommonMats(material))} />)}
                    </Grid>
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
                                    fontFamily: `${theme.font.styled.family}`,
                                    fontWeight: theme.font.styled.weight,
                                    color: weaponFilters[filter.tag].length > 0 ? `gold` : `${theme.text.color}`
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

export default WeaponFilters