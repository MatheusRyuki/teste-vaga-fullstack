pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token-id')
        RENDER_API_KEY = credentials('render-api-key-id')
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

        stage('Push para o Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        echo "Username do Docker Hub: $DOCKER_USERNAME $DOCKER_PASSWORD"
                        def isWindows = isUnix() ? false : true
                        if (isWindows) {
                            bat 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                            bat 'docker push kronnos-frontend:latest'
                            bat 'docker push kronnos-backend:latest'
                        } else {
                            sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                            sh 'docker push kronnos-frontend:latest'
                            sh 'docker push kronnos-backend:latest'
                        }
                    }
                }
            }
        }

        stage('Deploy Frontend para o Vercel') {
            steps {
                script {
                    dir('frontend') {
                        def isWindows = isUnix() ? false : true
                        if (isWindows) {
                            bat 'npx vercel --token $VERCEL_TOKEN --prod'
                        } else {
                            sh 'npx vercel --token $VERCEL_TOKEN --prod'
                        }
                    }
                }
            }
        }

        stage('Deploy Backend para o Render') {
            steps {
                script {
                    def isWindows = isUnix() ? false : true
                    if (isWindows) {
                        withEnv(["RENDER_API_KEY=${env.RENDER_API_KEY}"]) {
                            bat '''
                            curl -X POST -H "Authorization: Bearer ${RENDER_API_KEY}" \
                                -H "Accept: application/json" \
                                -H "Content-Type: application/json" \
                                -d '{
                                    "serviceId": "your-render-service-id",
                                    "clearCache": false
                                    }' \
                                https://api.render.com/v1/services/deploys
                            '''
                        }
                    } else {
                        withEnv(["RENDER_API_KEY=${env.RENDER_API_KEY}"]) {
                            sh '''
                            curl -X POST -H "Authorization: Bearer ${RENDER_API_KEY}" \
                                -H "Accept: application/json" \
                                -H "Content-Type: application/json" \
                                -d '{
                                    "serviceId": "your-render-service-id",
                                    "clearCache": false
                                    }' \
                                https://api.render.com/v1/services/deploys
                            '''
                        }
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
