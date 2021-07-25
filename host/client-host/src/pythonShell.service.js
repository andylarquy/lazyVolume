const { PythonShell } = require('python-shell')

export function restApiIsRunning() {
  let pyshell = new PythonShell('src/python/isPortInUse.py')

  pyshell.on('message', function (message) {
    return message === 'True'
  })

  pyshell.end(function (err) {
    if (err) {
      throw err
    };
  })
}

