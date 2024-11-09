import React from "react"

// Component imports
import { CustomTooltip } from "../_styled/StyledTooltip"

// MUI imports
import { TooltipProps } from "@mui/material"

const defaultImageStyle: React.CSSProperties = {
    width: "auto",
    height: "auto",
    boxSizing: "border-box"
}

interface ImageProps {
    src: string,
    fallbackSrc?: string,
    alt?: string,
    id?: string,
    loading?: "eager" | "lazy",
    style?: React.CSSProperties,
    tooltip?: {
        title: React.ReactNode,
        placement?: TooltipProps["placement"]
    },
    onClick?: () => void
}

function Image({
    src,
    fallbackSrc = "images/Unknown",
    alt = "",
    id = src,
    loading = "lazy",
    style,
    tooltip,
    onClick
}: ImageProps) {

    const imgStyle = Object.assign({...defaultImageStyle}, style)

    let tooltipTitle, tooltipPlacement
    if (tooltip !== undefined) {
        tooltipTitle = tooltip.title
        if (tooltip.placement !== undefined) {
            tooltipPlacement = tooltip.placement
        }
        else {
            tooltipPlacement = "top" as TooltipProps["placement"]
        }
    }

    return (
        <CustomTooltip title={tooltipTitle} arrow placement={tooltipPlacement}>
            <img
                src={`${process.env.REACT_APP_URL}/${src.split(" ").join("_")}.png`}
                alt={alt}
                id={id}
                loading={loading}
                style={imgStyle}
                onError={(e: any) => {
                    e.target.src = `${process.env.REACT_APP_URL}/${fallbackSrc}.png`
                    e.onError = null
                }}
                onClick={onClick}
            />
        </CustomTooltip>
    )

}

export default Image