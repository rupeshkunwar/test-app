pipeline {
  environment {
     BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
  }
      agent any
    stages {
        stage('Build') {
            steps { 
                withEnv(["HOME=${env.WORKSPACE}"]){
                 sh 'sudo -S docker build -t rupesh1050/react-test -f ./client/Dockerfile.dev ./client'
                }
            }
        }
        stage('Test') {
            steps {
                sh 'sudo -S docker run -e CI=true rupesh1050/react-test npm test'
            }
        }
        stage('multi-client') {
            steps {
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_LOGIN', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_NAME')]) {
                    sh 'sudo -S docker login -u ${DOCKER_NAME} -p ${DOCKER_PASSWORD}'
                    sh 'sudo -S docker build -t rupesh1050/multi-client:${BRANCH_NAME} ./client'
                    sh 'sudo -S docker push rupesh1050/multi-client:${BRANCH_NAME}'
                }
            }
        }

        stage('multi-server') {
            steps {
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_LOGIN', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_NAME')]) {
                    sh 'sudo -S docker login -u ${DOCKER_NAME} -p ${DOCKER_PASSWORD}'
                    sh 'sudo -S docker build -t rupesh1050/multi-server:${BRANCH_NAME} ./server'
                    sh 'sudo -S docker push rupesh1050/multi-server:${BRANCH_NAME}'
                }
            }
        }



        stage('multi-worker') {
            steps {
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_LOGIN', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_NAME')]) {
                    sh 'sudo -S docker login -u ${DOCKER_NAME} -p ${DOCKER_PASSWORD}'
                    sh 'sudo -S docker build -t rupesh1050/multi-worker:${BRANCH_NAME} ./worker'
                    sh 'sudo -S docker push rupesh1050/multi-worker:${BRANCH_NAME}'
                }
            }
        }
    }
}