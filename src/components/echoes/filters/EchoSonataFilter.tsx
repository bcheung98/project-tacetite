import * as React from "react"
import { useDispatch } from "react-redux"

// Helper imports
import { setSonata } from "../../../redux/reducers/EchoFilterReducer"
import { SonataEffects } from "../../../helpers/SonataEffects"
import { CustomTooltip } from "../../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage"

const EchoSonataFilter = () => {

    const dispatch = useDispatch()

    const handleClick = (sonata: string) => {
        dispatch(setSonata(sonata))
    }

    return (
        <React.Fragment>
            {
                Object.keys(SonataEffects).map((sonata, index) => (
                    <CustomTooltip key={index} title={sonata} arrow placement="top">
                        <img className="filter-off" id={`echo-${sonata.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/echoes/sonata/${sonata}.png`} alt={sonata} onClick={() => handleClick(sonata)} onError={ErrorLoadingImage} />
                    </CustomTooltip>
                ))
            }
        </React.Fragment>
    )

}

export default EchoSonataFilter