const { spawn } = require('child_process');

function run(...stdin) {
  const [command, ...args] = stdin;
  const proc = spawn(command, args)

  return new Promise((res, rej) => {
    proc.stdout.on('data', (data) => {
      res(data.toString().trim())
    })

    proc.stderr.on('data', (data) => {
      rej(data.toString().trim())
    })

    proc.on('close', (code) => {
      rej(`Status code ${code}`)
    })
  })
}

(async function worker() {

  try {
    const out = await run('git', 'status', '-s')

    if (out.length === 0) {
      throw 'No output'
    }

    await run('git', 'commit', '-am', `"Auto update ${ Date() }"`)
    await run('git', 'push', '-u', 'origin', 'master')

  } catch (error) {
    console.log(error)
  }

  setTimeout(worker, 5000)
})()
