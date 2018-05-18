#!groovy

// https://github.com/feedhenry/fh-pipeline-library
@Library('fh-pipeline-library') _

def prLabels = getPullRequestLabels {}

if ( prLabels.contains("test/integration") ) {

  stage('Trust') {
    enforceTrustedApproval('aerogear')
  }

  node ('osx') {
    stage('Prepare osx workspace') {                    
      // Clean workspace
      deleteDir()

      // Checkout to osx slave
      checkout scm

      // Restart appium
      sh """
        lsof -i tcp:4723 | grep LISTEN | awk '{print \$2}' | xargs kill
        nohup appium &>"\$HOME/appium.log" </dev/null &
      """
    }

    stage ('Install dependencies') {
      sh 'npm install'
      dir('tests') {
        sh 'npm install'
      }
      sh 'npm install mocha-jenkins-reporter'
    }

    def platforms = ['android', 'ios']
    for (int i = 0; i < platforms.size(); i++) {
      platform = platforms[i]                      
      stage("Build ${platform}") {
        try {
          sh "ionic cordova build ${platform}"
        } catch (Exception e) {
          currentBuild.result = 'FAILURE'
        }
      }

      stage ("Run integration test for ${platform}") {
        try {
          dir('tests') {
            env.PLATFORM = platform
            sh '''
              rm opts.json || true
              cp opts_${PLATFORM}.json opts.json
              JUNIT_REPORT_PATH=report.xml JUNIT_REPORT_STACK=1 npm start -- --reporter mocha-jenkins-reporter
              mv report.xml report_${PLATFORM}.xml
            '''
          }
        } catch (Exception e) {
          currentBuild.result = 'FAILURE'
        }
      }
    }

    stage('Record Results') {
      archive 'tests/report*.xml'
      junit allowEmptyResults: true, testResults: 'tests/report*.xml'
    }
  }
}
