"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { copyText } from "../utils/copyText";

type FormValues = {
  type: string;
  subject: string;
  question: string;
};

export default function Page() {
  const outputRef = useRef(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleFetch = async ({ subject, type, question }: FormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/adapted/?subject=${subject}&type=${type}&question=${question}`
      );
      const data = await response.json();

      if (data.response) {
        setResult(data.response);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => handleFetch(data);
  const DEFAULT_VALUE = "tipo2";
  console.log("result: ", result);
  return (
    <div className="md:flex md:flex-row">
      <form className="w-3/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Adaptação</label>
          <select
            {...register("type")}
            className="mb-4"
            defaultValue={DEFAULT_VALUE}
          >
            <option value="tipo2">Tipo 2</option>
            <option value="tipo3">Tipo 3</option>
          </select>
          <label>Disciplina</label>
          <input
            {...register("subject")}
            className={`${errors?.subject ? "" : "mb-4"}`}
          />
          {errors?.subject && (
            <span className="text-red-500">{errors.subject.message}</span>
          )}
          <label>Questão</label>
          <textarea
            className={`${errors?.question ? "" : "mb-4"}`}
            {...register("question")}
          ></textarea>
          {errors?.question && (
            <span className="text-red-500">{errors.question.message}</span>
          )}
          <input className="cursor-pointer mb-8" type="submit" />
        </div>
      </form>
      <div className="flex flex-col w-full">
        <textarea
          defaultValue={isLoading ? "Loading..." : result}
          className="md:ml-10 h-full bg-gray-50"
          ref={outputRef}
        />

        <Image
          onClick={() => copyText(outputRef)}
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/copy-text.svg"
          alt="Next.js Logo"
          width={22}
          height={5}
          priority
        />
        <button onClick={() => setResult("")}>Limpar</button>
      </div>
    </div>
  );
}
