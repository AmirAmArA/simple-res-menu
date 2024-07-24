import SubMealsComponent from "@/components/ui/admin/meals/SubMealsComponent";
import React from "react";

type Props = {};

type SubMeal = {
  id: string;
  name: string;
  price: string;
};

async function fetchSubMeals(id: string): Promise<SubMeal[]> {
  const response = await fetch("http://localhost:3000/api/meals/getSubMeals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meal types");
  }
  const data = await response.json();

  return data;
}

const Page: React.FC<{ params: { slug: string } }> = async ({ params }) => {
  const slug = params.slug;
  let subMeals: SubMeal[] = [];
  let error: string | null = null;

  try {
    subMeals = await fetchSubMeals(slug);
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <h1>Sub-Meals for {slug}</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <SubMealsComponent initialSubMeals={subMeals} smID={slug} />
      )}
    </div>
    // <div>
    //   <h1>Sub-Meals for {slug}</h1>
    //   <div>
    //     {subMeals.length > 0 ? (
    //       <div className="overflow-x-auto w-[50%]">
    //         <table className="table">
    //           {/* head */}
    //           <thead>
    //             <tr>
    //               <th></th>
    //               <th>Name</th>
    //               <th>Price</th>
    //               <th>Actions</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {subMeals.map((subMeal, i) => (
    //               <tr key={subMeal.id}>
    //                 <th>{i}</th>
    //                 <td>{subMeal.name}</td>
    //                 <td>{subMeal.price}</td>
    //                 <td>
    //                   <div className="flex space-x-2">
    //                     <button aria-label="Edit" title="Edit">
    //                       ✏️
    //                     </button>
    //                     <button aria-label="Delete" title="Delete">
    //                       🗑️
    //                     </button>
    //                     <button aria-label="Info" title="Info">
    //                       ℹ️
    //                     </button>
    //                   </div>{" "}
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     ) : (
    //       <p>No sub-meals found for this meal.</p>
    //     )}
    //   </div>
    //   <div></div>
    // </div>
  );
};

export default Page;
