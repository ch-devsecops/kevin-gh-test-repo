#/bin/sh

action=$1
localPath=$2
remotePath=$3

case ${action} in
    "upload")
        status=$(curl -v -u mvn-deploy:Password123$ -T ${localPath} ${remotePath} --write-out "%{http_code}" )
        expectedRC=201
        echo "Closing the connection"
        ;;
    "download")
        status=$(curl -v -u mvn-deploy:Password123$ -X GET  ${remotePath} --output ${localPath} --write-out "%{http_code}" )
        expectedRC=200
        echo "Closing the connection"
        ;;
esac

echo "The CURL request returns with status ${status}"
if [[ "${status}" -ne "${expectedRC}" ]] ; then
  echo "The CURL request fails with status: $status_code" 
  exit 1
else
  echo "The CURL request succeeds"
  exit 0
fi
