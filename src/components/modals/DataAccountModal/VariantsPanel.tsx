import React from 'react';
import { Variant } from '@/types/types';

interface VariantsPanelProps {
  accountId: string; 
  variants: Variant[];
  onChange: (updatedVariants: Variant[]) => void;
}

const VariantsPanel: React.FC<VariantsPanelProps> = ({ accountId, variants, onChange }) => {
  const handleVariantChange = (index: number, updatedVariant: Variant) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = updatedVariant;
    onChange(updatedVariants);
  };

  return (
    <div>
      <h3>Account ID: {accountId}</h3>  
      {variants.map((variant, index) => (
        <div key={index}>
          <input
            type="text"
            value={variant.name}
            onChange={(e) => handleVariantChange(index, { ...variant, name: e.target.value })}
          />
         
        </div>
      ))}
    </div>
  );
};

export default VariantsPanel;
