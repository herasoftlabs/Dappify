import React, { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const PublishContract: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [serverIp, setServerIp] = useState<string>("");
  const [serverPassword, setServerPassword] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const templates = [
    {
      name: "Simple Token Sale Site",
      category: "Token",
      platform: "Next.js",
      image: "/images/sample-cover3.avif",
    },
    {
      name: "NFT Marketplace",
      category: "NFT",
      platform: "React.js",
      image: "/images/sample-cover2.avif",
    },
    {
      name: "One Page NFT Site",
      category: "NFT",
      platform: "Next.js",
      image: "/images/sample-cover.avif",
    },
  ];

  const handleDownloadFiles = () => {
    alert("Files are being prepared for download...");
    setTimeout(() => {
      alert("Files downloaded successfully!");
    }, 2000);
  };

  const handleSetupTemplate = async (template?: string) => {
    if (template) {
      setSelectedTemplate(template);
    } else if (!selectedTemplate) {
      alert("Please select a template to setup.");
      return;
    }

    setIsSettingUp(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Template "${selectedTemplate}" set up successfully on our server!`);
    } catch (error) {
      console.error("Setup error:", error);
      alert("Failed to set up the template.");
    } finally {
      setIsSettingUp(false);
    }
  };

  const handlePreviewTemplate = (template: string) => {
    setModalContent(`Preview for: ${template}`);
    setIsModalOpen(true);
  };

  const handleUploadToServer = async () => {
    if (!serverIp || !serverPassword) {
      alert("Please enter the server IP and password.");
      return;
    }

    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Files uploaded successfully to server at ${serverIp}!`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload the files to the server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card title="">
     
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Download Anchor Project Files</h2>
       
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleDownloadFiles}
            className="bg-primary text-right text-white px-4 py-2 rounded-md"
          >
            Download Files
          </button>
          <button
            onClick={handleDownloadFiles}
            className="bg-primary/50 text-right text-white px-4 py-2 rounded-md"
          >
            Download Wallet Integration Document
          </button>
          
        </div>

        <h2 className="text-xl font-semibold mb-4 mt-10">Upload Project Files to Your Host</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Server IP:</label>
            <input
              type="text"
              value={serverIp}
              onChange={(e) => setServerIp(e.target.value)}
              className="border p-2 w-full rounded bg-gray-100"
              placeholder="Enter server IP"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Server Password:</label>
            <input
              type="password"
              value={serverPassword}
              onChange={(e) => setServerPassword(e.target.value)}
              className="border p-2 w-full rounded bg-gray-100"
              placeholder="Enter server password"
            />
          </div>
          <button
            onClick={handleUploadToServer}
            disabled={isUploading}
            className="bg-blue text-white px-4 py-2 rounded-md"
          >
            {isUploading ? "Uploading..." : "Upload to Server"}
          </button>
        </div>
        
        
      </div>

     
      <div className="flex items-center justify-center my-8">
        <div className="border-t border-gray-300 flex-grow mr-4"></div>
        <span className="text-lg font-semibold text-gray-500">Or</span>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

     
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Choose a Template to Setup Frontend & Wallet Integration</h2>
        <div className="grid grid-cols-1 gap-8 mb-8">
          {templates.map((template) => (
            <div
              key={template.name}
              className={`relative border rounded-md shadow-md cursor-pointer p-4 bg-cover bg-center ${
                selectedTemplate === template.name ? "border-blue" : "border-gray-300"
              }`}
              style={{ backgroundImage: `url(${template.image})` }}
            >
              <div className="bg-white bg-opacity-90 p-4 rounded-md mb-4 w-1/3">
                <h3 className="text-xl font-bold">{template.name}</h3>
                <p className="text-sm font-semibold">Category: {template.category}</p>
                <p className="text-sm font-semibold">Platform: {template.platform}</p>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => handleSetupTemplate(template.name)}
                  className={`bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 ${
                    selectedTemplate === template.name ? "ring-2 ring-blue" : ""
                  }`}
                >
                  Setup
                </button>
                <button
                  onClick={() => handlePreviewTemplate(template.name)}
                  className="bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-600"
                >
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={() => handleSetupTemplate()} disabled={!selectedTemplate || isSettingUp}>
          {isSettingUp ? "Setting Up..." : "Setup Template"}
        </Button>
      </div>

     
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Template Preview">
        <div className="w-full h-96">
          <iframe
            srcDoc={`<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview: ${modalContent}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  h1 { color: #333; }
                  p { color: #666; }
                </style>
              </head>
              <body>
                <h1>Preview for ${modalContent}</h1>
                <p>This is a simple preview of the ${modalContent}. It demonstrates the potential look and feel of the template.</p>
              </body>
              </html>`}
            className="w-full h-full border rounded-md"
            title={`Preview for ${modalContent}`}
          />
        </div>
      </Modal>
    </Card>
  );
};

export default PublishContract;
