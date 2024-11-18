"use client";
import { Category, levels, subjects } from "@/app/lib/data";
import { parseMarkdown } from "@/app/lib/parsemd";
import { nunito } from "@/app/ui/fonts";
import styles from "@/app/ui/question.module.css";
import RadioGroup from "@/app/ui/radiogroup";
import { copyText } from "@/app/utils/copyText";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const ADAPTED_EXAM = "adapted";
const DEFAULT_TYPE = "tipo2";
const DEFAULT_SUBJECT = "Química";
const DEFAULT_CATEGORY = "multiple";
const DEFAULT_LEVEL = "8year";

type FormValues = {
  type: string;
  subject: string;
  question: string;
  level: string;
  category: string;
};
export default function Page() {
  const outputRef = useRef(null);
  const [result, setResult] = useState("");
  const [exam, setExam] = useState(ADAPTED_EXAM);
  const [otherChecked, setOtherChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      type: DEFAULT_TYPE,
      subject: DEFAULT_SUBJECT,
      question: "",
      level: DEFAULT_LEVEL,
      category: DEFAULT_CATEGORY,
    },
  });

  const handleCheckBox = () => {
    setOtherChecked((prev) => {
      if (prev === false) {
        setValue("subject", "");
        return !prev;
      } else {
        setValue("subject", DEFAULT_SUBJECT);
        return !prev;
      }
    });
  };

  const handleRadioButton = (value: string) => {
    setExam(value);
    setValue("level", DEFAULT_LEVEL);
    setValue("category", DEFAULT_CATEGORY);
  };

  const handleFetch = async ({
    subject,
    type,
    question,
    level,
    category,
  }: FormValues) => {
    try {
      setIsLoading(true);
      const response =
        exam === ADAPTED_EXAM
          ? await fetch(
              `/api/adapted/?subject=${subject}&type=${type}&question=${question}&category=${category}`
            )
          : await fetch(
              `/api/substitute/?subject=${subject}&question=${question}&level=${level}&category=${category}`
            );
      const data = await response.json();

      if (data.response) {
        setResult(data.response);
        setIsLoading(false);
      } else {
        toast.error(
          "Não foi possível criar sua questão. Tente novamente mais tarde!"
        );
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => handleFetch(data);
  const parsedResult = parseMarkdown(result);
  return (
    <div className={`${nunito.className} md:flex md:flex-row`}>
      <Toaster />
      <form className="md:w-3/5 md:h-[80vh]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-4 md:h-full">
          <div className="flex flex-col">
            <RadioGroup
              options={[
                { id: "adapted", value: "adapted", label: "Adaptada" },
                { id: "second", value: "second", label: "Substitutiva" },
              ]}
              title={"Escolha o tipo de Prova:"}
              name={"exam"}
              onChange={handleRadioButton}
              value={exam}
            />
            {exam === ADAPTED_EXAM ? (
              <>
                <label>Adaptação</label>
                <select
                  {...register("type")}
                  className={styles.textarea}
                  defaultValue={DEFAULT_TYPE}
                >
                  <option value="tipo2">Tipo 2</option>
                  <option value="tipo3">Tipo 3</option>
                </select>
              </>
            ) : (
              <>
                <label className="pt-3">Ano/Série</label>
                <select className={styles.textarea} {...register("level")}>
                  {levels.map(
                    ({
                      value,
                      completed,
                    }: {
                      value: string;
                      completed: string;
                    }) => {
                      return (
                        <option key={value} value={completed}>
                          {completed}
                        </option>
                      );
                    }
                  )}
                </select>
              </>
            )}
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
                {subjects.sort().map((subject) => {
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
                onChange={handleCheckBox}
              />
              <label className="ml-3">outra</label>
            </div>
            <>
              <label>Tipo de Questão</label>
              <select
                {...register("category")}
                className={`${styles.textarea} mb-2`}
                defaultValue={DEFAULT_CATEGORY}
              >
                <option value={Category.MULTIPLE_CHOICE}>
                  {Category.MULTIPLE_CHOICE}
                </option>
                <option value={Category.DISCURSIVE}>
                  {Category.DISCURSIVE}
                </option>
                {exam === ADAPTED_EXAM ? (
                  <option value={Category.FILL_GAPS}>
                    {Category.FILL_GAPS}
                  </option>
                ) : null}
              </select>
            </>
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
      <div className="flex flex-col w-full p-4 h-[80vh]">
        {isLoading ? (
          <p className="animate-bounce text-xl">Gerando questão. Aguarde!</p>
        ) : (
          <p className="text-xl">Sua questão será gerada aqui:</p>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: parsedResult }}
          className={`${styles.textarea} overflow-scroll`}
          ref={outputRef}
        />
        <div className="flex self-end justify-end h-auto w-10">
          {result ? (
            <Image
              onClick={() => {
                copyText(outputRef);
              }}
              className={"pt-2 cursor-pointer active:scale-[1.2] "}
              src="/copy-text.svg"
              alt="Next.js Logo"
              width={30}
              height={10}
              priority
            />
          ) : (
            <div className="h-10" />
          )}
        </div>
        {result ? (
          <button className={styles.button} onClick={() => setResult("")}>
            Limpar
          </button>
        ) : (
          <div className="h-16" />
        )}
      </div>
    </div>
  );
}
