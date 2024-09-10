
import { relatorioColmeia } from '@/@types/relatorioColmeia';
import { create } from 'zustand'

interface colmeiaState  {
    relatorioColmeias: relatorioColmeia[]
    setRelatorioColmeias: (relatorioColmeias: relatorioColmeia[]) => void
}

const useRelatorioColmeiaStore = create<colmeiaState>()((set) => ({
    relatorioColmeias: [],
    setRelatorioColmeias: (relatorioColmeias: relatorioColmeia[]) => set({ relatorioColmeias })
}))

export default useRelatorioColmeiaStore;