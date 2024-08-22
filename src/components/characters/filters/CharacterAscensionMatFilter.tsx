import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setAscensionMats } from "../../../redux/reducers/CharacterFilterReducer"
import { AscensionMats } from "../../../helpers/MaterialList"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterAscensionMatFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (material: string) => {
        dispatch(setAscensionMats(material))
    }

    return (
        <React.Fragment>
            {
                AscensionMats.map((material, index) => (
                    <CustomTooltip key={index} title={material} arrow placement="top">
                        <img className="filter-off" id={`${material.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/materials/ascension/${material.split(" ").join("_")}.png`} alt={material} onClick={() => handleClick(material)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterAscensionMatFilter