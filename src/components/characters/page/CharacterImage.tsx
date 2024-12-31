import React from "react";

// Component imports
import Image from "custom/Image";
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Card,
    Button,
    Dialog,
    Box,
    IconButton,
    Stack,
    Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Type imports
import { CharacterProps } from "types/character";

function CharacterImage({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { outfits } = character;

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const handleTabChangeLeft = () => {
        if (tabValue - 1 >= 0) {
            setTabValue(tabValue - 1);
        }
    };
    const handleTabChangeRight = () => {
        if (tabValue + 1 < outfits.length) {
            setTabValue(tabValue + 1);
        }
    };

    const buttonStyle: SxProps = {
        display: outfits.length > 1 ? "flex" : "none",
        color: theme.text.primary,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.text.primary,
        },
    };

    const imgSrc =
        tabValue === 0
            ? `characters/avatars/${character.name}`
            : `characters/outfits/${outfits[tabValue].name}`;

    return (
        <>
            <Card
                sx={{
                    backgroundColor: theme.background(1),
                    width: "100%",
                    height: "auto",
                }}
            >
                <Image
                    src={imgSrc}
                    alt={character.name}
                    style={{
                        width: "100%",
                        height: "600px",
                        objectFit: "cover",
                        overflowClipMargin: "unset", // removes "crispy" effect from `object-fit: cover`
                        borderBottom: `1px solid ${theme.border.color.primary}`,
                        backgroundColor: theme.background(2),
                    }}
                />
                <FlexBox
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        p: "4px 8px 8px",
                        height: "48px",
                    }}
                >
                    <IconButton
                        onClick={handleTabChangeLeft}
                        disabled={tabValue === 0}
                        sx={buttonStyle}
                        disableRipple
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogOpen}
                        disableRipple
                    >
                        View Outfits
                    </Button>
                    <IconButton
                        onClick={handleTabChangeRight}
                        disabled={tabValue >= outfits.length - 1}
                        sx={buttonStyle}
                        disableRipple
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </FlexBox>
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="md"
                fullWidth
                keepMounted
            >
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                    <MainContentBox
                        title="Outfits"
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleDialogClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                        contentProps={{ padding: 0 }}
                    >
                        <StyledTabs
                            variant="scrollable"
                            value={tabValue}
                            onChange={handleTabChange}
                            scrollButtons="auto"
                            allowScrollButtonsMobile={!matches_sm_up}
                            sx={{
                                height: "100%",
                                "& .MuiTabScrollButton-root": {
                                    color: theme.text.primary,
                                    backgroundColor: theme.background(2),
                                },
                                ".MuiTabs-scrollButtons.Mui-disabled": {
                                    opacity: 0.3,
                                },
                                "& .MuiTabs-indicatorSpan": {
                                    width: "100%",
                                    backgroundColor: theme.border.color.primary,
                                },
                            }}
                        >
                            {outfits.map((outfit, index) => (
                                <StyledTab
                                    key={outfit.name}
                                    icon={
                                        <Card
                                            elevation={0}
                                            sx={{
                                                width: "128px",
                                                height: "auto",
                                                aspectRatio: 1.5,
                                                border: `2px solid ${theme.border.color.primary}`,
                                                backgroundColor:
                                                    theme.appbar
                                                        .backgroundColor,
                                                backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${outfit.rarity}_Star.png)`,
                                                backgroundSize: "contain",
                                            }}
                                        >
                                            <Image
                                                src={
                                                    index === 0
                                                        ? `characters/avatars/${character.name}`
                                                        : `characters/outfits/${outfit.name}`
                                                }
                                                alt={outfit.name}
                                                style={{
                                                    width: "100%",
                                                    transform:
                                                        "translate(0px, -32px)",
                                                }}
                                            />
                                        </Card>
                                    }
                                />
                            ))}
                        </StyledTabs>
                        {outfits.map((outfit, index) => (
                            <TabPanel
                                key={outfit.name}
                                index={index}
                                value={tabValue}
                            >
                                <FlexBox
                                    sx={{
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        flexWrap: {
                                            xs: "wrap",
                                            sm: "nowrap",
                                        },
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "50%",
                                            },
                                        }}
                                    >
                                        <TextStyled variant="h4-styled">
                                            {outfit.displayName}
                                        </TextStyled>
                                        <Text
                                            sx={{
                                                color: theme.text.description,
                                            }}
                                        >
                                            {outfit.description}
                                        </Text>
                                    </Stack>
                                    <Fade in={index === tabValue} timeout={500}>
                                        <Card elevation={0}>
                                            <Image
                                                src={imgSrc}
                                                alt={outfit.name}
                                                style={{
                                                    width: "100%",
                                                    height: "600px",
                                                    objectFit: "cover",
                                                    overflowClipMargin: "unset",
                                                    transform:
                                                        "translate(0px, -32px)",
                                                }}
                                            />
                                        </Card>
                                    </Fade>
                                </FlexBox>
                            </TabPanel>
                        ))}
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default CharacterImage;
