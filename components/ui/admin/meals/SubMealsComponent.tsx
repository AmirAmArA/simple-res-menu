"use client";

import React, { useState } from "react";
import DeleteConfirmationModal from "../../../DeleteConfirmationModal";
import AddMealModal from "@/components/ui/admin/meals/AddMealModal";

type SubMeal = {
  id: string;
  name: string;
  price: string;
};

type ClientSubMealsComponentProps = {
  initialSubMeals: SubMeal[];
  //Parent Sub Meal ID
  smID: string;
};

const ClientSubMealsComponent: React.FC<ClientSubMealsComponentProps> = ({
  initialSubMeals,
  smID,
}) => {
  const [subMeals, setSubMeals] = useState<SubMeal[]>(initialSubMeals);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<string | null>(null);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [editedSubMeals, setEditedSubMeals] = useState<{
    [key: string]: SubMeal;
  }>({});

  const handleEdit = (subMeal: SubMeal) => {
    setEditingMealId(subMeal.id);
    setEditedSubMeals((prev) => ({
      ...prev,
      [subMeal.id]: subMeal,
    }));
  };

  const showAddMealModal = () => {
    setShowAddModal(true);
  };

  const handleAddMeal = async (meal: {
    smID: string;
    name: string;
    price: string;
  }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/meals/addSubMeal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meal),
          cache: "no-cache",
        }
      );

      const newMeal = await response.json();
      console.log("====================================");
      console.log("new meal added: ", newMeal);
      console.log("====================================");
      setSubMeals([...subMeals, newMeal]);
    } catch (error) {
      console.error(error as Error);
    } finally {
      setShowAddModal(false);
    }
  };

  const closeAddMealModal = () => {
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setMealToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (mealToDelete) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/meals/deleteSubMeal",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ smID, mealToDelete }),
            cache: "no-cache",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete sub-meal");
        }

        setSubMeals(subMeals.filter((subMeal) => subMeal.id !== mealToDelete));
      } catch (err) {
        console.error("Error deleting sub-meal:", err);
      } finally {
        setShowDeleteModal(false);
        setMealToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMealToDelete(null);
  };

  const handleSave = async (
    subMealId: string,
    name: string,
    price: string
  ) => {
    try {
      const response = await fetch(`/api/meals/editSubMeal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smID,
          mealToEdit: subMealId,
          name,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update sub-meal");
      }

      setSubMeals((prev) =>
        prev.map((subMeal) =>
          subMeal.id === subMealId ? { ...subMeal, name, price } : subMeal
        )
      );
    } catch (err) {
      console.error("Error updating sub-meal:", err);
    } finally {
      setEditingMealId(null);
    }
  };

  const handleChange = (id: string, field: keyof SubMeal, value: string) => {
    setEditedSubMeals((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-[50%]">
      {subMeals.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="table ">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subMeals.map((subMeal, i) => (
                <tr key={subMeal.id}>
                  <td className="">{i + 1}</td>
                  <td className="">
                    {editingMealId === subMeal.id ? (
                      <input
                        className="input input-bordered input-sm max-w-20 "
                        type="text"
                        value={editedSubMeals[subMeal.id]?.name || ""}
                        onChange={(e) =>
                          handleChange(subMeal.id, "name", e.target.value)
                        }
                      />
                    ) : (
                      subMeal.name
                    )}
                  </td>
                  <td className="">
                    {editingMealId === subMeal.id ? (
                      <input
                        className="input input-bordered input-sm max-w-20 "
                        type="text"
                        value={editedSubMeals[subMeal.id]?.price || ""}
                        onChange={(e) =>
                          handleChange(subMeal.id, "price", e.target.value)
                        }
                      />
                    ) : (
                      subMeal.price
                    )}
                  </td>
                  <td className="">
                    <div className="flex space-x-2 ">
                      {editingMealId === subMeal.id ? (
                        <button
                          onClick={
                            () =>
                              handleSave(
                                subMeal.id,
                                editedSubMeals[subMeal.id].name,
                                editedSubMeals[subMeal.id].price
                              ) 
                          }
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            aria-label="Edit"
                            title="Edit"
                            onClick={() => handleEdit(subMeal)}
                          >
                            ✏️
                          </button>
                          <button
                            aria-label="Delete"
                            title="Delete"
                            onClick={() => handleDelete(subMeal.id)}
                          >
                            🗑️
                          </button>
                          <button
                            aria-label="Info"
                            title="Info"
                            onClick={() =>
                              console.log("Info about sub-meal:", subMeal)
                            }
                          >
                            ℹ️
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No sub-meals found for this type.</p>
      )}
      <button
        className=" my-5 btn btn-accent"
        onClick={() => showAddMealModal()}
      >
        Add a Meal
      </button>

      {showDeleteModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete this sub-meal?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showAddModal && (
        <AddMealModal
          smID={smID}
          onAdd={handleAddMeal}
          onClose={closeAddMealModal}
        />
      )}
    </div>
  );
};

export default ClientSubMealsComponent;
