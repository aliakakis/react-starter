# TEMPORARY NOTICE
- Decorators are currently not working with Babel 6.x and it is a known issue. Until then please have a look at 
a workaround in the Captcha.js file.

# IMPORTANT (IF USING PRE ES6 VERSION)
So I made the switch to full ES2015. OK now... But... you have to do the next few steps. Sorry people...
- Delete your node_modules folder and run npm install again. Babel and React changed a lot thus this necessary step. 
- ALSO install node v.5 otherwise some modules will not install. Hope you like it(?)

# react-starter
Generic react starter project with optional mobservable.

# Why this starter
While I was teaching myself React I found that a lot of the starter projects were either too simple or too complex.
This project has the minimum amount of resources to get you started. This project will be updated to the latest stable
React version whenever it is released. I will probably migrate everything to ES2015 and use high order components in the 
near future.

# Setup
- First run "npm install" and "bower install" for all the necessary packages to install. Please note that I am using the 
latest version of node v.5.2.0 for the testing modules to function properly.
- Gulpfile.js has many build options but three are the most important. "01_run_default_production" should be executed when you are
ready to deploy to a production server while the "_development" is as the wording says for dev only. Actually both are doing the
same thing but the production one also minifies everything.
- The project uses React router and materialize css and has a login page ready with some code to play with.

# Why mobservable
I find the Flux architecture somewhat convoluted for achieving simple stuff. I have to admit that Redux, Reflux and Fluxify seem to have
the simplest implementations yet. However, I have built a simple EventEmitter which can achieve the same results without too much
setup. Try it out. If you find it too simple then just use whichever Flux implementation you deem fit.
However, when I discovered mobservable I have to admit that it is not only elegant but easy to understand and use even for 
large scale applications. I suggest using this over any other Flux implementation.

# Disclaimer
Copy it, sell it, do whatever you like. Suggestions are always welcome as I am still learning React.
