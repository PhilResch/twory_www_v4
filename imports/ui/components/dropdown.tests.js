import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import { render } from 'enzyme';
import { expect } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import Dropdown from './dropdown.jsx';




describe ('Dropdown', () => {
  // In Todos app, component code can run on client and server, so force client only
  if (Meteor.isServer) return;
  
  function placeholderOnChange() {
    console.log("Placeholder log. Without any onChange the component won't render.");
    }

  it('should render', () => {
    //setup: create test data
    const dropdownOptions = [{}];
    
    const dropdown = shallow(
            <Dropdown 
                options={dropdownOptions} 
                onChange={this.placeholderOnChange}
            />
    );
    
    chai.assert.equal(
      dropdown.find('select').length, 
      1      
    );
  });

  it('should have options provided by prop', () => {
    const dropdownOptions = [
        {
            value: "Test1",
            description: "Akapit z opcjonalnym obrazkiem"
        },
        {
            value: "Test2",
            description: "Obrazek lub szeddreg obrazków z opcjonalnym opisem"
        }
    ];
    
    const dropdown = shallow(
            <Dropdown 
                options={dropdownOptions} 
                onChange={() => console.log("Placeholder log. Without any onChange the component won't render.")}
            />
    );
    
    chai.assert.equal(
      dropdown.find('option').length, 
      2      
    );
  })
});