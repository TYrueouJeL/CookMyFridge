import type { RecipeStepType } from "~/types/RecipeStepType";

const API_URL = 'http://localhost:3333';

export const recipeStepApi = {
  async getSteps(recipeId: number): Promise<RecipeStepType[]> {
    const response = await fetch(`${API_URL}/recipes/${recipeId}/steps`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe steps');
    }
    return response.json();
  },

  async getStep(recipeId: number, stepId: number): Promise<RecipeStepType> {
    const response = await fetch(`${API_URL}/recipes/${recipeId}/steps/${stepId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe step');
    }
    return response.json();
  },

  async createStep(recipeId: number, step: { stepNumber: number; description: string; durationMinutes?: number }): Promise<RecipeStepType> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/recipes/${recipeId}/steps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(step)
    });
    if (!response.ok) {
      throw new Error('Failed to create recipe step');
    }
    return response.json();
  },

  async updateStep(recipeId: number, stepId: number, step: { stepNumber?: number; description?: string; durationMinutes?: number }): Promise<RecipeStepType> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/recipes/${recipeId}/steps/${stepId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(step)
    });
    if (!response.ok) {
      throw new Error('Failed to update recipe step');
    }
    return response.json();
  },

  async deleteStep(recipeId: number, stepId: number): Promise<void> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/recipes/${recipeId}/steps/${stepId}`, {
      method: 'DELETE',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete recipe step');
    }
  }
};
