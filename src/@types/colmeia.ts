import { relatorioColmeia } from "./relatorioColmeia"

export type colmeia = {
    qtdAbelhas: number
    qtdQuadros: number
    data_instalacao: Date
    especie: string
    relatorioColmeia: relatorioColmeia[]
}