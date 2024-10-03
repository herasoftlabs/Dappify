import React from "react";
import FieldRow from "./FieldRow";

interface Field {
  id: number;
  type: string;
  name: string;
  accountName: string;
  isMutable: boolean;
  isPublic: boolean;
  fields?: { name: string; type: string }[];
}

interface ContextPanelProps {
  contextFields: Field[];
  setContextFields: (fields: Field[]) => void;
  generateContextCode: () => void; 
}

const ContextPanel: React.FC<ContextPanelProps> = ({ contextFields, setContextFields, generateContextCode }) => {
  const addContextField = () => {
    setContextFields([
      ...contextFields,
      { id: Date.now(), type: "Account", name: "", accountName: "", isMutable: false, isPublic: true, fields: [] },
    ]);
    generateContextCode(); 
  };

  const handleFieldChange = (id: number, key: keyof Field, value: string | boolean | { name: string; type: string }[]) => {
    setContextFields(
      contextFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
    generateContextCode(); 
  };

  return (
    <div>
      <button onClick={addContextField} className="bg-blue text-white px-4 py-2 rounded">
        Add Account Field
      </button>
      <div className="mt-4">
        {contextFields.map((field) => (
          <FieldRow
            key={field.id}
            field={field}
            onDelete={() => {
              setContextFields(contextFields.filter((f) => f.id !== field.id));
              generateContextCode(); 
            }}
            onFieldChange={handleFieldChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ContextPanel;
