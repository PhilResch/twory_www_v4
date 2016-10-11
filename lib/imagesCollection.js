export const ImagesCollection = new FilesCollection({
  collectionName: 'ImagesCollection',
  allowClientCode: true,
  onBeforeUpload: function (file) {
    user = this.userId;
    if (Roles.userIsInRole( user, ['admin'], "default-group" )) {
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
          return true;
        } else {
          return 'Please upload image, with size equal or less than 10MB';
        }
    } else {
        return "Not enough rights to upload a file!";
    }
  },
  onUploaded (err, fileRef) {
    //if(err) return;
    console.log("FILEREF._ID IS: " + fileref._id);
    return fileref._id;
  }

});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return ImagesCollection.find().cursor;
  });
}