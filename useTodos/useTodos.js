import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";



const initialState = []

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
    const [ todos, dispatch ] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = (todo) => {
        const action = {
        type: '[TODO] add Todo',
        payload: todo
        }
        dispatch(action)
    }

    const handleDeleteTodo = (id) => {
        dispatch({
        type: '[TODO] remove Todo',
        payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
        type: '[TODO] toggle Todo',
        payload: id
        })
    }


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }
}
