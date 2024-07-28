import { MutableRefObject } from "react";
import toast from "react-hot-toast";

export const copyText = (ref: MutableRefObject<null>) => {
  const divContent = ref.current as any;
  const textToCopy = divContent.texContent || divContent.innerText;

  navigator.clipboard.writeText(textToCopy);
  toast.success("Copiado");
};
