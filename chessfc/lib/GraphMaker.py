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
