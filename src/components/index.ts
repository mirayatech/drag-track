import { lazy } from "react";

export * from "./button/button";

export const Modal = lazy(() => import("./modal/modal"));
