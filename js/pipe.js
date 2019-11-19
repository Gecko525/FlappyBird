(function () {
    window.Pipe = function (opt) {
        this.init(opt);
    };
    Pipe.prototype = {
        init: function (opt) {
            this.pipe0 = opt.pipe0;
            this.pipe1 = opt.pipe1;

            // 随机管道方向 0 向上，1 向下
            this.dir = Math.round(Math.random());
            // 随机管道高度,最少80
            this.height = Math.random() * (gameOpt.canvas.height * 0.5 - 80 - gameOpt.floor.height) + 80;
            console.log(this.height);
            this.width = opt.width;
            this.x = gameOpt.canvas.width;
            this.y = this.dir === 0 ? gameOpt.canvas.height - this.height - gameOpt.floor.height : 0;
            this.sX = 0;
            this.sY = this.dir === 0 ? 0 : opt.height - this.height;
            this.speed = opt.speed || 1;
        },
        render: function () {
            game.ctx.drawImage(this.dir ? this.pipe1 : this.pipe0, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height);
        },
        update: function () {
            this.x -= this.speed;
            if (this.x < -this.width) {
                var index = game.pipeArr.indexOf(this);
                game.pipeArr.splice(index, 1);
            }

            // 碰撞
            if ((game.bird.x > this.x - game.bird.width) && (game.bird.x < this.x + this.width)) {
                if (!this.dir) {
                    if (game.bird.y + game.bird.height > this.y) {
                        game.gameover();
                    }
                } else {
                    if (game.bird.y < this.height) {
                        game.gameover();
                    }
                }
            }
        },
        pause: function () {
            this.speed = 0;
        }
    };
})();