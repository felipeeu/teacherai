"use client";
import {
  BnccSkills,
  ExtendedLevels,
  Fields,
  Levels,
  subjects,
} from "@/app/lib/data";
import { parseMarkdown } from "@/app/lib/parsemd";
import { nunito } from "@/app/ui/fonts";
import styles from "@/app/ui/question.module.css";
import { copyText } from "@/app/utils/copyText";
import { CompetencySelector } from "@/components/CompetencySelector";
import { BasicSelect, SelectLevel } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import competencies from "../../../../lib/json/competences.json";

const DEFAULT_SUBJECT = "Química";
const DEFAULT_LEVEL = Levels.FUNDAMENTAL_EIGHTH_GRADE;
const DEFAULT_SKILLS = BnccSkills.FUNDAMENTAL_HUMAN_SCIENCE;
const allFields: Fields[] = Object.values(Fields);

const levels: Levels[] = Object.values(Levels);
const extendedLevels: ExtendedLevels[] = Object.values(ExtendedLevels);
const allLevels = [...extendedLevels, ...levels];
const allSkills: BnccSkills[] = Object.values(BnccSkills);

type FormValues = {
  field: string;
  subject: string;
  level: string;
  category: string;
  skills: string;
  competencies: string[];
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
      skills: DEFAULT_SKILLS,
      competencies: [],
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
    level,
    skills,
    competencies,
  }: FormValues) => {
    const allCompetencies = competencies.join(" ");
    debugger;
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/validate/?subject=${subject}&field=${field}&level=${level}&skills=${skills}`
      );
      const data = await response.json();
      if (data.response) {
        setResult(data.response);
        setIsLoading(false);
      } else {
        toast.error("Tente novamente mais tarde!");
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
            <label className="pt-2">Ano/Série</label>
            <SelectLevel setValue={setValue} />
            <label htmlFor="field" className="pt-2">
              Área
            </label>
            {/* <select className={styles.textarea} {...register("field")}>
              {allFields.map((field: string) => {
                return (
                  <option key={field} value={field}>
                    {field}
                  </option>
                );
              })}
            </select> */}
            <BasicSelect
              title={"Área"}
              options={allFields}
              setValue={setValue}
              formName="field"
              placeholder="Selecione uma área"
            />
            <label className="pt-3">Disciplina</label>
            {otherChecked ? (
              <Input {...register("subject", { required: true })} />
            ) : (
              <BasicSelect
                title={"Área"}
                options={subjects.sort()}
                setValue={setValue}
                formName="subject"
                placeholder="Selecione uma Disciplina"
              />
            )}
            <span className="text-red-500 h-4">
              {errors?.subject && errors.subject.type === "required"
                ? "Precisa inserir a disciplina"
                : ""}
            </span>
            <div>
              <Checkbox onCheckedChange={handleCheckBox} />
              <label className="ml-3">outra</label>
            </div>
            <label htmlFor="skills" className="pt-2">
              Competências
            </label>
          </div>
          <CompetencySelector data={competencies} setValue={setValue} />
          <div className="flex justify-center pt-4">
            <Button className="active:shadow-md cursor-pointer" type="submit">
              Criar
            </Button>
          </div>
        </div>
      </form>
      <div className="flex flex-col w-full p-4 h-[80vh]">
        {isLoading ? (
          <p className="animate-bounce text-xl">Criando Planilha. Aguarde!</p>
        ) : (
          <p className="text-xl">Sua resposta será retornada aqui:</p>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: parsedResult }}
          className={`border h-screen overflow-scroll`}
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
              alt="copy"
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
