
from domain import serverManager
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hit! You are at the index.")

def so(request):
    return HttpResponse(serverManager.getOpSysInfo())

def volume(request):
    return HttpResponse(serverManager.volumeRequest(request))