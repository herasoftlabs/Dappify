import React, { useState, useEffect } from "react";

interface Field {
  id: number;
  type: string;
  name: string;
  accountName: string;
  isMutable: boolean;
  isPublic: boolean;
  fields?: { name: string; type: string }[];
}

interface FieldRowProps {
  field: Field;
  onDelete: () => void;
  onFieldChange: (id: number, key: keyof Field, value: string | boolean | { name: string; type: string }[]) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ field, onDelete, onFieldChange }) => {
  const [fakeData] = useState({
    structName: "FakeData",
    fields: [
      { name: "is_open_to_vote", type: "bool" },
      { name: "gm", type: "u64" },
      { name: "gn", type: "u64" },
    ],
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAccountName = e.target.value;
    onFieldChange(field.id, "accountName", selectedAccountName);

    // Eğer kullanıcı FakeData'yı seçerse fields'ı ekleyelim
    if (selectedAccountName === fakeData.structName) {
      onFieldChange(field.id, "fields", fakeData.fields);
    } else {
      onFieldChange(field.id, "fields", []);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-2 border-b pb-2">
      <input
        type="text"
        value={field.name}
        placeholder="Variable Name"
        className="border p-2 rounded"
        onChange={(e) => onFieldChange(field.id, "name", e.target.value)}
      />
      <select
        value={field.accountName || ""}
        className="border p-2 rounded"
        onChange={handleSelectChange}
      >
        <option value="">Select Struct</option>
        <option value={fakeData.structName}>{fakeData.structName}</option>
      </select>
      <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  );
};

export default FieldRow;
