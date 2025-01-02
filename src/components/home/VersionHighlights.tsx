import React from "react";

// Component imports
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledInput } from "styled/StyledInput";
import { StyledMenuItem } from "styled/StyledMenu";

// MUI imports
import {
    useTheme,
    SxProps,
    Box,
    Select,
    SelectChangeEvent,
    IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Masonry } from "@mui/lab";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { echoes as echoData } from "data/common";
import { updates } from "data/versions";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectEchoes } from "reducers/echo";

function VersionHighlights() {
    const theme = useTheme();

    const [index, setIndex] = React.useState(0);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index + 1 < updates.length) {
            setIndex(index + 1);
        }
    };
    const handleIndexChangeRight = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        }
    };

    const buttonStyle: SxProps = {
        color: theme.appbar.color,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.appbar.color,
        },
    };

    const gridStyle: SxProps = {
        minHeight: "280px",
        maxHeight: { xs: "720px", md: "100%" },
        overflowY: "auto",
    };

    const iconStyle: React.CSSProperties = {
        width: "32px",
        marginRight: "8px",
        backgroundColor: theme.icon.backgroundColor,
        borderRadius: "64px",
    };

    const version = updates[index].version;

    const characters = useAppSelector(selectCharacters)
        .filter((char) => char.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity || a.fullName.localeCompare(b.fullName)
        );
    const weapons = useAppSelector(selectWeapons)
        .filter((wep) => wep.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );
    const echoes = useAppSelector(selectEchoes)
        .filter((echo) => echo.release.version === version)
        .sort(
            (a, b) =>
                echoData[b.class].rarity - echoData[a.class].rarity ||
                a.displayName.localeCompare(b.displayName)
        );

    return (
        <MainContentBox
            title="Version Highlights"
            actions={
                <FlexBox>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeLeft}
                            disabled={index >= updates.length - 1}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                    </Box>
                    <Select
                        value={index.toString()}
                        label="Version"
                        onChange={handleIndexChange}
                        input={<StyledInput />}
                        sx={{ mx: "4px", width: "72px" }}
                    >
                        {updates.map((version, index) => (
                            <StyledMenuItem key={index} value={index}>
                                <TextStyled>{version.version}</TextStyled>
                            </StyledMenuItem>
                        ))}
                    </Select>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeRight}
                            disabled={index === 0}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </FlexBox>
            }
            contentProps={{ overflowX: "clip" }}
        >
            <TextStyled variant="h5-styled" sx={{ mb: "20px" }}>
                {updates[index].version} - <i>{updates[index].name}</i>
            </TextStyled>
            <Masonry columns={{ xs: 1, md: 2 }} spacing={4}>
                {characters.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/Character"
                                alt="New Resonators"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New Resonators
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={{ px: 2 }}>
                            {characters.map((char, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${char.name}-versionHighlights`}
                                    name={char.name}
                                    displayName={char.fullName}
                                    type="character"
                                    rarity={char.rarity}
                                    info={{
                                        element: char.element,
                                        weaponType: char.weapon,
                                    }}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
                {weapons.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/Weapon"
                                alt="New Weapons"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New Weapons
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={{ px: 2 }}>
                            {weapons.map((weapon, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${weapon.name}-versionHighlights`}
                                    name={weapon.name}
                                    displayName={weapon.displayName}
                                    type="weapon"
                                    rarity={weapon.rarity}
                                    info={{ weaponType: weapon.type }}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
                {echoes.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/Echo"
                                alt="New Echoes"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New Echoes
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={{ px: 2 }}>
                            {echoes.map((echo, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${echo.name}-versionHighlights`}
                                    name={echo.name}
                                    displayName={echo.displayName}
                                    type="echo"
                                    rarity={echoData[echo.class].rarity}
                                    info={{ sonata: echo.sonata }}
                                    infoSecondary={{ cost: echo.cost }}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Masonry>
        </MainContentBox>
    );
}

export default VersionHighlights;
