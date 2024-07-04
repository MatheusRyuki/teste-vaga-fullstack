pipeline {
    agent any

    environment {
        DOCKER_HUB_CRED = credentials('docker-hub-credentials')
    }

    stages {
        stage('Checkout do git') {
            steps {
                git branch: 'main', url: 'https://github.com/MatheusRyuki/teste-vaga-fullstack.git'
            }
        }

        stage('Buildar Frontend') {
            steps {
                dir('frontend') {
                    script {
                        def isWindows = isUnix() ? false : true
                        if (isWindows) {
                            bat 'npm install'
                            bat 'npm run build'
                        } else {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Buildar Backend') {
            steps {
                dir('backend') {
                    script {
                        def isWindows = isUnix() ? false : true
                        if (isWindows) {
                            bat 'npm install'
                            bat 'npm run build'
                        } else {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Criar a Imagem Docker') {
            steps {
                script {
                    def isWindows = isUnix() ? false : true
                    if (isWindows) {
                        bat 'docker build -t kronnos-frontend:latest ./frontend'
                        bat 'docker build -t kronnos-backend:latest ./backend'
                    } else {
                        sh 'docker build -t kronnos-frontend:latest ./frontend'
                        sh 'docker build -t kronnos-backend:latest ./backend'
                    }
                }
            }
        }

    }

    post {
        always {
            cleanWs()
        }
    }
}
