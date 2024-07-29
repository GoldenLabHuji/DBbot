import React, { ReactNode, useEffect } from "react";
import { renderHook, act } from "@testing-library/react";
import { useSetRecoilState, RecoilRoot } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";
import useEndChat from "@/app/hooks/useEndChat";
import {
    Bot,
    Attribute,
    DataType,
    MessageSection,
} from "@/app/general/interfaces";

const mockMessages: MessageSection[] = [
    {
        id: 0,
        messageSection: [
            { id: 0, sender: "user", typeOfQuestion: "parameter", text: "1" },
            { id: 1, sender: "user", typeOfQuestion: "operator", text: "1" },
            {
                id: 2,
                sender: "user",
                typeOfQuestion: "functionParams",
                text: "10",
            },
        ],
    },
];

interface RecoilStateProviderProps {
    messages: MessageSection[];
    children: ReactNode;
}

const mockBot: Bot = {
    dataMap: {},
    _messages: {
        slots: {},
        customMessages: {
            errorMessage: "error Message",
            attributeMessage: "attribute Message",
            operatorMessage: "operator Message",
            continueMessage: "continue Message",
            resultMessage: "result Message",
        },
    },
    _data: {
        headers: ["column1", "column2"],
        columns: [
            {
                id: "column1",
                dataType: "string" as DataType,
                displayName: "column1",
                rows: ["a", "b", "c"],
                operatorsArray: [
                    {
                        params: [
                            {
                                isArray: false,
                                dataType: DataType.String,
                                name: "param1",
                            },
                        ],
                        displayName: "operator1",
                        id: "operator1",
                    },
                ],
            },
            {
                id: "column2",
                dataType: "numeric" as DataType,
                displayName: "column2",
                rows: [1, 2, 3],
                operatorsArray: [
                    {
                        params: [
                            {
                                isArray: false,
                                dataType: DataType.Numeric,
                                name: "param2",
                            },
                        ],
                        displayName: "operator2",
                        id: "operator2",
                    },
                ],
            },
        ],
    },
    _details: {
        name: "name",
        description: "description",
    },
    filePath: "../../../../pokemon.csv",
    currentOperatorIndex: 0,
    operatorsData: [
        {
            displayName: "operator1",
            id: "operator1",
            params: [
                {
                    isArray: false,
                    dataType: DataType.String,
                    name: "param1",
                },
            ],
        },
        {
            displayName: "operator2",
            id: "operator2",
            params: [
                {
                    isArray: false,
                    dataType: DataType.Numeric,
                    name: "param2",
                },
            ],
        },
    ],
};

const RecoilStateProvider: React.FC<RecoilStateProviderProps> = ({
    messages,
    children,
}) => {
    const setMessagesState = useSetRecoilState(messagesSectionAtom);

    useEffect(() => {
        setMessagesState(messages);
    }, [messages, setMessagesState]);

    return <>{children}</>;
};

describe("useEndChat", () => {
    it("should return the correct attributes", () => {
        const { result } = renderHook(() => useEndChat(mockBot), {
            wrapper: ({ children }) => (
                <RecoilRoot>
                    <RecoilStateProvider messages={mockMessages}>
                        {children}
                    </RecoilStateProvider>
                </RecoilRoot>
            ),
        });

        expect(result.current).toBeDefined();

        let attributes: Attribute[] = [];

        act(() => {
            attributes = result.current.handleEndChat();
        });

        expect(attributes).toEqual([
            {
                name: "column1",
                operator: "operator1",
                params: ["10"],
            },
        ]);
    });

    it("should handle string parameters correctly", () => {
        const mockMessagesWithString: MessageSection[] = [
            {
                id: 0,
                messageSection: [
                    {
                        id: 0,
                        sender: "user",
                        typeOfQuestion: "parameter",
                        text: "1",
                    },
                    {
                        id: 1,
                        sender: "user",
                        typeOfQuestion: "operator",
                        text: "1",
                    },
                    {
                        id: 2,
                        sender: "user",
                        typeOfQuestion: "functionParams",
                        text: "abc",
                    },
                ],
            },
        ];

        const { result } = renderHook(() => useEndChat(mockBot), {
            wrapper: ({ children }) => (
                <RecoilRoot>
                    <RecoilStateProvider messages={mockMessagesWithString}>
                        {children}
                    </RecoilStateProvider>
                </RecoilRoot>
            ),
        });

        expect(result.current).toBeDefined();

        let attributes: Attribute[] = [];
        act(() => {
            attributes = result.current.handleEndChat();
        });

        expect(attributes).toEqual([
            {
                name: "column1",
                operator: "operator1",
                params: ["abc"],
            },
        ]);
    });

    it("should handle multiple messages correctly", () => {
        const mockMultipleMessages: MessageSection[] = [
            {
                id: 0,
                messageSection: [
                    {
                        id: 0,
                        sender: "user",
                        typeOfQuestion: "parameter",
                        text: "1",
                    },
                    {
                        id: 1,
                        sender: "user",
                        typeOfQuestion: "operator",
                        text: "1",
                    },
                    {
                        id: 2,
                        sender: "user",
                        typeOfQuestion: "functionParams",
                        text: "10",
                    },
                ],
            },
            {
                id: 1,
                messageSection: [
                    {
                        id: 3,
                        sender: "user",
                        typeOfQuestion: "parameter",
                        text: "2",
                    },
                    {
                        id: 4,
                        sender: "user",
                        typeOfQuestion: "operator",
                        text: "1",
                    },
                    {
                        id: 5,
                        sender: "user",
                        typeOfQuestion: "functionParams",
                        text: "20",
                    },
                ],
            },
        ];

        const { result } = renderHook(() => useEndChat(mockBot), {
            wrapper: ({ children }) => (
                <RecoilRoot>
                    <RecoilStateProvider messages={mockMultipleMessages}>
                        {children}
                    </RecoilStateProvider>
                </RecoilRoot>
            ),
        });

        let attributes: Attribute[] = [];

        act(() => {
            if (result.current) {
                attributes = result.current.handleEndChat();
            }
        });

        expect(attributes).toEqual([
            {
                name: "column1",
                operator: "operator1",
                params: ["10"],
            },
            {
                name: "column2",
                operator: "operator2",
                params: [20],
            },
        ]);
    });

    it("should return an empty array when there are no user messages", () => {
        const emptyMessages: MessageSection[] = [
            {
                id: 0,
                messageSection: [],
            },
        ];

        const { result } = renderHook(() => useEndChat(mockBot), {
            wrapper: ({ children }) => (
                <RecoilRoot>
                    <RecoilStateProvider messages={emptyMessages}>
                        {children}
                    </RecoilStateProvider>
                </RecoilRoot>
            ),
        });

        let attributes: Attribute[] = [];

        act(() => {
            if (result.current) {
                attributes = result.current.handleEndChat();
            }
        });

        expect(attributes).toEqual([]);
    });

    it("should handle different operators correctly", () => {
        const mockMessagesWithDifferentOperators: MessageSection[] = [
            {
                id: 0,
                messageSection: [
                    {
                        id: 0,
                        sender: "user",
                        typeOfQuestion: "parameter",
                        text: "1",
                    },
                    {
                        id: 1,
                        sender: "user",
                        typeOfQuestion: "operator",
                        text: "2",
                    },
                    {
                        id: 2,
                        sender: "user",
                        typeOfQuestion: "functionParams",
                        text: "30",
                    },
                ],
            },
        ];

        // Mock bot with different operators
        const mockBotWithDifferentOperators: Bot = {
            ...mockBot,
            _data: {
                ...mockBot._data,
                columns: [
                    {
                        id: "column1",
                        dataType: "string" as DataType,
                        displayName: "column1",
                        rows: ["a", "b", "c"],
                        operatorsArray: [
                            {
                                params: [
                                    {
                                        isArray: false,
                                        dataType: DataType.String,
                                        name: "param1",
                                    },
                                ],
                                displayName: "operator1",
                                id: "operator1",
                            },
                            {
                                params: [
                                    {
                                        isArray: false,
                                        dataType: DataType.String,
                                        name: "param2",
                                    },
                                ],
                                displayName: "operator2",
                                id: "operator2",
                            },
                        ],
                    },
                ],
            },
        };

        const { result } = renderHook(
            () => useEndChat(mockBotWithDifferentOperators),
            {
                wrapper: ({ children }) => (
                    <RecoilRoot>
                        <RecoilStateProvider
                            messages={mockMessagesWithDifferentOperators}
                        >
                            {children}
                        </RecoilStateProvider>
                    </RecoilRoot>
                ),
            }
        );

        let attributes: Attribute[] = [];
        act(() => {
            if (result.current) {
                attributes = result.current.handleEndChat();
            }
        });

        expect(attributes).toEqual([
            {
                name: "column1",
                operator: "operator2",
                params: ["30"],
            },
        ]);
    });
});
