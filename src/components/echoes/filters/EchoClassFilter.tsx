import * as React from "react"
import { useDispatch } from "react-redux"

// MUI imports
import { Box } from "@mui/material"

// Helper imports
import { setClass } from "../../../redux/reducers/EchoFilterReducer"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const Classes = ["Calamity", "Overlord", "Elite", "Common"]

const EchoClassFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (cls: string) => {
        dispatch(setClass(cls))
    }

    return (
        <React.Fragment>
            {
                Classes.map((cls, index) => (
                    <Box sx={{ display: "inline-flex", mr: "5px" }} key={index} >
                        {/* This is intentionally a <p> */}
                        <p className="filter-button-off" id={`echo-${cls.toLowerCase()}-button`} onClick={() => handleClick(cls)} onError={ErrorLoadingImage}>
                            {cls} (Cost {echoCosts[cls as keyof typeof echoCosts]})
                        </p>
                    </Box>
                ))
            }
        </React.Fragment>
    )

}

export default EchoClassFilter

const echoCosts = {
    "Calamity": 4,
    "Overlord": 4,
    "Elite": 3,
    "Common": 1
}