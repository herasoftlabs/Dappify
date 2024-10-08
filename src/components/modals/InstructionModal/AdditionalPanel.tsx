import React from "react";


interface AdditionalPanelProps {
  additionalData: {
    pdas?: string[];
    errors?: string[];
    events?: string[];
    access_control?: string;
  };
  onChange: (updatedAdditional: {
    pdas?: string[];
    errors?: string[];
    events?: string[];
    access_control?: string;
  }) => void;
}

const AdditionalPanel: React.FC<AdditionalPanelProps> = ({ additionalData, onChange }) => {
  const handleFieldChange = (key: keyof typeof additionalData, value: any) => {
    onChange({ ...additionalData, [key]: value });
  };

  return (
    <div>
      

      <div className="mb-4">
        <label className="block font-semibold">Access Control</label>
        <input
          type="text"
          value={additionalData.access_control || ""}
          onChange={(e) => handleFieldChange("access_control", e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Access Control ID"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">PDAs</label>
        <textarea
          value={additionalData.pdas?.join(", ") || ""}
          onChange={(e) => handleFieldChange("pdas", e.target.value.split(", "))}
          className="border p-2 rounded w-full"
          placeholder="Enter PDA IDs separated by comma"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Errors</label>
        <textarea
          value={additionalData.errors?.join(", ") || ""}
          onChange={(e) => handleFieldChange("errors", e.target.value.split(", "))}
          className="border p-2 rounded w-full"
          placeholder="Enter Error IDs separated by comma"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Events</label>
        <textarea
          value={additionalData.events?.join(", ") || ""}
          onChange={(e) => handleFieldChange("events", e.target.value.split(", "))}
          className="border p-2 rounded w-full"
          placeholder="Enter Event IDs separated by comma"
        />
      </div>
    </div>
  );
};

export default AdditionalPanel;
