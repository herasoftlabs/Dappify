import React, { useState } from "react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Field {
  id: number;
  type: string;
  subtype: string;
  name: string;
  payer: string;
  space: string;
  extraParam: string;
  seeds: string; 
  isMutable: boolean;
  isPublic: boolean;
}

const variableTypes = [
  { label: "Pubkey", value: "Pubkey", subtypes: [] },
  { label: "String", value: "String", subtypes: [] },
  { label: "Boolean", value: "bool", subtypes: [] },
  {
    label: "Unsigned Integer",
    value: "u",
    subtypes: ["u8", "u16", "u32", "u64", "u128"],
  },
  {
    label: "Signed Integer",
    value: "i",
    subtypes: ["i8", "i16", "i32", "i64", "i128"],
  },
  

  {
    label: "Option",
    value: "Option",
    subtypes: ["None", "Pubkey", "String", "u8", "u16", "u32", "u64", "i8", "i16", "i32", "i64", "bool"],
  },
  {
    label: "Vector",
    value: "Vec",
    subtypes: ["Pubkey", "String", "u8", "u16", "u32", "u64", "i8", "i16", "i32", "i64", "bool"],
  },
  
];

const deriveOptions = ["Debug", "Clone", "Default", "PartialEq"];

const StructModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [structName, setStructName] = useState<string>("");
  const [lifetimeParam, setLifetimeParam] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [nextFieldId, setNextFieldId] = useState<number>(1);
  const [deriveSelections, setDeriveSelections] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [isPDA, setIsPDA] = useState<boolean>(false);

 
  const addField = (type: string) => {
    const selectedVariable = variableTypes.find((v) => v.value === type);
    const defaultSubtype = selectedVariable?.subtypes[0] || type;

    setFields((prevFields) => [
      ...prevFields,
      {
        id: nextFieldId,
        type,
        subtype: defaultSubtype,
        name: type === "Program" ? "system_program" : "",
        payer: "signer",
        space: "8 + 1 + 8 + 8",
        seeds: "user", 
        extraParam: "",
        isMutable: false,
        isPublic: true,
      },
    ]);
    setNextFieldId((prevId) => prevId + 1);
  };


  const handleFieldChange = (
    id: number,
    key: keyof Field,
    value: string | boolean
  ) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

 
  const removeField = (id: number) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };


  const handleDeriveSelection = (derive: string) => {
    setDeriveSelections((prevSelections) =>
      prevSelections.includes(derive)
        ? prevSelections.filter((item) => item !== derive)
        : [...prevSelections, derive]
    );
  };


  const clearFields = () => {
    setFields([]);
    setNextFieldId(1);
  };

  
  const generateAnchorCode = () => {
    const fieldDeclarations = fields
      .map((field) => {
        let attributeString = "";

        if (field.isMutable) {
          attributeString += `#[account(mut)]\n    `;
        }

        if (field.type === "AccountMacro") {
          const seedsValue = field.seeds ? `[b"${field.seeds}", ${field.seeds}.key().as_ref()], bump` : "";
          const payerLine = field.payer ? `\n        payer = ${field.payer.startsWith("0x") ? `"${field.payer}"` : field.payer},` : "";
          const spaceLine = field.space ? `\n        space = ${field.space},` : "";

          attributeString += `#[account(\n        init,${isPDA && field.seeds ? `\n        seeds = ${seedsValue},` : ""}${payerLine}${spaceLine}\n    )]\n    `;
        }

        let fieldType = field.type;

        if (field.type === "Option") {
          fieldType = `Option<${field.subtype}>`;
        } else if (field.type === "Vec") {
          fieldType = `Vec<${field.subtype}>`;
        
        } else {
          fieldType = field.subtype;
        }

        return field.type === "AccountMacro"
          ? `${attributeString}`
          : `${attributeString}${field.isPublic ? "pub " : ""}${field.name}: ${fieldType},`;
      })
      .join("\n    ");

    const derives = deriveSelections.length
      ? `#[derive(${deriveSelections.join(", ")})]`
      : "";

    const pdaAttribute = isPDA ? "#[derive(Accounts)]" : "#[account]";
    const lifetime = lifetimeParam ? `<'${lifetimeParam}>` : "";
    const visibilityCode = visibility === "public" ? "pub" : "";

    return `
${derives}
${pdaAttribute}
${visibilityCode} struct ${structName}${lifetime} {
    ${fieldDeclarations}
}
    `;
  };

  if (!isOpen) return null;


  const renderTabContent = () => {
    switch (activeTab) {
      case "settings":
        return (
          <div>
           
            <div className="my-5">
              <label className="block mb-1 font-medium">Struct Name:</label>
              <input
                type="text"
                value={structName}
                onChange={(e) => setStructName(e.target.value)}
                placeholder="Enter struct name"
                className="border p-2 w-full rounded bg-gray-100"
              />
              <small className="text-gray-500">The name of the struct you are creating.</small>
            </div>

            <div className="my-5 flex gap-5">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Lifetime Parameter (Optional):</label>
                <input
                  type="text"
                  value={lifetimeParam}
                  onChange={(e) => setLifetimeParam(e.target.value.replace(/'/g, ""))}
                  placeholder="e.g., info"
                  className="border p-2 w-full rounded bg-gray-100"
                />
                <small className="text-gray-500">
                  Add a lifetime parameter if needed (e.g., info).
                </small>
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Struct Visibility:</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as "public" | "private")}
                  className="border p-2 w-full rounded bg-gray-100"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
                <small className="text-gray-500">Set the visibility of the struct.</small>
              </div>
            </div>

            <div className="my-5">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isPDA}
                  onChange={(e) => setIsPDA(e.target.checked)}
                />
                <span>This Struct is a PDA?</span>
              </label>
              <small className="text-gray-500">
                If you mark this as a Public Derivable Account (PDA), this struct will be automatically derived by the program as a PDA.
              </small>
            </div>

            <div className="my-5">
              <label className="block mb-1 font-medium">Select Derives:</label>
              <div className="flex gap-2 flex-wrap">
                {deriveOptions.map((derive) => (
                  <button
                    key={derive}
                    onClick={() => handleDeriveSelection(derive)}
                    className={`py-2 px-4 ${
                      deriveSelections.includes(derive)
                        ? "bg-[#212f48] text-white"
                        : "bg-gray-300 text-gray-800"
                    } rounded hover:bg-blue-500`}
                  >
                    {derive}
                  </button>
                ))}
              </div>
              <small className="text-gray-500">
                Select the traits to derive for this struct (e.g., Debug, Clone).
              </small>
            </div>
          </div>
        );

      case "fields":
        return (
          <div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Add Field:</label>
              <div className="grid grid-cols-5 gap-2 p-2 rounded mb-2">
                {variableTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => addField(type.value)}
                    className="flex-grow py-2 px-3 bg-[#212f48] text-white text-[13px] rounded hover:bg-blue transition-all"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <small className="text-gray-500">Add fields to your struct by selecting the desired type.</small>
            </div>

         
            <div className="max-h-[250px] overflow-y-auto pb-1 pr-1">
              {fields.map((field) => (
                <div key={field.id} className="mb-4 border-b pb-2">
                  <div className="flex items-center gap-4">
                   
                    {variableTypes.find((v) => v.value === field.type)?.subtypes.length ? (
                      <select
                        value={field.subtype}
                        onChange={(e) =>
                          handleFieldChange(field.id, "subtype", e.target.value)
                        }
                        className="mr-4 bg-gray-100 p-2 rounded"
                      >
                        {variableTypes
                          .find((v) => v.value === field.type)
                          ?.subtypes.map((subtype) => (
                            <option key={subtype} value={subtype}>
                              {subtype}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <span className="mr-4">{field.type}</span>
                    )}

                  
                    {field.type !== "AccountMacro" && (
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) =>
                          handleFieldChange(field.id, "name", e.target.value)
                        }
                        placeholder="Enter element name"
                        className="border p-2 w-full rounded bg-gray-100"
                      />
                    )}

                  
                    {field.type === "Account" && (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={field.extraParam}
                          onChange={(e) =>
                            handleFieldChange(field.id, "extraParam", e.target.value)
                          }
                          placeholder="Account"
                          className="border p-2 w-1/2 rounded bg-gray-100"
                        />
                        <label className="flex items-center gap-2 ml-2">
                          <input
                            type="checkbox"
                            checked={field.isMutable}
                            onChange={(e) =>
                              handleFieldChange(field.id, "isMutable", e.target.checked)
                            }
                          />
                          <span>Mutable</span>
                        </label>
                      </div>
                    )}

                
                    {field.type === "Signer" && (
                      <label className="flex items-center gap-2 ml-2">
                        <input
                          type="checkbox"
                          checked={field.isMutable}
                          onChange={(e) =>
                            handleFieldChange(field.id, "isMutable", e.target.checked)
                          }
                        />
                        <span>Mutable</span>
                      </label>
                    )}

                 
                    {["String", "bool", "u", "i", "Pubkey"].includes(field.type) && (
                      <label className="flex items-center gap-2 ml-4">
                        <input
                          type="checkbox"
                          checked={field.isPublic}
                          onChange={(e) =>
                            handleFieldChange(field.id, "isPublic", e.target.checked)
                          }
                        />
                        <span>Public</span>
                      </label>
                    )}

                
                    {field.type === "AccountMacro" && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={field.payer}
                          onChange={(e) =>
                            handleFieldChange(field.id, "payer", e.target.value)
                          }
                          placeholder="payer"
                          className="border p-2 w-[100px] rounded bg-gray-100"
                        />

                        {isPDA && (
                          <input
                            type="text"
                            value={field.seeds}
                            onChange={(e) =>
                              handleFieldChange(field.id, "seeds", e.target.value)
                            }
                            placeholder="e.g., user, wallet"
                            className="border p-2 w-[180px] rounded bg-gray-100"
                          />
                        )}

                        <input
                          type="text"
                          value={field.space}
                          onChange={(e) =>
                            handleFieldChange(field.id, "space", e.target.value)
                          }
                          placeholder="space"
                          className="border p-2 w-[100px] rounded bg-gray-100"
                        />
                      </div>
                    )}

                   
                    <button
                      onClick={() => removeField(field.id)}
                      className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg flex max-w-5xl w-full min-h-[70vh] overflow-hidden">
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create Struct</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
              &#10005;
            </button>
          </div>

         
          <div className="mb-4 border-b">
            {["settings", "fields"].map((tab) => (
              <button
                key={tab}
                className={`ml-4 px-4 py-2 ${
                  activeTab === tab ? "border-b-4 border-blue-500 font-semibold" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

         
          {renderTabContent()}
        </div>

       
        <div className="w-1/3 bg-gray-100 p-6 rounded-r-lg flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2">Preview Struct Code</h3>

         
          <div className="flex-1 overflow-y-auto max-h-[500px]">
            <div className="bg-gray-200 px-4 py-0 rounded shadow-inner text-sm border border-gray-300 h-auto">
              <pre className="whitespace-pre-wrap text-[10px]">{generateAnchorCode()}</pre>
            </div>
          </div>

        
          <div className="mt-4 flex justify-between gap-5">
            <button
              className="bg-[#da462c] text-white w-full px-4 py-2 rounded hover:bg-blue-700"
              onClick={clearFields}
            >
              Clear Fields
            </button>
            <button
              className="bg-[#212f48] text-white w-full px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                console.log(generateAnchorCode());
                onClose();
              }}
            >
              Save Struct
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructModal;
