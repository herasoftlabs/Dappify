import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["settings", "fields"];

  return (
    <div className="mb-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`ml-4 px-4 py-2 ${
            activeTab === tab ? "border-b-4 border-blue font-semibold" : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
