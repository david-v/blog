(function(){
  angular.module('blogFilters', [])
    .filter('tagFilter', function () {
      return function (items, tags) {
        if (tags.length < 1) {
          return items;
        }
        var filtered = [];
        (items || []).forEach(function (item) {
          var matches = tags.some(function (tag) {
            return (item.tags.indexOf(tag) > -1);
          });
          if (matches) {
            filtered.push(item);
          }
        });
        return filtered;
      };
    });

  var app = angular.module('blogApp', ['ngSanitize', 'blogFilters']);

  app.controller('BlogController', ['$http', '$sanitize', function($http, $sanitize){
    
    var blog = this;
    blog.title = "david.veli!la";
    blog.captcha = 8;
    blog.date = new Date();
    blog.posts = [];
    blog.allTags = [];
    blog.selectedTags = [];

    $http.get('json/posts-2.json').success(function(allPostsData){
      for (var i = 0; i < allPostsData.length; i++) {
        var postData = allPostsData[i];
        var post = new Post(postData);
        for (var j = 0; j < post.tags.length; j++) {
          var tag = post.tags[j];
          if (-1 == blog.allTags.indexOf(tag)) {
            blog.allTags.push(tag);
          }
        }
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

    blog.toggleTag = function(tag){
      var index = blog.selectedTags.indexOf(tag);
      if (index > -1) {
        blog.selectedTags.splice(index, 1);
      } else {
        blog.selectedTags.push(tag);
      }
    };

    blog.isTagSelected = function(tag){
      return (blog.selectedTags.indexOf(tag) > -1);
    }
    
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