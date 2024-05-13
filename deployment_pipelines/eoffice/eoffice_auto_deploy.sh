#!/bin/sh

workspace=$1
buildnumber=$2
environment=$3
deployer=$4

deployuser=root

TIMESTAMP=`date "+%Y%m%d-%H%M%S"`

if [[ "${environment}" = "qa" ]]
then
    wasConsoleIP="10.10.91.80"
    wasNode_1_IP="10.10.91.50"
    wasNode_2_IP="10.10.91.52"
    packageDestinationFolder="/opt/IBM/WebSphere/honda/build"
    backupUpFolder=${packageDestinationFolder}/backup_${buildnumber}
else
    wasConsoleIP="10.10.91.80undefined"
    wasNode_1_IP="10.10.91.50undefined"
    wasNode_2_IP="10.10.91.52undefined"

fi

mkdir -p ${workspace}/${buildnumber}
declare -a appList

# Function to get the apps that need to be deployed. 
# The app list is stored in ${appList}
function collectAppList() {
    local appCount=0
	if [ ${coopad} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("coopad")
    fi
    if [ ${eOffice} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("eOffice")  
    fi
    if [ ${eOfficeServiceAwards} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("eOfficeServiceAwards")  
    fi
    if [ ${eopHeaderFooter} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("eopHeaderFooter")  
    fi
    if [ ${eToolBox} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("eToolBox")  
    fi
    if [ ${frtManual} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("frtManual")  
    fi
    if [ ${jobBatch} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("jobBatch")  
    fi
    if [ ${partsInventoryControl} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("partsInventoryControl")  
    fi
    if [ ${portalEJBOnly} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("portalEJBOnly")  
    fi
    if [ ${pwdEncrypt} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("pwdEncrypt")  
    fi
    if [ ${RCDptr} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("RCDptr")  
    fi
    if [ ${stimt} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("stimt")  
    fi
    if [ ${userEntl} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("userEntl")  
    fi
    if [ ${uoe} = "true" ]; then
        appCount=$((appCount + 1))
        appList+=("uoe")  
    fi
    if [[ "${appCount}" -eq 0 ]]
    then
        echo "******************************************************** "
        echo "There is no application needs to be deployed."
        echo "Exiting the job with FAILURE state!"
        echo "******************************************************** "
        exit 1
    fi
}

function generateDeploymentFile() {
    mkdir -p ${workspace}/${buildnumber}
    local deploymentFile=${workspace}/${buildnumber}/deploymentList.yml
    echo "# deployment list" > ${deploymentFile}
    echo "environment: ${environment} " >> ${deploymentFile}
    echo "deploymentServiceAcct: ${deployuser} " >> ${deploymentFile}    
    echo "wasAdminConsoleIP: ${wasConsoleIP} " >> ${deploymentFile}
    echo "deploymentTimeStamp: ${TIMESTAMP} " >> ${deploymentFile}
    echo "deployer: ${deployer} " >> ${deploymentFile}
    echo "jenkinsJobNumber: ${buildnumber} " >> ${deploymentFile}
    echo "application: " >> ${deploymentFile}

    for app in "${appList[@]}"
    do
        echo "  - name: ${app}" >> ${deploymentFile}
        ver2=${app}_version
        # echo ver = ${!ver}
        appVer2=${!ver2}
        echo "    version: ${appVer2}" >> ${deploymentFile}
        echo "    artifactURL: https://nexus.honda.ca:8443/repository/honda-artifacts-release/ca/honda/apps/eoffice/${app}/${appVer2}/${app}-${appVer2}.ear " >> ${deploymentFile}

    done

}

function downloadDeployedApp() {
    mkdir -p ${workspace}/${buildnumber}/apps
    local appCount=0
    echo "******************************************************** "
    echo "The following application(s) will be deployed by this job"
    for app in "${appList[@]}"
    do
        appCount=$((appCount + 1))
        ver1=${app}_version
        # echo ver = ${!ver}
        appVer1=${!ver1}
        echo "  ${appCount}: ${app} (${appVer1})"
    done

    echo "Number of apps to be deployed: ${appCount}"
    echo "******************************************************** "

    for app in "${appList[@]}"
    do
        ver=${app}_version
        appVer=${!ver}       
        echo curl --user mvn-deploy:iMuxRFCA45LY3pT4KE7APwOehgJ4sKE-eUvnYG1zsSgW -X GET  https://nexus.honda.ca:8443/repository/honda-artifacts-release/ca/honda/apps/eoffice/${app}/${appVer}/${app}-${appVer}.ear  --output ${workspace}/${buildnumber}/apps/${app}.ear       
    done
    echo "******************************************************** "
    echo "All artifacts have been downloaded from NXRM. "
    echo "******************************************************** "
}

function backupCurrentInstalledApp(){

    echo "******************************************************** "
    echo "Backing up currently installed app"
    for app in "${appList[@]}"
    do
        echo "  - backing up ${app}"
        echo ssh -t ${deployuser}@${wasConsoleIP} "mkdir -p ${backupUpFolder}; cp ${packageDestinationFolder}/${app}.ear ${backupUpFolder}"
    done   
    echo "Completed backups of currently installed app"
    echo "******************************************************** "
}

function sendDeploymentToRemote(){
    echo "******************************************************** "
    echo "Sending packages to the remote server ${wasConsoleIP}:${packageDestinationFolder}"
    for app in "${appList[@]}"
    do
        echo "  - sending ${app}"
        echo scp -p ${workspace}/${buildnumber}/apps/${app}.ear ${deployuser}@${wasConsoleIP}:${packageDestinationFolder}
    done   
    echo "Completed backups of currently installed app"
    echo "******************************************************** "
}    


collectAppList
generateDeploymentFile
downloadDeployedApp
backupCurrentInstalledApp
sendDeploymentToRemote
