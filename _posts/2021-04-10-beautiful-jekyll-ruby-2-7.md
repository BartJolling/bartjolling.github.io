---
layout: post
title:  "Changing from Jekyll minima to the Beautiful Jekyll theme on Github Pages"
date: 2021-04-10
categories: blog
tags: [jekyll, beautiful jekyll, github pages]
excerpt: Changing Github Pages theme from Jekyll minima to Beautiful Jekyll while upgrading to Ruby 2.7
---

A few years ago [I set up this Github Page]({{ site.baseurl }}{% link _posts/2018-11-18-jekyll-on-wsl-for-github-pages.md %}) using Jekyll and its [Jekyll minima theme](https://github.com/jekyll/minima). I used the Windows Subsystem for Linux (WSL) on Windows 10 with Ubuntu 18.04 and Ruby 2.5.

I wanted to refresh the layout by by changing the theme to [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) and use more recent versions of the tools. Some time in the past year, I had upgraded my Ubuntu 18.04 to 20.04 running on WSL2.

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
Start from a fresh git repository. Also clone the Beautiful Jekyll theme so it's easier to copy over files. From the `/home/bart/` directory, execute these commands:

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

Browse to [https://127.0.0.1:4000/](https://127.0.0.1:4000/) to check if everything is still OK.

## Migrate Incrementally

### Gemspec
Modify the `Gemfile` to just contain
~~~~ 
source "https://rubygems.org"
gemspec
~~~~

Copy the `beautiful-jekyll-theme.gemspec` file from Beatiful Jekyll but make following modifications:
- Upgrade Jekyll to at least 3.9.1
- Add dependency to the minima theme package

~~~~ ruby
...
spec.add_runtime_dependency "jekyll", "~> 3.9.1"
spec.add_runtime_dependency "minima", "~> 2.0"
...
~~~~ 
Follow the same steps above to `bundle install`, `update` and `exec` the site. It should still work.

### File Copy
Now copy over all additional files from the Beautiful Jekyll theme, except the `/_posts`

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
Change `_config.yml` to customize the site for you:
- Set `title`, `author`, `avatar` image, `title-img` image, ... 
- Configure the `navbar-links`
- Setup `social-network-links` for `email`, `github`, `linkedin`, `disqus`, ... 
- Fill in the `google_analytics` id for the site
- Customize the `permalink` format. 

> **I removed the `permalink` value, because I wanted to keep the standard URL format to avoid breaking my Google Search results**

## Publish to Github Pages
Follow the same steps above to `bundle install`, `update` and `exec` the site. The site should render using the Beautiful Jekyll theme.
Now you can publish to Git.

This triggers the automated Jekyll build on Github Pages and publishes the site on [github.io]( {{ site.baseurl }}/ )
~~~~ shell
git add --all
git commit -m "Migrated to the Beatiful Jekyll theme"
git push -u origin master
~~~~