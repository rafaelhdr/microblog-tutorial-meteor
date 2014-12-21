Posts = new Mongo.Collection("posts");

Template.body.events({
  "submit .new-post": function (event) {

    var text = event.target.text.value;

    Posts.insert({
      text: text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date()
    });

    event.target.text.value = "";

    return false;
  }
});

Template.body.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}, limit: 10});
  }
});

Template.post.helpers({
  isOwner: function () {
    if (Meteor.user()) {
      if (Meteor.user().username == this.username) {
        return true;
      }
    }
    return false;
  },
});

Template.post.events({
  "click .btn-delete": function (event) {
    Posts.remove(this._id);
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});