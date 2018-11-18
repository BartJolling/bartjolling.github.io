---
layout: post
title:  "Building Github Pages with Jekyll on the Windows Subsystem for Linux"
categories: [Jekyll] 
---

# Introduction

Since some time I've been planning to move my blog away from [blogspot](https://bartjolling.blogspot.com/ "Bart's Software Cookbook on Blogspot.com") to [Github Pages](https://pages.github.com/ "Github Pages"). I could have done it the traditional way and just uploaded html files, but Github Pages support blogging with [Jekyll](https://jekyllrb.com/ "Jekyll") using _beautifull_ markdown so that's what I wanted to try out.

# Context

I've been a Windows developer and power user for a long time so I wanted to make this work on my Windows 10 machine. Jekyll is a Ruby application that can run on Windows 10 natively (but with a bunch of caveats) or within the Windows Subsystem for Linux (WSL). The latter is something I've been wanting to give a spin anyway and the Jekyll devs seems reasonably comfortable with that option so that is what I went for.

# Install Jekyll via Bash on Windows 10

Following the guide at [Jekyll's Windows Installation page](https://jekyllrb.com/docs/installation/windows/#installation-via-bash-on-windows-10):

## Activate the Windows Subsystem for Linux (WSL)
The WSL is a pre-requisite for running a Linux distro that can run Jekyll. To install:
- Open the Settings App 
- Click 'Apps'
- In the left pane, below the 'Apps' title, click 'Apps & Features'
- In the right pane, below the 'Related settings title', click 'Programs and Features'
- In the left pane, click 'Turn Windows Features on or off'
- Scroll down until you encounter 'Windows Subsystem for Linux' 
- Make sure that the checkbox on its left is checked
- Click 'OK'. This will probably require you to reboot your machine

## Install Ubuntu 18.04 LTS on the WSL
Ubuntu can be installed directly from the Microsoft Store:
- Open the Microsoft Store App
- Search for "Ubuntu"
- In the search results, select 'Ubuntu 18.04 LTS'
- Click 'Install'
- Once installation is done, click 'Launch'. 
  * This will open Bash in a console that runs on Ubuntu on your Windows 10 machine
- You will be prompted you for a user name and password. 
  * They don't have to match your Windows account.

## Install Ruby in Ubuntu
From here, follow the steps as outlined in the [Jekyll installation guide](https://jekyllrb.com/docs/installation/windows/#installation-via-bash-on-windows-10).

Jekyll needs the Ruby runtime to function correctly and the Jekyll themes for Github Pages depend on zlib:
~~~~ shell
sudo apt-get install zlib1g-dev
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.5 ruby2.5-dev build-essential dh-autoreconf
sudo gem update
~~~~

Then install Jekyll itself and check if it works
~~~~ shell
sudo gem install jekyll bundler
jekyll -v
bundle config path vendor/bundle
~~~~

# Setting up a GitHub repository to host your Github pages

If you don't have a GitHub account, you can [sign up here](https://github.com/join).

Follow the guide a [Github Pages](https://pages.github.com/ "GitHub Pages"):
- Create a repository, named "_github_username_.github.io" 
  * where _github_username_ is your GitHub username
  * In my case, the repository is called "[bartjolling.github.io](https://github.com/BartJolling/BartJolling.github.io)"
- In your local Bash, navigate to your /home/_linux_username_/ folder (if not already there)
  * _linux_username_ is the user name you created after the installation of Ubuntu in WSL
  * In my case, the homefolder is called "/home/bjolling/"
- Clone your Github repository to your home folder

~~~~ shell
git clone https://github.com/github_username/github_username.github.io
~~~~

# Scaffold a Jekyll site - choosing a theme

Depending on what kind of website you want to create the following steps are different, although you can mix and match as you please. For my personal website with a blog, I'm using the default minima theme. For a project website, I would use one of the custom Github Jekyll themes. I'll describe both:

## Option 1: Scaffold a personal site - minima theme

This option is the quickest way to become productive. It is easy to install and it supports layouts for a main homepage, regular pages and blog posts out of the box.

In Bash from your user's home folder, execute following commands to initialize a template site and update the config file

~~~~ shell
jekyll new github_username.github.io
cd github_username.github.io
nano _config.yml
~~~~

In nano, adjust the settings in _config.yml to match your site. For example, I added the 'rouge' syntax highlighter so my file looks like this
~~~~ text
title: Bart's Software Cookbook
email: BartJolling@users.noreply.github.com
description: Solution Architect, Development Lead, Problem Solver
baseurl: ""
url: "https://bartjolling.github.io"
github_username: BartJolling

markdown: kramdown
theme: minima
plugins:
  - jekyll-feed
~~~~

In nano, adjust the settings in Gemfile to replace the "jekyll" gem with the "github-pages" gem.
~~~~ shell
nano Gemfile
~~~~

My Gemfile looks like this
~~~~ text
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end
~~~~

## Option 2: Scaffold a project site - Github theme




# Publish to Github and build Github page
Make sure that the vendor folder is ignored by git. Only need to do this once:
~~~~ shell
echo 'vendor/' >> .gitignore
~~~~

Upload the changes to the Github repository and trigger the automated jekyll build on Github Pages:
~~~~ shell
git add --all
git commit -m "Initial commit"
git push -u origin master
~~~~

At this point, your scaffolded Jekyll site is up and running on https://_github_username_.github.io/

