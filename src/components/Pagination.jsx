import User from './User'
import { useState, useEffect } from 'react'
import peoples from '../../persons'


const makeArray = (number) => {
    let newArray = []

    for(let i = 0; i<number; i++){
        newArray.push(i)
    }

    return newArray
}

const Pagination = () => {

    const [users, setUsers] = useState(peoples)
    const [pagedUsers, setPagedUsers] = useState(users.slice(0, 10))

    // const [pages, setPages] = useState()

    const [rowsPerPage, setRowsPerPage] = useState(makeArray(5))
    const [pages, setPages] = useState([])

    useEffect(()=>{
        handleSubmit({target: {
            value: 5
        }})
    },[])

    const handleSubmit = (e) => {
        const value = e.target.value
        let rowsPerPage = Math.round(users.length/value)

        setPagedUsers(users.slice(0, rowsPerPage))

        let pages = []
        let start = 0

        for (let end=0; end<peoples.length; end+=1){

            if(end == rowsPerPage){
                pages.push([peoples.slice(start, end)])

                start = end
                rowsPerPage += Math.round(users.length/value)
            }
        }

        setPages(pages)
        setRowsPerPage(makeArray(value))
    }

    const handlePageChange = (e) => {
        const value = e.target.value

        setPagedUsers(pages[value][0])
    }


    return (
        <>
        <div>Pagination</div>

        <form>
            <select onChange={handleSubmit} type="submit">
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
                {pagedUsers.map((user) => (
                    <User key={user.id} data={user} />
                ))}     
            </tbody>

        </table>

        <div className="buttons">
            {rowsPerPage.map( (value, idx) => (

                <button key={idx} onClick={handlePageChange} value={value}>{value+1}</button>

            ))}
            
        </div>


        </>
    )
}

export default Pagination