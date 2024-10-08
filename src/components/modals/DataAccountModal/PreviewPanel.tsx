import React from "react";
import { Account } from "@/types/types";

interface PreviewPanelProps {
  accountCode: string; 
  account: Account; 
  onSave: (updatedAccount: Account) => void; 
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  accountCode,
  account,
  onSave
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave(account); 
    }
  };

  return (
    <div className="w-1/3 bg-gray-100 p-6 rounded-r-lg flex flex-col justify-between relative">
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold">Preview Account Code</h3>
            <div
              className={`bg-gray-200 px-4 py-5 rounded shadow-inner text-sm border border-gray-300 overflow-y-auto max-h-[300px] `}
            >
              <pre className="whitespace-pre-wrap text-[10px]">
                {accountCode}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4 sticky bottom-0 bg-gray-100 py-4">
        <button
          className="bg-[#da462c] text-white w-full px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Clear Fields
        </button>
        <button
          className="bg-[#212f48] text-white w-full px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save Account
        </button>
      </div>
    </div>
  );
};

export default PreviewPanel;
