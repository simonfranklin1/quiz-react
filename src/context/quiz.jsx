import { createContext, useReducer } from "react";
import questions from "../data/questions_complete";
import { useState } from "react";

const STAGES = ["Start", "Category", "Playing", "End"];

const initialState = { // estado inicial
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0, 
    score: 0,  
    answerSelected: false,
    help: false,
    optionToHide: null
}

const quizReducer = (state, action) => {

    switch(action.type) {

        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
            };

        case "START_GAME":
            let quizQuestions = null;

            state.questions.forEach((question) => {
                if(question.category === action.payload) {
                    quizQuestions = question.questions
                }
            })

            return {
                ...state,
                questions: quizQuestions,
                gameStage: STAGES[2]
            }

        case "REORDER_QUESTIONS":
            const reorderedQuestions = state.questions.sort(() => {
                return Math.random() - 0.5;
            })
            return {
                ...state,
                questions: reorderedQuestions
            }
        
        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1
            let endGame = false;

            if(!state.questions[nextQuestion]) {
                endGame = true;
            } // Se não houver próxima questão endGame receberá true

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[3] : state.gameStage,// Se endGame for true gameStage receberá "End"
                answerSelected: false,
                tip: false,
            }

        case "NEW_GAME":
            return initialState;

        case "CHECK_ANSWER":
            if(state.answerSelected) return state;

            const answer = action.payload.answer;
            const option = action.payload.option;
            let correctAnswer = 0;

            if(answer === option) correctAnswer = 1;

            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option,
            };

        case "SHOW_TIP":
            return {
                ...state,
                help: "tip"
            }
        
        case "REMOVE_OPTION":
            const questionWithoutOption = state.questions[state.currentQuestion]

            let repeat = true;
            let optionToHide

            questionWithoutOption.options.forEach((option) => {
                if(option !== questionWithoutOption.answer && repeat) {
                    optionToHide = option;
                    repeat = false;
                }
            })

            return {
                ...state,
                optionToHide,
                help: true
            }

        default:
            return state;
    }

}

// 1 - criando o contexto
export const QuizContext = createContext()

// 2 - Provedor do contexto
export const QuizProvider = ({children}) => {
    const value = useReducer(quizReducer, initialState); //passando o quiz reducer para saber o estado inicial e o initialState para defini-lo como o estado inicial

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}