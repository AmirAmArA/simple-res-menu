"use client";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import React, { useState } from "react";
import AddIngredientModal from "./AddIngredientModal";
import { Ingredient } from "@/types";

type Props = {
  initialIngredients: Ingredient[];
};

function IngredientsComponent({ initialIngredients }: Props) {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(
    null
  );
  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);

  const handleAddIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);
    setShowAddIngredientModal(false);
  };

  const handleEdit = (ingredient: Ingredient) => {
    // Implement edit logic here
    console.log("Edit ingredient:", ingredient);
  };

  const handleDelete = (id: string) => {
    setIngredientToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (ingredientToDelete) {
      try {
        const response = await fetch(`/api/ingredients/deleteIngredients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: ingredientToDelete }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete ingredient");
        }

        setIngredients(
          ingredients.filter(
            (ingredient) => ingredient.id !== ingredientToDelete
          )
        );
      } catch (err) {
        console.error("Error deleting ingredient:", err);
      } finally {
        setShowDeleteModal(false);
        setIngredientToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setIngredientToDelete(null);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Ingredients</h1>
      <button
        onClick={() => setShowAddIngredientModal(true)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Ingredient
      </button>
      {ingredients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, i) => (
                <tr id={ingredient.id} key={i}>
                  <th>{i + 1}</th>
                  <td>{ingredient.name}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        aria-label="Edit"
                        title="Edit"
                        onClick={() => handleEdit(ingredient)}
                      >
                        ✏️
                      </button>
                      <button
                        aria-label="Delete"
                        title="Delete"
                        onClick={() => handleDelete(ingredient.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No ingredients found.</p>
      )}
      {showAddIngredientModal && (
        <AddIngredientModal
          onClose={() => setShowAddIngredientModal(false)}
          onAdd={handleAddIngredient}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete this ingredient?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default IngredientsComponent;
