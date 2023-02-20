import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllDataAsync, todoState, saveNewTodo, deleteTodo, selectTodo,editTodo } from '../slices/TodoSlice'
import './Pagination.css'

function Todo() {
    const todoList = useSelector(todoState).listOfTodo
    const todoLocalStore = useSelector(todoState)
    const dispatch = useDispatch()
    const [title, setTitleName] = useState('')
    const [currentPage, setcurrentPage] = useState(1)
    const [todoPerPage, settodoPerPage] = useState(10)
    const pages = [];


    useEffect(() => {
        dispatch(fetchAllDataAsync())
    }, []);

    const saveTodo = (e) => {
        e.preventDefault();
        if (todoLocalStore.selectedTodo) {
            dispatch(editTodo({
                ...todoLocalStore.selectedTodo,
                title: title,
            }))
        }
        else {
            dispatch(saveNewTodo({
                id: uuidv4(),
                title: title
            }))
        }


    }
    useEffect(() => {
        if(todoLocalStore.selectedTodo){
          let selectedData = todoLocalStore.selectedTodo
          setTitleName(selectedData.title)
        }
      },[todoLocalStore])

    const lastTodoIndex = currentPage * todoPerPage;
    const firstTodoIndex = lastTodoIndex - todoPerPage;

    const currentTodos = todoList.slice(firstTodoIndex, lastTodoIndex);
    for (let i = 1; i <= Math.ceil(todoList.length / todoPerPage); i++) {
        pages.push(i)
    }

    return (
        <div>
            <h1 className='p-3' style={{ color: '#645CBB' }}>Todo Application</h1>
            <div className='row'>
                <div className='col-8 mx-auto'>
                    <form onSubmit={saveTodo}>
                        <div className='d-flex'>

                            <input placeholder='Enter task' value={title} onChange={(e) => setTitleName(e.target.value)} className="form-control"></input>
                            <Button type='submit' style={{ backgroundColor: "#A084DC" }} className="mx-2">Add</Button>
                        </div>
                    </form>
                </div>

            </div>
            <div className='col-8 mx-auto'>
                <ul>
                    {currentTodos.map((value) => {
                        return (
                            <div key={value.id} className='d-flex justify-content-between pt-3'>
                                <li>{value.title}</li>
                                <div className='d-flex'>
                                    <button className='btn' style={{ backgroundColor: "#FFE7CC", cursor: "pointer" }}
                                        onClick={() => { dispatch(selectTodo(value)) }}
                                        color='white'>Edit</button>
                                    <button className='btn mx-2' style={{ backgroundColor: "#EBC7E6", cursor: "pointer" }} onClick={() => dispatch(deleteTodo(value.id))}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </ul>
                <div className='pagination'>
                    {
                        pages.map((page, index) => {
                            return (
                                <button key={index} onClick={() => setcurrentPage(page)}>{page}</button>
                            )
                        })
                    }
                </div>
            </div>
            {/* <Pagination totalTodos={todoList.length} todoPerPage={todoPerPage} setcurrentPage={setcurrentPage} /> */}
        </div>
    )
}

export default Todo