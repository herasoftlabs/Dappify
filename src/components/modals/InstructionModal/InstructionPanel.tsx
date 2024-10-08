import React from "react";

interface InstructionPanelProps {
  instructionBody: string;
  onChange: (body: string) => void;
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({ instructionBody, onChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Instruction Body</h3>
      <textarea
        value={instructionBody}
        onChange={(e) => onChange(e.target.value)}
        placeholder={instructionBody}
        className="w-full border p-4 rounded min-h-[150px]"
      />
    </div>
  );
};

export default InstructionPanel;
