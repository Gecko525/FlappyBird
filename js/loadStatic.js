(function () {
    window.LoadStatic = function () {
        this.init();
    };
    LoadStatic.prototype = {
        init: function () {
            this.loadedCount = 0;
            this.sources = {};
        },
        load: function (arr, callBack) {
            console.log('加载资源。。');
            var self = this;
            for (var i = 0; i < arr.length; i++) {
                var img = new Image();
                img.src = arr[i].src;
                img.index = i;
                img.onload = function () {
                    self.loadedCount++;
                    var imgName = arr[this.index].name;
                    self.sources[imgName] = this;
                    callBack(self.sources, arr.length, self.loadedCount);
                }
            }
        }
    }
})();