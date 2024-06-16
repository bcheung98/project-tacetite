import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setTags } from "../../../redux/reducers/CharacterFilterReducer"
import { Tags } from "../../../helpers/CharacterTags"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterTagsFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (tag: string) => {
        dispatch(setTags(tag))
    }

    return (
        <React.Fragment>
            {
                Object.keys(Tags).map((tag, index) => (
                    <CustomTooltip key={index} title={tag} arrow placement="top">
                        <img className="filter-off" id={`${tag.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/tags/${tag}.png`} alt={tag} onClick={() => handleClick(tag)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterTagsFilter