// class based component 
// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
    /**
     * initialize component level state
     * constructor(props) {
     *      super(props);
     *      this.state = { new: true };
     * }
     * the same as following
     */
    state = { showFormReview : false };

    renderContent() {
        if (this.state.showFormReview === true) {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }
        return (
            <SurveyForm 
                onSurveySubmit={() => this.setState({ showFormReview: true })} 
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({form: 'surveyForm'})(SurveyNew); 
// see 177 for the reason how this works for clean all values in the formFields when user click other button such as cancel
// 主要是：surveyNew比surveyForm/SurveyFormReview高一级，在这里不添加destoryUnmount===true的话，当user回到dashboard等，也就是说明
// surveyNew component 被 unmount 了，所以form的值就被redux-form清空了