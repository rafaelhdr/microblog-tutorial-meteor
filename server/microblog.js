Posts = new Mongo.Collection("posts");

Meteor.methods({
  addPost: function (text) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Posts.insert({
      text: text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date()
    });
  },

  removePost: function (postId) {
  	post = Posts.findOne(postId);
  	if (post.owner != Meteor.userId()) {
  		throw new Meteor.error("not-authorized");
  	}

  	Posts.remove(postId);
  }
});

Meteor.publish("posts", function () {
	return Posts.find({}, {sort: {createdAt: -1}, limit: 10});
});