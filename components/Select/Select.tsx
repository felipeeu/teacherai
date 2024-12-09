"use client";
import { levelGroups } from "@/app/lib/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectLevel({ setValue }: { setValue: any }) {
  return (
    <Select onValueChange={(value) => setValue("level", value)}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma série" />
      </SelectTrigger>
      <SelectContent>
        {levelGroups.map((group) => {
          return (
            <SelectGroup key={group.name}>
              <SelectLabel>{group.name}</SelectLabel>
              {group.levels.map((level) => {
                return (
                  <SelectItem
                    className="cursor-pointer"
                    key={level.id}
                    value={level.name}
                  >
                    {level.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}
