// Component imports
import MainContentBox from "custom/MainContentBox";
import LevelUpCosts from "custom/LevelUpCosts";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponAscension({ weapon }: WeaponProps) {
    const { rarity, materials } = weapon;

    return (
        <MainContentBox title="Ascension">
            <LevelUpCosts
                type="weapon"
                skillKey="level"
                name=""
                rarity={rarity}
                mats={materials}
            />
        </MainContentBox>
    );
}

export default WeaponAscension;
