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
import { setPlannerCharacters, updateTotalCosts } from "../../redux/reducers/AscensionPlannerReducer"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../redux/store"
import { Character } from "../../types/character"

function CharacterSelector() {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("md"))

    const dispatch = useDispatch()

    const characters = useSelector((state: RootState) => state.characters.characters)

    const [values, setValues] = React.useState<Character[]>([])

    React.useEffect(() => {
        dispatch(setPlannerCharacters(values))
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
                options={characters}
                getOptionLabel={(option) => option.displayName ? option.displayName : option.name}
                filterSelectedOptions
                noOptionsText="No Characters"
                value={values}
                onChange={(event: any, newValue: Character[] | null) => {
                    setValues(newValue as Character[])
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
                    <SearchBar params={params} placeholder="Characters" />
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
                                <Box>
                                    <CustomTooltip title={option.element} arrow placement="top">
                                        <img style={smallIconStyles} src={`${process.env.REACT_APP_URL}/elements/${option.element}.png`} alt={option.element} onError={ErrorLoadingImage} />
                                    </CustomTooltip>
                                </Box>
                                <Box>
                                    <CustomTooltip title={option.weapon} arrow placement="top">
                                        <img style={smallIconStyles} src={`${process.env.REACT_APP_URL}/weapons/icons/${option.weapon}.png`} alt={option.weapon} onError={ErrorLoadingImage} />
                                    </CustomTooltip>
                                </Box>
                            </Box>
                            <img
                                src={`${process.env.REACT_APP_URL}/characters/icons/${option.name.split(" ").join("_")}.png`} alt={option.name}
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

export default CharacterSelector