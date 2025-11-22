import { ptBR } from "./pt-br";
import type { GanttLocale } from "../types";

export * from "./en-us";
export * from "./zh-cn";
export * from "./pt-br";

export const defaultLocale: GanttLocale = { ...ptBR };