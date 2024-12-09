import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Subject } from "@/types/skills";
import { SkillList } from "./SkillList";

interface SubjectAccordionProps {
  subjectKey: string;
  subject: Subject;
  selectedItems: string[];
  onCheckboxChange: (skillCode: string, checked: boolean) => void;
}

export function SubjectAccordion({
  subjectKey,
  subject,
  selectedItems,
  onCheckboxChange,
}: SubjectAccordionProps) {
  return (
    <AccordionItem value={subjectKey} className="border rounded-lg mb-2">
      <AccordionTrigger className="px-4 hover:no-underline">
        <span className="text-lg font-medium">{subject.nome_disciplina}</span>
      </AccordionTrigger>
      <AccordionContent className="px-4">
        {subject.ano.map((yearGroup, index) => (
          <div key={`${subjectKey}-year-${index}`} className="mb-4">
            <SkillList
              skills={yearGroup.codigo_habilidade}
              parentKey={`${subjectKey}-${index}`}
              selectedItems={selectedItems}
              onCheckboxChange={onCheckboxChange}
            />
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
