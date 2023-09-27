#!/bin/bash

rm package-lock.json

export exitcode=0

# npm cache clean --force
npm install

npm run lint
export var=$?
if [[ "$var" -ne "0" ]]; then
  echo "ESLint failed, exit code $var"
  export exitcode=1
else
  echo "ESLint successful"
fi

npm run test | tee >(tail -10 > test.log)
if [[ "${PIPESTATUS[0]}" -ne "0" ]]; then
  echo "npm test failed"
  export exitcode=1
else
  echo "npm test successful"
fi

exit $exitcode