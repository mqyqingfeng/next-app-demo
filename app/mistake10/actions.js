'use server'

import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'

const data = ['阅读', '写作', '冥想']
 
export async function findToDos() {
  return data
}

export async function createToDo(formData) {
  try {
    const todo = formData.get('todo')
    data.push(todo)
    revalidatePath("/mistake9");
    return data
  } catch(e) {
    return {message: 'error'}
  } finally {
    redirect('/')
  }
}