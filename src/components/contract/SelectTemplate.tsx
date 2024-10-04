"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useProject from "@/hooks/useProject";
import { anchorTemplates, AnchorTemplate } from "@/templates/anchorTemplates";
import { projectCategories } from "@/data/templatesData"; 

interface SelectTemplateProps {
  setCurrentStep: (step: number) => void; 
}

const SelectTemplate: React.FC<SelectTemplateProps> = ({ setCurrentStep }) => {
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { projects, updateProjectContracts } = useProject(); 

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleSaveAndProceed = () => {
    if (selectedTemplate) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let templateCode: AnchorTemplate | any;

      if (selectedTemplate === "blank-anchor") {
        templateCode = anchorTemplates.blankAnchorJson;
      } else if (selectedTemplate === "spl-token") {
        templateCode = anchorTemplates.splTokenJson;
      } else {
        templateCode = {};
      }

      const newContract = {
        name: templateCode.name || "lib.rs",  
        code: templateCode,
      };

      const projectIdFromUrl = searchParams.get('id');
      if (projectIdFromUrl) {
        updateProjectContracts(projectIdFromUrl, [newContract]);
        console.log("Updated Contracts:", newContract);
        setCurrentStep(1); 
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold mb-6">Select a Template for your Solana dApp</h1>
   
    
      <div className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-lg">
        {projectCategories.map((category, index) => (
          <div key={index} className="mb-6 text-left">
            <h2 className="text-xl font-bold">{category.category}</h2>
            <small className="text-xl font-thin">{category.hint}</small>
            <div className="flex flex-wrap gap-4 mt-5">
              {category.projects.map((project, projectIndex) => (
                <div
                  key={project.id}
                  className={`relative cursor-pointer w-[200px] p-4 rounded-md text-white text-center font-medium ${
                    selectedTemplate === project.id
                      ? "bg-[#212f48]" 
                      : "bg-gradient-to-r from-purple-400 to-pink-500"
                  } ${project.isComingSoon ? "pointer-events-none opacity-60" : ""}`}
                  onClick={() => !project.isComingSoon && handleTemplateSelect(project.id)}
                >
                  {project.name}

                  {project.isComingSoon && (
                    <div className="absolute top-[-20px] right-[-10px] bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                      <small>Coming Soon</small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-8">
          <button
            className="bg-[#1a2434] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={handleSaveAndProceed}
            disabled={!selectedTemplate}
          >
            Save and Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;
