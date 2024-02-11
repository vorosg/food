'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

   // when top of the file then all functions created in this file will be treated as server actions
                // moving server actions to a separate file can help us if we want to use them in client side components

const isValidText = (text) => {
    !text || text.trim() === ""
}

export const shareMeal = async (prevState, formData) => {
    const meal = {
        title: formData.get('title'), // gets value of the input field named 'title'
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    if (
        isValidText(meal.title) || 
        isValidText(meal.summary) || 
        isValidText(meal.instructions) ||
        isValidText(meal.creator) || 
        isValidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid input.'
        }
    }

    await saveMeal(meal);
    redirect('/meals');
}

