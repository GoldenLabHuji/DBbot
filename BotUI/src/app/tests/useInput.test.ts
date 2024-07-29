import { renderHook, act } from "@testing-library/react";
import useInput from "@/app/hooks/useInput";
import { Message, Bot, DataType } from "@/app/general/interfaces";
import { sender, currentMsgType, currentQIndexType } from "@/app/general/types";

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
    ],
};

const mockCurrentMsg: currentMsgType = {
    state: [],
    setState: jest.fn(),
};

const mockCurrentQIndex: currentQIndexType = {
    state: 0,
    setState: jest.fn(),
};

const mockSetIsEndSection = jest.fn();
const mockSetIsEndChat = jest.fn();
const mockCurrentParam = {
    state: "column1",
    setState: jest.fn(),
};

describe("useInput", () => {
    it("should initialize with default values", () => {
        const { result } = renderHook(() =>
            useInput(
                mockCurrentMsg,
                mockCurrentQIndex,
                2,
                mockBot,
                mockSetIsEndSection,
                mockCurrentParam
            )
        );

        expect(result.current.botMsg).toEqual(expect.any(Array));
        expect(result.current.isSubmit).toBe(false);
    });

    it("should handle user input for invalid answer option", () => {
        const { result } = renderHook(() =>
            useInput(
                {
                    ...mockCurrentMsg,
                    state: [
                        {
                            id: 0,
                            sender: "user",
                            text: "4",
                            typeOfQuestion: "parameter",
                            answerOptions: [1, 2, 3],
                        },
                    ],
                },
                mockCurrentQIndex,
                2,
                mockBot,
                mockSetIsEndSection,
                mockCurrentParam
            )
        );

        act(() => {
            result.current.handleUserInput("4", mockSetIsEndChat);
        });

        expect(mockCurrentMsg.setState).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    text: "error Message",
                    sender: "bot",
                }),
            ])
        );
    });

    it("should handle valid user input for a parameter question", () => {
        const { result } = renderHook(() =>
            useInput(
                {
                    ...mockCurrentMsg,
                    state: [
                        {
                            id: 0,
                            sender: "user",
                            text: "1",
                            typeOfQuestion: "parameter",
                            answerOptions: [1, 2, 3],
                        },
                    ],
                },
                mockCurrentQIndex,
                2,
                mockBot,
                mockSetIsEndSection,
                mockCurrentParam
            )
        );

        act(() => {
            result.current.handleUserInput("1", mockSetIsEndChat);
        });

        expect(mockCurrentMsg.setState).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    text: "1",
                    sender: "user",
                }),
            ])
        );
        expect(mockCurrentParam.setState).toHaveBeenCalledWith("column1");
    });

    it("should handle user input for operator question", () => {
        const { result } = renderHook(() =>
            useInput(
                {
                    ...mockCurrentMsg,
                    state: [
                        {
                            id: 0,
                            sender: "user",
                            text: "1",
                            typeOfQuestion: "operator",
                            answerOptions: [1, 2],
                        },
                    ],
                },
                mockCurrentQIndex,
                2,
                mockBot,
                mockSetIsEndSection,
                mockCurrentParam
            )
        );

        act(() => {
            result.current.handleUserInput("1", mockSetIsEndChat);
        });

        expect(mockCurrentMsg.setState).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    text: "1",
                    sender: "user",
                }),
            ])
        );
        expect(mockBot.currentOperatorIndex).toBe(0);
        });

    it("should handle user input for add question", () => {
        const { result } = renderHook(() =>
            useInput(
                {
                    ...mockCurrentMsg,
                    state: [
                        {
                            id: 2,
                            sender: "user",
                            text: "1",
                            typeOfQuestion: "add",
                            answerOptions: [1, 2],
                        },
                    ],
                },
                mockCurrentQIndex,
                2,
                mockBot,
                mockSetIsEndSection,
                mockCurrentParam
            )
        );

        act(() => {
            result.current.handleUserInput("2", mockSetIsEndChat);
        });

        expect(mockSetIsEndSection).toHaveBeenCalledWith(true);
        expect(mockSetIsEndChat).toHaveBeenCalledWith(true);
    });

    it("should update current question index", () => {
        const { result } = renderHook(() =>
            useInput(
                {
                    ...mockCurrentMsg,
                    state: [
                        {
                            id: 0,
                            sender: "user",
                            text: "1",
                            typeOfQuestion: "operator",
                            answerOptions: [1, 2],
                        },
                    ],
                },
                {
                    ...mockCurrentQIndex,
                    state: 1,
                },
                2,
                mockBot,
                mockSetIsEndSection,
                mockCurrentParam
            )
        );

        act(() => {
            result.current.handleUserInput("1", mockSetIsEndChat);
        });

        expect(mockCurrentQIndex.setState).toHaveBeenCalledWith(2);
    });
});
