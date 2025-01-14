"use client";
import { create } from 'zustand'

export type configType = {
    numberOfQuestion: number;
    category: { id: number, name: string };
    level: string;
    type: string;
    status: string;
    score: number
}

const defaultConfig = {
    numberOfQuestion: 10,
    category: { id: 0, name: '' },
    level: '',
    type: '',
    status: '',
    score: 0,
}

const useQuiz  = create((set) => ({
    config: { ...defaultConfig },
    addLevel: (level: string) => set((state: { config: any; }) => ({ config: { ...state.config, level: level } })),
    addNumberOfQuestions: (count: number) => set((state: { config: any; }) => ({ config: { ...state.config, numberOfQuestion: count } })),
    addCategory: (id: number, name: string) => set((state: { config: any; }) => ({ config: { ...state.config, category: { id: id, name: name } } })),
    addStatus: (status: string) => set((state: { config: any; }) => ({ config: { ...state.config, status: status } })),
    addScore: () => set((state: { config: any; }) => ({ config: { ...state.config, score: state.config.score+ 1} })),
    addType: (type: string) => set((state: { config: any; }) => ({ config: { ...state.config, type: type } })),

}))

export default useQuiz;