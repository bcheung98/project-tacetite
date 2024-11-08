import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setForgeryMats } from "../../../redux/reducers/CharacterFilterReducer"
import { ForgeryMats } from "../../../data/MaterialList"
import { CustomTooltip } from "../../_styled/StyledTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterForgeryMatFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (material: string) => {
        dispatch(setForgeryMats(material))
    }

    return (
        <React.Fragment>
            {
                ForgeryMats.map((material, index) => (
                    <CustomTooltip key={index} title={material} arrow placement="top">
                        <img className="filter-off" id={`${material.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/materials/forgery/${material.split(" ").join("_")}4.png`} alt={material} onClick={() => handleClick(material)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterForgeryMatFilter