import React from "react";
import { Instruction } from "@/types/types";

interface SettingsPanelProps {
  instruction: Instruction;
  onChange: (key: keyof Instruction, value: any) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ instruction, onChange }) => {
  return (
    <div>
     
      <div className="mb-4">
        <label className="font-semibold">Name:</label>
        <input
          type="text"
          value={instruction.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Instruction Name"
          className="border p-2 rounded mb-4 w-full"
        />
      </div>

      
      <div className="mb-4">
        <label className="font-semibold">Lifetime:</label>
        <input
          type="text"
          value={instruction.lifetime || ""} 
          onChange={(e) => onChange("lifetime", e.target.value)}
          placeholder={instruction.lifetime || ""}
          className="border p-2 rounded w-full mt-2"
        />
      </div>

      
      <div className="mb-4">
        <label className="font-semibold">Visibility:</label>
        <select
          value={instruction.visibility || "public"}
          onChange={(e) => onChange("visibility", e.target.value)}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      
      <div className="mb-4">
        <label className="font-semibold">Return Type:</label>
        <select
          value={instruction.returnType || "Result<()>"}
          onChange={(e) => onChange("returnType", e.target.value)}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="Result<()>">Result&lt;()&gt;</option>
          <option value="Result<u64>">Result&lt;u64&gt;</option>
          <option value="ProgramResult">ProgramResult</option>
          <option value="()">() - Unit Type</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;
