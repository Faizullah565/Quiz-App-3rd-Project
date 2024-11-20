import useQuiz from '@/app/store'
import React from 'react'

function InputNumberOfQuestions() {
    const addNumberOfQuestions=useQuiz(state=>state.addNumberOfQuestions)
    return (
        <div className="max-w-full mx-auto w-full">
            <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Questions:</label>
            <input type="number" defaultValue={10} max={30} min={0} onChange={(e)=>addNumberOfQuestions(e.target.value)} id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
        </div>
    )
}

export default InputNumberOfQuestions

