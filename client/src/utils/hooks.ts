import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
/**
 * @description: 用于ts中使用useDispatch，由redux官方提供
 * @return {*}
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * @description: 用于ts中使用useSelector，由redux官方提供
 * @return {*}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
