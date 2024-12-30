import React from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";
import { formatBossMaterials } from "data/materials/bossMaterials";
import { formatWeeklyBossMaterials } from "data/materials/weeklyBossMaterials";
import { formatCommonMaterials } from "data/materials/commonMaterials";

// Type imports
import { Element, Rarity, WeaponType } from "types/_common";
import { EchoCost, EchoSonata } from "types/echo";
import {
    BossMaterial,
    CommonMaterialKeys,
    Materials,
    WeeklyBossMaterial,
} from "types/materials";

interface InfoCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "weapon" | "echo";
    rarity?: Rarity;
    variant?: "icon" | "avatar" | "material-card";
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
    materials?: Materials;
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
    showName = variant !== "icon",
    info,
    infoSecondary,
    materials,
    backgroundColor,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = variant === "material-card",
}: InfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${variant}-displayCard`;

    const borderWidth = variant !== "icon" ? theme.displayCard.borderWidth : 2;
    const imgSize =
        variant !== "material-card"
            ? `calc(${size} - ${borderWidth * 2}px)`
            : "96px";

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
        width: variant !== "material-card" ? size : "auto",
        height: variant !== "icon" ? "auto" : size,
        borderRadius: variant === "icon" ? "4px" : "16px",
        backgroundColor: theme.appbar.backgroundColor,
    };

    const cardStyle: SxProps = {
        border: "solid",
        borderWidth: borderWidth,
        borderColor:
            variant !== "icon"
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
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: "28px",
        minHeight: "28px",
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
                    <Box
                        sx={{
                            overflow: "clip",
                            width:
                                variant === "material-card" ? "256px" : "auto",
                            display: "flex",
                        }}
                    >
                        <RouterLink to={href}>
                            <Image
                                src={imgSrc}
                                alt={name}
                                id={`${id}-img`}
                                style={mainImageStyle}
                            />
                        </RouterLink>
                        {variant === "material-card" && materials && (
                            <MaterialGrid materials={materials} />
                        )}
                    </Box>
                </StyledTooltip>
                {info && (
                    <Stack
                        sx={{
                            position: "absolute",
                            zIndex: 5,
                            top: "-4px",
                            left: "-12px",
                            backgroundColor: theme.appbar.backgroundColor,
                            borderRadius: "16px",
                        }}
                    >
                        {info.element !== undefined && (
                            <Image
                                src={`elements/${info.element}`}
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
                                    color: theme.appbar.color,
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
                            display: "flex",
                            p: "8px",
                            backgroundColor: theme.appbar.backgroundColor,
                            borderTop:
                                variant === "icon"
                                    ? "none"
                                    : `calc(${imgSize} / 25) solid ${getRarityColor(
                                          rarity
                                      )}`,
                        }}
                    >
                        <RouterLink to={href} sx={{ mx: "auto" }}>
                            <TextStyled
                                sx={{
                                    color: theme.appbar.color,
                                    textAlign: "center",
                                }}
                                variant={
                                    variant === "material-card"
                                        ? "body1-styled"
                                        : "body2-styled"
                                }
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

function MaterialGrid({ materials }: { materials: Materials }) {
    const theme = useTheme();

    const { forgeryMat, commonMat, ascensionMat, bossMat, weeklyBossMat } =
        materials;

    const images = [
        { src: `materials/forgery/${forgeryMat}4`, tag: forgeryMat },
        {
            src: `materials/boss/${bossMat}`,
            tag: formatBossMaterials(bossMat as BossMaterial),
        },
        {
            src: `materials/weekly/${weeklyBossMat}`,
            tag: formatWeeklyBossMaterials(weeklyBossMat as WeeklyBossMaterial),
        },
        {
            src: `materials/common/${commonMat}4`,
            tag: formatCommonMaterials(commonMat as CommonMaterialKeys),
        },
        { src: `materials/ascension/${ascensionMat}`, tag: ascensionMat },
    ];

    return (
        <Box sx={{ px: "16px", py: "8px", height: "96px" }}>
            <Grid container spacing={1}>
                {images.map((img) => (
                    <Image
                        key={img.tag}
                        src={img.src}
                        alt={img.tag}
                        style={{
                            width: "36px",
                            border: `1px solid ${theme.border.color.primary}`,
                            borderRadius: "4px",
                            backgroundColor: theme.icon.backgroundColor,
                        }}
                        tooltip={img.tag}
                    />
                ))}
            </Grid>
        </Box>
    );
}
