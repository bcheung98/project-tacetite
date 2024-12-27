import { EchoRarityMap } from "data/common";
import { sonataEffects } from "data/sonataEffects";
import { Version } from "./version";

export interface EchoProps {
    echo: Echo;
}

export interface Echo {
    id: number;
    name: string;
    displayName: string;
    code: string;
    class: EchoClass;
    cost: EchoCost;
    skill: EchoSkill;
    sonata: EchoSonata[];
    description: string;
    hasPhantom: boolean;
    type: string;
    nation: string[];
    release: Version;
}

export type EchoClass = keyof typeof EchoRarityMap;
export type EchoCost = 4 | 3 | 1;

export interface EchoSkill {
    description: string;
    cooldown: number;
    scaling: string[][];
}

export type EchoSonata = keyof typeof sonataEffects;
