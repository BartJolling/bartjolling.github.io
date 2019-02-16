---
layout: post
title:  "Building Github Pages with Jekyll on the Windows Subsystem for Linux"
date: 2018-11-18
last_modified_at: 2018-11-24
categories: blog
tags: [Jekyll, Github Pages, Windows Subsystem for Linux] 
---

Since some time I've been planning to move my blog away from [blogspot](https://bartjolling.blogspot.com/ "Bart's Software Cookbook on Blogspot.com") to [Github Pages](https://pages.github.com/ "Github Pages"). I could have done it the traditional way and uploaded html files, but Github Pages support blogging with [Jekyll](https://jekyllrb.com/ "Jekyll") using _beautifull_ markdown (sic) so that's what I wanted to try out.

## Context

I've been a Windows developer and power user for a long time so I wanted to make this work on my Windows 10 machine. Jekyll is a Ruby application that can run on Windows 10 natively (but with a bunch of caveats) or within the Windows Subsystem for Linux (WSL). The latter is something I've been wanting to give a spin anyway and the Jekyll devs seems reasonably comfortable with that option so that is what I went for.

## Install Jekyll via Bash on Windows 10

Following the guide at [Jekyll's Windows Installation page](https://jekyllrb.com/docs/installation/windows/#installation-via-bash-on-windows-10):

### Activate the Windows Subsystem for Linux (WSL)
The WSL is a pre-requisite for running a Linux distro that can run Jekyll. To install:
- Open the Settings App 
- Click 'Apps'
- In the left pane, below the 'Apps' title, click 'Apps & Features'
- In the right pane, below the 'Related settings' title, click 'Programs and Features'
- In the left pane, click 'Turn Windows Features on or off'
- Scroll down until you encounter 'Windows Subsystem for Linux' 
- Make sure that the checkbox on its left is checked
- Click 'OK'. This will probably require you to reboot your machine

### Install Ubuntu 18.04 LTS on the WSL
Ubuntu can be installed directly from the Microsoft Store:
- Open the Microsoft Store App
- Search for "Ubuntu"
- In the search results, select 'Ubuntu 18.04 LTS'
- Click 'Install'
- Once installation is done, click 'Launch'. 
  * This will open Bash in a console that runs on Ubuntu on your Windows 10 machine
- You will be prompted you for a user name and password. 
  * They don't have to match your Windows account.

### Install Ruby in Ubuntu
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

Then install Jekyll itself and check if it works:
~~~~ shell
sudo gem install jekyll bundler
bundle config path vendor/bundle
jekyll -v
~~~~
The last command should output the version number.

## Setting up a GitHub repository to host your Github pages

If you don't have a GitHub account, you can [sign up here](https://github.com/join).

Follow the guide on [Github Pages](https://pages.github.com/ "GitHub Pages"):
- Create a repository, named "_github_username_.github.io" 
  * where _github_username_ is your GitHub username
  * In my case, the repository is called "[bartjolling.github.io](https://github.com/BartJolling/BartJolling.github.io)"
- In your local Bash, navigate to your /home/_linux_username_/ folder (if not already there)
  * _linux_username_ is the user name you created after the installation of Ubuntu in WSL
  * In my case, the homefolder is called "/home/bjolling/"
- Clone your Github repository to your home folder

~~~~ shell
sudo apt-get install git
git clone https://github.com/github_username/github_username.github.io
~~~~

## Scaffold a Jekyll site - choosing a theme

Depending on what kind of website you want to create, the procedure is slightly different although you can mix and match as you please. 
- For my personal website with a blog, I'm using the default minima theme. This theme supports layouts for a main homepage, regular pages and blog posts out of the box.
- For a project website, I would use one of the custom Github Jekyll themes.

### Option 1: Scaffold a personal site - minima theme

In Bash from your user's home folder, execute the following command to initialize a template site, replacing github_username with your actual Github username:

~~~~ shell
jekyll new github_username.github.io
~~~~

This will create the files Jekyll requires to build the site, an index page and some sample pages and posts. The default Gemfile that is created uses the "jekyll" gem which is sufficient so there is no need to change it. 

### Option 2: Scaffold a project site - custom theme
In this option you will have to create the required files yourself, starting with the Gemfile. 

~~~~ shell
cd github_username.github.io
nano Gemfile
~~~~

My Gemfile looks like this:
~~~~ text
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins

## If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end
~~~~

Execute the followings commands to install the github-pages gem and fix version conflicts:

~~~~ shell
bundle install
bundle update
~~~~

### Configure Jekyll site generation
Using nano, create a _config.yml or adjust the settings in the existing _config.yml to match your site.

~~~~ shell
cd github_username.github.io
nano _config.yml
~~~~

For example, I added the 'rouge' syntax highlighter so my file looks like this:
~~~~ yaml
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

If you have installed the "github-pages" gem in your Gemfile, you can pick any theme from [this list](https://pages.github.com/themes/), instead of minima.

## Build and serve the site locally
Open a second Bash in WSL, navigate to the folder of the website and start the Jekyll process:
~~~~ shell
cd github_username.github.io
bundle exec jekyll serve
~~~~

This will build the site and host it on [http://localhost:4000](http://localhost:4000) which you can access from a browser on your Windows 10 machine.

## Publish to Github and build Github page
Make sure that the vendor folder is ignored by git. You only need to do this once:
~~~~ shell
echo 'vendor/' >> .gitignore
~~~~

Upload the changes to the Github repository and trigger the automated Jekyll build on Github Pages:
~~~~ shell
git add --all
git commit -m "Initial commit"
git push -u origin master
~~~~

If the build on Github Pages fails, you will get a notification via mail. But if every went according to plan, your scaffolded Jekyll site should be up and running on https://_github_username_.github.io/
