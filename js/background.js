// 背景对象
(function () {
    window.BackGround = function(opt) {
        this.init(opt);
    };
    BackGround.prototype = {
        init: function (opt) {
            this.img = opt.img;
            this.x = opt.x;
            this.y = opt.y;
            this.width = opt.width;
            this.height = opt.height;
            this.speed = opt.speed || 1;
            this.imgCount = Math.ceil(gameOpt.canvas.width / this.width);
            // console.log(this.bgSrc, this.bgX, this.bgY);
        },
        render: function () {
            for (var i = 0; i < this.imgCount * 2 ; i++) {
                game.ctx.drawImage(this.img, this.x + i * this.width, this.y);
            }
        },
        update: function () {
            this.x -= this.speed;
            if (this.x < -this.imgCount * this.width) {
                this.x = 0;
            }
        },
        pause: function () {
            this.speed = 0;
        }
    };
})();


