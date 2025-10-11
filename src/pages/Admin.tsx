import React from "react";
import { OrderTable } from "@/modules/OrderTable";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";

const Admin: React.FC = () => {
  return (
    <div className="admin-page">
      <BreadCrumb/>
      <OrderTable/>
    </div>
  )
}
export default Admin;
