npm run build:package
npm run build:docs

git status
git commit --all --message=$1

[ -z "$2" ] && npm version patch || npm version $2
npm publish --access public

git push


