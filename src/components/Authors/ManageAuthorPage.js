import React, { useState } from "react";
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {saveAuthor} from "../../redux/actions/authorActions";
import AuthorForm from "./AuthorForm";
import propTypes from "prop-types";
import { toast } from "react-toastify";

const ManageAuthorPage = ({saveAuthor, history}) => {
  const [author, setAuthor] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false)

  const handleChange = (event) => {
    const {name, value} = event.target;
    setAuthor(prevAuthor => ({...prevAuthor, [name]: value}))
  }

  function formIsValid() {
    const {name} = author;
    const errors = {};

    if (!name) errors.name = "Author Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }


function handleSave (event) {
  event.preventDefault();
  if(!formIsValid()) return;
  setSaving(true);
  saveAuthor(author).then(() => {
    toast.success("author saved successfully");
    history.push("/authors");
    }).catch(error => {
      console.log(error);
      setSaving(false);
      setErrors({...errors, onsave: error.message})})
}
return <AuthorForm
onChange={handleChange}
author={author}
onSave={handleSave}
saving={saving}
errors={errors}
/>
}

ManageAuthorPage.propTypes = {
  saveAuthor: propTypes.func.isRequired,
  history: propTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    authors: state.authors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
      saveAuthor: bindActionCreators(saveAuthor, dispatch)
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);