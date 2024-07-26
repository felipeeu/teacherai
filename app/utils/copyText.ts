import { MutableRefObject } from "react";

export const copyText = (ref: MutableRefObject<null>) => {
  const divContent = ref.current as any;
  const textToCopy = divContent.texContent || divContent.innerText;

  navigator.clipboard.writeText(textToCopy);
};
