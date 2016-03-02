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

  var app = angular.module('blogApp', ['ngSanitize', 'blogFilters', 'ngCookies']);

  app.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });

  app.controller('BlogController', [
            '$http', '$sanitize', '$cookies', '$timeout', 
    function($http,   $sanitize,   $cookies,   $timeout) {
    
    var blog = this;
    blog.title = "david.veli!la";
    blog.captcha = 8;
    blog.date = new Date();
    blog.posts = [];
    blog.allTags = [];
    blog.selectedTags = [];

    $http({
      method: 'GET',
      url: 'http://localhost:8000/blog/posts'
    }).then(
      function(response){
        console.log($cookies.get('csrftoken'));
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');

        allPostsData = response.data;
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
        $timeout(onDomLoaded, 500);
      },
      function(error){
        console.log(error);
      }
    );
    
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
      $timeout(function(){
        $('.scrollspy').scrollSpy();
      });
    };

    blog.clearSelectedTags = function(){
      blog.selectedTags = [];
    }

    blog.isTagSelected = function(tag){
      return (blog.selectedTags.indexOf(tag) > -1);
    }
    
  }]);
  
  app.controller('CommentController', ['$http', '$cookies', function($http, $cookies){
    this.comment = {};
    this.addComment = function(post){
      if (this.comment.captcha != (post.id % 8)) {
        var $toastContent = $('<span>Check your maths!</span>');
        Materialize.toast($toastContent, 5000);
        return false;
      }
      this.comment.createdOn = Date.now();
      post.comments.push(this.comment);

      $http({
        method: 'POST',
        url: 'http://localhost:8000/blog/posts/' + post.id + '/comment',
        headers: {
         'Content-Type': 'application/json'
        }, 
        data: JSON.stringify({
          author: this.comment.author,
          body: this.comment.body,
          captcha: this.comment.captcha
        })
      }).then(
        function(data){
          var $toastContent = $('<span>Success posting comment</span>');
          Materialize.toast($toastContent, 5000);
        },
        function(error){
          var $toastContent = $('<span>Error posting comment</span>');
          Materialize.toast($toastContent, 5000);
        }
      );
      this.comment = {};
    }
  }]);

  function onDomLoaded() {
    $('.scrollspy').scrollSpy();
    $('.tooltipped').tooltip();
    Prism.highlightAll();
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );
    var toc = $('.table-of-contents');
    toc.pushpin({ top: (toc.offset().top - 20) });
    var burger = $('.burger');
    burger.pushpin({ top: (burger.offset().top) });
    $(window).scroll(function() {
      var scrolled = $(document).scrollTop();
      $('.table-of-contents').css('top', (parseInt(scrolled) * -0.03) + 'px');
      if (window.innerWidth > 600) {
        $('#floating-name').css('top', (10 + (parseInt(scrolled) * -1)) + 'px');
      }
    });
  }

})();