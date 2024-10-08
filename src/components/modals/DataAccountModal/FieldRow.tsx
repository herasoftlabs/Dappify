import React from 'react';
import { AccountField } from '@/types/types';

interface FieldRowProps {
  field: AccountField;
  onFieldChange: (key: keyof AccountField, value: any) => void;
  onDelete: () => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ field, onFieldChange, onDelete }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange('name', e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFieldChange('type', e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange('description', e.target.value);
  };

  return (
    <div className="my-2 p-2 border rounded flex items-center justify-between gap-4">
      {/* Field Name */}
      <input
        type="text"
        placeholder="Field Name"
        value={field.name}
        onChange={handleNameChange}
        className="border p-2 rounded w-1/3"
      />

      {/* Field Type Dropdown */}
      <select
        value={field.type}
        onChange={handleTypeChange}
        className="border p-2 rounded w-1/3"
      >
        <option value="" disabled>Select Field Type</option>
        <option value="u8">u8</option>
        <option value="u16">u16</option>
        <option value="u32">u32</option>
        <option value="u64">u64</option>
        <option value="i8">i8</option>
        <option value="i16">i16</option>
        <option value="i32">i32</option>
        <option value="i64">i64</option>
        <option value="Pubkey">Pubkey</option>
        <option value="bool">bool</option>
        <option value="String">String</option>
      </select>

      {/* Field Description */}
      <input
        type="text"
        placeholder="Field Description"
        value={field.description}
        onChange={handleDescriptionChange}
        className="border p-2 rounded w-1/3"
      />

      {/* Delete Button */}
      <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete
      </button>
    </div>
  );
};

export default FieldRow;
