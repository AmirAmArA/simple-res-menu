import { Customer } from "@/types";
import React from "react";

type CustomerTableActionsProps = {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
};

export const CustomerTableActions: React.FC<CustomerTableActionsProps> = ({
  customer,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex space-x-2">
      <button onClick={() => onEdit(customer)}>✏️</button>
      <button onClick={() => onDelete(customer.id)} className="">
        🗑️
      </button>
    </div>
  );
};
