import React from "react";

interface SettingsPanelProps {
  contextName: string;
  setContextName: (name: string) => void;
  instructionName: string;
  setInstructionName: (name: string) => void;
  contextVisibility: boolean;
  setContextVisibility: (visibility: boolean) => void;
  instructionVisibility: boolean;
  setInstructionVisibility: (visibility: boolean) => void;
  returnType: string;
  setReturnType: (type: string) => void;
}

const returnTypes = ["Result<()>", "u32", "String"];

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  contextName,
  setContextName,
  instructionName,
  setInstructionName,
  contextVisibility,
  setContextVisibility,
  instructionVisibility,
  setInstructionVisibility,
  returnType,
  setReturnType,
}) => {
  return (
    <div>
      <div className="my-5">
        <label className="block mb-1 font-medium">Context Name:</label>
        <input
          type="text"
          value={contextName} 
          onChange={(e) => setContextName(e.target.value)}
          placeholder="Enter context name"
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>

      <div className="my-5">
        <label className="block mb-1 font-medium">Instruction Name:</label>
        <input
          type="text"
          value={instructionName}
          onChange={(e) => setInstructionName(e.target.value)}
          placeholder="Enter instruction name"
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>

      <div className="my-5">
        <label className="block mb-1 font-medium">Visibility:</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={contextVisibility}
              onChange={() => setContextVisibility(!contextVisibility)}
            />
            <span className="ml-2">Public Context</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={instructionVisibility}
              onChange={() => setInstructionVisibility(!instructionVisibility)}
            />
            <span className="ml-2">Public Instruction</span>
          </label>
        </div>
      </div>

      <div className="my-5">
        <label className="block mb-1 font-medium">Return Type:</label>
        <select
          value={returnType}
          onChange={(e) => setReturnType(e.target.value)}
          className="border p-2 w-full rounded bg-gray-100"
        >
          {returnTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;
