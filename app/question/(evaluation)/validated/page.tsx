"use client";
import { BnccSkills, Fields, Levels, Period, subjects } from "@/app/lib/data";
import { parseMarkdown } from "@/app/lib/parsemd";
import { nunito } from "@/app/ui/fonts";
import styles from "@/app/ui/question.module.css";
import { copyText } from "@/app/utils/copyText";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const DEFAULT_SUBJECT = "Química";
const DEFAULT_LEVEL = Levels.FUNDAMENTAL_EIGHTH_GRADE;
const DEFAULT_PERIOD = Period.FIRST_QUARTER;
const DEFAULT_SKILLS = BnccSkills.FUNDAMENTAL_HUMAN_SCIENCE;
const allFields: Fields[] = Object.values(Fields);

const allPeriods: Period[] = Object.values(Period);

const allSkills: BnccSkills[] = Object.values(BnccSkills);

const allLevels: Levels[] = Object.values(Levels);

type FormValues = {
  field: string;
  subject: string;
  period: string;
  level: string;
  category: string;
  question: string;
  skills: string;
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
      field: Fields.NATURAL_SCIENCE,
      subject: DEFAULT_SUBJECT,
      period: DEFAULT_PERIOD,
      level: DEFAULT_LEVEL,
      question: "",
      skills: DEFAULT_SKILLS,
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
    field,
    subject,
    period,
    level,
    question,
    skills,
  }: FormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/validate/?subject=${subject}&field=${field}&level=${level}&period=${period}&question=${question}&skills=${skills}`
      );
      const data = await response.json();
      if (data.response) {
        setResult(data.response);
        setIsLoading(false);
      } else {
        toast.error(
          "Não foi possível validar sua questão. Tente novamente mais tarde!"
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
      <form
        noValidate
        className="md:w-3/5 md:h-[80vh]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col p-4 md:h-full">
          <div className="flex flex-col">
            <label htmlFor="field" className="pt-2">
              Área
            </label>
            <select className={styles.textarea} {...register("field")}>
              {allFields.map((field: string) => {
                return (
                  <option key={field} value={field}>
                    {field}
                  </option>
                );
              })}
            </select>
            <label htmlFor="period" className="pt-2">
              Período
            </label>
            <select className={styles.textarea} {...register("period")}>
              {allPeriods.map((period: string) => {
                return (
                  <option key={period} value={period}>
                    {period}
                  </option>
                );
              })}
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
                {...register("subject", { required: true })}
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
              {allLevels.map((level) => {
                return (
                  <option key={level} value={level}>
                    {level}
                  </option>
                );
              })}
            </select>

            <label htmlFor="skills" className="pt-2">
              Competências
            </label>
            <select className={styles.textarea} {...register("skills")}>
              {allSkills.map((skills: string) => {
                return (
                  <option key={skills} value={skills}>
                    {skills}
                  </option>
                );
              })}
            </select>
          </div>
          <label htmlFor="question" className="pt-2">
            Questão
          </label>
          <textarea
            className={`${styles.textarea}  `}
            {...register("question", { required: true })}
          ></textarea>
          <input className={styles.button} type="submit" value="Validar" />
        </div>
      </form>
      <div className="flex flex-col w-full p-4 h-[80vh]">
        {isLoading ? (
          <p className="animate-bounce text-xl">Validando questão. Aguarde!</p>
        ) : (
          <p className="text-xl">Sua questão será validada aqui:</p>
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
