import { Images } from '../../../lib/imagesCollection.js';
import React, { Component, PropTypes } from 'react';

import { ImagesCollection } from '../../../lib/imagesCollection.js';

export default class UploadNewImage extends Component {
    insertImage(e){
        "use strict";
        e.preventDefault();

        let self = this;

        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // there was multiple files selected
            var file = e.currentTarget.files[0];

            if (file) {
                let uploadInstance = ImagesCollection.insert({
                    file: file,
                    meta: {
                    locator: self.props.fileLocator,
                    userId: Meteor.userId() // Optional, used to check on server for file tampering
                    },
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: true // If you see issues with uploads, change this to false
                }, false);

                self.setState({
                    uploading: uploadInstance, // Keep track of this instance to use below
                    inProgress: true // Show the progress bar now
                });

                // These are the event functions, don't need most of them, it shows where we are in the process
                uploadInstance.on('start', function () {
                    console.log('Starting');
                });

                uploadInstance.on('end', function (error, fileObj) {
                    console.log('On end File Object: ', fileObj);
                });

                uploadInstance.on('uploaded', function (error, fileObj) {
                    console.log('uploaded: ', fileObj);

                    // Remove the filename from the upload box
                    self.refs['fileinput'].value = '';

                    // Reset our state for the next file
                    self.setState({
                    uploading: [],
                    progress: 0,
                    inProgress: false
                    });
                });

                uploadInstance.on('error', function (error, fileObj) {
                    console.log('Error during upload: ' + error);
                });

                uploadInstance.on('progress', function (progress, fileObj) {
                    console.log('Upload Percentage: ' + progress);
                    // Update our progress bar
                    self.setState({
                    progress: progress
                    })
                });

                uploadInstance.start(); // Must manually start the upload
            }
        }
    } 
  
    imageIsInserted() {
        if(image) {
            return true;
        }
        else {
            return false;
        }
    }

    renderInsertImageForm() {
        return(
            <div className="uploadImageForm">
                <div className="o-media__body">
                <h4>Dodaj nowy obrazek:</h4>
                <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput"
                    onChange={this.insertImage}/>
                </div>
            </div>
        )
    }

    renderInsertedImage() {
        return(
            <img className="o-media__img" src={getImageURL()} />
        )
    } 
    
    renderContent() {
        if (imageIsInserted() == false) {
            renderInsertImageForm();
        }
        else {
            renderInsertedImage();
        }
    }
    
    render() {
        let image = new File;

        return(
            <div className="o-layout__item u-12/12">
                {renderContent()}            
            </div>
        )
    }
}

export default createContainer(() => {
    imagesCollectionSubscription = Meteor.subscribe('files.images.all');
    loading = !imagesCollectionSubscription.ready();
    imagesCollectionExists = !loading;
    return {
        imagesCollectionIsReady: imagesCollectionSubscription.ready() ? true : false,
        imagesCollection: imagesCollectionExists ? Images.find({}).fetch() : [],
        currentUser: Meteor.user(),
    }
}, UploadNewImage);