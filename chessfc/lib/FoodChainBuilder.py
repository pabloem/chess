from ChessWalker import ChessWalker
class FoodChainBuilder:
    def __init__(self,in_file):
        self._cw = ChessWalker(in_file)
        self._sets = []
        self._pairs = []

    def setup(self):
        self.T = [[], # Start takers
                  []] # End takers
        self.t = [[], # Start taken
                  []] # End taken

    def append_sets(self):
        if len(self.t[1]) > 0:
            self._sets.append({'taker':self.T[0],'taken':self.t[1]})
        if len(self.t[0]) > 0:
            self._sets.append({'taker':self.T[1],'taken':self.t[0]})

    def append_pair(self,taker,taken):
        self._pairs.append([taker,taken])

    def _switch(self):
        tmp = self.T[0]
        self.T[0] = self.T[1]
        self.T[1] = tmp

        tmp = self.t[0]
        self.t[0] = self.t[1]
        self.t[1] = tmp
        return

    def flush_sets(self,callback):
        if callback is not None: callback(self._sets)
        self._sets = []

    def flush_pairs(self,callback):
        if callback is not None: callback(self._pairs)
        self._pairs = []
        
    def go(self,flush_pairs,flush_sets):
        cw = self._cw
        while cw.fetch_game():
            # We assume that the first move is not a taking move - this is reasonable for
            # normal chess games.
            while cw.next_taker():
                self.setup()
                self.T[0].append(cw.get_move_taker())
                self.t[1].append(cw.get_move_taken())
                self.T[1].append(cw.get_move_taken())
                self.append_pair(cw.get_move_taker(),cw.get_move_taken())
                # Some functions some functions
                while cw.next():
                    if cw.get_move_type() == 'NT' or cw.get_move_type() == False:
                        break
                    self._switch()
                    self.T[0].append(cw.get_move_taker())
                    self.t[1].append(cw.get_move_taken())
                    #self.T[1].append(cw.get_move_taken())
                    self.append_pair(cw.get_move_taker(),cw.get_move_taken())                    
                # Conclude
                self.append_sets()
            self.flush_sets(flush_sets)
            self.flush_pairs(flush_pairs)
        cw.close()
        return

