import React from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const PrepareOnePage: React.FC = () => {
  const handlePreparePage = () => {
    // Kullanıcının deploy ettiği contract ile etkileşime geçecek bir sayfa hazırlama işlemi
    console.log('Preparing one-page site for deployed contract');
  };

  return (
    <Card title="Prepare Your One-Page Site">
      <p className="mb-4">Create an interactive one-page site for your deployed dApp.</p>
      <Button onClick={handlePreparePage}>Prepare One-Page Site</Button>
    </Card>
  );
};

export default PrepareOnePage;
