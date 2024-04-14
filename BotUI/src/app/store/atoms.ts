"use client";
import { atom, RecoilState } from "recoil";
import {
    MessageSection,
    Message,
    QueryWords,
    WordData,
    ResultsData,
} from "@/app/general/interfaces";

export const messagesSectionAtom: RecoilState<MessageSection[]> = atom({
    key: "messages",
    default: [
        {
            id: 0,
            messageSection: [] as Message[],
        },
    ] as MessageSection[],
});

export const queryParamsAtom: RecoilState<QueryWords> = atom({
    key: "queryParams",
    default: {
        age_of_aquisition: null,
        number_of_phon: null,
        number_of_syll: null,
        start_with: null,
        sound_like: null,
    } as QueryWords,
});

export const queryWordsAtom: RecoilState<ResultsData> = atom({
    key: "queryWords",
    default: { data: [] as WordData[] },
});

export const isResultsAtom: RecoilState<boolean> = atom({
    key: "isResults",
    default: false,
});

export const isQuerySubmitAtom: RecoilState<boolean> = atom({
    key: "isQuerySubmit",
    default: false,
});
