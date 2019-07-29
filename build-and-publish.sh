npm run build:package
npm run build:docs

[ -z "$2" ] && npm version patch || npm version $2
#npm publish --access public

git add --all
git commit --all --message=$1
git push


