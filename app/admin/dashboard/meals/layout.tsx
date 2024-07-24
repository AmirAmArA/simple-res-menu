import MealsTypes from "@/components/ui/admin/meals/MealsTypes";
import React from "react";

type Props = {};

function page({ children }: any) {
  return (
    <div>
      <h1>CRUD Meals</h1>
      <MealsTypes />
      {children}
    </div>
  );
}

export default page;
