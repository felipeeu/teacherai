"use client";
import { AdaptedType, Category, Levels, subjects } from "@/app/lib/data";
import { parseMarkdown } from "@/app/lib/parsemd";
import { nunito } from "@/app/ui/fonts";
import { copyText } from "@/app/utils/copyText";
import { CustomLabelXl } from "@/components/CustomLabel";
import { BasicSelect } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const ADAPTED_EXAM = "adapted";
const DEFAULT_TYPE = "Tipo 3";
const DEFAULT_SUBJECT = "Química";
const DEFAULT_CATEGORY = Category.MULTIPLE_CHOICE;
const DEFAULT_LEVEL = Levels.FUNDAMENTAL_EIGHTH_GRADE;

type FormValues = {
  type: string;
  subject: string;
  question: string;
  level: string;
  category: string;
};
const types = Object.values(AdaptedType);
const levels = Object.values(Levels);
const getCategories = (exam: string) =>
  Object.values(Category).filter((category) =>
    exam === ADAPTED_EXAM ? category : category !== Category.FILL_GAPS
  );
const radioOptions = [
  { id: "adapted", value: "adapted", label: "Adaptada" },
  { id: "second", value: "second", label: "Substitutiva" },
];
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
    setError,
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
        setError("subject", {});
        return !prev;
      }
    });
  };

  const handleRadioButton = (event: any) => {
    setExam(event.target.value);
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
    <div className={`${nunito.className} md:flex md:flex-row text-primary`}>
      <Toaster />
      <form
        className={`md:w-3/5 ${result ? "md:w-3/5 hidden" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-6 p-4">
          <RadioGroup
            onChange={handleRadioButton}
            defaultValue={ADAPTED_EXAM}
            name={"exam"}
            className="flex space-x-2 py-4"
          >
            {radioOptions.map(({ id, value, label }) => {
              return (
                <div key={id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value}
                    id={id}
                    defaultChecked
                    className="text-primary-foreground"
                  />
                  <CustomLabelXl htmlFor={value}>{label}</CustomLabelXl>
                </div>
              );
            })}
          </RadioGroup>
          {exam === ADAPTED_EXAM ? (
            <Fragment>
              <CustomLabelXl htmlFor="type">Tipo de Adaptação</CustomLabelXl>
              <BasicSelect
                title={"Adaptação"}
                options={types}
                setValue={setValue}
                formName="type"
                placeholder="Selecione um tipo de adaptação"
              />
            </Fragment>
          ) : (
            <Fragment>
              <CustomLabelXl htmlFor="level">Ano/Série</CustomLabelXl>
              <BasicSelect
                title={"Ano/Série"}
                options={levels}
                setValue={setValue}
                formName="level"
                placeholder="Selecione uma série ou ano"
              />
            </Fragment>
          )}
          <Fragment>
            <CustomLabelXl htmlFor="subject">Disciplina</CustomLabelXl>
            {otherChecked ? (
              <Input
                title="Disciplina"
                placeholder="Insira a disciplina"
                {...register("subject", { required: true })}
              />
            ) : (
              <BasicSelect
                title={"Disciplina"}
                options={subjects}
                setValue={setValue}
                formName="subject"
                placeholder="Selecione uma Disciplina"
              />
            )}
            {errors?.subject && errors.subject.type === "required" ? (
              <span className="text-red-500 h-4">
                {"Precisa inserir a disciplina"}
              </span>
            ) : null}
          </Fragment>

          <div className="flex">
            <Input className="w-4" type="checkbox" onChange={handleCheckBox} />
            <Label className="py-3 px-2 font-semibold">outra disciplina</Label>
          </div>
          <Fragment>
            <CustomLabelXl htmlFor="category">Tipo de Questão</CustomLabelXl>

            <BasicSelect
              title={"Tipo de Questão"}
              options={getCategories(exam)}
              setValue={setValue}
              formName="category"
              placeholder="Selecione um tipo de questão"
            />
          </Fragment>
          <div className="h-[480px] pb-4">
            <CustomLabelXl htmlFor="question">Questão</CustomLabelXl>
            <Textarea
              className="h-full"
              {...register("question", { required: true })}
            ></Textarea>
            <span className="text-red-500 h-4">
              {errors?.question && errors.question.type === "required"
                ? "Precisa inserir uma questão"
                : ""}
            </span>
          </div>
          <Button className="w-1/4 self-center" type="submit">
            <span>Criar</span>
          </Button>
        </div>
      </form>

      <div
        className={`md:flex md:flex-col md:w-full py-6 md:p-4 md:h-[80vh] ${
          result ? "" : "hidden"
        }`}
      >
        {isLoading ? (
          <p className="animate-bounce text-xl">Gerando questão. Aguarde!</p>
        ) : (
          <p className="text-xl">Sua questão será gerada aqui:</p>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: parsedResult }}
          className={`border h-[70vh] overflow-auto`}
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
        {true ? (
          <Button className="w-1/4 self-center" onClick={() => setResult("")}>
            <span>Limpar</span>
          </Button>
        ) : (
          <div className="h-16" />
        )}
      </div>
    </div>
  );
}
