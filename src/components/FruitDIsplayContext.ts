import { MouseEventHandler, createContext } from "react";

export const FruitDisplayContext = createContext<MouseEventHandler<HTMLButtonElement>>(() => { });