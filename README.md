# Astonish Gracious
### a hackathonny code-test
---

# Run the App
## Node:
- clone this project to $basically_anywhere
- cd into $basically_anywhere
- run command `npm i`
- run the command `npm run-script start`
- point your browser to `locahost:3000`
- ???
- profit.
---
## Docker:
### locally
- switch to the 'dockerize' branch
- run `docker build -t astonish-gracious .`
- run `docker run -p 3000:3000 astonish-gracious`
- point your browser to `localhost:3000`
### from docker
- run `docker run cjehmke/astonish-gracious`
- point your browser to `localhost:3000`
---

## Some A's for your Q's:
*Q: Why is there a dockerize branch? You have it on the docker repo..*\
Because I have never used docker and am not hundy on the conventions on having the Dockerfile in github ¯\_(ツ)_/¯

*Q: What's with the god-awful colour scheme*\
A: I am not a designer :D, but I did put some thought into this (https://www.color-hex.com/color-palette/9)

*Q: Basic CSS and JS, what gives??*\
A: I'm familiar with SCSS and LESS as well as using a task runner like Grunt or Webpack to bundle these files for distribution.
While this would obviously improve the project I felt it was too much of a time sink for the amount of CSS/JS present.

*Q: What about XSS??*\
A: I believe Express has some protections, I didn't look into it too much as this is a read-only interface. 
I expect the REST API being interfaced with to have it's own protections, making it going overboard here.\
If it keeps a script-kiddie busy, thinking he can 1337-hAxXoRs in somewhere, all the better.

*Q: Wait, so you don't know if Express has this?*\
A: No, I've actually never used it before

*Q: So then why use it now?*\
A: It was there and a quick way to interface with one of the packages provided.\
I have also discovered that I no longer know Bootstrap.. \
I used to be with it but then the kids changed what it was and now it scares me!\
I just haven't worked on a front-end project for a long time, or used a non-PHP framework.

*Q: When listing characters by dimension, you're not checking if a character appears twice, why?*\
A: Who can be in two places at once? It's a feature, not a bug!

## Some other thoughts
#### In relation to listing characters by dimension (let's be honest this is the one you're looking at)

I ultimately chose the approach of simply cheating the Id since I already had the queries set up to work this way.
The downfall in this is that it makes many calls to the REST API and can be a bit slower. Some of these calls are
a little redundant as information that is later used it already present. This is particularly obvious here as the
residents would all have been listed when retrieving the locations.\
This could be improved by creating local storage and building and storing an object with this information,
then referrring back to said object with other calls. In this instance the downside becomes managing the 'cache' and
making sure it does not become outdated. Such a cache could be per-run with this smaller dataset, meaning it would only
be outdated if the source data gets updated during the user session.

#### In relation to pagination of results

There are 2 ways in which the results can be paginated. The API pagination doesn't really do a good job of paginating the results in the way we want. 
Personally if I were to paginate these results I'd do so through the front-end, passing throught the full list and then limiting what the user sees. Possibly through use of some jQuery library.

However, personally I dislike pagination on non-dense datasets. When presented with dense data such as accounts and transaction records pagination helps by reducing the strain of looking at too many rows of data at once.
When presented with simple records like the character cards presented I prefer to just have infinite scroll mode.

#### In relation to the structure used

This would be slightly simpler with a more monolithic structre, I did indeed do something like that as a quick out-the-door.\
The current structure, that being the way the project files and classes are laid out aims to provide a clear way forward
for any additional work. The aim is to reduce guesswork from the developer in thinking where to put something as it should
be obvious by the surroundings. Hopefully many things just slot in instead of needing to be wedged into place.

#### How is a plumbus made

`const thing = new Plumbus();` among other ways...

#### Anything else?

Ask away, would love to discuss!
