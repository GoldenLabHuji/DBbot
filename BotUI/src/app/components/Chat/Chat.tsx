"use client";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Message from "@/app/components/Message/Message";
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
import { resultMsg } from "@/app/general/resources";
import CSVButton from "@/app/components/CSVButton";

export default function Chat() {
    const [messagesSection, setMessagesSection] =
        useRecoilState(messagesSectionAtom);
    const [queryParams, setQueryParams] = useRecoilState(queryParamsAtom);
    const [queryWords, setQueryWords] = useRecoilState(queryWordsAtom);
    const [isResult, setIsResult] = useRecoilState(isResultsAtom);
    const [isQuerySubmit, setIsQuerySubmit] = useRecoilState(isQuerySubmitAtom);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            (messagesEndRef.current as HTMLElement).scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messagesSection]);

    useEffect(() => {
        const getQueryWords = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/root", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        age_of_aquisition: queryParams?.age_of_aquisition,
                        number_of_phon: queryParams?.number_of_phon,
                        number_of_syll: queryParams?.number_of_syll,
                        start_with: queryParams?.start_with,
                        sound_like: queryParams?.sound_like,
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
                setIsLoading(false);
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
                    id: "resultSection",
                    messageSection: [resultMsg],
                },
            ]);
            setIsResult(true);
        }
    }, [isQuerySubmit]);

    return (
        <Box sx={styles.container}>
            <Box sx={styles.secondContainer}>
                {messagesSection && messagesSection.length > 0
                    ? messagesSection.map(
                          (msgSection) =>
                              msgSection?.messageSection &&
                              msgSection?.messageSection.length > 0 &&
                              msgSection?.messageSection.map(
                                  (message, index) => (
                                      <Message key={index} message={message} />
                                  )
                              )
                      )
                    : []}
                {isLoading && (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                )}
                {isResult && queryWords.data?.length > 0 && (
                    <CSVButton queryWords={queryWords?.data} />
                )}
                <div ref={messagesEndRef} />
            </Box>

            <ChatBox />
        </Box>
    );
}
