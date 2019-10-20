from django.shortcuts import render
from django.views.generic import ListView
from django.http import JsonResponse

def index(request):
    return render(request, 'guitarneckdigram/index.html')

class GuitarNeck(ListView):

    majorIndices = [0,2,4,5,7,9,11]
    minorIndices = [0,2,3,5,7,8,10]

    notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#',]

    strings = [
                ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
                ['B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
                ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G'],
                ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
                ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A'],
                ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
            ]

    def _getNotesForScale(self, key, scaleType):
        print(key)
        print(self.notes.index(key))
        reorderScaleNotes = self.notes[self.notes.index(key):] + self.notes[:self.notes.index(key)]
        scaleNotes = reorderScaleNotes
        if scaleType == 'major':
            scaleNotes = [ reorderScaleNotes[i] for i in self.majorIndices ]
        if scaleType == 'minor':
            scaleNotes = [ reorderScaleNotes[i] for i in self.minorIndices ]
        return scaleNotes

    def _getStringNotePairs(self, notes=None):
        noteStringPairs = []
        for note in notes:
            noteDict = { note: [] }
            for string, fretNotes in enumerate( self.strings ):
                for fret, noteName in enumerate( fretNotes ):
                    if noteName == note:
                        noteDict[note].append((fret, string+1))
            noteStringPairs.append(noteDict)
        return noteStringPairs

    def get(self, request, key, scaleType):
        print('Key' + key)
        print('Scale Type' + scaleType)
        notes = self._getNotesForScale(key, scaleType)
        noteStringPairs = self._getStringNotePairs(notes)
        response = { 'key': key, 'type': scaleType, 'notes': noteStringPairs }
        return JsonResponse(response)