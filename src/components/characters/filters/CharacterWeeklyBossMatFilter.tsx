import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setWeeklyBossMats } from "../../../redux/reducers/CharacterFilterReducer"
import { WeeklyBossMats } from "../../../helpers/MaterialList"
import { formatWeeklyBossMats } from "../../../helpers/TooltipText"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const CharacterWeeklyBossMatFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (material: string) => {
        dispatch(setWeeklyBossMats(material))
    }

    return (
        <React.Fragment>
            {
                WeeklyBossMats.map((material, index) => (
                    <CustomTooltip key={index} title={formatWeeklyBossMats(material)} arrow placement="top">
                        <img className="filter-off" id={`${material.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/materials/weekly/${material.split(" ").join("_")}.png`} alt={material} onClick={() => handleClick(material)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterWeeklyBossMatFilter