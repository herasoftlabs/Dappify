import React from 'react';
import { AccountField } from '@/types/types';

interface VariantRowProps {
  variant: AccountField;
  onVariantChange: (key: keyof AccountField, value: any) => void;
  onDelete: () => void;
}

const VariantRow: React.FC<VariantRowProps> = ({ variant, onVariantChange, onDelete }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVariantChange('name', e.target.value);
  };

  const handleFieldTypeChange = (index: number, fieldType: string) => {
    const updatedFields = variant.fields ? [...variant.fields] : [];
    updatedFields[index] = { ...updatedFields[index], type: fieldType };
    onVariantChange('fields', updatedFields);
  };

  const handleFieldNameChange = (index: number, fieldName: string) => {
    const updatedFields = variant.fields ? [...variant.fields] : [];
    updatedFields[index] = { ...updatedFields[index], name: fieldName };
    onVariantChange('fields', updatedFields);
  };

  const handleAddField = () => {
    const updatedFields = variant.fields ? [...variant.fields] : [];
    updatedFields.push({ name: '', type: '' });
    onVariantChange('fields', updatedFields);
  };

  return (
    <div className="my-2 p-2 border rounded flex flex-col gap-2">
      {/* Variant Name */}
      <input
        type="text"
        placeholder="Variant Name"
        value={variant.name}
        onChange={handleNameChange}
        className="border p-2 rounded"
      />

      {/* Fields for this Variant */}
      {variant.fields && variant.fields.length > 0 && (
        <div>
          <h4 className="font-bold">Variants</h4>
          {variant.fields.map((field, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) => handleFieldNameChange(idx, e.target.value)}
                className="border p-2 rounded w-1/2"
              />
              <select
                value={field.type}
                onChange={(e) => handleFieldTypeChange(idx, e.target.value)}
                className="border p-2 rounded w-1/2"
              >
                <option value="" disabled>
                  Select Variant Type
                </option>
                <option value="u8">u8</option>
                <option value="u16">u16</option>
                <option value="u32">u32</option>
                <option value="u64">u64</option>
                <option value="i8">i8</option>
                <option value="i16">i16</option>
                <option value="i32">i32</option>
                <option value="i64">i64</option>
                <option value="String">String</option>
                <option value="Pubkey">Pubkey</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Add Field Button */}
      <button onClick={handleAddField} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Field
      </button>

      {/* Delete Button */}
      <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete Variant
      </button>
    </div>
  );
};

export default VariantRow;
