import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CompetencyListProps {
  competencies: string[];
  parentKey: string;
  title: string;
  selectedItems: string[];
  onCheckboxChange: (competency: string, checked: boolean) => void;
}

export function CompetencyList({
  competencies,
  parentKey,
  title,
  selectedItems,
  onCheckboxChange,
}: CompetencyListProps) {
  return (
    <ScrollArea className="h-[300px] pr-4">
      {competencies.map((competency, index) => (
        <div
          key={`${parentKey}-${title}-${index}`}
          className="flex items-start space-x-2 mb-4"
        >
          <Checkbox
            id={`${parentKey}-${title}-${index}`}
            checked={selectedItems.includes(competency)}
            onCheckedChange={(checked) =>
              onCheckboxChange(competency, checked as boolean)
            }
          />
          <label
            htmlFor={`${parentKey}-${title}-${index}`}
            className="text-sm leading-relaxed cursor-pointer"
          >
            {competency}
          </label>
        </div>
      ))}
    </ScrollArea>
  );
}
