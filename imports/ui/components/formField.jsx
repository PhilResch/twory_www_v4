import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


export default class FormField extends Component {

    render() {
        console.log("---|||---|||---|||---");
        console.log("FormField component props: ");
        console.log(this.props); 
        
        return (
            <div className="o-box--small o-layout__item">
                <div className="formFieldTitle">
                    {this.props.title}
                </div>
                <input 
                    id={this.props.id}
                    ref={this.props.id}
                    type={this.props.type}
                    name={this.props.name} 
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                />
            </div> 
        );
    }

}
