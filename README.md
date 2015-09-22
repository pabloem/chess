# The Chess Food Chain
This repo contains a series of scripts and different aditions to analyze large Chess datasets, specifically in the form of
PGN data. Specifically, these utilities are designed for analysis of the Millionbase dataset containing 2.2 million games.

We call this 'Food Chain' because the non-technical word that we use in Spanish for the capute of a piece, is 'eating'. Thus,
analyzing how pieces capture each other, is analyzing how they 'eat' each other. : )

### Scripts
* `chess_food_chain.py` - This is a command line script that takes a PGN dataset, and generates two kinds of 
capturer-capturee lists: One is a simple CSV file containing all capturer-capturee pairs, and the other is a list of
JSON dictionaries containing capturer lists and capturee lists, because I want to analyze how pieces act together
to take groups of pieces.
* More to come.
