import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


export default class FormField extends Component {

    renderAppropiateInputType() {
        if (this.props.type === "textarea") {
            return this.getTextarea();
        }
        else { 
            return this.getInputField();
        }
    }
    
    getTextarea() {
        return (
            <textarea 
                rows={this.props.rows} 
                id={this.props.id}
                ref={this.props.ref}
                name={this.props.name}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
            />
        )
    }
    
    getInputField() {
        return (
            <input 
                type={this.props.type}
                id={this.props.id}
                ref={this.props.id}
                name={this.props.name} 
                placeholder={this.props.placeholder}
                value={this.props.value}
                disabled={this.props.disabled}
            />
        )
    }

    render() {
        return (
            <div className="o-box--small o-layout__item">
                <div className="formFieldTitle">
                    {this.props.title}
                </div>
                {this.renderAppropiateInputType()}
            </div> 
        );
    }
}
