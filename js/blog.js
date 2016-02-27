(function(){
  var app = angular.module('blogApp', ['ngSanitize']);

  app.controller('BlogController', ['$http', '$sanitize', function($http, $sanitize){
    
    var blog = this;
    blog.title = "david.veli!la";
    blog.captcha = 8;
    blog.date = new Date();
    blog.posts = [];
    blog.tags = [];

    $http.get('json/posts-2.json').success(function(allPostsData){
      for (var i = 0; i < allPostsData.length; i++) {
        var postData = allPostsData[i];
        var post = new Post(postData);
        for (var j = 0; j < post.tags.length; j++) {
          var tag = post.tags[j];
          if (-1 == blog.tags.indexOf(tag)) {
            blog.tags.push(tag);
          }
        }
        blog.posts.push(post);
      }
      blog.posts[0].toggle();
      console.log(blog.tags);
    });
    
    blog.selectedTab = 'blog';
    
    blog.selectTab = function(setTab){
      blog.selectedTab = setTab;
    };
    
    blog.isTabSelected = function(checkTab){
      return blog.selectedTab === checkTab;
    };
    
  }]);
  
  app.controller('CommentController', function(){
    this.comment = {};
    this.addComment = function(post){
      if ((1 + this.comment.captcha) != (1 + (post.id % 8))) {
        return false;
      }
      this.comment.createdOn = Date.now();
      post.comments.push(this.comment);
      this.comment = {};
      return true;
    };
  });
 
})();