import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SkillListProps {
  skills: {
    nome_codigo: string;
    nome_habilidade: string;
  }[];
  parentKey: string;
  selectedItems: string[];
  onCheckboxChange: (skillCode: string, checked: boolean) => void;
}

export function SkillList({
  skills,
  parentKey,
  selectedItems,
  onCheckboxChange,
}: SkillListProps) {
  return (
    <ScrollArea className="h-[400px] pr-4">
      {skills.map((skill) => (
        <div
          key={`${parentKey}-${skill.nome_codigo}`}
          className="flex items-start space-x-2 mb-4"
        >
          <Checkbox
            id={`${parentKey}-${skill.nome_codigo}`}
            checked={selectedItems.includes(skill.nome_codigo)}
            onCheckedChange={(checked) =>
              onCheckboxChange(skill.nome_codigo, checked as boolean)
            }
          />
          <label
            htmlFor={`${parentKey}-${skill.nome_codigo}`}
            className="text-sm leading-relaxed cursor-pointer"
          >
            <span className="font-semibold">{skill.nome_codigo}</span> -{" "}
            {skill.nome_habilidade}
          </label>
        </div>
      ))}
    </ScrollArea>
  );
}
