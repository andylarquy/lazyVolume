def isPortInUse(port):
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        return sock.connect_ex(('localhost', port)) == 0

print(isPortInUse(8000))