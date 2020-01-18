import subprocess
import json

class Linux:

    def getVolume(self):
        getVolumeCommand = '''amixer get Master | awk '$0~/%/{print $4}' | tr -d '[]%' '''
        result = subprocess.check_output(getVolumeCommand, shell=True)
        return result
        
        # TODO - Manejar Errores

    def setVolume(self, newVolume):
        setVolumeCommand = "amixer sset 'Master' "+str(newVolume)+"%"
        result = subprocess.run(setVolumeCommand, shell=True)

        # TODO - Manejar Errores