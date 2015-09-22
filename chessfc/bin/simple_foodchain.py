#!/usr/bin/python
import csv
import sys

usage = """
Usage: ./simple_foodchain.py csv_input output [simple/colors/all]

[simple/colors/all]
 - simple (Default) - All extra information about the pieces is removed (color, position). (BP3 -> P, WQ -> Q)
 - colors - Color information about the pieces is kept, and position information is removed. (BP3 -> BP, WQ -> Q)
 - all - All information about the pieces is kept - nothing is done at all : )
"""

if len(sys.argv) < 3:
    print(usage)

style = 'simple'
if len(sys.argv) == 4:
    style = sys.argv[3]

print("Style is - "+style)

f = open(sys.argv[1])
out = open(sys.argv[2],'w')

cr = csv.reader(f)
cw = csv.writer(out)

def clear(pz,st):
    # First - Removing the color
    if st in ['simple']:
        pz = pz[1:]
    # Second - Removing the position
    if len(pz) > 1 and (pz[0] == 'P' or pz[1] == 'P') and st in ['colors','simple']:
        pz = pz[:-1]
    return pz

count = 0
for pair in cr:
    taker = clear(pair[0],style)
    taken = clear(pair[1],style)
    cw.writerow([taker,taken])
    count += 1

f.close()
out.close()
