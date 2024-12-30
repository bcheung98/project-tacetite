import { Routes, Route } from "react-router";

import Layout from "components/Layout";
import Home from "components/home/Home";
import PageNotFound from "components/PageNotFound";
import CharacterBrowser from "components/characters/browser/_CharacterBrowser";
import CharacterPage from "components/characters/page/_CharacterPage";
import WeaponBrowser from "components/weapons/browser/_WeaponBrowser";
import WeaponPage from "components/weapons/page/_WeaponPage";
import EchoBrowser from "components/echoes/browser/_EchoBrowser";
import EchoPage from "components/echoes/page/_EchoPage";
import Planner from "components/planner/_Planner";
import BannerArchive from "components/banners/_BannerArchive";

function RouteConfig() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/resonators" element={<CharacterBrowser />} />
                <Route path="/resonators/:name" element={<CharacterPage />} />
                <Route path="/weapons" element={<WeaponBrowser />} />
                <Route path="/weapons/:name" element={<WeaponPage />} />
                <Route path="/echoes" element={<EchoBrowser />} />
                <Route path="/echoes/:name" element={<EchoPage />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/banners" element={<BannerArchive />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default RouteConfig;
