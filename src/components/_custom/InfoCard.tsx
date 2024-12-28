import React from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack } from "@mui/material";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";

// Type imports
import { Element, Rarity, WeaponType } from "types/_common";
import { EchoCost, EchoSonata } from "types/echo";

interface InfoCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "weapon" | "echo";
    rarity?: Rarity;
    variant?: "icon" | "avatar";
    size?: string;
    showName?: boolean;
    info?: {
        element?: Element;
        weaponType?: WeaponType;
        sonata?: EchoSonata[];
    };
    infoSecondary?: {
        cost?: EchoCost;
    };
    backgroundColor?: string;
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
}

function InfoCard({
    name,
    displayName = name,
    id = displayName,
    type,
    rarity = 3,
    variant = "avatar",
    size = variant === "avatar" ? "128px" : "64px",
    showName = variant === "avatar",
    info,
    infoSecondary,
    backgroundColor,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = false,
}: InfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${variant}-displayCard`;

    const borderWidth =
        variant === "avatar" ? theme.displayCard.borderWidth : 2;
    const imgSize = `calc(${size} - ${borderWidth * 2}px)`;

    let imgSrc = "";
    if (type === "character") {
        imgSrc = `characters/icons/${name}`;
    }
    if (type === "weapon") {
        imgSrc = `weapons/${name}`;
    }
    if (type === "echo") {
        imgSrc = `echoes/icons/${name}`;
    }

    let route;
    switch (type) {
        case "character":
            route = "resonators";
            break;
        case "weapon":
            route = "weapons";
            break;
        case "echo":
            route = "echoes";
            break;
    }
    const href = !disableLink
        ? `/${route}/${name.split(" ").join("_").toLowerCase()}`
        : "";

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover && zoomImageOnHover(direction, `${id}-img`, 1.05);
    };

    const rootStyle: SxProps = {
        position: "relative",
        width: size,
        height: variant === "avatar" ? "auto" : size,
        borderRadius: variant === "icon" ? "4px" : "16px",
        background: theme.background(2),
    };

    const cardStyle: SxProps = {
        border: "solid",
        borderWidth: borderWidth,
        borderColor:
            variant === "avatar"
                ? theme.border.color.primary
                : getRarityColor(rarity),
        borderRadius: variant === "icon" ? "4px" : "16px",
        backgroundColor: "transparent",
    };

    const mainImageStyle: React.CSSProperties = {
        width: imgSize,
        height: imgSize,
        backgroundColor: backgroundColor || theme.background(2),
        backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "100%",
        backgroundPosition: "center",
    };

    const smallIconStyle: React.CSSProperties = {
        width: `calc(${size} / 8 + 12px)`,
        height: `calc(${size} / 8 + 12px)`,
        minWidth: "16px",
        minHeight: "16px",
        padding: "4px",
    };

    return (
        <Box sx={rootStyle}>
            <Card
                elevation={0}
                sx={cardStyle}
                onMouseEnter={() => handleHover("enter")}
                onMouseLeave={() => handleHover("leave")}
            >
                <StyledTooltip
                    title={!disableTooltip ? displayName : ""}
                    arrow
                    placement="top"
                >
                    <Box sx={{ overflow: "clip" }}>
                        <RouterLink to={href}>
                            <Image
                                src={imgSrc}
                                alt={name}
                                id={`${id}-img`}
                                style={mainImageStyle}
                            />
                        </RouterLink>
                    </Box>
                </StyledTooltip>
                {info && (
                    <Stack
                        sx={{
                            position: "absolute",
                            zIndex: 5,
                            top: "-4%",
                            left: "-12%",
                            backgroundColor: theme.appbar.backgroundColor,
                            borderRadius: "16px",
                        }}
                    >
                        {info.element !== undefined && (
                            <Image
                                src={`elements/icons/${info.element}`}
                                alt={info.element}
                                style={smallIconStyle}
                                tooltip={info.element}
                            />
                        )}
                        {info.weaponType !== undefined && (
                            <Image
                                src={`weapons/icons/${info.weaponType}`}
                                alt={info.weaponType}
                                style={smallIconStyle}
                                tooltip={info.weaponType}
                            />
                        )}
                        {info.sonata !== undefined &&
                            info.sonata.map((sonata) => (
                                <Image
                                    key={sonata}
                                    src={`echoes/sonata/${sonata}`}
                                    alt={sonata}
                                    style={smallIconStyle}
                                    tooltip={sonata}
                                />
                            ))}
                    </Stack>
                )}
                {infoSecondary && (
                    <Stack
                        sx={{
                            position: "absolute",
                            zIndex: 5,
                            top: "-2%",
                            right: "0",
                            backgroundColor: theme.appbar.backgroundColor,
                            borderRadius: "4px",
                        }}
                    >
                        {infoSecondary.cost !== undefined && (
                            <TextStyled
                                sx={{
                                    textAlign: "center",
                                    width: `calc(${size} / 8 + 12px)`,
                                }}
                            >
                                {infoSecondary.cost}
                            </TextStyled>
                        )}
                    </Stack>
                )}
                {showName && (
                    <Box
                        sx={{
                            px: "8px",
                            py: "12px",
                            borderTop:
                                variant === "icon"
                                    ? "none"
                                    : `calc(${size} / 25) solid ${getRarityColor(
                                          rarity
                                      )}`,
                        }}
                    >
                        <RouterLink to={href} sx={{ display: "block" }}>
                            <TextStyled
                                sx={{
                                    color: theme.text.primary,
                                    textAlign: "center",
                                }}
                                variant="body2-styled"
                            >
                                {showName && displayName}
                            </TextStyled>
                        </RouterLink>
                    </Box>
                )}
            </Card>
        </Box>
    );
}

export default InfoCard;
