import React from "react";
import ParameterRow from "./ParameterRow";

interface Parameter {
  id: number;
  paramName: string;
  accountName: string;
}

interface ParametersPanelProps {
  parameters: Parameter[];
  setParameters: (params: Parameter[]) => void;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ parameters, setParameters }) => {
  const addParameter = () => {
    setParameters([...parameters, { id: Date.now(), paramName: "", accountName: "" }]);
  };

  const handleParameterChange = (id: number, key: keyof Parameter, value: string) => {
    setParameters(
      parameters.map((param) =>
        param.id === id ? { ...param, [key]: value } : param
      )
    );
  };

  return (
    <div>
      <button onClick={addParameter} className="bg-blue text-white px-4 py-2 rounded">
        Add Parameter
      </button>
      <div className="max-h-[250px] overflow-y-auto pb-1 pr-1 mt-4">
        {parameters.map((param) => (
          <ParameterRow
            key={param.id}
            param={param}
            onDelete={() => setParameters(parameters.filter((p) => p.id !== param.id))}
            onChange={handleParameterChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ParametersPanel;
