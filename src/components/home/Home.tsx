import CurrentBanners from "components/banners/CurrentBanners";
import VersionHighlights from "./VersionHighlights";
import { Stack } from "@mui/material";

function Home() {
    document.title = `Wuthering Waves - Irminsul.GG`;

    return (
        <Stack spacing={3}>
            <CurrentBanners />
            <VersionHighlights />
        </Stack>
    );
}

export default Home;
