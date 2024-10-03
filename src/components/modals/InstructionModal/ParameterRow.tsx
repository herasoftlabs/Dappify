import React from "react";

interface Parameter {
  id: number;
  paramName: string;
  accountName: string;
}

interface ParameterRowProps {
  param: Parameter;
  onDelete: () => void;
  onChange: (id: number, key: keyof Parameter, value: string) => void;
}

const ParameterRow: React.FC<ParameterRowProps> = ({ param, onDelete, onChange }) => {
  return (
    <div className="flex items-center gap-4 mb-4 border-b pb-2">
      <input
        type="text"
        value={param.paramName}
        onChange={(e) => onChange(param.id, "paramName", e.target.value)}
        placeholder="Parameter Name"
        className="border p-2 rounded bg-gray-100"
      />
      <input
        type="text"
        value={param.accountName}
        onChange={(e) => onChange(param.id, "accountName", e.target.value)}
        placeholder="Account Name"
        className="border p-2 rounded bg-gray-100"
      />
      <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
        Delete
      </button>
    </div>
  );
};

export default ParameterRow;
