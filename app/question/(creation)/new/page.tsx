"use client";
import { categoryMap, levels, subjects } from "@/app/lib/data";
import { parseMarkdown } from "@/app/lib/parsemd";
import { nunito } from "@/app/ui/fonts";
import styles from "@/app/ui/question.module.css";
import { copyText } from "@/app/utils/copyText";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const DEFAULT_SUBJECT = "Química";
const DEFAULT_CATEGORY = "multiple";
const DEFAULT_LEVEL = "8year";

type FormValues = {
  quantity: string;
  subject: string;
  postscript: string;
  level: string;
  category: string;
  skillObject: string;
  baseText: string;
  learnerObject: string;
};
export default function Page() {
  const outputRef = useRef(null);
  const [result, setResult] = useState("");
  const [otherChecked, setOtherChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      subject: DEFAULT_SUBJECT,
      postscript: "",
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
  const handleFetch = async ({
    subject,
    quantity,
    level,
    category,
    skillObject,
    baseText,
    learnerObject,
  }: FormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/new/?subject=${subject}
                      &quantity=${quantity}
                      &level=${level}
                      &category=${category}
                      &skillObject=${skillObject}
                      &baseText=${baseText}
                      &learnerObject=${learnerObject}`
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
            <div>
              <input
                className={styles.checkbox}
                type="checkbox"
                onChange={handleCheckBox}
              />
              <label className="ml-3">outra</label>
            </div>

            <label className="pt-2">Ano/Série</label>
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
                    <option key={value} value={value}>
                      {completed}
                    </option>
                  );
                }
              )}
            </select>

            <label className="pt-2">Tipo de Questão</label>
            <select
              {...register("category")}
              className={`${styles.textarea} mb-2`}
              defaultValue={DEFAULT_CATEGORY}
            >
              <option value="multiple">{categoryMap["multiple"]}</option>
              <option value="discursive">{categoryMap["discursive"]}</option>
            </select>

            <label>Quantidade de Questões</label>

            <input
              className={`${styles.textarea} !h-8`}
              type="number"
              {...register("quantity")}
            />
          </div>
          <label className="pt-2">Objetivos de Conhecimento</label>
          <input
            className={`${styles.textarea} !h-12`}
            {...register("skillObject")}
          ></input>

          <label className="pt-2">Objetivos de Aprendizagem (opcional)</label>
          <input
            className={`${styles.textarea} !h-12`}
            {...register("learnerObject")}
          ></input>

          <label className="pt-2">Texto Base (ou link)</label>
          <textarea
            className={styles.textarea}
            {...register("baseText")}
          ></textarea>

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
