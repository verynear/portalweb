# Better Leasing

## Getting Started

### Installation/Dependencies

* [Node](https://nodejs.org/) 8.9.1
* [Angular CLI](https://cli.angular.io/) 1.3.1
* [Angular](https://angular.io/) >= 4.2.4 (installed via `npm install`)

### Build/Deployment

In order to run the project locally, run `ng serve`. It will compile and start a server on [http://localhost:4200](http://localhost:4200.).
The local server connects to the [dev api](http://apidev.betterleasing.com/)

### Branches

There are two important branches: `master` (used by QA/Stage) and `develop`. 

For each new feature/fix, create a new custom branch.


#### Develop
Before starting a new feature, create a new local branch from `develop`: 
```
git checkout develop
git pull origin develop
git checkout -b feature/feature-name
```

After your changes are done, send you branch to Bitbucket and create a Pull Request to `develop`.

Once the code is merge to develop, you can run [Jenkins](http://jenkins.betterleasing.com/blue/organizations/jenkins/bl-web-portal/branches) (develop).
It will build and deploy all the branch content to [dev server](http://dev.betterleasing.com/).

The `develop` branch and the dev server may have some unstable/unfinished feature.
 
#### Master
Once dev is stable and we have all features for the next release, you should create a PR from `develop` to `master`.
 
After merged, go to Jenkins and run the `master` job. The master branch will be deployed to the [stage server](http://stage.betterleasing.com/).

For each success build, Jenkins will generate a new tag and push it back to the repository. Production version will use this tag once it' fully tested and approved. 

### Angular components

Angular components are created using the `ng` command line tool (Angular CLI).

Here's the most common commands:

| Component | Command | Folder |
|----------|-------------|------|
| page | ng g component pages/page-name | /src/app/pages |
| service | ng g service services/service-name | /src/app/services |
| component | ng g component components/component-name | /src/app/components |
| pipe (filter) | ng g pipe pipes/pipe-name | /src/app/pipes |


### Lint

Before submiting a PR you need to check the _Lint_: `ng lint`. Keep in mind that Jenkins won't build your project if lint is failing.


### TBD
* Jenkins tags
* Production deploy
* Code review requirements
* Test coverage requirements
# My project's README
