(function(){
  var app = angular.module('blogApp',[]);
  
  app.controller('BlogController', ['$http', function($http){
    
    var blog = this;
    blog.title = "AngularJS Blog App";
    
    blog.posts = {};
    $http.get('posts.json').success(function(data){
      blog.posts = data;

      blog.posts.forEach(function(post){
        post.expanded = false;
        
        post.isExpanded = function() {
          return this.expanded;
        };

        post.toggle = function() {
          post.expanded = !post.expanded;
        };
      });
    });
    
    blog.selectedTab = 'blog';
    blog.selectedPost = 0;
    
    blog.selectTab = function(setTab){
      blog.selectedTab = setTab;
    };
    
    blog.isTabSelected = function(checkTab){
      return blog.selectedTab === checkTab;
    };

    blog.selectPost = function(setPost){
      blog.selectedPost = setPost;
    };

    blog.isPostSelected = function(checkPost){
      return blog.selectedPost === checkPost;
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