import React, { Component } from 'react';

class Dropdown extends Component {

    getOptions() {
        let options=[];
        for (let i=0; i < this.props.options.length; i++) {
            options.push({
                key: i,
                value: this.props.options[i].value,
                description: this.props.options[i].description
             })
        }
        return options;
    }

    renderOptions() {
      return this.getOptions().map((option) => (
            <option
                key={option.key} 
                value={option.value}>
                {option.description}
            </option>
        ));
    }

    render() {
        return (
            <select onChange={this.props.onChangeFunction}>
                {this.renderOptions()}
            </select>
        );
    }
}

export default Dropdown;