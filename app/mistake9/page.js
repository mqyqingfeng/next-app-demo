import { findToDos, createToDo } from './actions';

export default async function Page() {
  const todos = await findToDos();
  return (
    <>
      <form action={createToDo}>
        <input type="text" name="todo" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
    </>
  )
}