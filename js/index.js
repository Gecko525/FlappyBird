(function () {
    var birdCanvas = document.getElementById('bird_canvas');
    var canvasWidth = window.innerWidth - 2;
    var canvasHeight = window.innerHeight - 2;
    birdCanvas.setAttribute('width', canvasWidth + 'px');
    birdCanvas.setAttribute('height', canvasHeight + 'px');

    window.gameOpt = {
        building: {
            width: 300,
            height: 216
        },
        tree: {
            width: 300,
            height: 216
        },
        floor: {
            width: 48,
            height: 48
        },
        pipe: {
            width: 148,
            height: 1664,
            space: 200
        },
        bird: {
            width: 85,
            height: 60
        },
        blood: {
            width: 325,
            height: 138
        },
        gameover: {
            width: 626,
            height: 144
        },
        canvas: {
            width: canvasWidth,
            height: canvasHeight
        },
        resources: [
            {name: 'building', src: 'images/bg1.png'},
            {name: 'tree', src: 'images/bg2.png'},
            {name: 'floor', src: 'images/bg3.png'},
            {name: 'bird', src: 'images/bird.png'},
            {name: 'pipe0', src: 'images/pipe0.png'},
            {name: 'pipe1', src: 'images/pipe1.png'},
            {name: 'blood', src: 'images/blood.png'},
            {name: 'gameover', src: 'images/gameover.png'}
        ]
    };

    window.game = new Game({
        canvasId: 'bird_canvas',
        fps: 60
    });
})();