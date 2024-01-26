'use server';   // when top of the file then all functions created in this file will be treated as server actions
                // moving server actions to a separate file can help us if we want to use them in client side components

export const shareMeal = async (formData) => {
    const meal = {
        title: formData.get('title'), // gets value of the input field named 'title'
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    console.log(meal);
    }
