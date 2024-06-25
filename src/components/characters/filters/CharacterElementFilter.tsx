import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setElement } from "../../../redux/reducers/CharacterFilterReducer"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const Elements = ["Glacio", "Fusion", "Electro", "Aero", "Spectro", "Havoc"]

const CharacterElementFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (element: string) => {
        dispatch(setElement(element))
    }

    return (
        <React.Fragment>
            {
                Elements.map((element, index) => (
                    <CustomTooltip key={index} title={element} arrow placement="top">
                        <img className="filter-off" id={`${element.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/elements/icons/${element}.png`} alt={element} onClick={() => handleClick(element)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterElementFilter