import * as React from "react"
import { useDispatch, useSelector } from "react-redux"

// Component imports
import { CustomTooltip } from "../_styled/StyledTooltip"
import { CustomMenuItem } from "../_styled/StyledMenu"
import SearchBar from "../_custom/SearchBar"

// MUI Imports
import { useTheme, useMediaQuery, Box, Typography, Autocomplete } from "@mui/material"

// Helper imports
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import { setPlannerWeapons, updateTotalCosts } from "../../redux/reducers/AscensionPlannerReducer"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../redux/store"
import { Weapon } from "../../types/weapon"

function WeaponSelector() {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("md"))

    const dispatch = useDispatch()

    const weapons = useSelector((state: RootState) => state.weapons.weapons)

    const [values, setValues] = React.useState<Weapon[]>([])

    React.useEffect(() => {
        dispatch(setPlannerWeapons(values))
        dispatch(updateTotalCosts())
    }, [JSON.stringify(values)])

    const smallIconStyles = {
        width: "20px",
        height: "20px",
    }

    return (
        <Box>
            <Autocomplete
                multiple
                autoComplete
                disableCloseOnSelect
                options={[...weapons].sort((a, b) => a.rarity > b.rarity ? -1 : 1)} // Autocomplete options are read-only, so need spread operator to manipulate the array
                getOptionLabel={(option) => option.displayName ? option.displayName : option.name}
                filterSelectedOptions
                noOptionsText="No Weapons"
                value={values}
                onChange={(event: any, newValue: Weapon[] | null) => {
                    setValues(newValue as Weapon[])
                }}
                ChipProps={{
                    sx: {
                        color: `${theme.text.color}`,
                        fontFamily: `${theme.font.styled.family}`,
                        backgroundColor: `${theme.button.selected}`,
                        "& .MuiChip-deleteIcon": {
                            color: `${theme.text.color}`,
                            ":hover": {
                                color: `${theme.text.colorAlt}`
                            }
                        },
                    }
                }}
                ListboxProps={{
                    sx: { backgroundColor: `${theme.paper.backgroundColor}`, p: 0 }
                }}
                renderInput={(params) => (
                    <SearchBar params={params} placeholder="Weapons" />
                )}
                renderOption={(props, option) => (
                    <CustomMenuItem
                        {...props}
                        key={option.name}
                        sx={{
                            "&:not(:last-child)": {
                                borderBottom: `1px solid ${theme.border.color}`,
                            },
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <Box sx={{ mr: "10px", mt: "6px" }}>
                                <CustomTooltip title={option.type} arrow placement="top">
                                    <img style={smallIconStyles} src={`${process.env.REACT_APP_URL}/weapons/icons/${option.type}.png`} alt={option.type} onError={ErrorLoadingImage} />
                                </CustomTooltip>
                            </Box>
                            <img
                                src={`${process.env.REACT_APP_URL}/weapons/${option.name.split(" ").join("_")}.png`} alt={option.name}
                                style={{
                                    width: matches ? "42px" : "48px",
                                    marginRight: "20px",
                                    border: `2px solid ${GetRarityColor(option.rarity)}`,
                                    borderRadius: "5px",
                                    boxShadow: `inset 0 0 30px 5px ${GetBackgroundColor(option.rarity)}`
                                }}
                                onError={ErrorLoadingImage}
                            />
                            <Typography
                                noWrap
                                sx={{
                                    fontFamily: `${theme.font.styled.family}`,
                                    fontSize: { xs: "14px", md: "16px" },
                                    color: `${theme.text.color}`
                                }}
                            >
                                {option.displayName ? option.displayName : option.name}
                            </Typography>
                        </Box>
                    </CustomMenuItem>
                )}
            />
        </Box>
    )

}

export default WeaponSelector