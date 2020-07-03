import React from "react";
import propTypes from "prop-types";
import TextInput from "../common/TextInput";

const AuthorForm = ({author, onChange, saving, errors, onSave}) => {

  return (
    <form onSubmit={onSave}>
      <TextInput
      name="name"
      label="Author Name"
      value={author.name || ""}
      onChange={onChange}
      error={errors.name}
     />
     <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  )
}

AuthorForm.propTypes = {
  author: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  saving: propTypes.bool.isRequired,
  onSave: propTypes.func.isRequired,
  errors: propTypes.object.isRequired
}

export default AuthorForm;