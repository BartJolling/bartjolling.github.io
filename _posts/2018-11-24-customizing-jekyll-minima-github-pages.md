---
layout: post
title:  "Customizing the Jekyll minima theme on Github Pages"
categories: blog
tags: [jekyll, minima, github pages]
---

## Introduction
My site is based on the [default Jekyll theme minima](https://github.com/jekyll/minima "minima"). It's a one-size-fits-all Jekyll theme for writers that can get you up-and-running quite quickly. Luckily it can be easily customized to fit your needs. I followed the [minima README file](https://github.com/jekyll/minima/blob/master/README.md "Minima Read Me") and [this guide](https://ouyi.github.io/post/2017/12/23/jekyll-customization.html) by [Yi Ou](https://github.com/ouyi) to avoid having to figure out everything myself.

## Configuring out-of-the box plugins
Jekyll comes with some plugings, for example 
- [kramdown](https://kramdown.gettalong.org/ "kramdown"): a ruby library to parse markdown into HTML
- [rouge](https://github.com/jneen/rouge "rouge"): a pure-ruby syntax highlighter 
- [disqus](https://disqus.com/ "Disqus"): a comment plugin


### Enabling Disqus comments
To enable Disqus, you first need to set up and account and configure it for your site:
- [Sign-up for a Disqus account](https://disqus.com/profile/signup/ "Disqus sign-up") if you don't have one yet 
- Choose the option 'I want to install Disqus on my site'
- Choose a name for your website and select a category
  - I choose "bartjolling" and 'Tech'
- Pick a plan. I went for Basic (Free, Ads Supported)
- Select the 'Jekyll' platform and click 'Configure'
- Configure Disqus and point it to your Github pages website
- Go into your _config.yml file and add following lines

```yaml
  disqus:
    shortname: my_disqus_shortname
```




