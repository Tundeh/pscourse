import React from "react";
import propTypes from "prop-types"

const AuthorList = ({authors, onDeleteClick}) => {
   
 return (<table className="table">
    <thead>
      <tr>
      <th>Id</th>
      <th>Author Name</th>
      </tr>
    </thead>
    <tbody>
      { authors.map(author => {
        return(
          <tr key={author.id}>
            <td>{author.id}</td>
            <td>{author.name}</td>
            <td>
            <button className="btn btn-outline-danger" 
            onClick={() => onDeleteClick(author)}>Delete</button>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>)
}

AuthorList.propTypes = {
  authors: propTypes.array.isRequired,
  onDeleteClick: propTypes.func.isRequired
}

export default AuthorList;