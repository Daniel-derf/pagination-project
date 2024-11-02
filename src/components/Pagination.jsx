import User from './User'
import { useState, useEffect } from 'react'
import peoples from '../../persons'
import './Pagination.css'


const Pagination = () => {
    
    const [paginatedUsers, setPaginatedUsers] = useState(peoples.slice(0, 10)) 
    const [usersArrays, setUsersArrays] = useState([])

    useEffect(() => {
        handleSubmit({target:{
            value: "10"
        }})
    }, []
    )

    const handleSubmit = (e) => {
        const rows = parseInt(e.target.value)
        let idx=0

        const users = []
        for(let i=0; i<peoples.length; i+=rows){
            users[idx] = peoples.slice(i, i+rows)
            idx+=1
        }

        setPaginatedUsers(users[0])
        setUsersArrays(users)
    }

    const handlePagination = (e) => {
        const page = parseInt(e.target.value) 

        setPaginatedUsers(usersArrays[page])
    }
  
    return (
        <>
            <h1>React Pagination</h1>

            <form>
                <label htmlFor="rows-per-page">Rows per page:</label>
                <select defaultValue={"10"} onChange={handleSubmit} id="rows-per-page">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </form>

            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>City</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedUsers.map((user, idx) => (
                            <User key={idx} data={user}/>
                        ))
                    }
                </tbody>
            </table>

            <div className="buttons">
                {
                    usersArrays.map((user,idx) => (
                        <button onClick={handlePagination} key={idx} value={idx}>
                            {idx+1}
                        </button>
                    ))
                }
            </div>
        </>
    )
}

export default Pagination
