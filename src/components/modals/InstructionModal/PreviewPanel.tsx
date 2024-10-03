import React from "react";

interface PreviewPanelProps {
  contextCode: string;
  instructionCode: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ contextCode, instructionCode }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-6 rounded-r-lg flex flex-col justify-between relative">
      <div className="flex flex-col gap-4 flex-grow">
        {/* Codes */}
        <div className="flex flex-col gap-4">

          {/* Context */}
          <div>
            <h3 className="text-lg font-semibold">Preview Context Code</h3>
            <div className={`bg-gray-200 px-4 py-0 rounded shadow-inner text-sm border border-gray-300 overflow-y-auto min-h-[7rem] max-h-[300px]`}>
              <pre className="whitespace-pre-wrap text-[10px] ">{contextCode}</pre>
            </div>
          </div>

          {/* Instruction */}
          <div>
            <h3 className="text-lg font-semibold">Preview Instruction Code</h3>
            <div className={`bg-gray-200 px-4 py-0 rounded shadow-inner text-sm border border-gray-300 overflow-y-auto min-h-[7rem] max-h-[300px]`}>
              <pre className="whitespace-pre-wrap text-[10px]">{instructionCode}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Sabit Alt Kısım */}
      <div className="flex gap-2 mt-4 sticky bottom-0 bg-gray-100 py-4">
      <button
              className="bg-[#da462c] text-white w-full px-4 py-2 rounded hover:bg-blue-700"
              onClick={()=> {

              }}
            >
              Clear Fields
            </button>
            <button
              className="bg-[#212f48] text-white w-full px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                
              }}
            >
              Save Struct
            </button>
      </div>
    </div>
  );
};

export default PreviewPanel;
