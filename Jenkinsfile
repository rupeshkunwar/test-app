pipeline {
    agent any

    environment {
        BRANCH_TAG = "${GIT_BRANCH.split('/').last()}"
        DOCKER_REGISTRY = 'rupesh1050'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Build Test Image') {
            steps {
                sh "docker build -t ${DOCKER_REGISTRY}/react-test -f ./client/Dockerfile.dev ./client"
            }
        }

        stage('Test') {
            steps {
                sh "docker run --rm -e CI=true ${DOCKER_REGISTRY}/react-test npm test -- --watchAll=false"
            }
        }

        stage('Build & Push Images') {
            when {
                anyOf {
                    branch 'main'
                    branch 'release/*'
                }
            }
            parallel {
                stage('Client') {
                    steps {
                        withCredentials([usernamePassword(
                            credentialsId: 'DOCKER_LOGIN',
                            passwordVariable: 'DOCKER_PASSWORD',
                            usernameVariable: 'DOCKER_NAME'
                        )]) {
                            sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_NAME} --password-stdin"
                            sh "docker build -t ${DOCKER_REGISTRY}/multi-client:${BRANCH_TAG} -t ${DOCKER_REGISTRY}/multi-client:${BUILD_NUMBER} ./client"
                            sh "docker push ${DOCKER_REGISTRY}/multi-client:${BRANCH_TAG}"
                            sh "docker push ${DOCKER_REGISTRY}/multi-client:${BUILD_NUMBER}"
                        }
                    }
                }
                stage('Server') {
                    steps {
                        withCredentials([usernamePassword(
                            credentialsId: 'DOCKER_LOGIN',
                            passwordVariable: 'DOCKER_PASSWORD',
                            usernameVariable: 'DOCKER_NAME'
                        )]) {
                            sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_NAME} --password-stdin"
                            sh "docker build -t ${DOCKER_REGISTRY}/multi-server:${BRANCH_TAG} -t ${DOCKER_REGISTRY}/multi-server:${BUILD_NUMBER} ./server"
                            sh "docker push ${DOCKER_REGISTRY}/multi-server:${BRANCH_TAG}"
                            sh "docker push ${DOCKER_REGISTRY}/multi-server:${BUILD_NUMBER}"
                        }
                    }
                }
                stage('Worker') {
                    steps {
                        withCredentials([usernamePassword(
                            credentialsId: 'DOCKER_LOGIN',
                            passwordVariable: 'DOCKER_PASSWORD',
                            usernameVariable: 'DOCKER_NAME'
                        )]) {
                            sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_NAME} --password-stdin"
                            sh "docker build -t ${DOCKER_REGISTRY}/multi-worker:${BRANCH_TAG} -t ${DOCKER_REGISTRY}/multi-worker:${BUILD_NUMBER} ./worker"
                            sh "docker push ${DOCKER_REGISTRY}/multi-worker:${BRANCH_TAG}"
                            sh "docker push ${DOCKER_REGISTRY}/multi-worker:${BUILD_NUMBER}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker image prune -f || true"
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}
