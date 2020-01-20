import sys
import json
from .OS.linux import Linux
from .OS.windows import Windows

system = None
    
def setCurrentSystem():
    global system
    
    if getOpSysInfo() == 'linux':
        system = Linux()
        print('\nRest server is set as running on linux.\n')

    elif getOpSysInfo() == 'win32':
        system = Windows()
        print('TODO - Rest server is running on windows.')
    
def getOpSysInfo():
    return sys.platform

def volumeRequest(request):
    if request.method == 'GET':
        return getCurrentVolume()
    elif request.method == 'POST':
        setNewVolume(request.body)

#PeticionPOST
def setNewVolume(JSONnewVolume):
    global system
    
    setCurrentSystem()
    # Parseo el JSON que me viene del POST
    newVolume = json.loads(JSONnewVolume)
    system.setVolume(newVolume['volume'])

#Peticion GET
def getCurrentVolume():
    global system
    
    setCurrentSystem()
    return system.getVolume()


    