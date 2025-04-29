import type { Model } from '../types';

export const models = async (): Promise<Model[]> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post`); 
  if (!response.ok) {
    throw new Error('Erro ao buscar os modelos');
  }

  console.log(response)
  return await response.json();
};