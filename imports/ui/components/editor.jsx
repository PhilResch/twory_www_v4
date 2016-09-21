export default class Editor extends Component {
    render() {
        if ( !this.data.post) { return <div />; }
    }
}

export default createContainer(() => {  
    editor = Meteor.subscribe('editor', this.props.post);
    return {
        post: PostsCollection.findOne({_id: this.props.post})
    };
}, Editor);