import {Room} from "nodito";
import {PPTPlayer} from "./PPTPlayer";

export enum PPT {
    Piedra,
    Papel,
    Tijera,
}

export const PPTMoves = [
    PPT.Papel,
    PPT.Piedra,
    PPT.Tijera
];

interface HistoryItem {
    play: PPT,
    p: PPTPlayer
}

export function kill(a: PPT, b: PPT) {
    return a === PPT.Piedra && b === PPT.Tijera ||
        a === PPT.Tijera && b === PPT.Papel ||
        a === PPT.Papel && b === PPT.Piedra;
}

export class PPTRoom extends Room<PPTPlayer> {
    protected type: string = 'Piedra Papel o Tijera';
    protected history: HistoryItem[] = [];

    start(): void {
        super.start();
        this.users.forEach(p => {
            p.player.start();
        })
    }

    public playMoves() {
        this.users.forEach((x) => x.player.playValidMoves());
    }

    public addPlay(p: PPTPlayer, play: PPT) {
        this.history.push({
            p,
            play,
        })
    }

    getMoveNumber(p: PPTPlayer) {
        return this.getMovesFrom(p).length;
    }

    getMovesFrom(p: PPTPlayer) {
        return this.history.filter(item => item.p === p);
    }

    getMoveFrom(p: PPTPlayer, n: number) {
        return this.getMovesFrom(p)[n];
    }

    getStatus(p: PPTPlayer) {
        const op = p.opponent();
        const m = this.getMovesFrom(p);
        const status = [];
        m.forEach((v, idx) => {
            const playOp = this.getMoveFrom(op, idx);
            const st : {
                me: PPT | null;
                op: PPT | any;
                win: 'me'|'op'|'tie' | null
            } = {
                me: v.play,
                op: null,
                win: null,
            };
            status.push(st);
            if (!playOp) {
                return;
            }
            st.op = playOp.play;
            if (kill(v.play, playOp.play)) {
                st.win = 'me';
            } else if (kill(playOp.play, v.play)) {
                st.win = 'op';
            } else {
                st.win = 'tie';
            }
        });
        return status;
    }

    countWins(p: PPTPlayer) {
        let wins = 0;
        const m = this.getMovesFrom(p);
        m.forEach((v, idx) => {
            const playOp = this.getMoveFrom(p.opponent(), idx);
            if (!playOp) {
                return;
            }
            if (kill(v.play, playOp.play)) {
                wins++;
            }
        });
        return wins;
    }

    checkWinner() {
        const p = this.owner().player as PPTPlayer;
        const o = p.opponent();
        const movesP = this.getMoveNumber(p);
        const movesO = this.getMoveNumber(o);
        if (movesP < 2 || movesO < 2 || movesO !== movesP) {
            return false;
        }
        const wP = this.countWins(p);
        const wO = this.countWins(o);
        if (movesP === 2 && (wP < 2 && wO < 2)) {
            return false;
        }
        if (wP > wO) {
            return p;
        } else if (wO > wP) {
            return o;
        }
        return false;
    }

}