import User from './User'
import { useState, useEffect } from 'react'
import peoples from '../../persons'
import './Pagination.css'


const Pagination = () => {
    const [users] = useState(peoples)
    const [pagedUsers, setPagedUsers] = useState(users.slice(0, 5))
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [pages, setPages] = useState([])

    useEffect(() => {
        updatePages(rowsPerPage)
    }, [users, rowsPerPage])

    const updatePages = (rowsPerPage) => {
        const pages = []
        for (let start = 0; start < users.length; start += rowsPerPage) {
            pages.push(users.slice(start, start + rowsPerPage))
        }
        setPages(pages)
        setPagedUsers(pages[0] || [])
    }

    const handleRowsChange = (e) => {
        const value = parseInt(e.target.value, 10)
        setRowsPerPage(value)
    }

    const handlePageChange = (e) => {
        const pageIndex = parseInt(e.target.value, 10)
        setPagedUsers(pages[pageIndex] || [])
    }

    return (
        <>
            <h1>React Pagination</h1>

            <form>
                <label htmlFor="rows-per-page">Rows per page:</label>
                <select id="rows-per-page" onChange={handleRowsChange} value={rowsPerPage}>
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
                {pages.map((_, idx) => (
                    <button key={idx} onClick={handlePageChange} value={idx}>
                        {idx + 1}
                    </button>
                ))}
            </div>
        </>
    )
}

export default Pagination
