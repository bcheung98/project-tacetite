import * as React from "react"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Autocomplete, ClickAwayListener, CardHeader, AutocompleteCloseReason, Chip } from "@mui/material"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"

// Helper imports
import { Button, PopperComponent, StyledPopper, StyledInput } from "../../helpers/CustomAutocomplete"
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { GetRarityColor } from "../../helpers/RarityColors"
import { setPlannerCharacters, updateCharacterCosts } from "../../redux/reducers/AscensionPlannerReducer"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../redux/store"

interface LabelType {
    name: string
    color: string
    description?: string
}

const CharacterSelector = (props: any) => {

    const theme = useTheme()
    const dispatch = useDispatch()

    let { characters } = props.characters

    React.useEffect(() => {
        dispatch(setPlannerCharacters(value))
        dispatch(updateCharacterCosts([]))
    })

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [value, setValue] = React.useState<LabelType[]>([])
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([])

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setPendingValue(value)
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setValue(pendingValue)
        if (anchorEl) {
            anchorEl.focus()
        }
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "char-label" : undefined

    const smallIcon = {
        width: "16px",
        height: "16px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "16px",
        marginBottom: "10px",
    }

    if (characters.length > 0) {
        return (
            <React.Fragment>
                <Box
                    sx={{
                        width: 300,
                        p: "5px",
                        mx: "20px",
                        border: `2px solid ${theme.border.color}`,
                        borderRadius: "5px",
                    }}
                >
                    <Button disableRipple onClick={handleClick}>
                        <span style={{ fontFamily: "Segoe UI", fontSize: "16pt", color: "white" }}>Characters</span>
                        <ArrowForwardIosSharpIcon sx={{ transform: "rotate(90deg)", color: "white" }} />
                    </Button>
                </Box>
                <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box>
                            <Autocomplete
                                open
                                multiple
                                onClose={(event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) => {
                                    if (reason === "escape") {
                                        handleClose()
                                    }
                                }}
                                value={pendingValue}
                                onChange={(event, newValue, reason) => {
                                    if (
                                        event.type === "keydown" &&
                                        (event as React.KeyboardEvent).key === "Backspace" &&
                                        reason === "removeOption"
                                    ) {
                                        return
                                    }
                                    setPendingValue(newValue)
                                }}
                                disableCloseOnSelect
                                PopperComponent={PopperComponent}
                                renderTags={() => null}
                                noOptionsText="No characters"
                                renderOption={(props, option, { selected }) => (
                                    <li
                                        {...props}
                                        key={option.name}
                                        style={{ backgroundColor: selected ? `${theme.table.body.hover}` : `${theme.paper.backgroundColor}`, borderLeft: `10px solid ${GetRarityColor(option.rarity)}` }}
                                    >
                                        <Box
                                            component={DoneIcon}
                                            sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
                                            style={{
                                                visibility: selected ? "visible" : "hidden",
                                            }}
                                        />
                                        <CardHeader
                                            avatar={
                                                <Box sx={{ position: "relative", pt: "5px" }}>
                                                    <img alt={option.name} src={(`${process.env.REACT_APP_URL}/characters/icons/${option.name.split(" ").join("_")}.png`)} style={{ width: "48px", border: `2px solid ${theme.border.color}`, borderRadius: "48px" }} onError={ErrorLoadingImage} />
                                                    <Box sx={{ position: "absolute", top: "5.5px", left: "-10px" }}>
                                                        <CustomTooltip title={option.element} arrow placement="top">
                                                            <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/elements/icons/${option.element}.png`)} alt={option.element} onError={ErrorLoadingImage} />
                                                        </CustomTooltip>
                                                    </Box>
                                                    <Box sx={{ position: "absolute", top: "35px", left: "-10px" }}>
                                                        <CustomTooltip title={option.path} arrow placement="top">
                                                            <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/weapons/icons/${option.weapon}.png`)} alt={option.weapon} onError={ErrorLoadingImage} />
                                                        </CustomTooltip>
                                                    </Box>
                                                </Box>
                                            }
                                            title={
                                                <Typography variant="body1" sx={{ ml: "5px", fontWeight: "bold" }}>
                                                    {option.displayName ? option.displayName : option.name}
                                                </Typography>
                                            }
                                            sx={{ p: 0, flexGrow: 1, ml: "10px" }}
                                        />
                                        <Box
                                            component={CloseIcon}
                                            sx={{ opacity: 0.6, width: 18, height: 18 }}
                                            style={{
                                                visibility: selected ? "visible" : "hidden",
                                            }}
                                        />
                                    </li>
                                )}
                                options={[...characters].sort((a, b) => {
                                    // Display the selected labels first.
                                    let ai = value.indexOf(a)
                                    ai = ai === -1 ? value.length + characters.indexOf(a) : ai
                                    let bi = value.indexOf(b)
                                    bi = bi === -1 ? value.length + characters.indexOf(b) : bi
                                    return ai - bi
                                })}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <StyledInput
                                        ref={params.InputProps.ref}
                                        inputProps={params.inputProps}
                                        autoFocus
                                        placeholder="Search"
                                    />
                                )}
                            />
                        </Box>
                    </ClickAwayListener>
                </StyledPopper>
            </React.Fragment>
        )
    }
    else {
        return (
            <>
                {null}
            </>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

export default connect(mapStateToProps)(CharacterSelector)