import React from "react";

interface Field {
  id: number;
  type: string;
  name: string;
  accountName: string;
  isMutable: boolean;
  isPublic: boolean;
  fields?: { name: string; type: string }[];
}

interface Account {
  name: string;
  type: {
    kind: string;
    fields: {
      name: string;
      type: string;
    }[];
  };
}

interface FieldRowProps {
  field: Field;
  accounts?: Account[]; 
  onDelete: () => void;
  onFieldChange: (id: number, key: keyof Field, value: string | boolean | { name: string; type: string }[]) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ field, accounts = [], onDelete, onFieldChange }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAccountName = e.target.value;
    onFieldChange(field.id, "accountName", selectedAccountName);


    const selectedAccount = accounts.find((account) => account.name === selectedAccountName);
    if (selectedAccount) {
      onFieldChange(field.id, "fields", selectedAccount.type.fields);
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
        {accounts && accounts.map((account) => (
          <option key={account.name} value={account.name}>
            {account.name}
          </option>
        ))}
      </select>
      <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  );
};

export default FieldRow;
