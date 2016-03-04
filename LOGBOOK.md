#Daily logbook


####I need a blog ASAP!

######25 Feb 2016

After over a week of trying new-to-me tech (Java, Spring, Python, Google AppEngine) I realised of how much fun I was having writing a little sum-up of what I had accomplished each day in my project's logbook. So I had an idea: why not publish this as blog entries too? Not that anyone is going to read them anyway, but who knows? 

So I need a blog. I could use Wordpress, as I'm already paying for a web hosting ($2/month) with PHP support that I don't use that much. Then get one of the nice responsive themes out there and in pretty much 4h I would see my logbook online.

But who likes easy? I've done Wordpress before, so I want to try something new. I haven't done much front end web development for a while, so let's try Angular!

> Blog, Angular

---

####Angular I can't live without you <3

######26 Feb 2016

Angular is much easier than the beast I was afraid I'd be facing. I said something similar with Spring framework before it got very ugly when I started having [insert big integer number here] issues. But for now I'm optimistic.

I've done VanillaJS or jQuery web apps before, which are similar to what I want to accomplish, and it took me a lot of DOM manipulation, custom events, and lots of debugging to get something similar to what 50 lines of javascript with Angular can do. After today, I don't think I could live without "ng-binding" anymore <3

The skeleton of my blog is ready: it loads the blog posts from JSON. That will eventually come from a backend, for now a static JSON file does the job. There'll be only 1 endpoint (e.g /api/posts). Worst case? If I ever reach 1000 posts * 1000 characters per post = 1MB of data. When gzipped, not an issue at all.

> Blog, Angular, JS, jQuery, JSON

---

####Styling up my blog: Materialize CSS

######27 Feb 2016

Today I'm going to style up my blog and make it responsive. I thought of using Twitter's bootstrap first, but that's my wildcard for any prototypes that need a quick styling. I want to try something new, so I gave [Materialize CSS](http://materializecss.com) a try.

In only 30 min, my plain html started looking very much like Google by simply adding some html classes and including the CSS + JS libraries (they're a bit heavy btw, 300kB between both)

I read Materialize's documentation to get ideas to use, and I really liked the ScrollSpy. I've added a custom script that moves the entire table-of-contents slowly as you scroll, as if I had more than 20 posts they'd stop fitting.

Something to bare in mind is that since AngularJS has to render the DOM, the typical $(document).onload(function(){do-your-stuff}) doesn't work. I had to wrap my 'do-your-stuff' in a setTimeout of 1 second. Not ideal but it works. Angular will most likely fire some event such 'dom-rendered' that I can use to trigger 'my-stuff'

> Materialize, CSS, Angular, JS, Blog

---

####"veli!la" CSS animation

######28 Feb 2016

I can't really use Photoshop well enough to create a 'brand' around my blog. So the title had to be plain text. Not ideal, but at least I can reuse a domain name I had purchased a while ago (I knew it would became useful some day!) veli.la

I've made a simple CSS animation to play with my surname: Velilla = veli!la = veli.la 

My blog is now live: [david.veli.la/blog](http://david.veli.la/blog/)  (no backend yet). Just a few tweaks to make it fully responsive, add a title, content metas, and GA tracking. Never forget good old Google Analytics. 

I'll have to add events tracking -as I haven't got links yet. Or maybe explore Angular routing, I'm going to need a URI for my posts individually, having everything in one page is cool, but if someone wanted to share 1 post of mine, they'd need to be able to copy-paste the URL: {base-url}/blog/#my-post-id-here and arrive where they need.

> Blog, CSS, Animation

---

####Polishing my blog's frontend

######29 Feb 2016

My sidebar was pretty dull, so I had to make it a bit more graphic. Google's icons are perfect for the job: they respect material design principles, they're the recommended ones by Materialize, and also they're lightweight and easy to use.

Just include in the headers a link tag with href="https://fonts.googleapis.com/icon?family=Material+Icons" and you're good to go! Start including your icons with "i" tags that have the class "material-icons" [Full explanation here](http://google.github.io/material-design-icons/#using-the-icons-in-html)

The 'wave' effect of buttons is really nice and super simple, just add a class to your anchors.

> CSS, Materialize, Blog
