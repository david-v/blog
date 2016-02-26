(function(){
  var app = angular.module('blogApp', ['ngSanitize']);

  app.controller('BlogController', ['$http', '$sanitize', function($http, $sanitize){
    
    var blog = this;
    blog.title = "david.veli!la";
    
    blog.posts = [];
    $http.get('posts.json').success(function(allPostsData){
      for (var i = 0; i < allPostsData.length; i++) {
        var postData = allPostsData[i];
        var post = new Post(postData);
        blog.posts.push(post);
      }

      blog.posts[0].toggle();
    });
    
    blog.selectedTab = 'blog';
    
    blog.selectTab = function(setTab){
      blog.selectedTab = setTab;
    };
    
    blog.isTabSelected = function(checkTab){
      return blog.selectedTab === checkTab;
    };
    
    blog.post = {};
    blog.addPost = function(){
      blog.post.createdOn = Date.now();
      blog.post.comments = [];
      blog.posts.unshift(this.post);
      blog.selectedPost = 0;
      blog.post = {};
      $('.scrollspy').scrollSpy();
    };
  }]);
  
  app.controller('CommentController', function(){
    this.comment = {};
    this.addComment = function(post){
      this.comment.createdOn = Date.now();
      post.comments.push(this.comment);
      this.comment = {};
    };
  });
 
})();