// Component imports
import MainContentBox from "custom/MainContentBox";
import LevelUpCosts from "custom/LevelUpCosts";

// Type imports
import { CharacterProps } from "types/character";

function CharacterAscension({ character }: CharacterProps) {
    const { name, element, rarity, materials } = character;

    return (
        <MainContentBox title="Ascension">
            <LevelUpCosts
                type="character"
                skillKey="level"
                name={name}
                element={element}
                rarity={rarity}
                mats={materials}
            />
        </MainContentBox>
    );
}

export default CharacterAscension;
