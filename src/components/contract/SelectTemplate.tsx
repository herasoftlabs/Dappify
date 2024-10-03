"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Proje verileri
const projectCategories = [
  {
    category: "Basic",
    hint: "Basic projects are simple projects that are easy to understand and implement.",
    projects: [
      { id: "blank-anchor", name: "Blank Anchor Project", isComingSoon: false },
      { id: "cross-anchor", name: "Cross Platform Project", isComingSoon: true },
    ],
  },
  {
    category: "Advanced Packages",
    hint: "Advanced projects are complex projects that require a deep understanding of blockchain technology.",
    projects: [
      { id: "spl-token", name: "SPL Token Project", isComingSoon: false },
      { id: "nft-project", name: "NFT Project", isComingSoon: true },
      { id: "blink-project", name: "Blink Project", isComingSoon: true },
    ],
  },
  {
    category: "Sample Projects",
    hint: "Sample projects are projects that are created to demonstrate the capabilities of the platform.",
    projects: [
      { id: "banking-dapp", name: "Banking dApp Template", isComingSoon: true },
      { id: "staking-dapp", name: "Staking dApp Template", isComingSoon: true },
      { id: "dao-dapp", name: "Basic DAO Template", isComingSoon: true },
    ],
  },
];

const SelectTemplate = () => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  
  

  
  const gradients = [
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold mb-6">Select a Template for your Solana dApp</h1>
   
      {/* Card yapısı */}
      <div className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-lg">
        {projectCategories.map((category, index) => (
          <div key={index} className="mb-6 text-left">
            {/* Kategori başlığı */}
            <h2 className="text-xl font-bold">{category.category}</h2>
            <small className="text-xl font-thin">{category.hint}</small>
            <div className="flex flex-wrap gap-4 mt-5">
              {category.projects.map((project, projectIndex) => (
                <div
                  key={project.id}
                  className={`relative cursor-pointer w-[200px] p-4 rounded-md text-white text-center font-medium ${
                    selectedTemplate === project.id
                      ? "bg-[#212f48]" 
                      : gradients[projectIndex % gradients.length]
                  } ${project.isComingSoon ? "pointer-events-none opacity-60" : ""}`}
                  onClick={() => !project.isComingSoon && setSelectedTemplate(project.id)} 
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

        
        
      </div>
    </div>
  );
};

export default SelectTemplate;
