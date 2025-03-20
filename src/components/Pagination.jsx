import "./Pagination.css";
import User from "./User";
import { useState, useEffect } from "react";
import peoples from "../../persons";

const Pagination = () => {
  const [curPage, setCurPage] = useState(0);
  const [usersArr, setUsersArr] = useState([]);

  useEffect(() => {
    handleSubmit(10);
  }, []);

  function handleSubmit(rowsPerPage) {
    const pages = [];

    for (let i = 0; i < peoples.length; i += rowsPerPage) {
      const page = peoples.slice(i, i + rowsPerPage);
      pages.push(page);
    }

    setUsersArr(pages);
  }

  function handleChangePage(pageNumber) {
    setCurPage(pageNumber);
  }

  return (
    <>
      <h1>React Pagination</h1>

      <form>
        <label htmlFor="rows-per-page">Rows per page:</label>
        <select defaultValue={"10"} onChange={(e) => handleSubmit(+e.target.value)} id="rows-per-page">
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
        <tbody>{usersArr[curPage] && usersArr[curPage].map((user) => <User key={user.id} {...user} />)}</tbody>
      </table>

      <div className="buttons">
        {usersArr.map((_, idx) => (
          <button key={idx} onClick={(e) => handleChangePage(e.target.value)} value={idx}>
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;
