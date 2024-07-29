import React from "react";
import { CustomerTableHeader } from "./CustomerTableHeader";
import { CustomerTableRow } from "./CustomerTableRow";
import { Customer } from "@/types";
import AddCustomerModal from "../AddCustomerModal";

type CustomerTableProps = {
  customers: Customer[];
};

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  if (customers.length > 0)
    return (
      <div className="overflow-x-auto">
        <table className="table">
          <CustomerTableHeader />
          <tbody>
            {customers.map((customer) => (
              <CustomerTableRow
                key={customer.id}
                customer={customer}
                customers={customers}
              />
            ))}
          </tbody>
        </table>
        <AddCustomerModal customers={customers} />
      </div>
    );

  return <p>No Customers Found</p>;
};

export default CustomerTable;
