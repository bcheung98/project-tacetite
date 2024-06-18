import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { combineReducers } from "redux"
import CharacterReducer from "./reducers/CharacterReducer"
import CharacterFilterReducer from "./reducers/CharacterFilterReducer"
import AscensionPlannerReducer from "./reducers/AscensionPlannerReducer"

const rootReducer = combineReducers({
    characters: CharacterReducer,
    characterFilters: CharacterFilterReducer,
    ascensionPlanner: AscensionPlannerReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store