import React from "react";

interface GoogleFormProps {
  iframeSrc: string;
}

const GoogleForm: React.FC<GoogleFormProps> = ({ iframeSrc }) => {
  return (
    <div>
      <iframe src={iframeSrc} width="640" height="480">
        Loading...
      </iframe>
    </div>
  );
};

export default GoogleForm;
