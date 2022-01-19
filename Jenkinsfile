pipeline {
    agent any

    stages {
        stage('Build') {
            steps { 
                withEnv(["HOME=${env.WORKSPACE}"]){
                 sh 'sudo -S docker build -t ${JOB_NAME}-${BUILD_NUMBER} . && sudo -S python3 -m pip install --upgrade pip && pip install -r requirements.txt'
                 sh 'python3 app.py'
                }
            }
        }
        stage('Test') {
            steps {
                sh 'python3 ./tests/test.py test'
            }
        }
        stage('Deploy') {
            steps {
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_LOGIN', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_NAME')]) {
                    sh 'sudo -S docker login -u ${DOCKER_NAME} -p ${DOCKER_PASSWORD}'
                    sh 'sudo -S docker build . --file Dockerfile -t rupesh1050/devsec-test-dev:${BUILD_NUMBER}'
                    sh 'sudo -S docker push rupesh1050/devsec-test-dev:${BUILD_NUMBER}'
                }
            }
        }
    }
}