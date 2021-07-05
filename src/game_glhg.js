/// <reference path="../typings/phaser.d.ts" />

const gameOptions = {
    width: 1920,
    height: 1500,
}
const playerOptions = {
    playStartY: gameOptions.height * .3,
    playWidth: gameOptions.width * .1,
    chestStartY: gameOptions.height * .775,
    chestWidth: gameOptions.width * .15,

}

let inName = ''
let inEmail = ''

let ts;
let game;
let didSubmit = false;
let player;

let chest_ROX;
let chest_CHS;
let chest_ROI;

let CharityCount_ROI = 0;
let CharityCount_CHS = 0;
let CharityCount_ROX = 0;

const style = { fontFamily: "Open Sans", fontSize: '72px', fontStyle: 'Bold', fill: "#fff", shadow: { blur: 5, fill: true } };
const substyle = { fontFamily: "Open Sans", fontSize: '45px', fontStyle: 'Bold', fill: "#fff", shadow: { blur: 5, fill: true } };


function showAsValid(c) {
    let cont = document.getElementById(domPar);
    let tEmail = document.getElementById('glh-email').value;
    let tName = document.getElementById('glh-name').value;
    inEmail = tEmail;
    inName = tName;

    cont.style.opacity = 0;
    setTimeout(() => {
        getCharities();
        cont.innerHTML = '';
        setTimeout(() => {
            cont.style.opacity = 1;
        }, 1000);

    }, 500);
}

function validStartGame() {
    let tc = document.getElementById('glh-valid').value;
    checkIsValidUser(tc);
}

window.addEventListener('load', () => {

    //getCharities();
})
const domPar = 'ghost-holiday'

function startGame() {

    const config = {
        type: Phaser.AUTO,
        // backgroundColor: '69d2e7',
        parent: domPar,
        transparent: true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: gameOptions.width,
            height: gameOptions.height,
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 },
            }
        },
        audio: {
            disableWebAudio: true
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    game = new Phaser.Game(config);

}

function preload() {
    //this.load.setBaseURL('http://labs.phaser.io');
    //getCharities();
    //submitCharity('Max','goggle','ROX');


    this.load.baseURL = 'src/assets/'
    this.load.image('player', 'img/coin.png');
    this.load.image('chest_open', 'img/chest_open.png');
    this.load.image('chest_closed', 'img/chest_closed.png');
    this.load.image('pbar_01', 'img/pbar_01.png');
    this.load.image('pbar_02', 'img/pbar_02.png');
    this.load.image('pbar_03', 'img/pbar_03.png');
    this.load.image('pbar_04', 'img/pbar_04.png');
    this.load.image('pbar_05', 'img/pbar_05.png');
    this.load.image('pbar_06', 'img/pbar_06.png');
    this.load.image('pbar_07', 'img/pbar_07.png');
    this.load.image('pbar_08', 'img/pbar_08.png');
    this.load.image('pbar_09', 'img/pbar_09.png');
    this.load.image('pbar_10', 'img/pbar_10.png');

}
let title;
let title_msg1 = 'DONATE YOUR TOKEN';
let title_msg2 = "DRAG TOKEN TO CHARITY'S TREASURE CHEST";

function create() {

    //#region INPUT FORM

    //#endregion



    ts = this;

    title = this.add.text(gameOptions.width / 2, 50, title_msg2, style).setOrigin(0.5, 0);


    player = ts.physics.add.image(gameOptions.width / 2, playerOptions.playStartY, 'player').setInteractive();
    player.displayWidth = playerOptions.playWidth;
    player.scaleY = player.scaleX;
    player.body.setAllowGravity(false);
    player.body.setCollideWorldBounds(true, 0, 0);

    tween_bounceCoin();

    chest_CHS = ts.physics.add.image(gameOptions.width * .175, playerOptions.chestStartY, 'chest_open');
    chest_CHS.displayWidth = playerOptions.chestWidth;
    chest_CHS.scaleY = chest_CHS.scaleX;
    chest_CHS.body.setAllowGravity(false);
    chest_CHS.body.setCollideWorldBounds(true, 0, 0);

    chest_CHS_prog = ts.physics.add.image(chest_CHS.x, playerOptions.chestStartY + (chest_CHS.displayHeight / 1.5), getProgStatus('CHS'));
    chest_CHS_prog.displayWidth = chest_CHS.displayWidth;
    chest_CHS_prog.scaleY = chest_CHS_prog.scaleX;
    chest_CHS_prog.body.setAllowGravity(false);
    chest_CHS_prog.body.setCollideWorldBounds(true, 0, 0);
    chsText = this.add.text(chest_CHS_prog.x, chest_CHS_prog.y + 20, 'CBus Humane', substyle).setOrigin(0.5, 0);

    chest_ROI = ts.physics.add.image(gameOptions.width * .5, playerOptions.chestStartY, 'chest_open');
    chest_ROI.displayWidth = playerOptions.chestWidth;
    chest_ROI.scaleY = chest_ROI.scaleX;
    chest_ROI.body.setAllowGravity(false);
    chest_ROI.body.setCollideWorldBounds(true, 0, 0);

    chest_ROI_prog = ts.physics.add.image(chest_ROI.x, playerOptions.chestStartY + (chest_ROI.displayHeight / 1.5), getProgStatus('ROI'));
    chest_ROI_prog.displayWidth = chest_ROI.displayWidth;
    chest_ROI_prog.scaleY = chest_ROI_prog.scaleX;
    chest_ROI_prog.body.setAllowGravity(false);
    chest_ROI_prog.body.setCollideWorldBounds(true, 0, 0);
    roiText = this.add.text(chest_ROI_prog.x, chest_ROI_prog.y + 20, 'ROI', substyle).setOrigin(0.5, 0);

    chest_ROX = ts.physics.add.image(gameOptions.width * .825, playerOptions.chestStartY, 'chest_open');
    chest_ROX.displayWidth = playerOptions.chestWidth;
    chest_ROX.scaleY = chest_ROX.scaleX;
    chest_ROX.body.setAllowGravity(false);
    chest_ROX.body.setCollideWorldBounds(true, 0, 0);

    chest_ROX_prog = ts.physics.add.image(chest_ROX.x, playerOptions.chestStartY + (chest_ROX.displayHeight / 1.5), getProgStatus('ROX'));
    chest_ROX_prog.displayWidth = chest_ROX.displayWidth;
    chest_ROX_prog.scaleY = chest_ROX_prog.scaleX;
    chest_ROX_prog.body.setAllowGravity(false);
    chest_ROX_prog.body.setCollideWorldBounds(true, 0, 0);
    roxText = this.add.text(chest_ROX_prog.x, chest_ROX_prog.y + 20, 'ROX', substyle).setOrigin(0.5, 0);




    this.physics.add.overlap(player, chest_CHS, collectCoinCHS, null, this);
    this.physics.add.overlap(player, chest_ROI, collectCoinROI, null, this);
    this.physics.add.overlap(player, chest_ROX, collectCoinROX, null, this);
    this.physics.add.overlap(player, title, function () {
        // // console.log('over');

    }, null, this);


    this.input.setDraggable(player);

    this.input.on('dragstart', function (pointer, gameObject) {
        
        this.children.bringToTop(gameObject);
        ptween_bounceCoin.stop();
        gameObject.setScale(gameObject.scaleX / 1.5, gameObject.scaleY / 1.5);
        title.setText(title_msg1);

    }, this);

    this.input.on('dragend', function (pointer, gameObject) {

        if(!didSubmit){
            title.setText(title_msg2);
        }
        this.children.bringToTop(gameObject);
        gameObject.setScale(gameObject.scaleX * 1.5, gameObject.scaleY * 1.5);
        // tweenh = ts.tweens.add({
        //   targets: player,
        //   y: (player.y - 20),
        //   delay: 0,
        //   duration: 500,
        //   yoyo: true,
        //   repeat: 500,
        //   ease: 'Power2'
        // });
        // gameObject.body.setAllowGravity(true);
        tween_bounceCoin();
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

}




function getProgStatus(charityName) {

    let c;
    switch (charityName) {
        case 'ROI':
            c = CharityCount_ROI;
            break;
        case 'ROX':
            c = CharityCount_ROX;
            break;
        case 'CHS':
            c = CharityCount_CHS;
            break;
        default:
    }
    let t = CharityCount_ROI + CharityCount_ROX + CharityCount_CHS;
    // console.log('total' + t);

    let stat = Math.round(c / t * 10);
    // console.log(stat);

    let imgname;
    switch (stat) {
        case 1:
            imgname = 'pbar_01';

            break;
        case 2:
            imgname = 'pbar_02';
            break;
        case 3:
            imgname = 'pbar_03';
            break;
        case 4:
            imgname = 'pbar_04';
            break;
        case 5:
            imgname = 'pbar_05';
            break;
        case 6:
            imgname = 'pbar_06';
            break;
        case 7:
            imgname = 'pbar_07';
            break;
        case 8:
            imgname = 'pbar_08';
            break;
        case 9:
            imgname = 'pbar_09';
            break;
        case 10:
            imgname = 'pbar_10';
            break;
        default:
            imgname = 'pbar_01';
    }
    // console.log(charityName + ' ' + imgname);
    return imgname;

}

//built in called internally
function update(t, dt) {
    gPointer = this.input.activePointer;
}

function collectCoinCHS() {
    if (!didSubmit && !gPointer.isDown) {
        var emitter = ts.add.particles('player').createEmitter({
            x: 0,
            y: 0,
            blendMode: 'OVERLAY',
            scale: { start: .3, end: 0 },
            speed: { min: -100, max: 300 },
            quantity: 1,
            frequency: 5,
            alpha: .8,
            allowGravity: true,
            gravity: -1000
        });

        emitter.startFollow(chest_CHS);
        chest_CHS.setTexture('chest_closed');
        this.children.bringToTop(chest_CHS);

        let tweenx = ts.tweens.add({
            targets: chest_CHS,
            x: (gameOptions.width / 2),
            delay: 0,
            duration: 500,
            ease: 'Power2'
        });
        let tweeny = ts.tweens.add({
            targets: chest_CHS,
            y: (gameOptions.height * .3),
            delay: 0,
            duration: 500,
            ease: 'Power2'
        });
        chest_CHS_prog.destroy();
        chsText.destroy();
        player.destroy();

        let finText = ts.add.text(gameOptions.width / 2, gameOptions.height * .3 + 200, 'Thanks from CBus Humane and Ghost Label!', style).setOrigin(0.5, 0).setAlpha(0);
        let tweena = ts.tweens.add({
            targets: finText,
            alpha: 1,
            delay: 200,
            duration: 500,
            ease: 'Power2'
        });

        submitCharity(inName, inEmail, 'CHS');



    }
}

function collectCoinROI() {
    if (!didSubmit && !gPointer.isDown) {

        var emitter = ts.add.particles('player').createEmitter({
            x: 0,
            y: 0,
            blendMode: 'OVERLAY',
            scale: { start: .3, end: 0 },
            speed: { min: -100, max: 300 },
            quantity: 1,
            frequency: 5,
            alpha: .8,
            allowGravity: true,
            gravity: -1000
        });

        emitter.startFollow(chest_ROI);
        chest_ROI.setTexture('chest_closed');
        this.children.bringToTop(chest_ROI);

        let tweenx = ts.tweens.add({
            targets: chest_ROI,
            x: (gameOptions.width / 2),
            delay: 0,
            duration: 500,
            ease: 'Power2'
        });
        let tweeny = ts.tweens.add({
            targets: chest_ROI,
            y: (gameOptions.height * .3),
            delay: 0,
            duration: 500,
            ease: 'Power2'
        });
        chest_ROI_prog.destroy();
        roiText.destroy();
        player.destroy();

        let finText = ts.add.text(gameOptions.width / 2, gameOptions.height * .3 + 200, 'Thanks from ROI and Ghost Label!', style).setOrigin(0.5, 0).setAlpha(0);
        let tweena = ts.tweens.add({
            targets: finText,
            alpha: 1,
            delay: 200,
            duration: 500,
            ease: 'Power2'
        });

        submitCharity(inName, inEmail, 'ROI');

    }
}

function collectCoinROX() {
    if (!didSubmit && !gPointer.isDown) {

        var emitter = ts.add.particles('player').createEmitter({
            x: 0,
            y: 0,
            blendMode: 'OVERLAY',
            scale: { start: .3, end: 0 },
            speed: { min: -100, max: 300 },
            quantity: 1,
            frequency: 5,
            alpha: .8,
            allowGravity: true,
            gravity: -1000
        });

        emitter.startFollow(chest_ROX);
        chest_ROX.setTexture('chest_closed');
        this.children.bringToTop(chest_ROX);

        let tweenx = ts.tweens.add({
            targets: chest_ROX,
            x: (gameOptions.width / 2),
            delay: 0,
            duration: 500,
            ease: 'Power2'
        });
        let tweeny = ts.tweens.add({
            targets: chest_ROX,
            y: (gameOptions.height * .3),
            delay: 0,
            duration: 500,
            ease: 'Power2'
        });
        chest_ROX_prog.destroy();
        roxText.destroy();
        player.destroy();

        let finText = ts.add.text(gameOptions.width / 2, gameOptions.height * .3 + 200, 'Thanks from ROX and Ghost Label!', style).setOrigin(0.5, 0).setAlpha(0);
        let tweena = ts.tweens.add({
            targets: finText,
            alpha: 1,
            delay: 200,
            duration: 500,
            ease: 'Power2'
        });

        submitCharity(inName, inEmail, 'ROX');
    }
}

//#region Helpers



//#endregion


function submitCharity(name, email, charity) {
    if (!didSubmit) {

        title.setText('');


        var request = new XMLHttpRequest();
        request.open('POST', 'submitentry.php?n=' + name + '&e=' + email + '&c=' + charity, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                r = this.responseText;
                console.log('sent Submission')

                // here you could go to the leaderboard or restart your game .
            } else {
                // We reached our target server, but it returned an error

            }
        };
        request.send();
        didSubmit = true;
    }
}

// var isFetching = false;

function checkIsValidUser(c) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("txtHint").innerHTML = this.responseText;
            r = this.responseText;
            // // console.log(r)

            if (r == 't') {
                //start
                showAsValid();
            } else {
                console.log('Invalid Access Code')
                alert('Invalid Access Code');
                //return false;
            }

        };
    }
    xmlhttp.open("POST", "checkUser.php?c=" + c, true);
    xmlhttp.send();
}

function getCharities() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("txtHint").innerHTML = this.responseText;
            r = this.responseText;
            // console.log(r)
            var emp_data = JSON.parse(r, function (key, value) {
                if (key == "Charity") {
                    switch (value) {
                        case 'ROI':
                            CharityCount_ROI++;
                            break;
                        case 'ROX':
                            CharityCount_ROX++;
                            break;
                        case 'CHS':
                            CharityCount_CHS++;
                            break;
                        default:

                    }
                } else {

                    return value;
                }

            });

            // console.log(emp_data[0]?.FullName);
            // console.log(CharityCount_ROI);
            // console.log(CharityCount_CHS);
            // console.log(CharityCount_ROX);
            startGame();
            //store the element values into variables
            // $id = $emp_data -> empid;
            // $name = $emp_data -> personal -> name;
            // $gender = $emp_data -> personal -> gender;
            // $designation = $emp_data -> profile -> designation;
            // $department = $emp_data -> profile -> department;
        }
    };

    xmlhttp.open("GET", "getcharities.php", true);
    xmlhttp.send();
}
let ptween_bounceCoin = null;

function tween_bounceCoin() {

    ptween_bounceCoin = ts.tweens.add({
        targets: player,
        y: (player.y - 20),
        delay: 0,
        duration: 500,
        yoyo: true,
        repeat: 500,
        ease: 'Power2'
    });
}