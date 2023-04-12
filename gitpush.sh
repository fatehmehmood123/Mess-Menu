
if [ -z "$1" ]
then
    commit_message="Automated commit message"
else
    commit_message="$1"
fi

git add .
git commit -m "$commit_message"
git push


# following command will make this file executable
# icacls .\gitpush.sh /grant:r "%USERNAME%:(RX)"
# to run this enter
# ./gitpush.sh                  # Uses default commit message
# ./gitpush.sh "My commit message"  # Uses provided commit message
