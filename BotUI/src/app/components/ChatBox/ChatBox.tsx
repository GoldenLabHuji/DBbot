"use client";
import { FormEvent, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { styles } from "@/app/components/ChatBox/ChatBox.style";
import ChatInput from "@/app/components/ChatInput";
import ChatButton from "@/app/components/ChatButton";
import { useRecoilState } from "recoil";
import { Message } from "@/app/general/interfaces";
import {
    messagesSectionAtom,
    queryParamsAtom,
    isQuerySubmitAtom,
} from "@/app/store/atoms";
import { botMessages } from "@/app/general/resources";
import {
    handleUserInput,
    updateMessagesSection,
    handleEndChat,
} from "@/app/components/ChatBox/utils";

export default function ChatBox() {
    const [messages, setMessages] = useRecoilState(messagesSectionAtom);
    const [isQuerySubmit, setIsQuerySubmit] = useRecoilState(isQuerySubmitAtom);
    const [queryParams, setQueryParams] = useRecoilState(queryParamsAtom);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [currentMessagesSection, setCurrentMessagesSection] = useState<
        Message[]
    >([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isEndSection, setIsEndSection] = useState<boolean>(false);
    const [isEndChat, setIsEndChat] = useState<boolean>(false);
    const [lastQuestionIndex, setLastQuestionIndex] = useState<number>(
        botMessages.length - 1
    );
    const [isStringParameter, setIsStringParameter] = useState<boolean>(false);
    const [botMsg, setBotMsg] = useState<Message[]>(botMessages);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const input = data.get("input")?.toString() || "";

        handleUserInput(
            input,
            botMsg,
            setBotMsg,
            currentMessagesSection,
            setCurrentMessagesSection,
            setCurrentQuestionIndex,
            setIsEndChat,
            currentQuestionIndex,
            setIsEndSection,
            setIsSubmit,
            lastQuestionIndex,
            setIsStringParameter,
            isStringParameter,
            isSubmit
        );

        e.currentTarget.reset();
    };

    useEffect(() => {
        if (!isEndChat) {
            setCurrentMessagesSection([
                ...currentMessagesSection,
                botMsg[currentQuestionIndex],
            ]);
        }
    }, [currentQuestionIndex, isEndChat]);

    useEffect(() => {
        setLastQuestionIndex(botMsg.length - 1);
    }, [botMsg]);

    useEffect(() => {
        if (isEndChat) {
            const params = handleEndChat(messages, isStringParameter);
            setQueryParams(params);
            setIsQuerySubmit(true);
        }
    }, [isEndChat]);

    useEffect(() => {
        updateMessagesSection(
            currentQuestionIndex,
            botMsg,
            currentMessagesSection,
            setCurrentMessagesSection,
            setIsEndSection,
            setMessages,
            messages,
            isEndSection,
            isEndChat
        );
    }, [currentMessagesSection, isSubmit, isEndSection]);

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
