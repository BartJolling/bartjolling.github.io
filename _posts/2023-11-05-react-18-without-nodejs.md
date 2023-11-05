---
layout: post
title:  "Create a React 18 application without create-react-app and Node.js"
date: 2023-11-05
last_modified_at: 2023-11-05
categories: blog
tags: [React, Javascript] 
cover-img: /assets/img/2023-11-05-react-without-node-cover.png
thumbnail-img: /assets/img/2023-11-05-react-without-node-thumb.png
share-img: /assets/img/2023-11-05-react-without-node-thumb.png
excerpt: "In this article I show how to quickly get started with a React 18 application without needing create-react-app and Node.js"
---

### My Goal
As a solution architect and background developer, I’ve been leading a team that’s been hard at work on a service with a UI written in React.js. However, I must confess, my familiarity with React and Node.js was initially limited. This posed a challenge, as the conventional method of creating React apps typically involves using the `create-react-app` command which brings in a huge dependency on Node.js and NPM.

But necessity is the mother of invention, and in my quest to better understand and work with React, I used an alternative approach to create React apps without the need for Node.js. This method not only allowed me to delve into React more easily, but it also opened up new possibilities for our project.

In this blog post, I’ll share this approach with you, in the hope that it might aid you in your own development journey. Whether you’re new to React, looking to expand your knowledge, or simply curious about alternative methods, this guide is for you.

### The HTML skeleton

A simple React app requires only a very small HTML page, containing a root `<div>` to render its content into the pages DOM. In below example, its id is `app`.

~~~~ html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width">
        <meta charset="utf-8">
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>        
~~~~

### Include React and JSX

For React we need to include two libraries. The `React` library is responsible for creating views and the `ReactDOM` library is responsible to actually render the UI in the browser.

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Most React developers prefer the conciseness of JSX, and most codebases use it. If you want to use it, also include the `Babel` library.

~~~~ html
    <script type="text/javascript" src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>          
    <script type="text/javascript" src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
~~~~ 

### The React components

When using JSX, you must include your React javascript inside a `<script type="text/babel">` element. Here you can create your new elements and finally instantiate and render them, like this:

~~~~ html
<script type="text/babel">            
    window.onload = function() {

        class Counter extends React.Component {
            state= { num: 0 }
            render() {
                return (
                    <div>{this.state.num}</div>
                );
            }
        }

        const container = document.getElementById('app');
        const root = ReactDOM.createRoot(container);
        root.render(React.createElement(Counter,null,null));
    }
</script>    
~~~~ 


### The Result

To make a visually more compelling example, I've used the Material Design libraries to create a Volume Control card. You can find the result in below Gist. HTML, styles and scripts are all included in a single file so you can open the file in a browser without needing a web server to host the application.

<script src="https://gist.github.com/BartJolling/a086b4a34d4b5c1c51d4037d466ceb5a.js"></script>