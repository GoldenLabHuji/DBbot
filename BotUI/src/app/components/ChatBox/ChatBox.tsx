"use client";
import { FormEvent, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { styles } from "@/app/components/ChatBox/ChatBox.style";
import ChatInput from "@/app/components/ChatInput";
import ChatButton from "@/app/components/ChatButton";
import { useRecoilState } from "recoil";
import { queryParamsAtom, isQuerySubmitAtom } from "@/app/store/atoms";
import { botMessages } from "@/app/general/resources";
import { ChatBoxProps } from "@/app/general/interfaces";
import useInput from "@/app/hooks/useInput";
import useChat from "@/app/hooks/useChat";
import useUpdateMsg from "@/app/hooks/useUpdateMsg";
import useEndChat from "@/app/hooks/useEndChat";

export default function ChatBox({ bot }: ChatBoxProps) {
    const [_, setIsQuerySubmit] = useRecoilState(isQuerySubmitAtom);
    const [__, setQueryParams] = useRecoilState(queryParamsAtom);
    const [isStringParameter, setIsStringParameter] = useState<boolean>(false);
    const [lastQuestionIndex, setLastQuestionIndex] = useState<number>(
        botMessages.length - 1
    );

    const strParam = {
        state: isStringParameter,
        setState: setIsStringParameter,
    };

    const { currentMsg, currentQIndex, endChat } = useChat();
    const { handleUserInput, botMsg, isSubmit } = useInput(
        currentMsg,
        currentQIndex,
        lastQuestionIndex,
        bot,
        strParam
    );

    const { endSection, updateMessagesSection } = useUpdateMsg(
        currentMsg,
        botMsg,
        currentQIndex.state
    );

    const { handleEndChat } = useEndChat(strParam, bot);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const input = data.get("input")?.toString() || "";
        handleUserInput(input, endChat.setState);
        e.currentTarget.reset();
    };

    useEffect(() => {
        if (!endChat.state) {
            currentMsg.setState([
                ...currentMsg.state,
                botMsg[currentQIndex.state],
            ]);
        }
    }, [currentQIndex.state, endChat.state]);

    useEffect(() => {
        setLastQuestionIndex(botMsg.length - 1);
    }, [botMsg]);

    useEffect(() => {
        if (endChat.state) {
            const params = handleEndChat();
            setQueryParams(params);
            setIsQuerySubmit(true);
        }
    }, [endChat.state]);

    useEffect(() => {
        updateMessagesSection(endChat.state);
    }, [currentMsg.state, isSubmit, endSection.state]);

    return (
        <Box sx={styles.box}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <ChatInput />
                    <ChatButton />
                </Grid>
            </Box>
        </Box>
    );
}
