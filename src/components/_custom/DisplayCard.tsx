import React from "react";

// Component imports
import Image from "./Image";
import { CustomTooltip } from "../_styled/StyledTooltip";

// MUI imports
import {
    useTheme,
    SxProps,
    Typography,
    ButtonBase,
    Box,
    Card,
} from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "../../helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";

// Type imports
import { Materials } from "../../types/materials";
import {
    formatBossMats,
    formatCommonMats,
    formatForgeryMats,
    formatWeeklyBossMats,
} from "../../helpers/TooltipText";

interface DisplayCardProps {
    name: string;
    id?: string;
    displayName?: string;
    type: "character" | "weapon";
    rarity?: 5 | 4 | 3 | 2 | 1;
    variant?: "icon" | "avatar";
    size?: string;
    showName?: boolean;
    showStars?: boolean;
    info?: {
        element?: string;
        weapon?: string;
    };
    materials?: Materials;
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
}

function DisplayCard({
    name,
    id = name,
    displayName = name,
    type,
    rarity = 3,
    variant = "icon",
    size = variant === "icon" ? "64px" : "200px",
    showName = variant === "avatar" ? true : false,
    showStars = variant === "avatar" ? true : false,
    info,
    materials,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = false,
}: DisplayCardProps) {
    const theme = useTheme();

    id = id.split(" ").join("");

    const aspectRatio = () => {
        if (variant === "icon") {
            return "1 / 1";
        } else {
            if (type === "character") {
                return "696 / 960";
            } else {
                return "1 / 1";
            }
        }
    };

    const backgroundColor = () => {
        const baseBG = theme.materialImage.backgroundColor;
        if (variant === "icon" || !showStars) {
            return baseBG;
        } else {
            let opacity, gradient;
            type === "character" ? (opacity = 0.45) : (opacity = 0.75);
            type === "character" ? (gradient = "60%") : (gradient = "75%");
            return `linear-gradient(${baseBG} ${gradient}, ${getBackgroundColor(
                rarity,
                opacity
            )} 100%)`;
        }
    };

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover &&
            zoomImageOnHover(direction, `${id}-cardImage`, 1.05);
    };

    let imageURL = "";
    if (type === "character") {
        imageURL = `characters/${variant}s/${name}`;
    }
    if (type === "weapon") {
        imageURL = `weapons/${name}`;
    }

    const href = disableLink
        ? ""
        : `/${type}s/${name.split(" ").join("_").toLowerCase()}`;

    const cardStyle: SxProps = {
        width: size,
        height: "auto",
        background: theme.materialImage.backgroundColor,
        border: "solid",
        borderWidth: variant === "icon" ? "2px" : "1px",
        borderColor:
            variant === "icon" ? getRarityColor(rarity) : theme.border.color,
        borderRadius: "5px",
        boxSizing: "content-box",
        containerType: "inline-size",
        position: "relative",
    };

    const cardImageStyle: React.CSSProperties = {
        width: size,
        height: variant === "icon" ? size : "auto",
        aspectRatio: aspectRatio(),
        padding: "0px",
        boxShadow:
            variant === "icon"
                ? `inset 0 0 30px 5px ${getBackgroundColor(rarity)}`
                : "none",
    };

    const materialImageStyle: React.CSSProperties = {
        width: `calc(${size} / 6)`,
        height: `calc(${size} / 6)`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "5px",
        backgroundColor: `${theme.paper.backgroundColor}`,
        marginLeft: "2.5px",
        marginRight: "2.5px",
    };

    const smallIconStyle: React.CSSProperties = {
        width: `calc(${size} / 5.75)`,
        height: `calc(${size} / 5.75)`,
        minWidth: "16px",
        minHeight: "16px",
        backgroundColor: theme.paper.backgroundColor,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "32px",
        marginBottom: "10px",
        padding: "4px",
    };

    return (
        <Card sx={cardStyle}>
            <CustomTooltip
                title={!disableTooltip ? displayName : ""}
                arrow
                placement="top"
            >
                <Box
                    sx={{ background: backgroundColor() }}
                    onMouseEnter={() => handleHover("enter")}
                    onMouseLeave={() => handleHover("leave")}
                >
                    {info && (
                        <Box
                            sx={{
                                display: "grid",
                                position: "absolute",
                                zIndex: 5,
                                top: "10px",
                                left: "10px",
                            }}
                        >
                            {info.element !== undefined && (
                                <Image
                                    src={`elements/icons/${info.element}`}
                                    alt={info.element}
                                    style={smallIconStyle}
                                    tooltip={{ title: info.element }}
                                />
                            )}
                            {info.weapon !== undefined && (
                                <Image
                                    src={`weapons/icons/${info.weapon}`}
                                    alt={info.weapon}
                                    style={smallIconStyle}
                                    tooltip={{ title: info.weapon }}
                                />
                            )}
                        </Box>
                    )}
                    <ButtonBase disableRipple href={href} target="_blank">
                        <Image
                            src={imageURL}
                            alt={name}
                            id={`${id}-cardImage`}
                            style={cardImageStyle}
                        />
                    </ButtonBase>
                    <Box
                        sx={{
                            mt:
                                variant === "icon"
                                    ? "0px"
                                    : type === "character"
                                    ? "-5px"
                                    : "60px",
                            borderBottom:
                                variant === "icon"
                                    ? "none"
                                    : `calc(${size} / 30) solid ${getRarityColor(
                                          rarity
                                      )}`,
                            position: "relative",
                        }}
                    >
                        <ButtonBase
                            disableRipple
                            href={href}
                            target="_blank"
                            sx={{
                                position: "absolute",
                                bottom: "50%",
                                left: "50%",
                                transform: "translate(-50%, 0%)",
                                width: "95%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize:
                                        type === "character"
                                            ? "20px"
                                            : "16.5px",
                                    fontWeight: theme.font.styled.weight,
                                    textShadow:
                                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                                    textAlign: "center",
                                    mb: showStars ? "0px" : "10px",
                                }}
                            >
                                {showName && displayName}
                                <br />
                                <Typography
                                    component="span"
                                    sx={{
                                        color: theme.text.star,
                                        fontSize: "20px",
                                        textShadow: "#e3721b 1px 1px 10px",
                                        userSelect: "none",
                                    }}
                                >
                                    {showStars &&
                                        [...Array(rarity).keys()].map(
                                            () => "✦"
                                        )}
                                </Typography>
                            </Typography>
                        </ButtonBase>
                    </Box>
                </Box>
            </CustomTooltip>
            {materials !== undefined && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexGrow: 1,
                        height: `calc(${size} / 5.5)`,
                        px: 1,
                        py: 1.5,
                        overflow: "hidden",
                    }}
                >
                    {materials.forgeryMat && (
                        <Image
                            src={`materials/forgery/${materials.forgeryMat}4`}
                            alt={materials.forgeryMat}
                            style={materialImageStyle}
                            tooltip={{
                                title: formatForgeryMats(materials.forgeryMat),
                            }}
                        />
                    )}
                    {materials.bossMat && (
                        <Image
                            src={`materials/boss/${materials.bossMat}`}
                            alt={materials.forgeryMat}
                            style={materialImageStyle}
                            tooltip={{
                                title: formatBossMats(materials.bossMat),
                            }}
                        />
                    )}
                    {materials.weeklyBossMat && (
                        <Image
                            src={`materials/weekly/${materials.weeklyBossMat}`}
                            alt={materials.weeklyBossMat}
                            style={materialImageStyle}
                            tooltip={{
                                title: formatWeeklyBossMats(
                                    materials.weeklyBossMat
                                ),
                            }}
                        />
                    )}
                    {materials.commonMat && (
                        <Image
                            src={`materials/common/${materials.commonMat}4`}
                            alt={materials.commonMat}
                            style={materialImageStyle}
                            tooltip={{
                                title: formatCommonMats(materials.commonMat),
                            }}
                        />
                    )}
                    {materials.ascensionMat && (
                        <Image
                            src={`materials/ascension/${materials.ascensionMat}`}
                            alt={materials.ascensionMat}
                            style={materialImageStyle}
                            tooltip={{ title: materials.ascensionMat }}
                        />
                    )}
                </Box>
            )}
        </Card>
    );
}

export default DisplayCard;
