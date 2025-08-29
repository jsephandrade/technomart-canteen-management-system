import React from 'react';
import { POSProvider } from '@/components/pos/POSProvider';
import POSTabs from '@/components/pos/POSTabs';

const POS = () => {
  return (
    <POSProvider>
      <div className="space-y-4">
        <POSTabs />
      </div>
    </POSProvider>
  );
};

export default POS;
