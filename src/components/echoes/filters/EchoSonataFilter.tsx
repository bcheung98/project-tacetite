import * as React from "react"
import { useDispatch } from "react-redux"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import HelpIcon from "@mui/icons-material/Help"

// Helper imports
import { CustomSwitch } from "../../_styled/StyledSwitch"
import { setSonata, setUniqueSonata } from "../../../redux/reducers/EchoFilterReducer"
import { SonataEffects } from "../../../data/SonataEffects"
import { CustomTooltip } from "../../_styled/StyledTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const EchoSonataFilter = () => {

    const theme = useTheme()

    const dispatch = useDispatch()

    const handleClick = (sonata: string) => {
        dispatch(setSonata(sonata))
    }

    const handleClickSwitch = (selected: boolean) => {
        dispatch(setUniqueSonata(selected))
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
                Object.keys(SonataEffects).map((sonata, index) => (
                    <CustomTooltip key={index} title={sonata} arrow placement="top">
                        <img className="filter-off" id={`echo-${sonata.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/echoes/sonata/${sonata.split(" ").join("_")}.png`} alt={sonata} onClick={() => handleClick(sonata)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default EchoSonataFilter

const tooltipText = "If toggled, will select echoes that only contain all selected Sonata Effects."