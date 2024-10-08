import React from 'react';
import { AccountField } from '@/types/types';

interface FieldsPanelProps {
  fields: AccountField[];
  onChange: (updatedFields: AccountField[]) => void;
}

const FieldsPanel: React.FC<FieldsPanelProps> = ({ fields, onChange }) => {
  const handleFieldChange = (index: number, updatedField: AccountField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    onChange(updatedFields);
  };

  const handleAddField = () => {
    const newField: AccountField = {
      name: '',
      type: '',
      description: ''
    };
    onChange([...fields, newField]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    onChange(updatedFields);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.name}
            onChange={(e) => handleFieldChange(index, { ...field, name: e.target.value })}
            placeholder="Field Name"
          />
          <input
            type="text"
            value={field.type}
            onChange={(e) => handleFieldChange(index, { ...field, type: e.target.value })}
            placeholder="Field Type"
          />
          <input
            type="text"
            value={field.description || ''}
            onChange={(e) => handleFieldChange(index, { ...field, description: e.target.value })}
            placeholder="Field Description"
          />
          <button onClick={() => handleRemoveField(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddField}>Add New Field</button>
    </div>
  );
};

export default FieldsPanel;
