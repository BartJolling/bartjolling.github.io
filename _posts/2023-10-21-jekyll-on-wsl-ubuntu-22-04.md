---
layout: post
title:  "Getting Jekyll to work on Ubuntu 22.04 with Ruby 3"
date: 2023-10-21
last_modified_at: 2023-10-21
categories: blog
tags: [Jekyll, Windows Subsystem for Linux, Ruby] 
cover-img: /assets/img/2023-10-21-jekyll-on-wsl-ubuntu-22-04-cover.jpg
thumbnail-img: /assets/img/2023-10-21-jekyll-on-wsl-ubuntu-22-04-thumb.jpg
share-img: /assets/img/2023-10-21-jekyll-on-wsl-ubuntu-22-04-thumb.jpg
---

In 2018 I had moved my blog to Github pages using Jekyll on the Windows Subsystem for Linux (WSL). But when doing the setup again on a new laptop with Ubuntu 22.04 and Ruby 3, I found out the hard way the steps for installing Ruby from [my original guide]({% post_url 2018-11-18-jekyll-on-wsl-for-github-pages %}) are quite different now:

### Install Ruby 3 in Ubuntu 22.04
The steps as outlined in the [Jekyll installation guide](https://jekyllrb.com/docs/installation/windows/#installation-via-bash-on-windows-10) are outdated and still refer to Ruby 2.5.

Jekyll needs the Ruby runtime to function correctly and the Jekyll themes for Github Pages depend on a number of libraries if you want to use Ruby 3.

~~~~ shell
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install zlib1g-dev libffi-dev libssl-dev libyaml-cpp-dev
sudo apt-get install ruby ruby-dev build-essential dh-autoreconf 
sudo gem update
~~~~

Then install Jekyll itself and check if it works

~~~~ shell
sudo gem install jekyll bundler
bundle config path vendor/bundle
jekyll -v
~~~~
The last command should output the version number.

### Create your Github Pages site

From here, you can continue following [my original guide]({% post_url 2018-11-18-jekyll-on-wsl-for-github-pages %}).