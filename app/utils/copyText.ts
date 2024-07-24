import { MutableRefObject } from "react";

export const copyText = (ref: MutableRefObject<null>) => {
  const textArea = ref.current as any;
  textArea.select();
  textArea.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(textArea.value);
};
