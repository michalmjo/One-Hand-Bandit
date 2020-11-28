class Draw {
    constructor() {
        this.options = ['./img/1.jpg', './img/2.jpg', './img/3.jpg'];
        let _result = this.drawResult();
        this.getDrawResult = () => _result;
    }
    drawResult() {
        let colors = [];
        for (let i = 0; i < this.options.length; i++) {
            const index = Math.floor(Math.random() * this.options.length);
            const color = this.options[index];
            colors.push(color);
        }
        return colors;
    }
}