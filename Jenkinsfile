pipeline {
	agent {
		node {
			label ''
			customWorkspace 'workspace/wechat'
		}
	}

	stages {
		stage('deploy') {
			steps {
				sh 'bash ./publish.sh'
			}
		}
	}
}
