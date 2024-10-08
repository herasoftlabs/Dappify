import React from "react";
import { Parameter } from "@/types/types";

interface ParameterRowProps {
  param: Parameter;
  onDelete: () => void;
  onChange: (key: keyof Parameter, value: any) => void;
}

const ParameterRow: React.FC<ParameterRowProps> = ({
  param,
  onDelete,
  onChange,
}) => {
  const anchorTypes = [
    "u8", "u16", "u32", "u64", 
    "i8", "i16", "i32", "i64", 
    "f32", "f64", "bool", "String", "Pubkey"
  ];

  return (
    <div className="flex items-center gap-4 mb-4 border-b pb-2">
      <input
        type="text"
        value={param.name}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="Parameter Name"
        className="border p-2 rounded bg-gray-100"
      />
      
      <select
        value={param.type}
        onChange={(e) => onChange("type", e.target.value)}
        className="border p-2 rounded bg-gray-100"
      >
        <option value="" disabled>Select Type</option>
        {anchorTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default ParameterRow;
