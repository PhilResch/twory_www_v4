import React, { Component } from 'react';
import FormField from './formField.jsx';
import Dropdown from './dropdown.jsx';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        contentComponents: [] 
    };
  }

    componentDidMount() {
        this.setState({
            contentComponents: 
            [
                <FormField 
                    title="Tytuł artykułu lub nazwa klienta" 
                    type="text" 
                    name="title" 
                    placeholder="Wprowadź tytuł" 
                />,
                <FormField 
                    title="Tagi" 
                    type="text" 
                    name="tags" 
                    placeholder="np. Logo" 
                /> 
            ]
        });
    }

    componentWillUnmount() {
    }

    addContentForm() {
        let updatedContentComponentsArray = this.getContentComponents();
        updatedContentComponentsArray.push(
            <FormField 
                    title="Treść" 
                    type="textarea" 
                    rows="20"
                    name="content" 
                    placeholder="Wprowadź treść" 
                />
        )
        
        this.setState({
            contentComponents: updatedContentComponentsArray
        });
    }
    
    getContentComponents() {
        console.log("Is this shit called?");
        let ContentComponents = this.state.contentComponents.slice();
        return ContentComponents;
    }
    
    changeExplanation() {
        console.log("changeExplanation called");
    }

    render() {
        let options = [
            {
                value: "Akapit",
                description: "Akapit z opcjonalnym obrazkiem"
            },
            {
                value: "Obrazek",
                description: "Obrazek lub szereg obrazków z opcjonalnym opisem"
            },
            {
                value: "Film",
                description: "Film YouTube"
            },
            {
                value: "3D",
                description: "Model 3D"
            }
        ];
        
        return (
            <div id="editor" className="u-1/2">
                <form id="testForm">
                    {this.state.contentComponents}
                </form>

                <button onClick={this.addContentForm.bind(this)}>
                    Dodaj treść lub multimedia
                </button>
            
            <form>
                <Dropdown 
                    options={options}
                    onChangeFunction={this.changeExplanation.bind(this)}
                />
            </form>
            
            </div>
        );
    }
}

export default Editor;