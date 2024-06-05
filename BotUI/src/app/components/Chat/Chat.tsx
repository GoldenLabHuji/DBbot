"use client";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Message from "@/app/components/Message/Message";
import { defaultMsgSection } from "@/app/general/resources";
import ChatBox from "@/app/components/ChatBox";
import { styles } from "@/app/components/Chat/Chat.style";
import { useRecoilState } from "recoil";
import {
    messagesSectionAtom,
    queryParamsAtom,
    queryWordsAtom,
    isResultsAtom,
    isQuerySubmitAtom,
} from "@/app/store/atoms";
import { ChatProps, QueryReq } from "@/app/general/interfaces";
import { resultMsg } from "@/app/general/resources";
import CSVButton from "@/app/components/CSVButton";

export default function Chat({ bot }: ChatProps) {
    const [messagesSection, setMessagesSection] =
        useRecoilState(messagesSectionAtom);
    const [queryParams, __] = useRecoilState(queryParamsAtom);
    const [queryWords, setQueryWords] = useRecoilState(queryWordsAtom);
    const [isResult, setIsResult] = useRecoilState(isResultsAtom);
    const [isQuerySubmit, ___] = useRecoilState(isQuerySubmitAtom);
    const [loading, setloading] = useState<boolean>(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        console.log("bot", bot);
    }, [bot]);

    useEffect(() => {
        if (messagesEndRef.current) {
            (messagesEndRef.current as HTMLElement).scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messagesSection]);

    useEffect(() => {
        console.log("queryParams", queryParams);
    }, [queryParams]);

    useEffect(() => {
        const getQueryWords = async () => {
            try {
                setloading(true);
                const queryReq: QueryReq[] = [];
                Object.entries(queryParams).forEach((entry) => {
                    const [param, attribute] = entry;
                    if (attribute !== null) {
                        const { value, operator } = attribute;
                        queryReq.push({
                            param,
                            operator,
                            value,
                        });
                    }
                });

                const pathArray = bot?.filePath.split("/");
                const lastPathItem = pathArray.pop();
                const path = "../" + lastPathItem;

                const response = await fetch("/api/root", {
                    method: "POST",
                    body: JSON.stringify({
                        queryReq,
                        filePath: path,
                    }),
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                const data = await response.json();
                setQueryWords(data);
            } catch (err: any) {
                console.log(err.message);
            } finally {
                setloading(false);
            }
        };
        if (isQuerySubmit) {
            getQueryWords();
        }
    }, [isQuerySubmit]);

    useEffect(() => {
        if (isQuerySubmit) {
            setMessagesSection((prev) => [
                ...prev,

                {
                    id: 0,
                    messageSection: [resultMsg],
                },
            ]);
            setIsResult(true);
        }
    }, [isQuerySubmit]);

    return (
        <Box sx={styles.container}>
            <Box sx={styles.secondContainer}>
                {(messagesSection &&
                    messagesSection.length > 0 &&
                    messagesSection.map(
                        (msgSection) =>
                            msgSection?.messageSection &&
                            msgSection?.messageSection.length > 0 &&
                            msgSection?.messageSection.map((message, index) => (
                                <Message key={index} message={message} />
                            ))
                    )) ??
                    defaultMsgSection}
                {loading && (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                )}
                {isResult && queryWords.length > 0 && (
                    <CSVButton queryWords={queryWords} />
                )}
                <Box component="div" ref={messagesEndRef} />
            </Box>

            <ChatBox bot={bot} />
        </Box>
    );
}
