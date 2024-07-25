"use client";
import { subjects } from "@/app/lib/data";
import styles from "@/app/ui/adapted.module.css";
import { nunito } from "@/app/ui/fonts";
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
  const [otherChecked, setOtherChecked] = useState(false);
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
  const DEFAULT_TYPE = "tipo2";
  const DEFAULT_SUBJECT = "Química";
  console.log("result: ", result);

  return (
    <div className={`${nunito.className} md:flex md:flex-row`}>
      <form className="w-3/5 h-[80vh]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-4 h-full">
          <div className="flex flex-col">
            <label>Adaptação</label>
            <select
              {...register("type")}
              className={styles.textarea}
              defaultValue={DEFAULT_TYPE}
            >
              <option value="tipo2">Tipo 2</option>
              <option value="tipo3">Tipo 3</option>
            </select>
            <label className="pt-3">Disciplina</label>
            {otherChecked ? (
              <input
                {...register("subject", { required: true })}
                className={styles.textarea}
              />
            ) : (
              <select
                className={styles.textarea}
                {...register("subject")}
                defaultValue={DEFAULT_SUBJECT}
              >
                {subjects.map((subject) => {
                  return (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  );
                })}
              </select>
            )}
            <span className="text-red-500 h-4">
              {errors?.subject && errors.subject.type === "required"
                ? "Precisa inserir a disciplina"
                : ""}
            </span>
            <div className="mb-2">
              <input
                className={styles.checkbox}
                type="checkbox"
                onChange={() => setOtherChecked((prev) => !prev)}
              />
              <label className="ml-3">outra</label>
            </div>
          </div>
          <label>Questão</label>
          <textarea
            className={`${styles.textarea}`}
            {...register("question", { required: true })}
          ></textarea>
          <span className="text-red-500 h-4">
            {errors?.question && errors.question.type === "required"
              ? "Precisa inserir uma questão"
              : ""}
          </span>
          <input className={styles.button} type="submit" value="Criar" />
        </div>
      </form>
      <div className="flex flex-col w-full p-4 ">
        <textarea
          defaultValue={isLoading ? "Loading..." : result}
          className={styles.textarea}
          ref={outputRef}
        />
        <div className="flex self-end justify-end h-auto w-10">
          <Image
            onClick={() => copyText(outputRef)}
            className={"pt-2"}
            src="/copy-text.svg"
            alt="Next.js Logo"
            width={30}
            height={10}
            priority
          />
        </div>
        <button className={styles.button} onClick={() => setResult("")}>
          Limpar
        </button>
      </div>
    </div>
  );
}
