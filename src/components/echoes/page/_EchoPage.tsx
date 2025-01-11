import { useParams } from "react-router";

// Component imports
import EchoImage from "./EchoImage";
import EchoInfo from "./EchoInfo";
import EchoSkill from "./EchoSkill";
import EchoSonata from "./EchoSonata";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";

// MUI Imports
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectEchoes } from "reducers/echo";

function EchoPage() {
    const params = useParams<{ name: string }>();
    const echo = useAppSelector(selectEchoes).find(
        (e) => e.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (echo) {
        const documentTitle = `${echo.displayName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;
        const documentDesc = `${echo.displayName} (${echo.code}) - ${echo.cost} COST ${echo.class} Echo`;
        document.title = documentTitle;
        document
            .querySelector('meta[property="og:title"]')
            ?.setAttribute("content", documentTitle);
        document
            .querySelector('meta[property="description"]')
            ?.setAttribute("content", documentDesc);
        document
            .querySelector('meta[property="og:description"]')
            ?.setAttribute("content", documentDesc);

        return (
            <Stack spacing={2}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: "auto" }}>
                        <EchoImage echo={echo} />
                    </Grid>
                    <Grid size="grow">
                        <Stack spacing={2}>
                            <BetaTag version={echo.release.version} />
                            <EchoInfo echo={echo} />
                        </Stack>
                    </Grid>
                </Grid>
                <EchoSkill echo={echo} />
                <EchoSonata echo={echo} />
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default EchoPage;
