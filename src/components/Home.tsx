// Component imports
import CurrentBanners from "./banners/CurrentBanners"
import VersionHighlights from "./VersionHighlights"

// MUI imports
import { Box } from "@mui/material"

function Home() {

    document.title = `Wuthering Waves ${process.env.REACT_APP_DOCUMENT_HEADER}`

    return (
        <Box>
            <CurrentBanners />
            <VersionHighlights />
        </Box>
    )

}

export default Home