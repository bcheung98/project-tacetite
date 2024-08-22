import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setSubstats } from "../../../redux/reducers/WeaponFilterReducer"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const Substats = ["ATK", "Crit Rate", "Crit DMG", "DEF", "Energy Regen", "HP"]

const WeaponSubstatFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (substat: string) => {
        dispatch(setSubstats(substat))
    }

    return (
        <React.Fragment>
            {
                Substats.map((substat, index) => (
                    <CustomTooltip key={index} title={substat} arrow placement="top">
                        <img className="filter-off" id={`weapon-${substat.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/stat_icons/${substat.split(" ").join("_")}.png`} alt={substat} onClick={() => handleClick(substat)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default WeaponSubstatFilter