(function(){
  var app = angular.module('blogApp', ['ngSanitize']);

  app.controller('BlogController', ['$http', '$sanitize', function($http, $sanitize){
    
    var blog = this;
    blog.title = "AngularJS Blog App";
    
    blog.posts = {};
    $http.get('posts.json').success(function(data){
      blog.posts = data;

      blog.posts.forEach(function(post){
        post.expanded = false;

        post.toHtml = function() {
          return $sanitize.parseAsHtml(post.body);
        }
        
        post.isExpanded = function() {
          return this.expanded;
        };

        post.toggle = function() {
          post.expanded = !post.expanded;
        };
      });

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