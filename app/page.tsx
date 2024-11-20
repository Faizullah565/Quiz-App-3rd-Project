'use client'
import Button from "@/components/Button";
import DropOptions from "@/components/DropDownOptions";
import useQuiz from "./store";
import InputNumberOfQuestions from "@/components/InputQuestions";

export default function Home() {
  // const quizConfig = useQuiz((state) => state.config)
  // console.log(quizConfig)
  return (
    <main>
      <section className="flex flex-col justify-center items-center my-5">
        <h1 className="font-bold md:text-3xl">Welcome to Our Quiz Session...</h1>
        <section className="p-10 my-10 rounded-lg shadow-xl w-[75%]">
          <div className="max-w-3xl mx-auto w-full">
            <InputNumberOfQuestions />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <DropOptions />
            <Button />
          </div>
        </section>
      </section>
    </main>
  );
}
