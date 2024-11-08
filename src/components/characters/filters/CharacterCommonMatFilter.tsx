import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setCommonMats } from "../../../redux/reducers/CharacterFilterReducer"
import { CommonMats } from "../../../data/MaterialList"
import { formatCommonMats } from "../../../helpers/TooltipText"
import { CustomTooltip } from "../../_styled/StyledTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterCommonMatFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (material: string) => {
        dispatch(setCommonMats(material))
    }

    return (
        <React.Fragment>
            {
                CommonMats.map((material, index) => (
                    <CustomTooltip key={index} title={formatCommonMats(material)} arrow placement="top">
                        <img className="filter-off" id={`${material.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/materials/common/${material.split(" ").join("_")}4.png`} alt={material} onClick={() => handleClick(material)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterCommonMatFilter