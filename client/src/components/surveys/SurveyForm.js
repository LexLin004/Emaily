// class based component 
// SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; // control all form in this file. to allow redux form to communicate with the Redux store
/** Field (normal): for rendering any type of traditional HTML form element 
 *  Field (now): 
 */
import SurveyField from "./SurveyField";
import _ from 'lodash';
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

/**
 * this.props.handleSubmit is a function that is provided to us autoly by reduxForm helper
 * The buttom reduxForm add some additional props to the surveyForm
 * One of the props is called handleSubmit
 * the arrow function in the handleSubmit will be called autoly when user hit the submit btn
 */ 
class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name} />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) { // the object when user hit the submit
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    // if (!values.title) errors.title = 'You must provide a title';
    // if (!values.subject) errors.subject = 'You must provide a subject';
    // if (!values.body) errors.body = 'You must provide a body';
    // if (!values.emails) errors.emails = 'You must provide a emails';
    _.each(formFields, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);