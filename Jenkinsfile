#!/usr/bin/groovy

node {
    stage 'Checkout'
    checkout scm
}

node {
    stage 'Lint'

    sh 'docker --rm -v `pwd`:/app:rw -w /app falci/ng ng lint'
}

node {
    stage 'Unit Tests'

    sh 'docker --rm -v `pwd`:/app:rw -w /app falci/ng ng test'
}

node {
    stage 'End-to-end Tests'

    sh 'docker --rm -v `pwd`:/app:rw -w /app falci/ng ng e2e'
}

node {
    stage 'Build'

    def ngEnv = 'development'

    if(env.BRANCH_NAME == 'master'){
        ngEnv = 'production'
    }

    sh "docker --rm -v `pwd`:/app:rw -w /app falci/ng ng build --target=${ngEnv}"
}

node {
    stage 'Deploy'
    def www = '/var/www/html'
    def server = 'none'

    if(env.BRANCH_NAME == 'develop'){
        server = 'bl-dev-web'
    }
    if(env.BRANCH_NAME == 'master'){
        server = 'bl-qa-web'
    }

    if(server != 'none') {
        echo "Deploying files to ${server}"
        sh "scp ./dist/* ${server}:${www}"
    } else {
        echo "Deploy ignored (custom branch)"
    }
}
