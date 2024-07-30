import GoogleForm from "@/app/ui/googleform";
import { Modal } from "./modal";

export default function SurveyModal() {
  return (
    <Modal>
      <GoogleForm iframeSrc="https://docs.google.com/forms/d/e/1FAIpQLScidYZ74YCKweeVRTGmnA5ReMfdCKHdgakyERIT_kY-YvBGwQ/viewform?embedded=true" />{" "}
    </Modal>
  );
}
