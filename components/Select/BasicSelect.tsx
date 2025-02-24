"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BasicSelect({
  options,
  setValue,
  title,
  formName,
  placeholder,
  ...props
}: {
  options: any[];
  setValue: any;
  title: string;
  formName: string;
  placeholder: string;
}) {
  return (
    <Select onValueChange={(value) => setValue(formName, value)} {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((option) => {
            return (
              <SelectItem
                className="cursor-pointer"
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
