import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setWeapon } from "../../../redux/reducers/CharacterFilterReducer"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const Weapons = ["Broadblade", "Gauntlet", "Pistols", "Rectifier", "Sword"]

const CharacterWeaponFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (weapon: string) => {
        dispatch(setWeapon(weapon))
    }

    return (
        <React.Fragment>
            {
                Weapons.map((weapon, index) => (
                    <CustomTooltip key={index} title={weapon} arrow placement="top">
                        <img className="filter-off" id={`${weapon.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`} alt={weapon} onClick={() => handleClick(weapon)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default CharacterWeaponFilter