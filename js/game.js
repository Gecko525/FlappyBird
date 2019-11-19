(function () {
    window.Game = function (opt) {
        this.init(opt);
    };
    Game.prototype = {
        init: function (opt) {
            console.log('game init');
            this.canvasId = opt.canvasId;
            this.fps = opt.fps || 60;
            this.isGameOver = false;
            this.isGameStart = false;
            this.isStaticLoaded = false;
            this.canvasEle = document.getElementById(this.canvasId);
            this.ctx = this.canvasEle.getContext('2d');
            this.timer = null;
            this.resources = gameOpt.resources;
            this.pipeArr = [];
            this.frameUtil = new FrameUtil();
            var self = this;
            var loadStatic = new LoadStatic();
            loadStatic.load(this.resources, function (imgs, allCount, loadedCount) {
                // 静态资源加载完毕
                if (allCount === loadedCount) {
                    self.imgs = imgs;
                    self.isStaticLoaded = true;
                    self.render();
                }
            });
            console.log(this);
        },
        addFlyListener: function() {
            var self = this;
            this.canvasEle.addEventListener('mousedown', function () {
                if (self.isGameStart && !self.isGameOver) {
                    if (!self.bird.flyState) {
                        self.bird.flyState = 1;
                    } else {
                        self.bird.upAddCount = 15;
                    }
                } else if (self.isStaticLoaded) {
                    self.isGameStart = true;
                    self.timer = setInterval(function () {
                        self.runLoop();
                    }, 1000 / self.fps);
                }
                
            })
        },
        render: function () {
            console.log('开始渲染');

            // 创建房子
            this.building = new BackGround({
                img: this.imgs['building'],
                width: gameOpt.building.width,
                height: gameOpt.building.height,
                x: 0,
                y: gameOpt.canvas.height - gameOpt.building.height / 2 - gameOpt.tree.height - gameOpt.floor.height,
                speed: 3
            });

            // 创建树
            this.tree = new BackGround({
                img: this.imgs['tree'],
                width: gameOpt.tree.width,
                height: gameOpt.tree.height,
                x: 0,
                y: gameOpt.canvas.height - gameOpt.tree.height - gameOpt.floor.height,
                speed: 4
            });

            // 创建地板
            this.floor = new BackGround({
                img: this.imgs['floor'],
                width: gameOpt.floor.width,
                height: gameOpt.floor.height,
                x: 0,
                y: gameOpt.canvas.height - gameOpt.floor.height,
                speed: 5
            });

            // 创建鸟
            this.bird = new Bird({
                img: this.imgs['bird'],
                x: (gameOpt.canvas.width - gameOpt.bird.width) / 2,
                y: gameOpt.canvas.height / 4,
                width: gameOpt.bird.width,
                height: gameOpt.bird.height
            });
            this.building.render();
            this.tree.render();
            this.floor.render();
            this.bird.render();
            this.ctx.font = '40px 微软雅黑';
            this.ctx.fillText('点击开始游戏', gameOpt.canvas.width / 2  - 120, gameOpt.canvas.height / 2);
            this.addFlyListener();
        },
        runLoop: function() {
            this.frameUtil.countFps();
            // 清屏
            this.ctx.clearRect(0, 0, gameOpt.canvas.width, gameOpt.canvas.height);

            // 房子
            this.building.render();
            this.building.update();

            // 树
            this.tree.render();
            this.tree.update();

            // 地板
            this.floor.render();
            this.floor.update();

            // 创建管道
            if (!this.isGameOver && this.frameUtil.allFrame % 100 === 0) {
                var pipeOther = new Pipe({
                    pipe0: this.imgs['pipe0'],
                    pipe1: this.imgs['pipe1'],
                    width: gameOpt.pipe.width,
                    height: gameOpt.pipe.height,
                    speed: 5
                });
                this.pipeArr.push(pipeOther);
            }
            this.pipeArr.forEach(function (pipe) {
                // 管道
                pipe.render();
                pipe.update();
            });

            // 鸟
            this.bird.render();
            this.bird.update();
        },
        pause: function () {
            clearInterval(this.timer);
        },
        gameover: function () {
            if (!this.isGameOver) {
                console.log('gameover');
                this.building.pause();
                this.tree.pause();
                this.floor.pause();
                this.pipeArr.forEach(function (pipe) {
                    pipe.pause();
                });
                this.isGameOver = true;
                this.bird.die = true;
            }
        }
    };
})();