import * as React from "react"

// Component imports
import { CustomTooltip } from "../_styled/StyledTooltip"

// MUI imports
import { useTheme, Typography } from "@mui/material"

function Countdown(props: { date: { obj: Date, date: string, time: string } }) {

    const theme = useTheme()

    const date = props.date.obj.getTime()
    const initialTime = date - new Date().getTime()
    const [timeRemaining, setTimeRemaining] = React.useState(initialTime)

    React.useEffect(() => {
        const timerInterval = setInterval(() => {
            let now = new Date().getTime()
            let diff = date - now
            setTimeRemaining(() => {
                if (diff < 0) {
                    clearInterval(timerInterval)
                    return 0
                }
                else {
                    return diff
                }
            })
        }, 1000)
        return () => clearInterval(timerInterval)
    }, [date])

    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    const countdownArr = []
    days > 0 && countdownArr.push(`${days}d`)
    days + hours > 0 && countdownArr.push(`${hours}h`)
    days + hours + minutes > 0 && countdownArr.push(`${minutes}m`)
    countdownArr.push(`${seconds}s`)

    return (
        <Typography sx={{ fontFamily: `${theme.font.styled.family}`, fontSize: "14px", my: "10px" }}>
            {
                timeRemaining > 0 ?
                    <React.Fragment>
                        {`Ends in `}
                        <CustomTooltip title={`${props.date.date} ${props.date.time}`} arrow placement="bottom">
                            <span style={{ textDecoration: "underline dotted", cursor: "help" }}>{countdownArr.join(" ")}</span>
                        </CustomTooltip>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        Banner has ended
                    </React.Fragment>
            }
        </Typography>
    )

}

export default Countdown