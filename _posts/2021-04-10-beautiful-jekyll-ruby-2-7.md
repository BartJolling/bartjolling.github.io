---
layout: post
title:  "Changing from Jekyll minima to the Beautiful Jekyll theme on Github Pages"
date: 2021-04-10
categories: blog
tags: [jekyll, beautiful jekyll, github pages]
modified_time: 2021-04-12
excerpt: Changing Github Pages theme from Jekyll minima to Beautiful Jekyll while upgrading to Ruby 2.7
cover-img: /assets/img/2021-04-10-beautiful-jekyll-cover.png
thumbnail-img: /assets/img/2021-04-10-beautiful-jekyll-thumb.png
share-img: /assets/img/2021-04-10-beautiful-jekyll-logo.png
---

A few years ago [I set up this Github Page]({{ site.baseurl }}{% link _posts/2018-11-18-jekyll-on-wsl-for-github-pages.md %}) using Jekyll and its [Jekyll minima theme](https://github.com/jekyll/minima). I used the Windows Subsystem for Linux (WSL) on Windows 10 with Ubuntu 18.04 and Ruby 2.5.

I wanted to refresh the layout by changing the theme to [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) and use more recent versions of the tools. Some time in the past year, I had upgraded my Ubuntu 18.04 to 20.04 running on WSL2.

## Spring Clean

### Upgrading to Ruby 2.7
To make sure I cleanly started over, I uninstalled all Ruby Gems, Ruby 2.5 and Ruby 2.6. Then I installed Ruby 2.7

~~~~ shell
for x in `gem list --no-versions`; do gem uninstall $x -a -x -I; done

sudo apt update

sudo apt-get purge ruby2.5
sudo apt-get purge ruby2.5-dev
sudo apt-get purge ruby2.6
sudo apt-get purge ruby2.6-dev

sudo apt-get autoremove

sudo apt install ruby2.7
sudo apt install ruby2.7-dev

ruby --version
~~~~

This last command returned
~~~~ shell
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-linux-gnu]
~~~~ 


### Getting the code
I started from a fresh local git repository and cloned the *Beautiful Jekyll* theme to my PC to make it easier to copy files. From the `/home/bart/` directory, I executed these commands:

~~~~ shell
rm -rf ./bartjolling.github.io/
git clone https://github.com/BartJolling/bartjolling.github.io.git
git clone https://github.com/daattali/beautiful-jekyll.git
~~~~

At this point, I rebuilt my site by installing and updating all required gems:

~~~~ shell
cd ./bartjolling.github.io/

bundle install
bundle update

bundle exec jekyll serve
~~~~ 

Browsing to [https://127.0.0.1:4000/](https://127.0.0.1:4000/) confirmed everything is still OK.

## Incremental Migration

### Gemspec
I modified the `Gemfile` to just contain:
~~~~ 
source "https://rubygems.org"
gemspec
~~~~

I copied the `beautiful-jekyll-theme.gemspec` file from the *Beautiful Jekyll* repository but made following modifications:
- Upgraded Jekyll to at least 3.9.1
- Added a temporary dependency to the *minima* theme package, so I could verify if above change broke something or not.

~~~~ ruby
...
spec.add_runtime_dependency "jekyll", "~> 3.9.1"
spec.add_runtime_dependency "minima", "~> 2.0"
...
~~~~ 
I followed the same steps above to `bundle install`, `update` and `exec` the site. The page built and rendered correctly, still using the *minima* theme as expected.

### File Copy
Then I copied all additional files from the *Beautiful Jekyll* theme, except the `/_posts/`

| Files/Folders | Remarks                                                          |
| ------------- | ---------------------------------------------------------------- | 
|`_data/`       |                                                                  |
|`_includes/`   | Overwrites `head.html` and `header.html`. Backup customizations! |
|`_layouts/`    |                                                                  |
|`assets/`      | Location for images, custom scripts and custom stylesheets       |
|`config.yml`   | To be customized! Backup original file first! More details below |
|`feed.xml`     | Template for the [Atom RSS feed]( {{ site.baseurl }}/feed.xml)   |
|`index.html`   | Landing page with paginated overview of your posts               |
|`LICENSE`      | Required MIT License                                             |
|`staticman.yml`|                                                                  |
|`tags.html`    | Template for the [tags]({{ site.baseurl }}/tags) overview page   |

### _config.yml
I changed `_config.yml` to customize my site:
- Set `title`, `author`, `avatar` image, `title-img` image, ... 
- Configured the `navbar-links`
- Set up `social-network-links` for `email`, `github`, `linkedin`, `disqus`, ... 
- Filled in the `google_analytics` id for the site
- Customized the `permalink` format. 

> **I removed the `permalink` setting, because I wanted to keep the default Jekyll URL format to avoid breaking my existing Google Search results**

## Publish to Github Pages
I followed the same steps above to `bundle install`, `update` and `exec` the site. The site now nicely rendered using the *Beautiful Jekyll* theme.

Everything was ready to commit and publish to Github. This triggers the automated Jekyll build on Github Pages and publishes the site on [github.io]( {{ site.baseurl }}/ )
~~~~ shell
git add --all
git commit -m "Migrated to the Beautiful Jekyll theme"
git push -u origin master
~~~~
