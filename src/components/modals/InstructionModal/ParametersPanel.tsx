import React from "react";
import ParameterRow from "./ParameterRow";
import { Parameter } from "@/types/types";

interface ParametersPanelProps {
  parameters: Parameter[];
  onChange: (updatedParameters: Parameter[]) => void;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ parameters, onChange }) => {
  const handleFieldChange = (index: number, key: keyof Parameter, value: any) => {
    const updatedParameters = [...parameters];
    updatedParameters[index] = { ...updatedParameters[index], [key]: value };
    onChange(updatedParameters);
  };

  const handleDeleteParameter = (index: number) => {
    const updatedParameters = parameters.filter((_, i) => i !== index);
    onChange(updatedParameters);
  };

  return (
    <div>
       <button
        onClick={() =>
          onChange([...parameters, { name: "", type: "", description: "" }])}
        className="bg-primary text-white px-4 py-2 rounded mt-2  mb-2"
      >
        Add Parameter
      </button>
      <hr />

      {parameters.map((param, index) => (
        <ParameterRow
          key={index}
          param={param}
          onDelete={() => handleDeleteParameter(index)}
          onChange={(key, value) => handleFieldChange(index, key, value)}
        />
      ))}
     
    </div>
  );
};

export default ParametersPanel;
