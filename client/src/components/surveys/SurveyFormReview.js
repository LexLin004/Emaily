/** SurveyFormReview shows users their form inputs for review */
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, field => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5> Please confirm your entries </h5>
            {reviewFields}            
            <button className="yellow darken-4 white-text btn-flat" onClick={onCancel}>Back</button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview)); 
// now SurveyFormReview know about the history object that is provided by react router.