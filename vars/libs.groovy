
// Global varibales

JOB_NAME                = "${env.JOB_NAME}"
PACKAGE_DIR             = "${env.WORKSPACE}/${env.BUILD_NUMBER}"
TEMP_WORK_FOLDER        = 'TEMP_WORK_FOLDER'    
BUILD_NUM               = "${env.BUILD_NUMBER}"
TARGET_ENV              = "${env.DEPLOY_ENV}"
DEPLOY_APPROVER_EMAIL   = 'udaykumar_vellala@ch.honda.com,kevin_lou@ch.honda.com,indrakumar_mahaski@ch.honda.com,sampat_peddi@ch.honda.com'
DEPLOY_NOTIFY_EMAIL     = 'udaykumar_vellala@ch.honda.com,kevin_lou@ch.honda.com,indrakumar_mahaski@ch.honda.com,sampat_peddi@ch.honda.com'
//DEPLOY_APPROVER_EMAIL   = 'kevin_lou@ch.honda.com'
//DEPLOY_NOTIFY_EMAIL     = 'kevin_lou@ch.honda.com'
JENKINS_EMAIL           = 'devops@ch.honda.com'

def authenticateDeployment() {
    if (TARGET_ENV == "prod") {
        cId = "eBiz_PROD_Deploy_Secret"
    }
    else if (TARGET_ENV == "qa") {
        cId = "eBiz_QA_Deploy_Secret"
    }
    else {
        error("Invalid environment! Go Away!!")
    }
    withCredentials([string(credentialsId: cId, variable: 'DEPLOYPWD')]) {
        if (DEPLOYMENT_PASSWORD != DEPLOYPWD){
            error("Invalid password! Go Away!!")
        }
    }
}


def getJobName(jobName) {
    baseName = jobName
    baseName = baseName.substring(baseName.lastIndexOf("/") + 1)
    echo "Return baseName=${baseName}"
    return baseName
}

//For downstream jobs
def getJobBaseName(jobName) {
    baseName = jobName
    baseName = baseName.substring(baseName.indexOf("\"") + 1);
    baseName = baseName.substring(0, baseName.indexOf("\""));
    baseName = baseName.substring(baseName.lastIndexOf("/") + 1)
    echo "Return baseName=${baseName}"
    return baseName
}

//For downstream jobs
def getJobNumber(jobName) {
    jobNumber = jobName
    jobNumber = jobNumber.substring(jobNumber.lastIndexOf(" ") + 1)
    echo "Return jobNumber=${jobNumber}"
    return jobNumber
}

def sendBuildReportEmail(toEmail, fromEmail) {
    def emailSubject = "[Jenkins]${env.JOB_NAME} - #${env.BUILD_NUMBER} - ${env.DEPLOY_ENV} - ${currentBuild.currentResult}"
    sendBuildReportEmail(toEmail, fromEmail, emailSubject)
}

def recordProdDeployInfo(controlFile, jobBaseName, displayName) {
    deploymentInstructions = readYaml file: controlFile
    jobSubmitterName = currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserName()
    jobSubmitterName = jobSubmitterName.trim()
    jobSubmitterName = jobSubmitterName.replace(' ', '')
    
    deploymentInstructions.application.each {        
        appName = it.name
        appVersion = it.version
        appBuildJobName = it.buildJobName
        fileType = it.fileType
        sh '''
            appName=''' +appName+ '''
            appVersion=''' +appVersion+ '''
            appBuildJobName=''' +appBuildJobName+ '''
            jobName=''' +jobBaseName+ '''
            jobNum=''' +displayName+ '''
            jobSubmitter=''' +jobSubmitterName+ '''
            fType=''' +fileType+ '''
            # buildInfo=$(grep BUILDINFO hcfi_build_info_sheet | grep "A=${appName}=A" | grep  "N=${appVersion}=N" )
            # echo buildInfo=${buildInfo}
            # buildJobName=${buildInfo##*J=}
            # buildJobName=${buildJobName%%=J*}
            # buildNumber=${buildInfo##*N=}
            # buildNumber=${buildNumber%%=N*}
            # codeRepo=${buildInfo##*R=}
            # codeRepo=${codeRepo%%=R*}
            # codeBranchName=${buildInfo##*B=}
            # codeBranchName=${codeBranchName%%=B*}
            # codeRevisionName=${buildInfo##*V=}
            # codeRevisionName=${codeRevisionName%%=V*}
            jobName=${jobName}
            jobNum=${jobNum}
            buildNumber=${appVersion}
            buildJobName=${appBuildJobName}
            codeRepo="NotAvailable"
            codeBranchName="NotAvailable"
            codeRevisionName="NotAvailable"
            todayDate=$(date -d "today" +%s)
            echo todayDate=${todayDate}
            echo buildJobName=${buildJobName}
            echo buildJobName=${buildJobName}
            echo codeRepo=${codeRepo}
            echo codeBranchName=${codeBranchName}
            echo codeRevisionName=${codeRevisionName}
            echo jobSubmitter=${jobSubmitter}

            echo "DEPLOYINFO:A=${appName}=A,F=${appName}.${fType}=F,J=${buildJobName}=J,N=${buildNumber}=N,R=${codeRepo}=R,B=${codeBranchName}=B,V=${codeRevisionName}=V,Z=DevOpsJobs/QA-PROD-Auto-Deployments/${jobName}=Z,C=${jobNum}=C,D=${todayDate}=D,S=${jobSubmitter}=S" >> hcfi_build_info_sheet
            

        '''
    }
}

def deploymentTimeStamp() {
    def ts = sh script: 'date "+%Y-%m-%d-%H_%M"  || echo error', returnStdout: true
    def error = result.endsWith("error")
    if (error) {
        echo "ERROR: Can't get the current timestamp!!"
        return null
    }
    return ts
}

def backUpDirectoryName(appName) {
    def ts = sh script: 'date "+%Y-%m-%d-%H_%M"  || echo error', returnStdout: true
    def dir = "BK_" + appName + "_${BUILD_NUM}_" + ts
    return dir
}

def getJobSubmitterID() {
    def id = currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
    return id
}

def getJobSubmitterName() {
    def name = currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserName()
    return name
}

def sendBuildReportEmail(toEmail, fromEmail, emailSubject) {
    emailext body: '''${SCRIPT, template="groovy-html.template"}''',
            mimeType: 'text/html',
            subject: "${emailSubject}",
            to: "${toEmail}",
            replyTo: "${fromEmail}",
            from: "${fromEmail}",
            attachLog: true
}

def sendApprovalEmail(toEmail, fromEmail, emailBoday) {
    def emailSubject = "There is a ${env.DEPLOY_ENV} deployment needs your approval!"
    emailext body: emailBoday,
            mimeType: 'text/html',
            subject: "${emailSubject}",
            to: "${toEmail}",
            replyTo: "${fromEmail}",
            from: "${fromEmail}",
            attachLog: false
}


def sendDeploymentApprovalEmail(toEmail, fromEmail, jobBaseName, buildNum) {
    def emailSubject = "There is a ${env.DEPLOY_ENV} deployment needs your approval!"
    def jobURL = "https://jenkins-dev.honda.ca/blue/organizations/jenkins/DevOpsJobs%2FQA-PROD-Auto-Deployments%2F${jobBaseName}/detail/${jobBaseName}/${buildNum}/pipeline"
    def jobURL1 = "https://jenkins-dev.honda.ca/job/DevOpsJobs/job/QA-PROD-Auto-Deployments/job/${jobBaseName}/${buildNum}/console"

    def emailBoday = "There is a deployment job needs your approval. <b>Note that the job will expire in 60 minutes</b>.<p>Click on either of the below links to access the job: <p>" + "<li>" + jobURL + "<li>" + jobURL1
    emailext body: emailBoday,
            mimeType: 'text/html',
            subject: "${emailSubject}",
            to: "${toEmail}",
            replyTo: "${fromEmail}",
            from: "${fromEmail}",
            attachLog: false
}

def sendDeploymentHistoryAuditEmail(toEmail, fromEmail, emailBoday, attchmentName) {
    def emailSubject = "Production deployment history report"
    emailext body: emailBoday,
            attachmentsPattern: "${attchmentName}",
            mimeType: 'text/html',
            subject: "${emailSubject}",
            to: "${toEmail}",
            replyTo: "${fromEmail}",
            from: "${fromEmail}",
            attachLog: false
}


return this