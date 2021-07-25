const { PythonShell } = require('python-shell')

async function restApiIsRunning() {
  let pyshell = new PythonShell('src/python/isPortInUse.py')

  pyshell.on('message', function (message) {
    console.log(message)
    return message === 'True'
  })

  pyshell.end(function (err) {
    if (err) {
      throw err
    };
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
  serverProcess.childProcess.kill('SIGTERM')
}

const sleep = async (time) => await new Promise(r => setTimeout(r, time))

const LONG_DELAY_SCRIPT = 5000 //ms
const SHORT_DELAY_SCRIPT = 1000 //ms

function debugScript() {
  startServer()
  sleep(LONG_DELAY_SCRIPT).then(async () => {
  
    restApiIsRunning()
    sleep(SHORT_DELAY_SCRIPT).then(async () => {
  
      stopServer()
      sleep(SHORT_DELAY_SCRIPT).then(async () => {
  
        restApiIsRunning()
      })
    })
  })  
}
