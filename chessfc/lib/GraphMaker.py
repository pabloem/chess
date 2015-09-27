import csv
import networkx as nx

# Pairs: [float(edge weight), node, node]
def make_graph(pairs):
    G = nx.DiGraph()
    for pair in pairs:
        if pair[1] not in G.node:
            G.add_node(pair[1])
        if pair[2] not in G.node:
            G.add_node(pair[2])
        G.add_edge(pair[2],pair[1],weight=pair[0])

    return G

def get_graph(in_file):
    f = open(in_file)
    cr = csv.reader(f)
    
    rows = []
    for row in cr:
        row[0] = float(row[0])
        rows.append(row)
    f.close()
    G = make_graph(rows)
    return G

def get_dictionary(in_file,index_by='taken'):
    f = open(in_file)
    cr = csv.reader(f)
    res = {}
    taken = 2
    taker = 1
    if index_by == 'taker':
        taken = 1
        taker = 2
    for row in cr:
        if row[taken] not in res:
            res[row[taken]] = {}
        if row[taker] not in res[row[taken]]:
            res[row[taken]][row[taker]] = float(row[0])
    return res
