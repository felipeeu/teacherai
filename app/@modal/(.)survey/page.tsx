import GoogleForm from "@/app/ui/googleform";
import { Modal } from "./modal";

export default function SurveyModal() {
  return (
    <Modal>
      <GoogleForm iframeSrc="https://docs.google.com/forms/d/e/1FAIpQLSeFa1HAXeCwggn7taMr5r9BYrKwFizglPiA5dnytItdRbpejg/viewform?embedded=true" />{" "}
    </Modal>
  );
}
