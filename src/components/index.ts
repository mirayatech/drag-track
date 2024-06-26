import { lazy } from "react";

export * from "./item/item";
export * from "./input/input";
export * from "./button/button";
export * from "./container/container";

export const Modal = lazy(() => import("./modal/modal"));
