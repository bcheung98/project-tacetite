import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface PlannerState {
    totalCost: {},
    characters: [],
    characterCosts: [
        {
            name: string,
            costs: {
                credits: (number | number[])[],
                xp1: (number | number[])[],
                xp2: (number | number[])[],
                xp3: (number | number[])[],
                xp4: (number | number[])[],
                bossMat: (number | number[])[],
                forgery1: (number | number[])[],
                forgery2: (number | number[])[],
                forgery3: (number | number[])[],
                forgery4: (number | number[])[],
                common1: (number | number[])[],
                common2: (number | number[])[],
                common3: (number | number[])[],
                common4: (number | number[])[],
                ascensionMat: (number | number[])[],
                weeklyBossMat: (number | number[])[],
            }
        }
    ] | [],
    weapons: [],
    weaponCosts: [],
}

const initialState: PlannerState = {
    totalCost: {},
    characters: [],
    characterCosts: [],
    weapons: [],
    weaponCosts: [],
}

export const PlannerSlice = createSlice({
    name: "ascension planner",
    initialState,
    reducers: {
        setPlannerCharacters: (state, action: PayloadAction<any>) => {
            let tempCharCosts = action.payload.map((char: any) => {
                let costs
                let currentCharacter = state.characterCosts.find((c: any) => char.name === c.name)
                // If the character is not already in the list, initialize the material array
                if (currentCharacter === undefined) {
                    costs = {
                        // Source of each material:
                        // [Level, [Basic Attack, Node 1, Node 2], [Skill, Node 1, Node 2], [Burst, Node 1, Node 2], [Forte Circuit, Passive 1, Passive 2], [Intro Skill, Node 1, Node 2]]
                        credits: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp1: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp2: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp3: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        xp4: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        bossMat: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery1: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery2: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery3: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        forgery4: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common1: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common2: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common3: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        common4: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        ascensionMat: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        weeklyBossMat: [0, [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
                    }
                }
                else {
                    costs = currentCharacter.costs
                }
                return (
                    {
                        name: char.name,
                        costs: costs,
                    }
                )
            })
            state.characters = action.payload
            state.characterCosts = tempCharCosts
        },
        updateCharacterCosts: (state, action: PayloadAction<[string, string, {}]>) => {
            let indexChar = state.characterCosts.indexOf((state.characterCosts.find((char: any) => char.name === action.payload[0])) as never)
            if (indexChar !== -1) {
                Object.keys(action.payload[2] as {}).forEach((key: string) => {
                    switch (action.payload[1]) {
                        case "level":
                            state.characterCosts[indexChar].costs[key as keyof {}][0] = action.payload[2][key as keyof {}]
                            break
                        case "attack":
                            state.characterCosts[indexChar].costs[key as keyof {}][1][0] = action.payload[2][key as keyof {}]
                            break
                        default:
                            break
                    }
                })

            }
        }
    }
})

export const { setPlannerCharacters, updateCharacterCosts } = PlannerSlice.actions
export default PlannerSlice.reducer