import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";
import { formatMaterialName } from "helpers/materials";
import { getForgeryMaterial } from "data/materials/forgeryMaterials";
import { getBossMaterial } from "data/materials/bossMaterials";
import { getWeeklyBossMaterial } from "data/materials/weeklyBossMaterials";
import { getCommonMaterial } from "data/materials/commonMaterials";
import { getAscensionMaterial } from "data/materials/ascensionMaterials";

// Type imports
import { Element, Rarity, WeaponType } from "types/_common";
import { EchoCost, EchoSonata } from "types/echo";
import { CharacterMaterials } from "types/materials";

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
    materials?: CharacterMaterials;
    backgroundColor?: string;
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
}

function InfoCard({
    name,
    displayName = name,
    id = displayName,
    type,
    rarity = 3,
    variant = "avatar",
    size,
    showName = variant !== "icon",
    info,
    infoSecondary,
    materials,
    backgroundColor,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = variant === "material-card",
    loading = false,
}: InfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${variant}-infoCard`;

    const borderWidth = variant !== "icon" ? theme.displayCard.borderWidth : 2;
    const borderRadius = variant === "icon" ? "4px" : "16px";
    const borderColor =
        variant === "icon"
            ? getRarityColor(rarity)
            : theme.border.color.primary;

    size =
        variant === "icon" ? "64px" : variant === "avatar" ? "128px" : "96px";
    const imgSize =
        variant === "icon" ? `calc(${size} - ${borderWidth * 2}px)` : size;

    let imgSrc = "",
        route;
    switch (type) {
        case "character":
            imgSrc = `characters/icons/${name}`;
            route = "resonators";
            break;
        case "weapon":
            imgSrc = `weapons/${name}`;
            route = "weapons";
            break;
        case "echo":
            imgSrc = `echoes/icons/${name}`;
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
        overflow: "visible",
        width: variant !== "material-card" ? size : "auto",
        height: variant !== "icon" ? "auto" : size,
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${
            backgroundColor || theme.appbar.backgroundColor
        })`,
    };

    const cardStyle: SxProps = {
        borderStyle: "solid",
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        width:
            variant === "material-card" ? `calc(${imgSize} * 8 / 3)` : "auto",
        backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "contain",
        // backgroundRepeat: "no-repeat",
    };

    const imageStyle: CSSProperties = {
        width: imgSize,
        height: imgSize,
    };

    const infoIconStyle: CSSProperties = {
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: "28px",
        minHeight: "28px",
        padding: "4px",
    };

    return (
        <Card sx={rootStyle} elevation={2}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <StyledTooltip
                            title={!disableTooltip ? displayName : ""}
                            arrow
                            placement="top"
                        >
                            <Box
                                onMouseEnter={() => handleHover("enter")}
                                onMouseLeave={() => handleHover("leave")}
                                sx={imageContainerStyle}
                            >
                                <RouterLink to={href}>
                                    <Image
                                        src={imgSrc}
                                        alt={name}
                                        id={`${id}-img`}
                                        style={imageStyle}
                                    />
                                </RouterLink>
                                {variant === "material-card" && materials && (
                                    <MaterialGrid
                                        materials={materials}
                                        size={imgSize}
                                    />
                                )}
                            </Box>
                        </StyledTooltip>
                        {showName && (
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "8px",
                                    borderTop:
                                        variant === "icon"
                                            ? "none"
                                            : `calc(${imgSize} / 20) solid ${getRarityColor(
                                                  rarity
                                              )}`,
                                }}
                            >
                                <RouterLink to={href} sx={{ mx: "auto" }}>
                                    <TextStyled
                                        onMouseEnter={() =>
                                            handleHover("enter")
                                        }
                                        onMouseLeave={() =>
                                            handleHover("leave")
                                        }
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
                                    style={infoIconStyle}
                                    tooltip={info.element}
                                />
                            )}
                            {info.weaponType !== undefined && (
                                <Image
                                    src={`weapons/icons/${info.weaponType}`}
                                    alt={info.weaponType}
                                    style={infoIconStyle}
                                    tooltip={info.weaponType}
                                />
                            )}
                            {info.sonata !== undefined &&
                                info.sonata.map((sonata) => (
                                    <Image
                                        key={sonata}
                                        src={`echoes/sonata/${sonata}`}
                                        alt={sonata}
                                        style={infoIconStyle}
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
                </>
            ) : (
                <Skeleton
                    variant="rounded"
                    width={size}
                    height={size}
                    sx={{ borderRadius: borderRadius }}
                />
            )}
        </Card>
    );
}

export default InfoCard;

function MaterialGrid({
    materials,
    size,
}: {
    materials: CharacterMaterials;
    size: string;
}) {
    const theme = useTheme();

    const { forgeryMat, commonMat, ascensionMat, bossMat, weeklyBossMat } =
        materials;

    const images = [
        {
            src: `materials/forgery/${forgeryMat}4`,
            tag: formatMaterialName(getForgeryMaterial({ tag: forgeryMat })),
        },
        {
            src: `materials/boss/${bossMat}`,
            tag: formatMaterialName(getBossMaterial({ tag: bossMat })),
        },
        {
            src: `materials/weekly/${weeklyBossMat}`,
            tag: formatMaterialName(
                getWeeklyBossMaterial({ tag: weeklyBossMat })
            ),
        },
        {
            src: `materials/common/${commonMat}4`,
            tag: formatMaterialName(getCommonMaterial({ tag: commonMat })),
        },
        {
            src: `materials/ascension/${ascensionMat}`,
            tag: formatMaterialName(
                getAscensionMaterial({ tag: ascensionMat })
            ),
        },
    ];

    return (
        <Box sx={{ px: "16px", py: "8px", height: size }}>
            <Grid container spacing={1}>
                {images.map((img) => (
                    <Image
                        key={img.tag}
                        src={img.src}
                        alt={img.tag}
                        style={{
                            width: `calc(${size} / (8/3))`,
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
