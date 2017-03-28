import React, { Component } from 'react';
import FormField from './formField.jsx';
import Dropdown from './dropdown.jsx';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contentComponents: [] 
    };
  }
  
    getInitialState() {
        return {
            editing: null
        };
    }
    
    componentDidMount() {
        if (this.props.content) {
            this.setState({
                contentComponents: this.props.contents
            });
        } 
        else {
            this.setState({
                contentComponents: 
                [
                    <Content 
                        type="text"
                        title="Tytuł artykułu lub nazwa klienta"
                        name="title"
                        placeholder="Wprowadź treść"
                    />,
                    <Content 
                        type="tags"
                        title="Tytuł artykułu lub nazwa klienta"
                        name="title"
                        placeholder="Wprowadź treść"
                    />, 

                ]
            });
        }
    }
    
    
renderContentOrInput(content) {
        if (this.state.editing === content._id) {
            renderInput(content);
        }
        else this.renderContent(content);
    }
    
    renderInput(content) {
        return <ContentInput
                key = {'editing-${content._id}'}
                onKeyDown = {this.submitEditField}
                className = {content.className}
                type = {content.type}
                ref = {'title_${content_id}'}
                name = {content.name}
                value = {content.value}                
            />

    }
    
    renderContent(content) {
        return <Content
                onClick = {this.toggleEditing.bind(null, content._id)}
                key = {content._id }
                className = {content.className}
                content = {content.content}
            />
    }    
    
        toggleEditing (contentId) {
        this.setState({editing: contentId});
    }

    addContentForm() {
        let updatedContentComponentsArray = this.getContentComponents();
        updatedContentComponentsArray.push(
            <FormField 
                    key= {this.state.contentComponents.length + 1}
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
            <div id="postEditor" className="u-1/2">
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


export default createContainer(() => {
    postsCollectionSubscription = Meteor.subscribe('postsCollection');
    imagesCollectionSubscription = Meteor.subscribe('files.images.all');
    return { 
        docsReadyYet: imagesCollectionSubscription.ready(),
        docs: ImagesCollection.find().fetch(),
        postsCollectionIsReady: postsCollectionSubscription.ready(),
        
        posts: PostsCollection.find().fetch().map((post) => {
            return {
                uid: post._id,
                href: `/posts/${post._id}/edit`,
                label: post.title,
                content: post.content,
                tags: post.tags,
                image: post.image,
                slug: post.slug
            };
        })
    };
}, PostsList);