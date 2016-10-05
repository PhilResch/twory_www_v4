import React from 'react';
export default IndividualFile = React.createClass({

  propTypes: {
    fileName: React.PropTypes.string.isRequired,
    fileSize: React.PropTypes.number.isRequired,
    fileUrl: React.PropTypes.string,
    fileId: React.PropTypes.string.isRequired
  },


  removeFile(){
    "use strict";
    let conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf == true) {
      Meteor.call('RemoveFile', this.props.fileId, function (err, res) {
        if (err)
          console.log(err);
      });
    }
  },


  renameFile(){
    "use strict";

    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt    = window.prompt('New file name?', this.props.fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('RenameFile', this.props.fileId, prompt, function (err, res) {
        if (err)
          console.log(err);
      });
    }
  },

  render() {
    return (
      <div className="o-layout__item u-6/12">
        <div className="o-media fileUploadThumbnails">
          <img className="o-media__img u-2/12" src={this.props.fileUrl} />
          <div className="o-media__body">
              <strong className="">{this.props.fileName}</strong>
              <br />
                <button onClick={this.renameFile} className="">
                  Zmień nazwę
                </button>            
                
                <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
                target="_blank">
                  Podgląd
                </a>
                
                <button onClick={this.removeFile} className="btn btn-outline btn-danger btn-sm">
                  Usuń
                </button>
            
                Size: {this.props.fileSize}
          </div>
        </div>
    </div>
    )}
})