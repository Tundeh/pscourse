import React, { useEffect, useState } from "react";
import AuthorList from "./AuthorList";
import {connect} from "react-redux";
import * as AuthorActions from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";
import propTypes from "prop-types";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const AuthorsPage = ({authors, courses, actions}) => {

  const [redirect, setRedirect] = useState({
    redirectToAddAuthorPage: false
  })


  

  useEffect(() => {
  if (authors.length === 0) {
    actions.loadAuthors().catch(error => {
      alert("Loading Authors failed" + error);
    });
  } 
  if (courses.length === 0) {
    actions.loadCourses().catch(error => {
      alert("Server failed" + error);
    });}


}, []);


 
  const hasCourse = (author) => {
  let result = [...courses].filter(course => course.authorId === author.id);
  if(result.length > 0) return true;
  
  return false;
  }

const handleAuthorDelete = async (author) => {
  if(hasCourse(author)) return toast.info(author.name + " has atleast one course");
  toast.success("Author successfully deleted");
  try {
    await  actions.deleteAuthor(author)
    if(authors.length===0)setRedirect(true);
  } catch(error) {
    toast.error("Unable to delete author");
  }
  
}



return <> 
{redirect.redirectToAddAuthorPage && <Redirect to="/author" />}
 <h2>Authors</h2>
{authors.length === 0 ? <Spinner/>: (
  <>
   <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => setRedirect({ redirectToAddAuthorPage: true })}
            >
              Add Authors
            </button>
            <h3 className="'text-dark py-2 pr-4 m-0'">
              <strong className="text-secondary">{authors.length} </strong>
              Authors
            </h3>
<AuthorList onDeleteClick={handleAuthorDelete}
 authors={authors} 
 />
</>
)}
</>

}

AuthorsPage.propTypes = {
  authors: propTypes.array.isRequired,
  courses: propTypes.array.isRequired,
  actions: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired
}

function mapStateToProps(state){
  return {
    authors: state.authors,
    courses: state.courses,
    loading: state.apiCallsInProgress > 0
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      loadAuthors: bindActionCreators(AuthorActions.loadAuthors, dispatch),
      deleteAuthor: bindActionCreators(AuthorActions.deleteAuthor, dispatch),
      loadCourses:  bindActionCreators(courseActions.loadCourses, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);