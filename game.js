class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('span.wallet');
        this.boards = document.querySelectorAll('div.roll-table img');
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector(".stats .result")
        this.spanGame = document.querySelector(".stats .number")
        this.spanWin = document.querySelector(".stats .win")
        this.spanLosses = document.querySelector(".stats .losses")
        this.rod = document.querySelector('.rod')
        this.circle = document.querySelector('.circle')
        this.render();
    }

    render(money = this.wallet.getWalletValue(), stats = [0, 0, 0], result = "", images = ["./img/1.jpg", "./img/1.jpg", "./img/1.jpg"], bid = 0, wonMoney = 0) {
        this.boards.forEach((image, index) => {
            image.src = images[index];
        })
        if (result) {
            result = `Wygrałeś ${wonMoney}`;
        } else if (!result && result !== "") {
            result = `Przegrałeś ${bid}`
        }
        this.spanResult.textContent = result;
        this.spanWallet.textContent = money
        this.spanGame.textContent = stats[0]
        this.spanWin.textContent = stats[1]
        this.spanLosses.textContent = stats[2]
        this.inputBid.value = "";
    }


    startGame() {
        if (this.inputBid.value < 1) return alert(`Kwota która chcesz grac jest za nała`)
        const bid = Math.floor(this.inputBid.value);
        if (!this.wallet.checkCanPlay(bid)) {
            return alert(`masz za mało środków lub podana została nieprawidłowa wartość`)
        }
        this.wallet.changeWallet(bid, "-");
        this.startAnimation()


        this.draw = new Draw();
        const images = this.draw.getDrawResult();
        const win = Result.checkWinner(images);
        const wonMoney = Result.moneyWin(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatistics(win, bid)

        this.render(this.wallet.getWalletValue(), this.stats.showGameStats(), win, images, bid, wonMoney);

    }
    startAnimation() {
        this.rod.classList.add('run')
        this.circle.classList.add('run')
        setTimeout(() => {
            this.rod.classList.remove("run")
            this.circle.classList.remove("run")
        }, 1000)
    }
}