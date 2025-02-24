import { Label as ShadcnLabel } from "@/components/ui/label";

export const CustomLabelXl = ({ children, ...props }: any) => {
  return (
    <ShadcnLabel {...props} className="text-xl">
      {children}
    </ShadcnLabel>
  );
};

export default CustomLabelXl;
