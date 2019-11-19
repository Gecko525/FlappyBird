// 计算帧数
(function () {
    window.FrameUtil = function () {
        this.init();
    };
    FrameUtil.prototype = {
        init: function () {
            this.sFrame = 0;
            this.sTime = new Date();
            this.allFrame = 0;
            this.realFps = 0;
        },
        countFps: function () {
            this.allFrame++;

            var newTime = new Date();
            if (newTime - this.sTime >= 1000)  {
                this.realFps = this.allFrame - this.sFrame;
                this.sFrame = this.allFrame;
                this.sTime = newTime;
            }
        }
    }
})();