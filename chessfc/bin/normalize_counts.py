#!/usr/bin/python
import csv
import sys

expl = """Usage: ./normalize_counts.py input_file output_file [taken(default) / taker]
# This normalizes the counts of taken pieces - it """
if len(sys.argv) < 3:
    print(expl)

in_file = sys.argv[1]
out_file = sys.argv[2]

piece = 'taken'
if len(sys.argv) > 3:
    piece = sys.argv[3]

f = open(in_file)
cr = csv.reader(f)
counts = {}
rows = []
piece_idx = 2 if piece == 'taken' else 1

for row in cr:
    rows.append(row)
    if row[piece_idx] not in counts:
        counts[row[piece_idx]] = 0
    counts[row[piece_idx]] += int(row[0])

f.close()

f = open(out_file,'w')

cw = csv.writer(f)
for row in rows:
    row[0] = float(row[0])/counts[row[piece_idx]]
    cw.writerow(row)

f.close()
