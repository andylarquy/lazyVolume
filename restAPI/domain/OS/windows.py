try:
    from ctypes import POINTER, cast
    from comtypes import CLSCTX_ALL
    from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
    import pythoncom
except:
    pass

g_volume = None

class Windows:

    def getVolume(self):
        global g_volume
        setAudioInterface()
        return str( round( g_volume.GetMasterVolumeLevelScalar() * 100) )
        # TODO - Manejar Errores

    def setVolume(self, newVolume):
        global g_volume
        setAudioInterface()
        g_volume.SetMasterVolumeLevelScalar((newVolume/100), None)
        # TODO - Manejar Errores

# TODO - Optimizar las llamadas a esta funcion
def setAudioInterface():
    global g_volume

    # FIXME: PyLint
    # pylint: disable=no-member
    pythoncom.CoInitialize()

    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(
        IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    g_volume = cast(interface, POINTER(IAudioEndpointVolume))

