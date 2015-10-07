import chess
from chess import pgn

"""
ChessWalker
- Piece notation:
-- Pieces are reported with two or three characters. One for color, and one
-- for piece type. The piece is always reported in uppercase letters.
-- The piece color is either 'W' or 'B'. The piece types are standard
-- "P" for Pawn, "R" for Rook, "N" for Knight, "B" for Bishop, "Q" for
-- Queen, and "K" for King.
-- Aditionally, Pawns have their row position appended at the end (e.g. "WP2")

Examples are:
-- 'WP2' - white pawn on its starting position
-- 'BR' - black rook
-- 'WQ' - white queen
-- 'BP2' - black pawn about to crown itself

- Move notation:
-- Move types are reported either as 'T' or 'NT', meaning a 'taking move'
-- (a move where a piece is taken), or a 'non-taking move' (a move where
-- no pieces are taken).
"""
class ChessWalker:
    def __init__(self,game_file):
        self._f = game_file
        self._fp = open(game_file)
        self._rowList = ['A','B','C','D','E','F','G','H']

    # Feteches the next game frm the pgn input file
    # Returns False if this is the last 
    def fetch_game(self):
        self._g = pgn.read_game(self._fp)
        return self._g is not None

    def close(self):
        self._fp.close()

    # Moves the state of the game to the next movement
    # Returns False if it's the end of the game. True otherwise.
    def next(self):
        if len(self._g.variations) > 0:
            self._g = self._g.variation(0)
            return True
        return False

    # Returns the algebraic notation of the following move
    # Returns False if there is no next move
    def get_move_notation(self):
        g = self._g
        if len(g.variations) == 0:
            return False
        b = g.board()
        notation = b.san(g.variation(0).move)
        return notation
    
    # Returns "T" if move is a take, "NT" if not.
    # Returns False if this is the last position
    def get_move_type(self):
        g = self._g
        if len(g.variations) == 0: return False
        b = g.board()
        m = g.variation(0).move
        return 'T' if b.is_capture(m) else 'NT'

    def get_piece_notation(self,square):
        g = self._g
        piece = g.board().piece_at(square)
        if piece is None: return None
        symbol = piece.symbol()
        if symbol in ['P','p']:
            symbol = symbol+str(square//8+1)
        if symbol.upper() == symbol:
            return "W"+symbol
        return "B"+symbol.upper()
    
    # Returns False if this is the last position
    # Returns False if the move is not a taking move
    # Returns the symbol of the taker piece otherwise
    def get_move_taker(self):
        if self.get_move_type() in ['NT', False]:
            return False
        g = self._g
        t_square = g.variation(0).move.from_square
        return self.get_piece_notation(t_square)

    # Returns False if this is the last position
    # Returns False if the move is not a taking move
    # Returns the symbol of the taker piece otherwise
    def get_move_taken(self):
        if self.get_move_type() in ['NT', False]:
            return False
        g = self._g
        b = g.board()
        m = g.variation(0).move
        
        if b.is_en_passant(m): # Special case for capture en passant
            sq = m.from_square - (m.from_square % 8 - m.to_square % 8)
            return self.get_piece_notation(sq)
        
        t_square = m.to_square
        return self.get_piece_notation(t_square)

    # Returns False if this is the last position
    # Returns False if the move is not a taking move
    # Returns the position of the taker piece otherwise
    def get_taker_position(self):
        if self.get_move_type() in ['NT', False]:
            return False
        g = self._g
        b = g.board()
        m = g.variation(0).move

        uci = m.uci()[0:2]
        return uci
    
    # Returns False if this is the last position
    # Returns False if the move is not a taking move
    # Returns the position of the taken piece otherwise
    def get_taken_position(self):
        if self.get_move_type() in ['NT', False]:
            return False
        g = self._g
        b = g.board()
        m = g.variation(0).move
        
        uci = m.uci()[2:]
        if b.is_en_passant(m): # Special case for capture en passant
            uci = uci[0] + m.uci()[1] + uci[2:]
        
        return uci

    # Moves the state to the next TAKING move of the game, or
    # the last one
    def next_taker(self):
        g = self._g
        while self.next():
            mv_type = self.get_move_type()
            if mv_type == 'T':
                return True
            if mv_type == 'NT':
                continue
            break
        return False
