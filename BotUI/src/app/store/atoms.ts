import { atom, RecoilState } from "recoil";
import {
    MessageSection,
    Message,
    QueryWords,
    Bot,
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
    default: {} as QueryWords,
});

export const queryWordsAtom: RecoilState<any> = atom({
    key: "queryWords",
    default: [] as any[],
});

export const isResultsAtom: RecoilState<boolean> = atom({
    key: "isResults",
    default: false,
});

export const isQuerySubmitAtom: RecoilState<boolean> = atom({
    key: "isQuerySubmit",
    default: false,
});

export const botAtom: RecoilState<Bot> = atom({
    key: "bot",
    default: {} as Bot,
});
