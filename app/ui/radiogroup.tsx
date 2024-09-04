import styles from "@/app/ui/question.module.css";
import React from "react";
import { nunito } from "./fonts";

interface RadioOption {
  id: string;
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  onChange?: (value: string) => void;
  value?: string;
  title: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  onChange,
  value,
  title,
}) => {
  return (
    <fieldset className={`${styles.textarea} ${nunito.className} flex mb-2`}>
      <legend>{title}</legend>
      {options.map((option) => (
        <div className="p-2" key={option.id}>
          <input
            type="radio"
            id={option.id}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange && onChange(option.value)}
          />
          <label htmlFor={option.id} className="pl-2">
            {option.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
