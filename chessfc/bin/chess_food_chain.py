#!/usr/bin/python
from lib.FoodChainBuilder import FoodChainBuilder
import sys
import csv
import json

# Usage: ./chess_food_chain.py input_dataset output_file

if len(sys.argv) < 3:
    print("Usage: ./chess_food_chain.py input_dataset sets_output [pairs_output]")
    sys.exit(0)

in_file = sys.argv[1]
set_file = sys.argv[2]
sf = open(set_file,'w')

pair_file = None
pf = None
pf_w = None
if len(sys.argv) > 3:
    pair_file = sys.argv[3]
    pf = open(pair_file,'w')
    pf_w = csv.writer(pf)

fb = FoodChainBuilder(in_file)

def flush_pairs(plist):
    for elm in plist:
        pf_w.writerow(elm)
    return
    
def flush_sets(set_list):
    for elm in set_list:
        sf.write(json.dumps(elm)+"\n")
    return
fb.go(flush_pairs,flush_sets)

if pair_file is not None: pf.close()
sf.close()
