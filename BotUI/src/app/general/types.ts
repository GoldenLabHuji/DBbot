import { Dispatch, SetStateAction } from "react";
import { Message } from "@/app/general/interfaces";

export type sender = "bot" | "user";
export type typeOfQuestion =
    | "parameter"
    | "value"
    | "operator"
    | "add"
    | "result"
    | "intro";

export type currentMsgType = {
    state: Message[];
    setState: Dispatch<SetStateAction<Message[]>>;
};

export type currentQIndexType = {
    state: number;
    setState: Dispatch<SetStateAction<number>>;
};

export type strParamType = {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
};
