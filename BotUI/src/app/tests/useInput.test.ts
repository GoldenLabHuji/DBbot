import { renderHook, act } from "@testing-library/react-hooks";
import useInput from "@/app/hooks/useInput"; // adjust the path as necessary
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
        headers: ["param1", "param2"],
        columns: [],
    },
    _details: {
        name: "name",
        description: "description",
    },
    filePath: "../../../../pokemon.csv",
    currentOperatorIndex: 0,
    operatorsData: [
        {
            params: [
                {
                    isArray: false,
                    dataType: DataType.String,
                    name: "param1",
                },
            ],
            displayName: "operator1",
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
    state: "",
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
                    text: "Invalid input, please try again.",
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
        expect(mockCurrentParam.setState).toHaveBeenCalledWith("param1");
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
        expect(result.current.botMsg).toEqual(
            expect.arrayContaining(mockBot._data.headers)
        );
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
