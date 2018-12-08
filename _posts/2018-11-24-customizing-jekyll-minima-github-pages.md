---
layout: post
title:  "Customizing the Jekyll minima theme on Github Pages"
date: 2018-11-24
categories: blog
tags: [jekyll, minima, github pages]
---

My site is based on the [default Jekyll theme minima](https://github.com/jekyll/minima "minima"). It's a one-size-fits-all Jekyll theme for writers that can get you up-and-running quite quickly. Luckily it can be easily customized to fit your needs. I followed the [minima README file](https://github.com/jekyll/minima/blob/master/README.md "Minima Read Me") and [this guide](https://ouyi.github.io/post/2017/12/23/jekyll-customization.html) by [Yi Ou](https://github.com/ouyi) to avoid having to figure out everything myself.

## Configuring out-of-the box plugins
Jekyll comes with some plugings, for example 
- [kramdown](https://kramdown.gettalong.org/ "kramdown"): a ruby library to parse markdown into HTML
- [rouge](https://github.com/jneen/rouge "rouge"): a pure-ruby syntax highlighter 
- [disqus](https://disqus.com/ "Disqus"): a comment plugin

### Markdown and Syntax Highlighting
The default Markdown renderer for Jekyll is kramdown. The other one is [Redcarpet](https://github.com/vmg/redcarpet) but Github has dropped support for it in 2016.

The configuration options for kramdown are [listed here](https://jekyllrb.com/docs/configuration/markdown/ "kramdown configuration"). For example you can configure kramdown for Github Flavored Markdown (GFM) with 'rouge' as the syntax highlighter like this:

```` yaml
markdown: kramdown

kramdown:
  input: GFM
  syntax_highlighter: rouge
````

Ever since GitHub pages have upgraded Jekyll to version 3 you can use Rouge as your default syntax highlighter, like this:
```` yaml
markdown: kramdown
highlighter: rouge
````

### Enabling Disqus comments
To enable Disqus, you first need to set up and account and configure it for your site:
- [Sign-up for a Disqus account](https://disqus.com/profile/signup/ "Disqus sign-up") if you don't have one yet 
- Choose the option 'I want to install Disqus on my site'
- Choose a name for your website and select a category
  - Assume I choose 'my_disqus_shortname' and 'Tech'
- Pick a plan. I went for Basic (Free, Ads Supported)
- Select the 'Jekyll' platform and click 'Configure'
- Configure Disqus and point it to your Github pages website
- Go into your _config.yml file and add following lines

```` yaml
disqus:
  shortname: my_disqus_shortname
````

### Enabling Google Analytics
The minima theme has a plugin for [Google Analytics](https://analytics.google.com/). Sign up for an account and configure a tracking id for your website. To enable Google Analytics, add the following lines to the _config.yml file of your Jekyll site:

````yaml
google_analytics: UA-NNNNNNNN-N
````
But replace UA-NNNNNNNN-N with the tracking id that was assigned to you and your site.


### Enabling Excerpts on the Home PAge
To display post-excerpts on the Home Page, simply add the following to your _config.yml:

````yaml
show_excerpts: true
````

The homepage will show the first paragraph below the title of the post (instead of the full post). I noticed that on HTML pages, you need to put a blank line after the first paragraph to reliably use this feature:

````html
<p>
  This will be shown as excerpt. Put an empty line after this paragraph's closing tag.
</p>

<p>
  This is the second paragraph. Don't hesitate to add more paragraphs after this one.
</p>
````

## Customizing the template
To customize the template you need to copy the files that you want to change into the same folder under your site. From your site's root folder, run this command to open the folder that contains the files of the minima theme.

````bash
cd $(bundle show minima)
````

### Showing an icon for the RSS feed
Copy the head.html and header.html files to your sites _includes folder. Here you can edit them with nano for example.

#### head.html
Add a link to font awesome, e.g. by adding this line inside the <head> block
````html
<head>
...
 <link 
  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" 
  rel="stylesheet" crossorigin="anonymous"
  integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN">
</head>
````
There are other ways of including font-awsome, e.g. [by using their own CDN](https://cdn.fontawesome.com/).

#### header.html
Add a link to your rss feed by adding this line at the end of the <div> with class = "trigger"
````html
<div class="trigger">
...
 <a class="page-link" href="{{ "/feed.xml" | relative_url }}">
  <i class="fa fa-rss" aria-hidden="true"></i>
 </a>
</div>
````

