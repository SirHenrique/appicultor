import { colmeia } from "./colmeia"
import { relatorio } from "./relatorio"

export type apiario = {
    id: number
    localizacao: string
    relatorio: relatorio[]
    colmeia: colmeia[]
}