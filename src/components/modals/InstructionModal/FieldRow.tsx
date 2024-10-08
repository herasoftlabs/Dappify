import React, { useState, useEffect } from "react";
import { ContextAccount, Account } from "@/types/types";

interface FieldRowProps {
  field: ContextAccount;
  accounts: Account[];
  onDelete: () => void;
  onFieldChange: (key: keyof ContextAccount, value: any) => void;
  onAddConstraint: (key: keyof ContextAccount, value: string) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({
  field,
  accounts,
  onDelete,
  onFieldChange,
  onAddConstraint,
}) => {
  const [isAddingInit, setIsAddingInit] = useState(false);
  const [isAddingPayer, setIsAddingPayer] = useState(false);
  const [isAddingSpace, setIsAddingSpace] = useState(false);
  const [showConstraints, setShowConstraints] = useState(false);

  useEffect(() => {
    if (field.constraints && Object.keys(field.constraints).length > 0) {
      setShowConstraints(true);
    } else {
      setShowConstraints(false);
    }
  }, [field.constraints]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("name", e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFieldChange("type", e.target.value);
  };

  const handleDataAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFieldChange("data", e.target.value);
  };

  const handleIsMutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("is_mut", e.target.checked);
  };

  const handleIsSignerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("is_signer", e.target.checked);
  };

  const handleIsLifetimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("isLifeTime", e.target.checked);
  };

  const handleConstraintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onFieldChange("constraints", { ...field.constraints, [e.target.name]: newValue });
  };

  const toggleConstraints = () => {
    if (showConstraints) {
      onFieldChange("constraints", {}); 
    }
    setShowConstraints(!showConstraints);
  };

  const handleAddConstraintKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, constraintKey: string, setIsAdding: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (e.key === "Enter") {
      onAddConstraint("constraints", constraintKey);
      setIsAdding(false);
    }
  };

  return (
    <div className="my-4">
      <hr />
     
      <div className="flex flex-wrap items-center gap-4 mb-2 mt-5">
        <input
          type="text"
          value={field.name}
          placeholder="Account Name"
          className="border p-2 rounded max-w-[150px]"
          onChange={handleNameChange}
        />

        <div className="flex flex-col gap-2">
          <select
            value={field.type}
            className="border p-2 rounded"
            onChange={handleTypeChange}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Account">Account</option>
            <option value="Signer">Signer</option>
            <option value="Program">Program</option>
          </select>

          {field.type === "Account" && (
            <select
              value={field.data || ""}
              className="border p-2 rounded"
              onChange={handleDataAccountChange}
            >
              <option value="" disabled>
                Select Data Account
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col gap-1 items-center">
          <label className="text-sm">Mut</label>
          <input
            type="checkbox"
            checked={field.is_mut}
            onChange={handleIsMutChange}
          />
        </div>

        <div className="flex flex-col gap-1 items-center">
          <label className="text-sm">Signer</label>
          <input
            type="checkbox"
            checked={field.is_signer}
            onChange={handleIsSignerChange}
          />
        </div>

        <div className="flex flex-col gap-1 items-center">
          <label className="text-sm">Lifetime</label>
          <input
            type="checkbox"
            checked={field.isLifeTime || false}
            onChange={handleIsLifetimeChange}
          />
        </div>

        <div className="flex flex-col gap-1 items-center">
          <label className="text-sm">Constraint</label>
          <input
            type="checkbox"
            checked={showConstraints}
            onChange={toggleConstraints}
          />
        </div>
      </div>

      {showConstraints && (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mt-2">
          <div className="flex flex-wrap items-center gap-4">
            

            {field.constraints?.payer ? (
              <label className="flex flex-col items-start">
                <span className="text-xs">Payer</span>
                <input
                  type="text"
                  name="payer"
                  value={field.constraints.payer}
                  placeholder="Payer (eg. user)"
                  onChange={handleConstraintChange}
                  className="border p-2 rounded flex-grow"
                />
              </label>
            ) : isAddingPayer ? (
              <input
                type="text"
                name="payer"
                placeholder="Payer (eg. user)"
                onKeyDown={(e) => handleAddConstraintKeyDown(e, "payer", setIsAddingPayer)}
                className="border p-2 rounded flex-grow"
              />
            ) : (
              <button
                onClick={() => setIsAddingPayer(true)}
                className="bg-transparent text-[parent] px-3 py-1 rounded"
              >
                Add Payer
              </button>
            )}

            {field.constraints?.space ? (
              <label className="flex flex-col items-start">
                <span className="text-xs">Space</span>
                <input
                  type="text"
                  name="space"
                  value={field.constraints.space}
                  placeholder="e.g., 8 + 32"
                  onChange={handleConstraintChange}
                  className="border p-2 rounded flex-grow"
                />
              </label>
            ) : isAddingSpace ? (
              <input
                type="text"
                name="space"
                placeholder="e.g., 8 + 32"
                onKeyDown={(e) => handleAddConstraintKeyDown(e, "space", setIsAddingSpace)}
                className="border p-2 rounded flex-grow"
              />
            ) : (
              <button
                onClick={() => setIsAddingSpace(true)}
                className="bg-transparent text-[parent] px-3 py-1 rounded"
              >
                Add Space
              </button>
            )}
          </div>
        </div>
      )}

      
      <div className="mt-2">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FieldRow;
