import React from "react";
import FieldRow from "./FieldRow";
import { ContextAccount, Account } from "@/types/types";

interface ContextPanelProps {
  context: ContextAccount[];
  accounts: Account[]; 
  onChange: (updatedContext: ContextAccount[]) => void;
  
}

const ContextPanel: React.FC<ContextPanelProps> = ({ context, accounts, onChange }) => {
  const handleFieldChange = (index: number, key: keyof ContextAccount, value: any) => {
    const updatedContext = [...context];
    updatedContext[index] = { ...updatedContext[index], [key]: value };
    onChange(updatedContext);
  };

  const handleAddField = () => {
    const newField: ContextAccount = {
      name: "",
      type: "",
      is_mut: false,
      is_signer: false,
      isLifeTime: false,
      data: "",
    };
    onChange([...context, newField]);
  };

  const handleAddConstraint = (index: number, constraintKey: keyof ContextAccount, value: string) => {
    const updatedContext = [...context];
    const currentConstraints = updatedContext[index].constraints || {};
    updatedContext[index].constraints = { ...currentConstraints, [value]: "" };
    onChange(updatedContext);
  };

  return (
    <div>
      <button
        onClick={handleAddField}
        className="bg-primary text-white px-4 py-2 rounded my-1"
      >
        Add Context
      </button>

      {context.map((field, index) => (
        <FieldRow
          key={index}
          field={field}
          accounts={accounts}
          onDelete={() => {
            const updatedContext = context.filter((_, i) => i !== index);
            onChange(updatedContext);
          }}
          onFieldChange={(key, value) => handleFieldChange(index, key, value)}
          onAddConstraint={(constraintKey, value) => handleAddConstraint(index, constraintKey, value)} 
        />
      ))}
    </div>
  );
};

export default ContextPanel;
