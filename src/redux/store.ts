import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { combineReducers } from "redux"

import CharacterReducer from "./reducers/CharacterReducer"
import WeaponReducer from "./reducers/WeaponReducer"
import CharacterFilterReducer from "./reducers/CharacterFilterReducer"
import WeaponFilterReducer from "./reducers/WeaponFilterReducer"
import EchoReducer from "./reducers/EchoReducer"
import EchoFilterReducer from "./reducers/EchoFilterReducer"
import AscensionPlannerReducer from "./reducers/AscensionPlannerReducer"
import BannerReducer from "./reducers/BannerReducer"

const rootReducer = combineReducers({
    characters: CharacterReducer,
    weapons: WeaponReducer,
    characterFilters: CharacterFilterReducer,
    weaponFilters: WeaponFilterReducer,
    echoes: EchoReducer,
    echoFilters: EchoFilterReducer,
    ascensionPlanner: AscensionPlannerReducer,
    banners: BannerReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store