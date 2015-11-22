# IMPORTANT
So it seems that I made the switch to full ES2015. OK so the next thing I am about to say you will probably not like.
Delete your node_modules folder and run npm install again. Babel and React changed a lot thus this necessary step. 
ALSO install node 5 otherwise some modules will not install. Hope you like it(?)

# react-starter
Generic react starter project with optional Redux.

# Why this starter
While I was teaching myself React I found that a lot of the starter projects were either too simple or too complex.
This project has the minimum amount of resources to get you started. This project will be updated to the latest stable
React version whenever it is released. I will probably migrate everything to ES2015 and use high order components in the 
near future.

# Setup
1) First run "npm install" for all the necessary packages to install. Please note that I am using the latest version of node
for the testing modules to function properly.
2) Gulp file has many build options but three are the most important. "01_run_default_production" should be executed when you are
ready to deploy to a production server while the "_development" is as the wording says for dev only. Actually both are doing the
same thing but the production one also minifies everything.
3) The project uses React router and materialize css and has a login page ready with some code to play with.

# Why no Flux
I find the Flux architecture somewhat convoluted for achieving simple stuff. I have to admit that Redux, Reflux and Fluxify seem to have
the simplest implementations yet. However, I have built a simple EventEmitter which can achieve the same results without too much
setup. Try it out. If you find it too simple then just use whichever Flux implementation you deem fit.

# Disclaimer
Copy it, sell it, do whatever you like. Suggestions are always welcome as I am still learning React.
