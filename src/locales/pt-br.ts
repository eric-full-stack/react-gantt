import { GanttLocale } from "../Gantt";

export const ptBR: GanttLocale = Object.freeze({
    day: "Dia",
    days: "Dias",
    week: "Semana",
    month: "Mês",
    quarter: "Trimestre",
    today: "Hoje",
    dayUnit: " Dias",
    firstHalf: "Primeiro Semestre",
    secondHalf: "Segundo Semestre",
    halfYear: "Semestre",

    majorFormat: {
        day: "MM, YYYY",
        week: "MMM, YYYY",
        month: "YYYY",
        quarter: "YYYY",
        halfYear: "YYYY",
    },
    minorFormat: {
        day: "D",
        week: "[semana] w",
        month: "MMMM",
        quarter: "[Q]T",
        halfYear: "YYYY-",
    },
  });