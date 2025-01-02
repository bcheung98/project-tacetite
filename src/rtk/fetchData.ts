import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";
import { Weapon } from "types/weapon";
import { Echo } from "types/echo";
import { Banner } from "types/banner";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/wuwa/characters.json
const characterURL = "https://api.irminsul.gg/wuwa/characters-v2.json";

// https://api.irminsul.gg/wuwa/weapons.json
const weaponURL = "https://api.irminsul.gg/wuwa/weapons.json";

// https://api.irminsul.gg/wuwa/echoes.json
const echoURL = "https://api.irminsul.gg/wuwa/echoes.json";

const characterBannerURL =
    "https://api.irminsul.gg/wuwa/character-banners.json";
const weaponBannerURL = "https://api.irminsul.gg/wuwa/weapon-banners.json";

export const fetchCharacters = createAsyncThunk(
    "GET/characters",
    async (): Promise<Character[]> => {
        const response = await fetch(characterURL);
        return await response.json();
    }
);

export const fetchWeapons = createAsyncThunk(
    "GET/weapons",
    async (): Promise<Weapon[]> => {
        const response = await fetch(weaponURL);
        return await response.json();
    }
);

export const fetchEchoes = createAsyncThunk(
    "GET/echoes",
    async (): Promise<Echo[]> => {
        const response = await fetch(echoURL);
        return await response.json();
    }
);

export const fetchCharacterBanners = createAsyncThunk(
    "GET/characterBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(characterBannerURL);
        return await response.json();
    }
);

export const fetchWeaponBanners = createAsyncThunk(
    "GET/weaponBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(weaponBannerURL);
        return await response.json();
    }
);
