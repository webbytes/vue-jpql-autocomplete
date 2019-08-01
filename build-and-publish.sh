npm run build:package
npm run build:example


git add -A && git commit -m "$1"
git status

[ -z "$2" ] && npm version patch || npm version $2

npm publish --access public

git push


