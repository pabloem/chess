#!/usr/bin/python
from lib.GraphMaker import make_graph
from lib.GraphMaker import get_graph
import sys
import csv
import networkx as nx

if len(sys.argv) < 3:
    print("Usage: ./make_graph.py input output.graphml")
    sys.exit(0)

in_file = sys.argv[1]
out_file = sys.argv[2]

G = get_graph(in_file)

nx.write_graphml(G,out_file)
