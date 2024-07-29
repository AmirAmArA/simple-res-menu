// src/components/CustomerTable/CustomerTableHeader.tsx

import React from 'react';

export const CustomerTableHeader: React.FC = () => {
  return (
    <thead>
      <tr>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Phone</th>
        <th className="px-4 py-2">Address</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
  );
};