(function () {
    window.Bird = function(bird) {
        this.init(bird);
    };
    Bird.prototype = {
        init: function (bird) {
            this.img = bird.img;
            this.x = bird.x;
            this.y = bird.y;
            this.width = bird.width;
            this.height = bird.height;
            this.singState = 0; //鸟翅膀动画 0，1，2
            this.flyAngle = 0;
            this.flyState = 1; // 鸟飞行状态，0向下，1向上,
            this.flyFrame = game.frameUtil.allFrame;
            this.upAddCount = 18; // 上升增量
            this.die = false;
            this.bloodIndex = 0;
        },
        render: function () {
            // var self = this;
            // 如果鸟die了，绘制洒血动画
            if (this.die) {
                var row = Math.floor(this.bloodIndex / 5);
                var col = this.bloodIndex % 5;
                // 洒血
                game.ctx.drawImage(game.imgs['blood'], col * gameOpt.blood.width, row * gameOpt.blood.height, gameOpt.blood.width,gameOpt.blood.height, this.x - gameOpt.bird.width, this.y, gameOpt.blood.width, gameOpt.blood.height);
                // 游戏结束
                game.ctx.drawImage(game.imgs['gameover'], (gameOpt.canvas.width - gameOpt.gameover.width) * 0.5, (gameOpt.canvas.height - gameOpt.gameover.height) * 0.5);
                return;
            }
            game.ctx.save();
            game.ctx.translate(this.x + this.width *  0.5, this.y + this.width * 0.5);
            game.ctx.rotate(this.flyAngle * Math.PI / 180);
            game.ctx.translate(-(this.x + this.width *  0.5), -(this.y + this.width * 0.5));
            game.ctx.drawImage(this.img, this.singState * this.width, 0, this.width,this.height, this.x, this.y, this.width,this.height);
            game.ctx.restore();
        },
        update: function() {
            // 鸟die,更新洒血动画
            if (this.die) {
                if (++this.bloodIndex === 30) {
                    game.pause();
                }
                return;
            }
            // 鸟翅膀动画
            if (game.frameUtil.allFrame % 5 === 0) {
                this.singState++;
                if (this.singState > 2) {
                    this.singState = 0;
                }
            }

            // 鸟角度变化
            if (!this.flyState) { // 下降
                this.flyAngle = this.flyAngle === 75 ? 75 : this.flyAngle + 2;
                // 自由落体 h = 1/2 * g * t * t
                this.y += 0.01 * 0.5 * 9.8 * Math.pow(game.frameUtil.allFrame - this.flyFrame, 2);
            } else { // 上升
                this.flyAngle = -25;
                this.y -= this.upAddCount;
                this.upAddCount--;
                if (this.upAddCount < 0) {
                    // game.gameover();
                    this.flyState = 0;
                    this.upAddCount = 15;
                    this.flyFrame = game.frameUtil.allFrame;
                }
            }
            // console.log(this.y);
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.y >= gameOpt.canvas.height - gameOpt.floor.height - gameOpt.bird.height) {
                game.gameover();
            }
        }
    };
})();
