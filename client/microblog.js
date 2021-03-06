Posts = new Mongo.Collection("posts");

Meteor.subscribe("posts");

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

Template.body.events({
  "submit .new-post": function (event) {

    var text = event.target.text.value;

    Meteor.call("addPost", text);

    event.target.text.value = "";

    return false;
  }
});

Template.body.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}, limit: 10});
  },
  isLogged: function () {
    if (Meteor.user()) {
      return true;
    }
    return false;
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
  pretiffyDate: function(dt) {
    window.t = dt;
    var time = n(dt.getDate()) + '/' + n(dt.getMonth()) + '/' + n(dt.getFullYear()) + ' às ';
    time += n(dt.getHours()) + ':' + n(dt.getMinutes()) + ':' + n(dt.getSeconds());
    return  time;
  }
});

Template.post.events({
  "click .btn-delete": function (event) {
    var confirmed = confirm('Tem certeza que deseja apagar o post?');
    if (confirmed)
      Meteor.call('removePost', this._id);
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});