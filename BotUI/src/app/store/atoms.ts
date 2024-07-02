import { atom, RecoilState } from "recoil";
import {
    MessageSection,
    Message,
    QueryWords,
    Bot,
    Attribute,
} from "@/app/general/interfaces";
import { defaultMsgSection } from "@/app/general/resources";

export const messagesSectionAtom: RecoilState<MessageSection[]> = atom({
    key: "messages",
    default: defaultMsgSection,
});

export const queryParamsAtom: RecoilState<Attribute[]> = atom({
    key: "queryParams",
    default: [] as Attribute[],
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
