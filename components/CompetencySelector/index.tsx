import { CompetenciasData } from "@/app/types/competencies";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { CompetencyList } from "./CompetencyList";
import { LevelAccordion } from "./LevelAccordion";

interface CompetencySelectorProps {
  data: CompetenciasData;
  setValue: any;
}

interface FormValues {
  selectedCompetencies: string[];
}

export function CompetencySelector({
  data,
  setValue,
}: CompetencySelectorProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (competency: string, checked: boolean) => {
    setSelectedItems((prev) => {
      const newSelection = checked
        ? [...prev, competency]
        : prev.filter((item) => item !== competency);
      setValue("competencies", newSelection);
      return newSelection;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seletor de Competências</CardTitle>
        <CardDescription>Selecione as competências desejadas</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="gerais" className="border rounded-lg mb-2">
            <AccordionTrigger className="px-4 hover:no-underline">
              <span className="text-lg font-medium">
                {data.comp_gerais.nome_competencia}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <CompetencyList
                competencies={data.comp_gerais.competencias}
                parentKey="gerais"
                title={data.comp_gerais.nome_competencia}
                selectedItems={selectedItems}
                onCheckboxChange={handleCheckboxChange}
              />
            </AccordionContent>
          </AccordionItem>

          <LevelAccordion
            title="Ensino Fundamental"
            competencies={data.comp_fundamental as any}
            selectedItems={selectedItems}
            onCheckboxChange={handleCheckboxChange}
          />

          <LevelAccordion
            title="Ensino Médio"
            competencies={data.comp_medio as any}
            selectedItems={selectedItems}
            onCheckboxChange={handleCheckboxChange}
          />
        </Accordion>
      </CardContent>
    </Card>
  );
}
