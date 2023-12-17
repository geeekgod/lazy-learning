pipeline {
  agent any {
    tools {
      nodejs 'node19'
    }
    environment {
      SCANNER_HOME = tool 'scanner-scanner'
    }
    stages {
      stage('Clean Workspace') {
        steps {
          cleanWs()
        }
      }
      stage('Git Checkout') {
        steps {
          git branch: 'main', url: 'https://github.com/thisisrishabh22/lazy-learning.git'
        }
      }
      stage('Quality Gate') {
        steps {
          script {
            waitForQualityGate success: false, credentialsId: 'Sonar-token'
          }
        }
      }
      stage('Install Dependencies') {
        steps {
          sh 'npm install'
        }
      }
      stage('OWASP File Security Scan') {
        steps {
          script {
            dependencyCheck additionalArguments: '', odcInstallation: 'DP-Check'
          }
        }
      }
      stage('Trivy File System Scan') {
        steps {
          sh 'trivy fs .'
        }
      }
      stage('Docker Build and Push') {
        steps {
          script {
            withDockerRegistry(credentialsId: 'docker') {
              sh 'docker build -t lazy-learning:latest .'
              sh 'docker tag lazy-learning yourregistryname/swoc:latest'
              sh 'docker push yourregistryname/swoc:latest'
            }
          }
        }
      }
      stage('Deploy to Container') {
        steps {
          sh 'docker run -d --name Lazy-Learning -p 3000:80 yourregistryname/swoc:latest'
        }
      }
    }
  }
}