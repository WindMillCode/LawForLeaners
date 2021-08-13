# Summary
law4learners

## Features include 

Only members of the project can read the README.md from the ignore folder

# Stack 

## Frontend

## Backend


## Testing
* Docker, (tes in docker containers from linux VM) v20.10.7

### Unit
* rspec    v3.10.0
* capybara v3.35.3

### Integration
* rspec    v3.10.0
* capybara v3.35.3

### E2E
* rspec    v3.10.0
* capybara v3.35.3
* puffing billy v2.4.1

## Hosting
* Firebase v9.16.1
    * site (https://lawforlearners.firebaseapp.com/home)


### CMS
* Cosmicjs

## CI/CD
* CircleCI
* Docker v20.10.7
* Virtual Box v 6.1.22
* Ubuntu VM 20.04.1


# Structure

## Cosmicjs CMS
* when a metadata field has the type navlinks
    * the metafield itself is a parrent
    * there should be a child metafield with the HEADS key to refer to the nav heads
        * they key should be numerical starting from 0 and value is the desired nav field
    * there should be proceeding child metafield with key = [OPTION VALUE] to properly connect the subfields with the coorect field 
        * they key should be numerical starting from 0 and value is the desired nav field
        

## Linting Rules
* for each commit, we append "WORKING COMMIT" so we know the commit is free of bugs
* ruby indentation 2 lines
* ts indentation 4 lines
* we prefix all our styles with "a_p_p_" a judima methodlogy so as not to confunse with 3rd party libs


## Project Directory Mapping

### Frotend
#### Configurations


### Backend

#### Configurations
* refer to README.md in ignore


### Testing 
* in __AngularApp/testing/TESTS.md__ we have  where we write pseudo code for our unit,e2e and integration tests later
*    __AngularApp/testing/e2e/social-e2e-circleci.rb__ - is where all of our e2e tests live, we test on docker in a ubuntu 20.04 to closely represent the circleCI env and write the code 
* in the local testing env we use a gui browser, to oberserve to  make sure the tests work properly, however in circleci we have the browsers run in headless mode. 

### CI/CD
* IN .circle is our config.yml, we make use of the company's Docker image as well as the circleci browser-build tools orb, as a general practice we packages our dependencies into the orb so we dont have to increased build times


### Issues
* say we have issues and we are looking for support with a library language or other 3rd party found here __AngularApp/misc/issues__
### Future Plans
refer to README.md in ignore


## Site Navigation


### Home Page 



# Aspects

## Challenges

## Mistakes/Failures

## Enjoyed

## Leadership

## Conflict

## Done Different


# Issues 
* video autoplay inconsistent behaviour get help to solve the problem, 
* some odd reason CircleCI cant cache the ruby deps
```
      - restore_cache:
          keys:
            # Find a cache corresponding to this specific package-lock.json
            - bundle-deps-v1-{{ checksum "/root/project/AngularApp/testing/e2e/Gemfile.lock" }}

      - save_cache:
          key: bundle-deps-v1-{{ checksum "/root/project/AngularApp/testing/e2e/Gemfile.lock" }}
          paths:
            - /root/project/AngularApp/testing/e2e/vendor/bundle    
```            


# TODO

## Template Updates
* include .firebaserc in projects
* provide for a target-e2e-circleci.rb in projects



# Resources
[envato free video](https://www.storyblocks.com/video/search/law?search-origin=search_bar)
[w3 mouseenter](https://www.w3schools.com/jsref/event_onmouseenter.asp)
[avenir font](https://fonts.google.com/?query=AVENIR)
[DomSanitizer](https://stackoverflow.com/a/68394292)

## MISC
emaail - law4learners@gmail.com

## Snippets
* build an image
```sh
sudo docker build -t windmillcode/angular-tornado-capybara:0.1.9 ruby-python-node
```
* generate a new module 
```ps1
npx ng g module resume --routing=true
```
* generate a new component
```ps1
npx ng g component shared/nav --change-detection=OnPush --export=true --module=shared --style=none

npx ng g component videos/main --change-detection=OnPush --export=true --module=videos --style=none

```
* generate a new pipe

```ps1
npx ng g pipe sanitize-url --export=true --module=shared

```

* generate a new directive
```ps1
npx ng g directive contact/directive/links --module=contact --export=true
npx ng g directive shared/subNav --module=shared
```


## Media
[Video by Karolina Grabowska from Pexels](https://www.pexels.com/video/men-discussing-about-work-with-a-woman-8136062/) 
<!-- bunch of links -->


[Photo by Cytonn Photography from Pexels](shared_1.jpg)












