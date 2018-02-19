#!/usr/bin/groovy

def notifySlack(String buildStatus = 'STARTED') {
    // Build status of null means success.
    buildStatus = buildStatus ?: 'SUCCESS'

    def color

    if (buildStatus == 'STARTED') {
        color = '#D4DADF'
    } else if (buildStatus == 'SUCCESS') {
        color = 'good'
    } else if (buildStatus == 'UNSTABLE') {
        color = 'warning'
    } else {
        color = 'danger'
    }

    def msg = "${buildStatus}: Job ${env.JOB_NAME} [<${env.BUILD_URL}|${env.BUILD_NUMBER}>]"

    slackSend(color: color, message: msg)
}

try {
  node {
      stage 'Install'

      notifySlack()

      checkout scm

      sh 'docker run --rm -v `pwd`:/app:rw -w /app falci/ng npm update'
      sh 'docker run --rm -v `pwd`:/app:rw -w /app falci/ng npm install'
      sh 'docker run --rm -v `pwd`:/app:rw -w /app falci/ng nodejs node_modules/node-sass/scripts/install.js'
      sh 'docker run --rm -v `pwd`:/app:rw -w /app falci/ng npm rebuild node-sass'
  }

  node {
      stage 'Lint'

      sh 'docker run --rm -v `pwd`:/app:rw -w /app falci/ng ng lint'
  }

  node {
      stage 'Build'

      def ngEnv = 'development'

      if(env.BRANCH_NAME == 'master'){
          ngEnv = 'production'
      }

      sh "docker run --rm -v `pwd`:/app:rw -w /app falci/ng ng build --target=${ngEnv} --output-hashing=all"
  }

  node {
      stage 'Deploy'
      def www = '/var/www/html/admin'
      def server = 'none'

      if(env.BRANCH_NAME == 'develop'){
          server = 'bl-dev-webapp'
      }
      if(env.BRANCH_NAME == 'master'){
          server = 'bl-qa-webapp'
      }

      if(server != 'none') {
          echo "Deploying files to ${server}"
          sh "scp -r ./dist/* ${server}:${www}"
      } else {
          echo "Deploy ignored (custom branch)"
      }
  }
} catch(e) {
    currentBuild.result = 'FAILURE'
    throw e
} finally {
    notifySlack(currentBuild.result)
}
