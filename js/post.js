function Post(options) {
    var defaults = {
        'tags': [],
        'comments': [],
        'image': ''
    }
    var settings = $.extend({}, defaults, options);

    this.id        = settings.id;
    this.title     = settings.title;
    this.createdOn = settings.createdOn;
    this.body      = settings.body;
    this.tags      = settings.tags;
    this.comments  = settings.comments;
    this.image     = settings.image;
    this.expanded  = false;
}

Post.prototype = {
    constructor: Post,
    isExpanded: function() {
        return this.expanded;
    },
    toggle: function() {
        this.expanded = !this.expanded;
    }
}