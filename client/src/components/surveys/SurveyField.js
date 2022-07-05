//  return objects or classes which are traditionally labeled with capital letters 

// SurveyField contains logic to render a single label and text input
import React from "react";

/** if touched is ture, and there si a string in the error, then shows */
export default ({ input, label, meta: { error, touched } }) => {
    /** {...input} = onBlur={input.onBlur} onChange={input.onChange}... */
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
            
        </div>
    );
};