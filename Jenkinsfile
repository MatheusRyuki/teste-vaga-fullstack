pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token-id')
        RENDER_API_KEY = credentials('render-api-key-id')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MatheusRyuki/teste-vaga-fullstack.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    sh 'docker build -t usuario/frontend:latest ./frontend'
                    sh 'docker build -t usuario/backend:latest ./backend'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        sh 'docker push usuario/frontend:latest'
                        sh 'docker push usuario/backend:latest'
                    }
                }
            }
        }

        stage('Deploy Frontend to Vercel') {
            steps {
                script {
                    dir('frontend') {
                        sh 'vercel --prod --token $VERCEL_TOKEN'
                    }
                }
            }
        }

        stage('Deploy Backend to Render') {
            steps {
                script {
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

    post {
        always {
            cleanWs()
        }
    }
}
