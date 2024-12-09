import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillsData } from "@/types/skills";
import { useState } from "react";
import { SubjectAccordion } from "./SubjectAccordion";

interface SkillSelectorProps {
  data: SkillsData;
  setValue: any;
}

export function SkillSelector({ data, setValue }: SkillSelectorProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (skillCode: string, checked: boolean) => {
    setSelectedItems((prev) => {
      const newSelection = checked
        ? [...prev, skillCode]
        : prev.filter((code) => code !== skillCode);
      setValue("skills", newSelection);
      return newSelection;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seletor de Habilidades</CardTitle>
        <CardDescription>Selecione as habilidades desejadas</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(data).map(([key, subject]) => (
            <SubjectAccordion
              key={key}
              subjectKey={key}
              subject={subject}
              selectedItems={selectedItems}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </Accordion>

        {selectedItems.length > 0 && (
          <div className="mt-4 mb-6">
            <h3 className="text-sm font-semibold mb-2">
              Habilidades selecionadas:
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((code) => (
                <Badge key={code} variant="secondary">
                  {code}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
