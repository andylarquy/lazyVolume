const { PythonShell } = require('python-shell')

async function isRunning() {
  const pyshell = new PythonShell('src/python/isPortInUse.py')
  
  pyshell.end((err) => {
    if (err) {
      throw err
    };
  })
  
  return new Promise((resolve, reject) => {
    pyshell.on('message', (message) => {
      try {
        resolve(message === 'True')
      } catch (err) {
        reject(err)
      }
    })
  })

}

let serverProcess

function startServer() {
  var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python3',
    pythonOptions: ['-u'],
    // make sure you use an absolute path for scriptPath
    scriptPath: '/home/andres/git/proyectos/lazyVolume/host/restAPI',
    args: ['runserver', '0.0.0.0:8000']
  }

  serverProcess = PythonShell.run('manage.py', options, (err) => {
    if (err) throw err
  })
}

function stopServer() {
  serverProcess && serverProcess.childProcess.kill('SIGTERM')
}

const sleep = async (time) => await new Promise(r => setTimeout(r, time))

const LONG_DELAY_SCRIPT = 5000 //ms
const SHORT_DELAY_SCRIPT = 1000 //ms

function debugScript() {
  //startServer()
  sleep(LONG_DELAY_SCRIPT).then(async () => {

    isRunning()
    sleep(SHORT_DELAY_SCRIPT).then(async () => {

      stopServer()
      sleep(SHORT_DELAY_SCRIPT).then(async () => {

        isRunning()
      })
    })
  })
}

export const APIRestService = { startServer, stopServer, isRunning }