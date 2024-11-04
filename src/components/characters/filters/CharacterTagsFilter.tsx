import * as React from "react"
import { useDispatch } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import HelpIcon from "@mui/icons-material/Help"

// Helper imports
import { CustomSwitch } from "../../_styled/StyledSwitch"
import { setTags, setUniqueTag } from "../../../redux/reducers/CharacterFilterReducer"
import { Tags } from "../../../data/CharacterTags"
import { CustomTooltip } from "../../_styled/StyledTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterTagsFilter = () => {

    const theme = useTheme()

    const dispatch = useDispatch()

    const handleClick = (tag: string) => {
        dispatch(setTags(tag))
    }

    const handleClickSwitch = (selected: boolean) => {
        dispatch(setUniqueTag(selected))
    }

    const [selected, setSelected] = React.useState(false)
    const handleSelect = () => {
        handleClickSwitch(!selected)
        setSelected(!selected)
    }

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", mb: "10px" }}>
                <CustomSwitch checked={selected} onChange={handleSelect} element="" />
                <Typography variant="body1" sx={{ color: `${theme.text.color}`, fontWeight: "bold", ml: "10px", mt: "-3px" }}>
                    Toggle "AND" Filter
                </Typography>
                <CustomTooltip title={tooltipText} arrow placement="top">
                    <HelpIcon sx={{ color: `${theme.text.color}`, ml: "10px", cursor: "pointer" }} fontSize="small" />
                </CustomTooltip>
            </Box>
            {
                Object.keys(Tags).map((tag, index) => (
                    <CustomTooltip key={index} title={tag} arrow placement="top">
                        <img className="filter-off" id={`${tag.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/tags/${tag.split(" ").join("_")}.png`} alt={tag} onClick={() => handleClick(tag)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterTagsFilter

const tooltipText = "If toggled, will select resonators that only contain all selected Tags."