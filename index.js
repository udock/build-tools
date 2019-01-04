'use strict'

const tasks = process.argv.splice(2)

function r (pkg) {
  return new Promise((resolve, reject) => {
    let needInstall = false
    try {
      require.resolve(pkg)
    } catch (e) {
      needInstall = true
      console.log(`install ${pkg} ...`)
      require('child_process').exec(`cd "${__dirname}" && npm i ${pkg}`, (err) => {
        if (!err) {
          console.log(`install ${pkg} success!`)
          resolve(require(pkg))
        } else {
          reject(new Error(`install ${pkg} failed!`))
        }
      })
    }
    if (!needInstall) {
      resolve(require(pkg))
    }
  })
}

r('@udock/build-tools-builders').then((builder) => {
  builder(tasks)
}).catch((error) => {
  console.error(error)
})
