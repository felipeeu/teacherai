import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Competency } from "@/types/competencies";
import { CompetencyList } from "./CompetencyList";

interface LevelAccordionProps {
  title: string;
  competencies: Record<string, Competency>;
  selectedItems: string[];
  onCheckboxChange: (competency: string, checked: boolean) => void;
}

export function LevelAccordion({
  title,
  competencies,
  selectedItems,
  onCheckboxChange,
}: LevelAccordionProps) {
  return (
    <AccordionItem value={title} className="border rounded-lg mb-2">
      <AccordionTrigger className="px-4 hover:no-underline">
        <span className="text-lg font-medium">{title}</span>
      </AccordionTrigger>
      <AccordionContent className="px-4">
        <Accordion type="single" collapsible>
          {Object.entries(competencies).map(([key, value]) => (
            <AccordionItem
              key={`${title}-${key}`}
              value={`${title}-${key}`}
              className="border rounded-lg mb-2"
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <span className="text-lg font-medium">
                  {value.nome_competencia}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <CompetencyList
                  competencies={value.competencias}
                  parentKey={`${title}-${key}`}
                  title={value.nome_competencia}
                  selectedItems={selectedItems}
                  onCheckboxChange={onCheckboxChange}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}
