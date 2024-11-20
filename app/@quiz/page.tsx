'use client'
import React, { useEffect, useState } from 'react'
import useQuiz from '../store'
import { cn } from '@/lib/utils'
// import Button from '@/components/Button'





function Quiz() {
    const [questions, setQuestions] = useState<any>([])
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const config = useQuiz( (state:any) => state.config)
    const addScore = useQuiz((state:any) => state.addScore)

    const addStatus = useQuiz(state => state.addStatus)

    let score: number = 0
    const handleNext = () => {
        let remainingQuestions = [...questions]
        remainingQuestions.shift()
        setQuestions([...remainingQuestions])
        setAnswer('')
    }

    const checkAnswer = (answer: string) => {
        if (answer === questions[0].correct_answer) {
            addScore(0)
        }
        setAnswer(questions[0].correct_answer)
    }

    const handleRestart = () => {
        config.score = 0
        addStatus("stop")
        config.type = ''
        config.type = ''
        config.type = ''
    }
    useEffect(() => {
        async function getQuestions(retries = 1) {
            try {
                setLoading(true)
                const response = await fetch(`https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`);

                if (response.status === 429 && retries > 0) {
                    console.warn("Rate limited. Retrying...");
                    setTimeout(() => getQuestions(retries - 1), 1000 * (4 - retries)); // Exponential backoff
                    return;
                }
                const { results } = await response.json();
                let shuffledResults = results.map((e:any) => {
                    let value = [...e.incorrect_answers, e.correct_answer].map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
                    e.answers = [...value];
                    return e
                })
                console.log(shuffledResults);
                setQuestions([...shuffledResults])
                setLoading(false)
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }

        getQuestions();
    }, [config.numberOfQuestion, config.level, config.type, config.category.id]);
    return (
        <section className='flex flex-col justify-center items-center mt-5'>
            {
                questions.length ?
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
                        Question Number{" "}
                        {
                            questions.length ?
                                <span className="text-blue-600 dark:text-blue-500">
                                    {config.numberOfQuestion - (+questions.length) + 1 <= config.numberOfQuestion ? config.numberOfQuestion - (+questions.length) + 1 : " Completed"}
                                </span> : ""

                        }
                    </h1> :
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
                        You have attempted all questions
                    </h1>
            }
            <p className='text-2xl'>Score:{config.score}/{config.numberOfQuestion}</p>
            <section className='shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200'>
                <h4 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500 md:text-3xl lg:text-3xl">
                    {questions.length ? questions[0].question : null}
                </h4>
                <div className='flex justify-evenly items-center my-5 flex-wrap w-[85%]'>
                    {questions.length ? questions[0].answers.map((ans:any)=>
                        <button onClick={() => checkAnswer(ans)} key={ans} type="button"
                            className={
                                cn("w-[40%] my-4 py-3.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-500 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700", {
                                    "bg-red-900": answer && ans !== answer,
                                    "bg-blue-600": answer && ans === answer,
                                    "text-gray-100": answer,
                                })
                            }>
                            {ans}
                        </button>) : null}
                </div>
                {
                    questions.length ?
                        <button onClick={() => handleNext()} type="button" className="w-[40%] my-4 py-3.5 px-5 me-2 mb-2 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Next
                        </button> : <button onClick={() => handleRestart()} type="button" className="w-[40%] my-4 py-3.5 px-5 me-2 mb-2 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Restart
                        </button>
                }
            </section>
        </section>
    )
}

export default Quiz
