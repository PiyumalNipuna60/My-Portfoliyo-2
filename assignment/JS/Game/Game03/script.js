var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(900, 600); 
    frameRate(60);    
    smooth();

    textFont(createFont("Trebuchet MS"));

    var game;

    var Button = function(args) {
        this.x = args.x;
        this.y = args.y;
        this.w = args.w || 120;
        this.h = args.h || 50;
        this.content = args.content;
        this.func = args.func;
        this.enabled = args.enabled || false;
    };
    Button.prototype = {
        over: function() {
            return (mouseX > this.x && 
                    mouseX < this.x + this.w && 
                    mouseY > this.y && 
                    mouseY < this.y + this.h);
        },
        draw: function() {
            noStroke();

            if(this.enabled && this.over()) {
                game.hover = true;
                fill(69, 66, 69);
            }
            else {
                fill(46, 47, 48);
            }

            //Draw the button
            rect(this.x, this.y, this.w, this.h);

            //Draw the text on the button
            pushStyle();
                textAlign(CENTER, CENTER);
                textSize(18);
                fill(255);
                text(this.content, this.x + this.w / 2, this.y + this.h / 2);
            popStyle();

            //If the mouse was clicked and the mouse was over the button
            if(this.enabled && game.clicked && this.over()) {
                //Run the function
                this.func();
            }
        }
    };

    //Transition object (between scenes)
    var Transition = function() {
        this.h = 0;
        this.vy = 15;
        this.active =  false;
        this.scene = "home";

        this.reset = function() {
            this.h = 0;
            this.vy = 15;
        };
        this.draw = function() {
            if(this.active) {
                pushStyle();
                    fill(64, 57, 59);
                    rect(-20, -20, width + 40, this.h);
                    rect(-20, height-this.h, width + 40, this.h + 20);
                popStyle();
            }
        };
        this.update = function() {
            if(this.active) {
                this.h+= this.vy;

                //if halfway across the screen then change the scene
                if(this.h >= 300) {
                    game.scene = this.scene;
                    this.vy*= -1;
                }
                //else if it's completely off the screen reset it and set to inactive
                else if(this.h < 0) {
                    this.reset();
                    this.active = false;
                }
            }
        };
        this.run = function() {
            this.draw();
            this.update();
        };
    };

    var Block = function(args) {
        this.x = args.x  || 0;
        this.y = args.y || 0;
        this.w = args.w || 100;
        this.h = args.h || this.w;
        this.vx = args.vx || 0;
        this.vy = args.vy || 0;
    };
    Block.new = function(args) {
        var obj = Object.create(Block.prototype);
        Block.apply(obj, arguments);
        return obj;
    };
    Block.prototype = {
        move: function() {
            this.x += this.vx;
            this.y += this.vy;
        },
        draw: function() {
            pushStyle();
                noStroke();
                fill(194, 91, 81);
                rect(this.x, this.y, this.w, this.h);
            popStyle();
        },
        go: function() {
            this.draw();
            this.move();
        }
    };

    var Trampoline = function(args) {
        this.x = args.x  || 0;
        this.y = args.y || 0;
        this.w = args.w || 100;
        this.h = args.h || this.w;
        // this.vx = args.vx || 0;
        // this.vy = args.vy || 0;
        this.dead = false;
    };
    Trampoline.new = function(args) {
        var obj = Object.create(Trampoline.prototype);
        Trampoline.apply(obj, arguments);
        return obj;
    };
    Trampoline.prototype = {
        draw: function() {
            pushStyle();
                noStroke();
                fill(194, 91, 81);
                //legs
                //front left
                rect(this.x + this.w * 0.12, this.y + this.h * 0.8, this.w * 0.08, this.h * 0.8);
                //front right
                rect(this.x + this.w * 0.8, this.y + this.h * 0.8, this.w * 0.08, this.h * 0.8);
                //back left
                rect(this.x + this.w * 0.01, this.y + this.h * 0.6, this.w * 0.08, this.h * 0.8);
                //back right
                rect(this.x + this.w * 0.91, this.y + this.h * 0.6, this.w * 0.08, this.h * 0.8);
                //main body
                fill(80, 222, 201);
                ellipse(this.x + this.w * 0.5, this.y + this.h * 0.5, this.w * 1.1, this.h * 1.1);
                fill(79, 82, 82);
                ellipse(this.x + this.w * 0.5, this.y + this.h * 0.40, this.w * 0.90, this.h * 0.55);

                // noFill();
                // stroke(0);
                // rect(this.x, this.y, this.w, this.h);
            popStyle();
        },
        update: function() {
            // this.x += this.vx;
            // this.y += this.vy;
        },
        go: function() {
            this.draw();
            this.update();
        }
    };

    var Mud = function(args) {
        this.x = args.x  || 0;
        this.y = args.y || 0;
        this.w = args.w || 100;
        this.h = args.h || this.w;
        this.dead = false;
    };
    Mud.new = function(args) {
        var obj = Object.create(Mud.prototype);
        Mud.apply(obj, arguments);
        return obj;
    };
    Mud.prototype = {
        draw: function() {
            pushMatrix();
                translate(this.x, this.y);

                pushStyle();
                    noStroke();

                    // fill(120, 96, 60);
                    // ellipse(this.w * 1.2, this.h * 1.2, this.w * 0.4, this.h * 0.7);
                    // ellipse(-this.w * 0.3, this.h * 1.3, this.w * 0.4, this.h * 0.6);
                    // ellipse(this.w * 0.2, this.h * 2.0, this.w * 0.4, this.h * 0.6);

                    fill(97, 72, 26);
                    ellipse(this.w * 0.5, this.h * 0.8, this.w * 1.6, this.h * 1.8);

                    fill(120, 106, 44);
                    ellipse(this.w * 0.5, this.h * 0.7, this.w * 1.4, this.h * 1.4);

                    fill(102, 80, 45);
                    ellipse(this.w * 0.5, this.h * 0.7, this.w * 1, this.h * 1);

                    fill(120, 106, 44);
                    ellipse(this.w * 0.4, this.h * 0.6, this.w * 0.4, this.h * 0.5);
                popStyle();
            popMatrix();
        },
        update: function() {
            // this.x += this.vx;
            // this.y += this.vy;
        },
        go: function() {
            this.draw();
            this.update();
        }
    };

    var Bomb = function(args) {
        this.x = args.x  || 0;
        this.y = args.y || 0;
        this.w = args.w || 100;
        this.h = args.h || this.w;
        this.dead = false;
    };
    Bomb.new = function(args) {
        var obj = Object.create(Bomb.prototype);
        Bomb.apply(obj, arguments);
        return obj;
    };
    Bomb.prototype = {
        draw: function() {
            pushMatrix();
                translate(this.x, this.y);

                pushStyle();
                    //balloon
                    stroke(50);
                    strokeWeight(1);
                    fill(227, 93, 88);
                    ellipse(0, -this.h * 1.5, this.w, this.h * 1.1);

                    //shadow on balloon
                    pushMatrix();
                        translate(-this.w * 0.25, -this.h * 1.7);

                        rotate(radians(35));
                        noStroke();
                        fill(242, 242, 242, 200);
                        ellipse(0, 0, this.w * 0.2, this.h * 0.3);
                    popMatrix();

                    //string connecting the bomb to the balloon
                    stroke(50);
                    line(0, -this.h, 0, 0);

                    //bomb
                    pushMatrix();
                        rotate(radians(-25));

                        fill(148, 145, 148);
                        beginShape();
                            vertex(-this.w * 0.4, -this.h * 0.2);
                            vertex( this.w * 0.3, -this.h * 0.2);
                            vertex( this.w * 0.4, -this.h * 0.1);
                            vertex( this.w * 0.5, -this.h * 0.2);
                            vertex( this.w * 0.6, -this.h * 0.2);
                            vertex( this.w * 0.6,  this.h * 0.2);
                            vertex( this.w * 0.5,  this.h * 0.2);
                            vertex( this.w * 0.4,  this.h * 0.1);
                            vertex( this.w * 0.3,  this.h * 0.2);
                            vertex(-this.w * 0.4,  this.h * 0.2);
                            bezierVertex(-this.w * 0.55, this.h * 0.1, -this.w * 0.55, -this.h * 0.1, -this.w * 0.4, -this.h * 0.2);
                        endShape();

                        //string around bomb
                        line(this.w * 0.1, -this.h * 0.2, this.w * 0.05, this.h * 0.2);

                        //words on bomb
                        textSize(12);
                        fill(0);
                        text("BOMB", -this.w * 0.34, this.h * 0.09);
                    popMatrix();
                popStyle();
            popMatrix();
        },
        update: function() {
            // this.x += this.vx;
            this.y += game.sin(radians(frameCount * 2)) * 0.4;
        },
        go: function() {
            this.draw();
            this.update();
        }
    };

    var Explosive = function(args) {
        this.x = args.x  || 0;
        this.y = args.y || 0;
        this.w = args.w || 100;
        this.h = args.h || this.w;
        this.dead = false;
    };
    Explosive.new = function(args) {
        var obj = Object.create(Explosive.prototype);
        Explosive.apply(obj, arguments);
        return obj;
    };
    Explosive.prototype = {
        draw: function() {
            pushMatrix();
                translate(this.x, this.y);

                pushStyle();
                    //barrel
                    stroke(38, 38, 38);
                    strokeWeight(1);
                    fill(120, 119, 120);
                    beginShape();
                        vertex(0, 0);
                        vertex(this.w * 0.5, 0);
                        vertex(this.w * 0.5, this.h);
                        bezierVertex(this.w * 0.3, this.h * 1.1, this.w * 0.2, this.h * 1.1, 0, this.h);
                    endShape(CLOSE);
                    ellipse(this.w * 0.25, 0, this.w * 0.5, this.h * 0.15);
                    bezier(0, this.h * 0.3, this.w * 0.15, this.h * 0.41, this.w * 0.35, this.h * 0.41, this.w * 0.5, this.h * 0.3);
                    bezier(0, this.h * 0.7, this.w * 0.15, this.h * 0.81, this.w * 0.35, this.h * 0.81, this.w * 0.5, this.h * 0.7);
                    //hole in top of barrel
                    noStroke();
                    fill(41, 40, 41);
                    ellipse(this.w * 0.15, 0, this.w * 0.15, this.h * 0.05);

                    //skull and cross bones on barrel
                    stroke(66, 63, 63);
                    strokeWeight(3);
                    line(this.w * 0.1, this.h * 0.5, this.w * 0.4, this.h * 0.75);
                    line(this.w * 0.1, this.h * 0.75, this.w * 0.4, this.h * 0.5);
                    strokeWeight(1);
                    noStroke();
                    ellipse(this.w * 0.1, this.h * 0.5, 5, 7);
                    ellipse(this.w * 0.4, this.h * 0.75, 5, 7);
                    ellipse(this.w * 0.1, this.h * 0.75, 5, 7);
                    ellipse(this.w * 0.4, this.h * 0.5, 5, 7);
                    ellipse(this.w * 0.25, this.h * 0.3, this.w * 0.3, this.h * 0.3);
                    ellipse(this.w * 0.25, this.h * 0.4, this.w * 0.2, this.h * 0.3);
                    fill(156, 153, 156);
                    ellipse(this.w * 0.2, this.h * 0.3, this.w * 0.06, this.h * 0.10);
                    ellipse(this.w * 0.3, this.h * 0.3, this.w * 0.06, this.h * 0.10);

                    //TNT
                    randomSeed(100);
                    stroke(40);
                    fill(219, 89, 57);
                    for(var i = 0; i < 10; i++) {
                        pushMatrix();
                            rotate(radians(random(-5, 5)));
                            rect(random(this.w * 0.5, this.w * 0.9), random(-this.h * 0.1, this.h * 0.05), this.w * 0.08, this.h * 0.4);
                        popMatrix();
                    }

                    //TNT box
                    stroke(40);
                    fill(200, 140, 115);
                    rect(this.w * 0.5, this.h * 0.3, this.w * 0.5, this.h * 0.7);
                    line(this.w * 0.5, this.h * 0.65, this.w, this.h * 0.65);
                    fill(36, 35, 36);
                    textSize(14);
                    textAlign(CENTER);
                    text("TNT", this.w * 0.75, this.h * 0.6);
                    text("TNT", this.w * 0.75, this.h * 0.95);
                popStyle();
            popMatrix();
        },
        update: function() {
            // this.x += this.vx;
            // this.y += this.vy;
        },
        go: function() {
            this.draw();
            this.update();
        }
    };

    var FlyTrap = function(args) {
        this.x = args.x  || 0;
        this.y = args.y || 0;
        this.w = args.w || 100;
        this.h = args.h || this.w;
        this.angle = 20;
        this.eat = false;
        this.dead = false;
        this.color = color(108, 158, 27);
    };
    FlyTrap.new = function(args) {
        var obj = Object.create(FlyTrap.prototype);
        FlyTrap.apply(obj, arguments);
        return obj;
    };
    FlyTrap.prototype = {
        draw: function() {
            pushMatrix();
                translate(this.x, this.y);

                pushStyle();

                    //main stem
                    strokeWeight(7);
                    stroke(50);
                    bezier(0, this.h * 0.48, this.w * 0.25, this.h * 0.7, -this.w * 0.25, this.h * 0.8, 0, this.h * 1.1);

                    strokeWeight(5);
                    stroke(108, 158, 27);
                    bezier(0, this.h * 0.48, this.w * 0.25, this.h * 0.7, -this.w * 0.25, this.h * 0.8, 0, this.h * 1.1);

                    //branches
                    fill(108, 158, 27);
                    strokeWeight(3);
                    stroke(50);
                    bezier(0, this.h * 0.7, -this.w * 0.2, this.h * 0.7, -this.w * 0.4, this.h * 0.7, -this.w * 0.5, this.h * 0.9);
                    bezier(0, this.h * 0.8,  this.w * 0.2, this.h * 0.8,  this.w * 0.4, this.h * 0.7,  this.w * 0.5, this.h * 0.95);

                    fill(108, 158, 27);
                    strokeWeight(2);
                    stroke(108, 158, 27);
                    bezier(0, this.h * 0.7, -this.w * 0.2, this.h * 0.7, -this.w * 0.4, this.h * 0.7, -this.w * 0.5, this.h * 0.9);
                    bezier(0, this.h * 0.8,  this.w * 0.2, this.h * 0.8,  this.w * 0.4, this.h * 0.7,  this.w * 0.5, this.h * 0.95);

                    //head
                    stroke(50);
                    strokeWeight(1);
                    fill(108, 158, 27);
                    //left
                    pushMatrix();
                        translate(0, this.h * 0.5);
                        rotate(radians(-this.angle));

                        beginShape();
                            vertex(0, 0);
                            vertex(-this.w * 0.1, -this.h * 0.2);
                            vertex( this.w * 0.1, -this.h * 0.4);
                            vertex(-this.w * 0.1, -this.h * 0.6);
                            vertex( this.w * 0.1, -this.h * 0.8);
                            vertex(0, -this.h);
                            bezierVertex(-this.w * 0.65, -this.h * 0.9, -this.w * 0.65, -this.h * 0.1, 0, 0);
                        endShape();
                    popMatrix();
                    //right
                    pushMatrix();
                        translate(0, this.h * 0.5);
                        rotate(radians(this.angle));

                        beginShape();
                            vertex(0, 0);
                            vertex(-this.w * 0.1, -this.h * 0.2);
                            vertex( this.w * 0.1, -this.h * 0.4);
                            vertex(-this.w * 0.1, -this.h * 0.6);
                            vertex( this.w * 0.1, -this.h * 0.8);
                            vertex(0, -this.h);
                            bezierVertex(this.w * 0.65, -this.h * 0.9, this.w * 0.65, -this.h * 0.1, 0, 0);
                        endShape();
                    popMatrix();

                    //pot
                    strokeWeight(1);
                    stroke(50);
                    fill(219, 165, 57);
                    beginShape();
                        vertex(-this.w * 0.5, this.h * 1.1);
                        vertex( this.w * 0.5, this.h * 1.1);
                        vertex( this.w * 0.4, this.h * 2);
                        vertex(-this.w * 0.4, this.h * 2);
                    endShape(CLOSE);
                    fill(176, 130, 39);
                    beginShape();
                        vertex(-this.w * 0.55, this.h * 1.1);
                        vertex( this.w * 0.55, this.h * 1.1);
                        vertex( this.w * 0.55, this.h * 1.3);
                        vertex(-this.w * 0.55, this.h * 1.3);
                    endShape(CLOSE);
                popStyle();
            popMatrix();
        },
        update: function() {
            if(this.eat) {
                this.angle = lerp(this.angle, 0, 0.08);
            }
        },
        go: function() {
            this.draw();
            this.update();
        }
    };

    var Player = function(args) {
        this.x = args.x;
        this.y = args.y;
        this.vx = args.vx || 0;
        this.vy = args.vy || 0;
        this.diameter = args.diameter || 100;
        this.scale = this.diameter / 300;
        this.radius = this.diameter / 2;
        this.circumference = 2 * PI * this.radius;
        this.vymax = ~~this.diameter * 0.65;
        this.vxmax = ~~this.diameter * 0.5;
        this.gravity = args.gravity || 0.2;
        this.friction = args.friction || 0;// || 0.02;
        this.angle = args.angle || 0;
        this.rot = args.rot || 0;
        this.color = args.color || color(204, 192, 55);
        this.eaten = false;
        this.type = args.type || "cat";
    };
    Player.new = function(args) {
        var obj = Object.create(Player.prototype);
        Player.apply(obj, arguments);
        return obj;
    };
    Player.prototype = {
        draw: function() {
            pushMatrix();
                translate(this.x, this.y);
                rotate(radians(this.angle));
                scale(this.scale);

                switch(this.type) {
                    case "cat":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.cat, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "dog":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.dog, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "sheep":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.sheep, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "pig":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.pig, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "cow":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.cow, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "mouse":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.mouse, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "rabbit":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.rabbit, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "chicken":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.chicken, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "horse":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.horse, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                }
            popMatrix();
        },
        update: function() {
            this.vx = constrain(this.vx - this.friction, 0, this.vxmax);
            this.x+= this.vx;
            this.vy = constrain(this.vy + this.gravity, this.vy, this.vymax);
            this.y+= this.vy;

            this.angle+= this.vx / this.circumference * 360 * 0.2;
        },
        go: function() {
            this.draw();
            this.update();
        }
    };

    var Cannon = function(args) {
        this.x = args.x;
        this.y = args.y;
        this.vx = args.vx || 0;
        this.vy = args.vy || 0;
        this.rot = {
            min: 20,
            max: 70
        };
        this.angle = args.angle || this.rot.min;
        this.vel = args.vel || 10;
        this.power = 0;
        this.topSpeed = args.topSpeed || 40;
        this.diameter = args.diameter || 150;
        this.length = args.length || 200;
        this.cos = cos;
        this.sin = sin;
    };
    Cannon.new = function(args) {
        var obj = Object.create(Cannon.prototype);
        Cannon.apply(obj, arguments);
        return obj;
    };
    Cannon.prototype = {
        draw: function() {
            pushMatrix();
                translate(this.x, this.y);
                pushStyle();
                    //base
                    noStroke();
                    fill(48, 46, 47);
                    arc(0, 0, this.diameter, this.diameter, radians(180), radians(360));

                    //barrel
                    pushMatrix();
                        rotate(radians(this.angle));
                        stroke(0);
                        strokeWeight(1);
                        fill(166, 171, 170);
                        rect(-12, -this.length, 24, this.length * 0.5, 5);
                        rect(-14, -this.length * 0.8, 28, this.length * 0.8 * 0.5, 5);
                        rect(-16, -this.length * 0.55, 32, this.length * 0.55 * 0.5, 5);
                    popMatrix();

                    noStroke();
                    fill(71, 69, 71);
                    arc(0, 0, this.diameter * 0.9, this.diameter * 0.9, radians(180), radians(360));

                    textAlign(CENTER);
                    textSize(20);
                    fill(250, 200);
                    text(~~this.vel, 0, -this.diameter * 0.25);

                    fill(147, 150, 147);
                    rect(-this.diameter * 0.25, -this.diameter * 0.15, this.diameter * 0.5, this.diameter * 0.1, 5);
                    fill(map(this.vel, 5, this.topSpeed, 235, 130), map(this.vel, 5, this.topSpeed, 40, 235), map(this.vel, 5, this.topSpeed, 40, 135));
                    rect(-this.diameter * 0.25, -this.diameter * 0.15, map(this.vel, 5, this.topSpeed, 0, this.diameter * 0.5), this.diameter * 0.1, 5);

                popStyle();
            popMatrix();
        },
        // move: function() {
        //     if((game.keys[UP] || game.keys[87])) { //Up arrow or W
        //          this.angle = constrain(this.angle - 2, 0, 90);
        //     }
        //     if(game.keys[DOWN] || game.keys[83]) { //Down arrow or S
        //          this.angle = constrain(this.angle + 1, 0, 90);
        //     }

        //     this.angle = constrain(this.angle + 1, 0, 90);
        // },
        update: function() {
            this.x+= this.vx;
            this.y+= this.vy;

            this.vel = map(this.sin(radians(frameCount * 10)), -1, 1, 5, this.topSpeed);
        },
        go: function() {
            this.draw();
            //this.move();
            this.update();
        }
    };

    //game object
    var Game = function() {
        this.scene = "load";
        this.started = false;
        this.images = undefined;
        this.imageIndex = 0;
        this.loaded = false;
        this.gameOpened = false;
        this.valid = true;
        this.score = 0; 
        this.bestScore = 0; 
        this.highscores = [
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            },
            {
                name: "Could be you",
                score: 0
            }
        ];
        this.addFrequency = {
            min: 500,
            max: 900,
            value: ~~random(500, 900)
        };
        this.cam = {
            x: 0,
            y: 0
        };
        this.shake = 0;
        this.shakedown = 0.1;
        this.gameOver = false;
        this.gameOverTimer = 0;
        this.transition = new Transition();
        this.sound = false;
        this.sounds = {
            explosive: document.getElementById('explosive'),
            bomb: document.getElementById('bomb'),
            trampoline: document.getElementById('trampoline'),
            mud: document.getElementById('mud'),
            flytrap: document.getElementById('flytrap'),
            fire: document.getElementById('fire'),
            ground: document.getElementById('ground')
        };
        this.colors = {
            back: color(133, 130, 133),
            heading: color(212, 205, 212),
            text: color(255)
        };
        this.ground = {
            x: 0,
            y: 550,
            w: 600,
            h: 50
        };
        this.player = Player.new({
            x: 450,
            y: 100,
            vx: 0,
            diameter: 80,
            gravity: 0.2,
            rot: 15,
            trails: []
        });
        this.cannon = Cannon.new({
            x: 450,
            y: 550,
            vel: 10,
            length: 170
        });
        this.avatars = {
            selected: "dog",
            cat: new Button({
                x: 50,
                y: 180,
                w: 90,
                h: 30,
                content: "Cat",
                enabled: true,
                func: function() {
                    game.player.type = "cat";
                }
            }),
            dog: new Button({
                x: 240,
                y: 180,
                w: 90,
                h: 30,
                content: "Dog",
                enabled: true,
                func: function() {
                    game.player.type = "dog";
                }
            }),
            sheep: new Button({
                x: 430,
                y: 180,
                w: 90,
                h: 30,
                content: "Sheep",
                enabled: true,
                func: function() {
                    game.player.type = "sheep";
                }
            }),
            pig: new Button({
                x: 50,
                y: 320,
                w: 90,
                h: 30,
                content: "Pig",
                enabled: true,
                func: function() {
                    game.player.type = "pig";
                }
            }),
            cow: new Button({
                x: 240,
                y: 320,
                w: 90,
                h: 30,
                content: "Cow",
                enabled: true,
                func: function() {
                    game.player.type = "cow";
                }
            }),
            mouse: new Button({
                x: 430,
                y: 320,
                w: 90,
                h: 30,
                content: "Mouse",
                enabled: true,
                func: function() {
                    game.player.type = "mouse";
                }
            }),
            rabbit: new Button({
                x: 50,
                y: 470,
                w: 90,
                h: 30,
                content: "Rabbit",
                enabled: true,
                func: function() {
                    game.player.type = "rabbit";
                }
            }),
            chicken: new Button({
                x: 240,
                y: 470,
                w: 90,
                h: 30,
                content: "Chicken",
                enabled: true,
                func: function() {
                    game.player.type = "chicken";
                }
            }),
            horse: new Button({
                x: 430,
                y: 470,
                w: 90,
                h: 30,
                content: "Horse",
                enabled: true,
                func: function() {
                    game.player.type = "horse";
                }
            })
        };
        this.explosions = [];
        this.trampolines = [];
        this.bombs = [];
        this.explosives = [];
        this.flyTraps = [];
        this.muds = [];
        this.trees = [];
        this.bomb = Bomb.new({
           x: 150,
           y: 300,
           w: 50
        });
        this.explosive = Explosive.new({
            x: 70,
            y: 500,
            w: 70,
            h: 50
        });
        this.trampoline = Trampoline.new({
            x: 220,
            y: 540,
            w: 80,
            h: 15
        });
        this.flytrap = FlyTrap.new({
            x: 600,
            y: 450,
            w: 50
        });
        this.mud = Mud.new({
            x: 720,
            y: 530,
            w: 80,
            h: 15
        });
        this.clicked = false;
        this.hover = false;
        this.keys = [];
        this.gameOverImage = undefined;
        this.buttons = {
            play: new Button({
                x: 700,
                y: 150,
                size: 100,
                content: "Play", 
                enabled: true,
                func: function() {
                    game.reset();
                    game.transition.scene = "play";
                    game.transition.active = true;
                }
            }),
            replay: new Button({
                x: 390,
                y: 280,
                content: "Replay", 
                enabled: true,
                func: function() {
                    game.reset();
                    game.transition.scene = "play";
                    game.transition.active = true;
                }
            }),
            home: new Button({
                x: 390,
                y: 350,
                content: "Home", 
                enabled: true,
                func: function() {
                    game.transition.scene = "home";
                    game.transition.active = true;
                }
            }),
            back: new Button({
                x: 400,
                y: 530,
                content: "Home", 
                enabled: true,
                func: function() {
                    game.transition.scene = "home";
                    game.transition.active = true;
                }
            }),
            playHome: new Button({
                x: 50,
                y: 50,
                content: "Home", 
                enabled: true,
                func: function() {
                    game.transition.scene = "home";
                    game.transition.active = true;
                }
            }),
            playSound: new Button({
                x: 50,
                y: 120,
                size: 80,
                content: "Sound (OFF)",
                enabled: true,
                func: function() {
                    game.sound = !game.sound;
                    this.content = "Sound (" + (game.sound === true ? "ON" : "OFF") + ")";
                }
            }),
            scoreboard: new Button({
                x: 700,
                y: 360,
                size: 80,
                content: "Scoreboard",
                enabled: true,
                func: function() {
                    game.transition.scene = "scoreboard";
                    game.transition.active = true;
                }
            }),
            sound: new Button({
                x: 700,
                y: 220,
                size: 80,
                content: "Sound (OFF)",
                enabled: true,
                func: function() {
                    game.sound = !game.sound;
                    this.content = "Sound (" + (game.sound === true ? "ON" : "OFF") + ")";
                }
            }),
            store: new Button({
                x: 700,
                y: 290,
                size: 80,
                content: "Characters",
                enabled: true,
                func: function() {
                    game.transition.scene = "store";
                    game.transition.active = true;
                }
            })
        };
        this.sin = sin;
        this.cos = cos;
        this.triangles = [];
        this.setup();
    };
    Game.prototype = {
        shakeScreen: function() {
            if(this.shake > 0) {
                this.shake = lerp(this.shake, 0, this.shakedown);
                translate(round(random(-this.shake, this.shake)), round(random(-this.shake, this.shake)));
            }
        },
        cat: function() {
            strokeWeight(1);

            //ears
            stroke(8);
            fill(186, 103, 40);
            beginShape();
                vertex(184, 23);
                bezierVertex(197, 12, 208, 7, 218, 11);
                bezierVertex(226, 22, 221, 34, 210, 46);
            endShape(CLOSE);
            beginShape();
                vertex(121, 23);
                bezierVertex(113, 14, 103, 4, 90, 8);
                bezierVertex(84, 15, 87, 30, 98, 42);
            endShape(CLOSE);

            //tail
            fill(198, 146, 44);
            beginShape();
                vertex(216, 262);
                bezierVertex(232, 262, 243, 268, 250, 274);
                bezierVertex(260, 279, 269, 276, 272, 265);
                bezierVertex(273, 255, 272, 250, 272, 245);
                bezierVertex(280, 241, 286, 247, 286, 264);
                bezierVertex(284, 277, 275, 287, 266, 292);
                bezierVertex(258, 294, 248, 290, 242, 284);
                bezierVertex(236, 277, 228, 274, 220, 273);
                vertex(205, 272);
            endShape(CLOSE);

            //arms
            beginShape();
                vertex(202, 155);
                bezierVertex(214, 148, 237, 142, 257, 142);
                bezierVertex(259, 134, 261, 129, 267, 125);
                bezierVertex(273, 127, 274, 132, 275, 138);
                bezierVertex(281, 137, 288, 138, 291, 142);
                bezierVertex(292, 146, 290, 150, 282, 151);
                bezierVertex(286, 157, 289, 161, 289, 164);
                bezierVertex(286, 166, 278, 164, 272, 159);
                bezierVertex(272, 162, 269, 168, 266, 170);
                bezierVertex(260, 168, 258, 160, 257, 155);
                bezierVertex(242, 152, 224, 156, 210, 166);
            endShape(CLOSE);
            beginShape();
                vertex(94, 158);
                bezierVertex(85, 150, 66, 144, 43, 145);
                bezierVertex(43, 141, 40, 131, 36, 127);
                bezierVertex(30, 129, 28, 136, 28, 141);
                bezierVertex(22, 141, 16, 141, 11, 144);
                bezierVertex(10, 149, 14, 154, 20, 157);
                bezierVertex(18, 160, 15, 162, 14, 167);
                bezierVertex(18, 168, 23, 167, 29, 163);
                bezierVertex(30, 167, 31, 172, 36, 173);
                bezierVertex(41, 168, 43, 162, 46, 156);
                bezierVertex(63, 156, 75, 160, 86, 167);
            endShape(CLOSE);

            //legs
            beginShape();
                vertex(201, 273);
                bezierVertex(205, 287, 208, 303, 204, 321);
                bezierVertex(212, 323, 219, 322, 224, 325);
                bezierVertex(225, 329, 220, 336, 211, 340);
                bezierVertex(203, 339, 196, 335, 192, 333);
                bezierVertex(192, 318, 190, 296, 181, 280);
            endShape(CLOSE);
            beginShape();
                vertex(104, 272);
                bezierVertex(94, 285, 93, 306, 94, 324);
                bezierVertex(87, 325, 80, 325, 76, 331);
                bezierVertex(78, 338, 82, 340, 85, 342);
                bezierVertex(92, 343, 100, 343, 107, 340);
                bezierVertex(108, 317, 112, 295, 120, 280);
            endShape(CLOSE);

            //body
            fill(198, 146, 44);
            beginShape();
                vertex(150, 130);
                bezierVertex(172, 130, 199, 139, 216, 159);
                bezierVertex(234, 184, 233, 226, 226, 250);
                bezierVertex(213, 276, 191, 284, 168, 289);
                bezierVertex(145, 290, 122, 289, 100, 277);
                bezierVertex(74, 257, 64, 233, 65, 206);
                bezierVertex(68, 182, 78, 163, 96, 151);
                bezierVertex(113, 140, 128, 134, 149, 130);
            endShape(CLOSE);

            //head
            beginShape();
                vertex(154, 12);
                bezierVertex(179, 12, 204, 27, 222, 48);
                bezierVertex(234, 71, 229, 94, 217, 115);
                bezierVertex(205, 130, 181, 143, 159, 145);
                bezierVertex(132, 145, 107, 132, 88, 114);
                bezierVertex(77, 95, 77, 72, 90, 48);
                bezierVertex(108, 27, 128, 14, 154, 12);
            endShape(CLOSE);

            //mouth
            bezier(153, 91, 155, 104, 169, 112, 180, 106);
            bezier(152, 92, 147, 106, 133, 111, 123, 104);

            //nose
            fill(186, 103, 40);
            beginShape();
                vertex(154, 73);
                bezierVertex(161, 73, 168, 77, 169, 81);
                bezierVertex(164, 90, 163, 91, 156, 94);
                bezierVertex(152, 93, 144, 89, 141, 84);
                bezierVertex(140, 80, 141, 75, 154, 73);
            endShape(CLOSE);

            //eyes
            fill(240);
            beginShape();
                vertex(171, 47);
                bezierVertex(178, 48, 182, 53, 182, 60);
                bezierVertex(180, 65, 175, 69, 168, 68);
                bezierVertex(162, 64, 162, 59, 162, 55);
                bezierVertex(162, 52, 165, 49, 171, 47);
            endShape(CLOSE);
            beginShape();
                vertex(140, 39);
                bezierVertex(147, 39, 153, 41, 156, 50);
                bezierVertex(155, 58, 152, 64, 146, 67);
                bezierVertex(134, 67, 126, 61, 126, 55);
                bezierVertex(126, 48, 131, 42, 140, 39);
            endShape(CLOSE);

            //eye balls
            fill(8);
            ellipse(143, 56, 10, 10);
            ellipse(173, 58, 7, 7);
            fill(240);
            ellipse(141, 52, 4, 4);
            ellipse(171, 56, 3, 3);

            //stripes on head
            noStroke();
            fill(8);
            beginShape();
                vertex(224, 53);
                bezierVertex(216, 58, 206, 62, 197, 65);
                bezierVertex(209, 68, 220, 68, 229, 65);
                bezierVertex(227, 60, 226, 57, 224, 53);
            endShape(CLOSE);
            beginShape();
                vertex(229, 72);
                bezierVertex(226, 77, 218, 79, 210, 80);
                bezierVertex(216, 84, 222, 85, 229, 85);
                bezierVertex(228, 81, 229, 77, 229, 72);
            endShape(CLOSE);
            beginShape();
                vertex(225, 98);
                bezierVertex(221, 100, 212, 100, 204, 97);
                bezierVertex(208, 101, 213, 105, 220, 110);
                bezierVertex(222, 107, 224, 104, 225, 99);
            endShape(CLOSE);
            beginShape();
                vertex(90, 48);
                bezierVertex(94, 53, 105, 60, 112, 63);
                bezierVertex(106, 65, 93, 65, 86, 59);
                bezierVertex(84, 56, 86, 54, 90, 48);
            endShape(CLOSE);
            beginShape();
                vertex(82, 68);
                bezierVertex(84, 73, 93, 77, 105, 79);
                bezierVertex(96, 81, 87, 81, 80, 81);
                bezierVertex(81, 79, 80, 75, 82, 70);
            endShape(CLOSE);
            beginShape();
                vertex(81, 97);
                bezierVertex(86, 99, 97, 100, 110, 98);
                bezierVertex(103, 103, 96, 106, 85, 110);
                bezierVertex(84, 106, 83, 103, 81, 97);
            endShape(CLOSE);

            //stripes on body
            beginShape();
                vertex(222, 174);
                bezierVertex(213, 182, 201, 186, 189, 189);
                bezierVertex(204, 192, 216, 191, 228, 190);
                bezierVertex(228, 185, 227, 181, 223, 173);
            endShape(CLOSE);
            beginShape();
                vertex(230, 209);
                bezierVertex(219, 211, 208, 211, 194, 209);
                bezierVertex(205, 216, 218, 220, 230, 221);
                bezierVertex(231, 216, 231, 214, 230, 209);
            endShape(CLOSE);
            beginShape();
                vertex(229, 235);
                bezierVertex(221, 238, 210, 238, 193, 237);
                bezierVertex(203, 241, 214, 245, 227, 245);
                bezierVertex(227, 243, 228, 240, 229, 235);
            endShape(CLOSE);
            beginShape();
                vertex(217, 263);
                bezierVertex(208, 266, 197, 266, 181, 265);
                bezierVertex(192, 270, 200, 271, 209, 272);
                bezierVertex(212, 271, 214, 267, 217, 264);
            endShape(CLOSE);
            beginShape();
                vertex(74, 174);
                bezierVertex(83, 180, 92, 184, 107, 189);
                bezierVertex(96, 190, 81, 185, 72, 182);
                bezierVertex(72, 180, 74, 178, 74, 174);
            endShape(CLOSE);
            beginShape();
                vertex(66, 201);
                bezierVertex(75, 205, 88, 210, 107, 213);
                bezierVertex(92, 214, 74, 215, 66, 215);
                bezierVertex(65, 212, 65, 209, 66, 203);
            endShape(CLOSE);
            beginShape();
                vertex(69, 231);
                bezierVertex(78, 233, 94, 236, 109, 234);
                bezierVertex(96, 240, 84, 242, 74, 244);
                bezierVertex(71, 239, 70, 237, 69, 233);
            endShape(CLOSE);
            beginShape();
                vertex(87, 265);
                bezierVertex(99, 268, 118, 269, 130, 265);
                bezierVertex(123, 271, 111, 272, 99, 276);
                bezierVertex(96, 273, 94, 270, 87, 266);
            endShape(CLOSE);
        },
        dog: function() {
            // noFill();
            // stroke(0);
            // rect(0, 0, 300, 300);

            strokeWeight(1);

            //feet
            stroke(8);
            fill(234, 148, 47);
            beginShape();
                vertex(215, 234);
                bezierVertex(227, 249, 237, 264, 241, 275);
                bezierVertex(251, 266, 264, 261, 277, 268);
                bezierVertex(263, 277, 252, 285, 239, 296);
                bezierVertex(231, 276, 220, 256, 204, 244);
            endShape(CLOSE);
            beginShape();
                vertex(99, 237);
                bezierVertex(88, 253, 81, 263, 73, 277);
                bezierVertex(64, 269, 50, 265, 38, 269);
                bezierVertex(47, 277, 63, 286, 75, 296);
                bezierVertex(83, 277, 94, 258, 109, 246);
            endShape(CLOSE);

            //arms
            beginShape();
                vertex(203, 130);
                bezierVertex(220, 124, 249, 125, 265, 132);
                bezierVertex(271, 125, 273, 121, 277, 120);
                bezierVertex(283, 121, 282, 130, 279, 134);
                bezierVertex(285, 137, 292, 138, 296, 141);
                bezierVertex(296, 146, 292, 150, 283, 148);
                bezierVertex(286, 153, 287, 157, 287, 161);
                bezierVertex(284, 163, 276, 159, 270, 152);
                bezierVertex(270, 156, 269, 158, 266, 160);
                bezierVertex(259, 158, 258, 150, 258, 143);
                bezierVertex(243, 136, 226, 135, 210, 142);
            endShape(CLOSE);
            beginShape();
                vertex(84, 123);
                bezierVertex(67, 120, 46, 125, 32, 130);
                bezierVertex(30, 125, 26, 120, 21, 118);
                bezierVertex(16, 119, 14, 125, 17, 134);
                bezierVertex(9, 135, 7, 138, 4, 141);
                bezierVertex(3, 145, 8, 149, 16, 149);
                bezierVertex(13, 151, 11, 154, 12, 159);
                bezierVertex(16, 160, 23, 157, 28, 150);
                bezierVertex(28, 154, 30, 159, 33, 159);
                bezierVertex(40, 157, 41, 150, 38, 141);
                bezierVertex(50, 136, 67, 135, 82, 136);
            endShape(CLOSE);

            //ears
            noStroke();
            fill(0);
            beginShape();
                vertex(152, 31);
                bezierVertex(163, 18, 177, 8, 190, 2);
                bezierVertex(198, 2, 205, 6, 206, 13);
                bezierVertex(203, 18, 199, 21, 189, 22);
                bezierVertex(173, 22, 162, 25, 153, 31);
            endShape(CLOSE);
            beginShape();
                vertex(110, 35);
                bezierVertex(92, 30, 78, 26, 60, 26);
                bezierVertex(44, 31, 36, 40, 32, 52);
                bezierVertex(40, 62, 51, 64, 64, 54);
                bezierVertex(73, 46, 90, 38, 111, 38);
            endShape(CLOSE);

            //body
            stroke(8);
            fill(234, 148, 47);
            beginShape();
                vertex(150, 24);
                bezierVertex(187, 42, 224, 61, 259, 75);
                bezierVertex(256, 101, 236, 111, 205, 118);
                bezierVertex(224, 158, 236, 198, 220, 233);
                bezierVertex(200, 260, 158, 268, 114, 253);
                bezierVertex(78, 236, 69, 178, 76, 135);
                bezierVertex(85, 89, 117, 47, 148, 25);
            endShape(CLOSE);

            //spot on left of body
            noStroke();
            fill(8);
            beginShape();
                vertex(219, 151);
                bezierVertex(228, 177, 230, 200, 225, 218);
                bezierVertex(213, 212, 203, 202, 201, 189);
                bezierVertex(201, 169, 211, 158, 219, 151);
            endShape(CLOSE);

            //spot on right of body
            beginShape();
                vertex(75, 150);
                bezierVertex(71, 189, 81, 224, 100, 242);
                bezierVertex(117, 234, 129, 206, 123, 180);
                bezierVertex(110, 154, 89, 151, 76, 149);
            endShape(CLOSE);

            //other spots
            beginShape();
                vertex(119, 92);
                bezierVertex(126, 94, 133, 98, 134, 106);
                bezierVertex(132, 117, 129, 122, 120, 123);
                bezierVertex(111, 121, 106, 115, 104, 107);
                bezierVertex(105, 98, 110, 94, 118, 92);
            endShape(CLOSE);
            beginShape();
                vertex(166, 151);
                bezierVertex(173, 150, 179, 155, 179, 160);
                bezierVertex(178, 165, 175, 170, 171, 171);
                bezierVertex(166, 171, 164, 167, 162, 163);
                bezierVertex(162, 158, 163, 155, 166, 151);
            endShape(CLOSE);
            beginShape();
                vertex(145, 214);
                bezierVertex(155, 215, 158, 220, 159, 225);
                bezierVertex(158, 231, 156, 234, 146, 236);
                bezierVertex(137, 234, 134, 231, 133, 226);
                bezierVertex(133, 222, 137, 217, 144, 214);
            endShape(CLOSE);

            //eyes
            stroke(8);
            fill(224, 222, 220);
            beginShape();
                vertex(116, 11);
                bezierVertex(126, 12, 134, 21, 135, 33);
                bezierVertex(134, 45, 126, 50, 117, 51);
                bezierVertex(105, 50, 99, 39, 99, 31);
                bezierVertex(99, 22, 104, 13, 115, 11);
            endShape(CLOSE);
            beginShape();
                vertex(146, 12);
                bezierVertex(152, 12, 158, 16, 160, 24);
                bezierVertex(160, 31, 156, 37, 151, 38);
                bezierVertex(145, 40, 138, 35, 136, 28);
                bezierVertex(135, 21, 138, 15, 144, 12);
            endShape(CLOSE);

            //eye balls
            fill(8);
            ellipse(119, 31, 8, 8);
            ellipse(149, 28, 6, 6);

            //nose
            beginShape();
                vertex(258, 61);
                bezierVertex(268, 62, 278, 73, 277, 86);
                bezierVertex(274, 95, 267, 101, 259, 101);
                bezierVertex(242, 98, 238, 90, 237, 81);
                bezierVertex(237, 72, 247, 63, 257, 61);
            endShape(CLOSE);
            fill(224);
            ellipse(264, 71, 5, 5);

            stroke(8);
            noFill();
            //mouth
            bezier(206, 118, 181, 123, 156, 91, 146, 73);
            bezier(149, 69, 147, 70, 144, 73, 141, 77);
            bezier(174, 108, 172, 112, 167, 113, 162, 114);
            bezier(196, 101, 194, 106, 189, 112, 187, 121);
            bezier(203, 108, 200, 112, 198, 117, 196, 122);
        },
        cow: function() {
            strokeWeight(1);

            //horns
            fill(246, 136, 73);
            beginShape();
                vertex(116, 26);
                bezierVertex(118, 17, 122, 10, 126, 6);
                bezierVertex(131, 7, 131, 16, 125, 29);
            endShape(CLOSE);
            beginShape();
                vertex(99, 31);
                bezierVertex(92, 22, 87, 18, 83, 17);
                bezierVertex(79, 21, 86, 30, 93, 38);
            endShape(CLOSE);

            //ears
            fill(8);
            beginShape();
                vertex(133, 37);
                bezierVertex(141, 25, 154, 17, 163, 16);
                bezierVertex(170, 17, 175, 21, 171, 26);
                bezierVertex(163, 31, 155, 34, 141, 42);
            endShape(CLOSE);
            beginShape();
                vertex(86, 52);
                bezierVertex(75, 49, 63, 47, 57, 50);
                bezierVertex(51, 55, 46, 60, 54, 62);
                bezierVertex(62, 63, 76, 58, 85, 57);
            endShape(CLOSE);

            //arms
            fill(228, 218, 219);
            beginShape();
                vertex(173, 157);
                bezierVertex(192, 154, 213, 157, 233, 165);
                bezierVertex(235, 161, 239, 157, 243, 152);
                bezierVertex(249, 152, 252, 157, 249, 167);
                bezierVertex(256, 169, 262, 172, 263, 177);
                bezierVertex(261, 181, 255, 182, 251, 180);
                bezierVertex(253, 185, 253, 191, 252, 194);
                bezierVertex(247, 194, 241, 189, 239, 184);
                bezierVertex(237, 189, 235, 192, 231, 192);
                bezierVertex(227, 189, 227, 183, 227, 176);
                bezierVertex(212, 170, 195, 166, 185, 170);
            endShape(CLOSE);
            beginShape();
                vertex(88, 171);
                bezierVertex(75, 169, 53, 175, 33, 187);
                bezierVertex(27, 183, 24, 180, 19, 178);
                bezierVertex(17, 180, 14, 185, 18, 192);
                bezierVertex(15, 197, 8, 199, 5, 207);
                bezierVertex(9, 212, 14, 212, 18, 210);
                bezierVertex(18, 213, 18, 216, 22, 219);
                bezierVertex(25, 216, 29, 211, 32, 208);
                bezierVertex(34, 213, 38, 215, 42, 213);
                bezierVertex(44, 207, 44, 199, 41, 196);
                bezierVertex(54, 186, 66, 183, 82, 184);
            endShape(CLOSE);

            //legs
            beginShape();
                vertex(213, 281);
                bezierVertex(226, 296, 241, 306, 259, 316);
                vertex(254, 332);
                bezierVertex(232, 323, 214, 310, 199, 297);
            endShape(CLOSE);
            beginShape();
                vertex(93, 295);
                bezierVertex(81, 313, 72, 342, 69, 365);
                vertex(88, 367);
                bezierVertex(92, 339, 99, 317, 109, 303);
            endShape(CLOSE);

            //feet
            fill(8);
            beginShape();
                vertex(251, 311);
                vertex(260, 315);
                vertex(253, 332);
                vertex(244, 328);
            endShape(CLOSE);
            beginShape();
                vertex(71, 356);
                vertex(90, 359);
                vertex(88, 367);
                vertex(70, 365);
            endShape(CLOSE);

            //tail
            noFill();
            beginShape();
                vertex(88, 281);
                bezierVertex(77, 290, 69, 290, 57, 289);
                bezierVertex(45, 285, 33, 283, 23, 287);
            endShape();

            bezier(46, 287, 41, 290, 35, 293, 26, 298);
            bezier(44, 288, 41, 293, 37, 300, 34, 310);
            bezier(45, 285, 47, 290, 46, 297, 45, 304);

            //body
            fill(228, 218, 219);
            beginShape();
                vertex(167, 146);
                bezierVertex(193, 168, 219, 192, 225, 226);
                bezierVertex(228, 260, 215, 288, 190, 303);
                bezierVertex(156, 314, 120, 315, 92, 299);
                bezierVertex(72, 277, 65, 249, 68, 219);
                bezierVertex(72, 193, 81, 172, 91, 151);
            endShape(CLOSE);

            //head
            beginShape();
                vertex(106, 26);
                bezierVertex(121, 25, 135, 33, 157, 49);
                bezierVertex(181, 74, 194, 99, 196, 134);
                bezierVertex(191, 160, 163, 174, 135, 175);
                bezierVertex(106, 173, 79, 161, 70, 139);
                bezierVertex(65, 110, 70, 85, 78, 62);
                bezierVertex(85, 42, 94, 31, 106, 26);
            endShape(CLOSE);

            //face
            fill(245, 139, 151);
            beginShape();
                vertex(69, 128);
                bezierVertex(93, 109, 153, 95, 188, 96);
                bezierVertex(197, 113, 200, 135, 189, 152);
                bezierVertex(171, 170, 152, 177, 131, 175);
                bezierVertex(113, 174, 95, 167, 85, 159);
                bezierVertex(77, 154, 68, 142, 69, 128);
            endShape(CLOSE);

            //spots on body
            fill(8);
            beginShape();
                vertex(179, 184);
                bezierVertex(187, 185, 193, 189, 195, 197);
                bezierVertex(194, 205, 189, 208, 182, 210);
                bezierVertex(174, 211, 170, 205, 168, 200);
                bezierVertex(168, 193, 172, 187, 179, 184);
            endShape(CLOSE);
            beginShape();
                vertex(105, 211);
                bezierVertex(117, 212, 128, 221, 130, 234);
                bezierVertex(132, 250, 126, 267, 110, 270);
                bezierVertex(96, 270, 82, 260, 81, 243);
                bezierVertex(82, 228, 91, 214, 105, 211);
            endShape(CLOSE);
            beginShape();
                vertex(203, 233);
                bezierVertex(212, 234, 220, 240, 222, 248);
                bezierVertex(219, 258, 213, 263, 205, 265);
                bezierVertex(197, 264, 189, 258, 186, 250);
                bezierVertex(188, 241, 194, 236, 203, 233);
            endShape(CLOSE);
            beginShape();
                vertex(153, 288);
                bezierVertex(161, 287, 167, 289, 170, 296);
                bezierVertex(167, 303, 167, 306, 158, 307);
                bezierVertex(151, 308, 143, 306, 142, 301);
                bezierVertex(142, 294, 147, 290, 153, 288);
            endShape(CLOSE);

            //eyes
            fill(240);
            beginShape();
                vertex(108, 44);
                bezierVertex(117, 44, 127, 53, 128, 65);
                bezierVertex(128, 76, 120, 86, 113, 85);
                bezierVertex(98, 85, 92, 76, 91, 67);
                bezierVertex(91, 55, 94, 46, 108, 44);
            endShape(CLOSE);
            beginShape();
                vertex(139, 44);
                bezierVertex(148, 45, 155, 52, 155, 58);
                bezierVertex(154, 65, 150, 72, 142, 73);
                bezierVertex(133, 72, 131, 66, 127, 62);
                bezierVertex(127, 57, 129, 49, 139, 44);
            endShape(CLOSE);

            //eyeballs
            noStroke();
            fill(8);
            ellipse(112, 62, 10, 10);
            ellipse(142, 58, 7, 7);

            //mouth
            noFill();
            stroke(8);
            beginShape();
                vertex(177, 128);
                bezierVertex(164, 140, 147, 154, 123, 153);
                bezierVertex(102, 149, 94, 144, 86, 138);
            endShape();

            bezier(90, 137, 89, 137, 87, 138, 84, 141);
            bezier(173, 124, 176, 124, 178, 126, 180, 131);

            //nostrils
            noStroke();
            fill(8);
            beginShape();
                vertex(143, 105);
                bezierVertex(147, 107, 148, 113, 147, 119);
                bezierVertex(144, 118, 141, 111, 143, 106);
            endShape(CLOSE);
            beginShape();
                vertex(108, 113);
                bezierVertex(112, 114, 114, 120, 114, 124);
                bezierVertex(110, 124, 107, 119, 108, 113);
            endShape(CLOSE);
        },
        pig: function() {
            strokeWeight(1);

            //ears
            stroke(8);
            fill(246, 172, 205);
            beginShape();
                vertex(232, 41);
                bezierVertex(246, 30, 262, 24, 274, 23);
                bezierVertex(283, 25, 288, 33, 283, 47);
                bezierVertex(272, 60, 260, 66, 244, 70);
            endShape(CLOSE);
            beginShape();
                vertex(110, 41);
                bezierVertex(101, 31, 91, 23, 79, 20);
                bezierVertex(69, 19, 63, 26, 64, 38);
                bezierVertex(72, 53, 82, 63, 94, 76);
            endShape(CLOSE);

            //arms
            beginShape();
                vertex(250, 120);
                vertex(324, 90);
                vertex(333, 110);
                vertex(251, 157);
            endShape(CLOSE);
            beginShape();
                vertex(88, 132);
                vertex(18, 95);
                vertex(4, 114);
                vertex(89, 173);
            endShape(CLOSE);

            //hands
            fill(8);
            beginShape();
                vertex(314, 94);
                vertex(324, 90);
                vertex(333, 111);
                vertex(322, 116);
            endShape(CLOSE);
            beginShape();
                vertex(27, 100);
                vertex(18, 95);
                vertex(4, 114);
                vertex(14, 121);
            endShape(CLOSE);

            //legs
            fill(246, 172, 205);
            beginShape();
                vertex(220, 259);
                bezierVertex(239, 273, 254, 297, 262, 324);
                vertex(240, 324);
                bezierVertex(232, 304, 222, 286, 209, 272);
            endShape(CLOSE);
            beginShape();
                vertex(121, 248);
                bezierVertex(102, 265, 89, 289, 81, 314);
                vertex(100, 321);
                bezierVertex(111, 294, 121, 277, 136, 264);
            endShape(CLOSE);

            //feet
            fill(8);
            beginShape();
                vertex(257, 310);
                bezierVertex(260, 314, 260, 317, 262, 324);
                vertex(241, 324);
                bezierVertex(239, 321, 238, 318, 237, 315);
            endShape(CLOSE);
            beginShape();
                vertex(104, 310);
                bezierVertex(104, 313, 102, 316, 100, 321);
                vertex(81, 314);
                bezierVertex(81, 313, 81, 310, 84, 306);
            endShape(CLOSE);

            //tail
            noFill();
            stroke(8);
            beginShape();
                vertex(237, 231);
                bezierVertex(247, 224, 259, 220, 266, 225);
                bezierVertex(271, 232, 269, 241, 263, 243);
                bezierVertex(257, 237, 257, 231, 263, 226);
                bezierVertex(271, 224, 278, 224, 288, 231);
            endShape();

            //body
            fill(246, 172, 205);
            beginShape();
                vertex(171, 5);
                bezierVertex(193, 4, 229, 20, 245, 53);
                bezierVertex(260, 94, 262, 148, 254, 196);
                bezierVertex(245, 236, 221, 280, 192, 288);
                bezierVertex(166, 296, 134, 278, 120, 259);
                bezierVertex(96, 229, 82, 190, 82, 151);
                bezierVertex(78, 117, 82, 78, 96, 52);
                bezierVertex(114, 27, 137, 9, 171, 5);
            endShape(CLOSE);

            //eyes
            fill(240);
            ellipse(154, 54, 50, 50);
            ellipse(213, 58, 35, 35);

            //eyeballs
            fill(8);
            ellipse(154, 52, 10, 10);
            ellipse(208, 62, 9, 9);

            ///snout
            fill(234, 205, 227);
            beginShape();
                vertex(182, 69);
                bezierVertex(196, 70, 214, 72, 221, 83);
                bezierVertex(224, 93, 221, 103, 204, 113);
                bezierVertex(192, 117, 174, 116, 160, 112);
                bezierVertex(148, 105, 143, 94, 147, 82);
                bezierVertex(158, 71, 170, 70, 182, 69);
            endShape(CLOSE);

            //nostrils
            fill(246, 172, 205);
            ellipse(201, 97, 10, 18);
            ellipse(161, 97, 10, 18);

            //mouth
            fill(8);
            beginShape();
                vertex(121, 93);
                bezierVertex(130, 104, 151, 116, 165, 120);
                bezierVertex(150, 126, 137, 135, 121, 137);
                bezierVertex(112, 135, 105, 127, 108, 116);
                bezierVertex(112, 108, 117, 102, 121, 95);
            endShape(CLOSE);

            noFill();
            bezier(129, 91, 123, 94, 115, 96, 106, 95);

            //tounge
            noStroke();
            fill(176, 29, 71);
            beginShape();
                vertex(120, 129);
                bezierVertex(123, 128, 127, 128, 130, 130);
                bezierVertex(131, 134, 127, 136, 122, 136);
                bezierVertex(117, 136, 113, 132, 110, 129);
                bezierVertex(109, 126, 111, 124, 113, 123);
                bezierVertex(116, 124, 117, 125, 120, 128);
            endShape(CLOSE);
        },
        horse: function() {
            strokeWeight(1);

            //hair
            fill(197, 57, 60);
            beginShape();
                vertex(97, 46);
                bezierVertex(101, 38, 106, 32, 116, 27);
                bezierVertex(112, 22, 108, 20, 106, 15);
                bezierVertex(110, 9, 121, 10, 132, 16);
                bezierVertex(136, 12, 139, 9, 144, 7);
                bezierVertex(149, 9, 152, 13, 154, 20);
                bezierVertex(160, 18, 167, 17, 174, 17);
                bezierVertex(176, 23, 174, 28, 166, 33);
                bezierVertex(169, 36, 174, 40, 175, 47);
                bezierVertex(173, 55, 171, 58, 168, 63);
                bezierVertex(171, 65, 176, 68, 177, 72);
                bezierVertex(178, 77, 177, 80, 176, 85);
                bezierVertex(180, 87, 185, 90, 186, 93);
                bezierVertex(185, 98, 182, 101, 180, 102);
                bezierVertex(184, 104, 188, 106, 188, 113);
                bezierVertex(186, 119, 179, 122, 158, 134);
                vertex(147, 71);
            endShape(CLOSE);

            //tail
            beginShape();
                vertex(209, 261);
                bezierVertex(229, 248, 254, 237, 277, 256);
                bezierVertex(293, 281, 292, 312, 289, 332);
                bezierVertex(286, 314, 285, 300, 279, 286);
                bezierVertex(278, 295, 278, 305, 277, 319);
                bezierVertex(272, 302, 264, 287, 255, 276);
                bezierVertex(240, 270, 222, 271, 208, 274);
            endShape(CLOSE);

            //eyes - back
            fill(240);
            ellipse(96, 48, 27, 30);
            fill(8);
            ellipse(91, 52, 7, 8);

            //arms
            fill(237, 218, 116);
            beginShape();
                vertex(197, 166);
                bezierVertex(216, 174, 244, 178, 259, 175);
                bezierVertex(260, 166, 262, 158, 265, 154);
                bezierVertex(270, 154, 274, 160, 274, 170);
                bezierVertex(284, 166, 293, 165, 297, 168);
                bezierVertex(298, 175, 294, 178, 288, 180);
                bezierVertex(296, 185, 301, 191, 304, 197);
                bezierVertex(299, 200, 291, 198, 285, 192);
                bezierVertex(284, 197, 286, 201, 283, 204);
                bezierVertex(276, 201, 274, 198, 268, 191);
                bezierVertex(249, 191, 229, 189, 209, 186);
            endShape(CLOSE);
            beginShape();
                vertex(128, 172);
                bezierVertex(103, 183, 80, 189, 54, 190);
                bezierVertex(53, 182, 51, 175, 48, 170);
                bezierVertex(42, 168, 37, 173, 36, 183);
                bezierVertex(30, 181, 22, 177, 17, 178);
                bezierVertex(13, 184, 14, 191, 22, 195);
                bezierVertex(14, 199, 8, 205, 6, 210);
                bezierVertex(10, 215, 19, 212, 28, 207);
                bezierVertex(28, 213, 28, 216, 30, 217);
                bezierVertex(35, 214, 37, 210, 42, 205);
                bezierVertex(65, 206, 90, 202, 115, 196);
            endShape(CLOSE);

            //legs
            beginShape();
                vertex(191, 279);
                bezierVertex(216, 304, 229, 343, 226, 375);
                vertex(203, 368);
                bezierVertex(205, 342, 195, 310, 175, 296);
            endShape(CLOSE);
            beginShape();
                vertex(116, 283);
                bezierVertex(89, 301, 73, 338, 73, 372);
                vertex(95, 366);
                bezierVertex(96, 336, 111, 310, 134, 297);
            endShape(CLOSE);

            //body
            beginShape();
                vertex(154, 57);
                bezierVertex(158, 84, 162, 103, 166, 128);
                bezierVertex(186, 144, 210, 169, 218, 204);
                bezierVertex(224, 237, 219, 274, 200, 293);
                bezierVertex(179, 308, 156, 310, 131, 303);
                bezierVertex(110, 290, 91, 267, 92, 243);
                bezierVertex(93, 209, 124, 167, 145, 134);
                bezierVertex(146, 115, 145, 98, 142, 86);
                bezierVertex(131, 104, 114, 128, 98, 148);
                bezierVertex(82, 161, 63, 164, 44, 159);
                bezierVertex(23, 149, 16, 131, 17, 115);
                bezierVertex(19, 100, 31, 86, 52, 74);
                bezierVertex(76, 63, 92, 58, 104, 55);
                bezierVertex(117, 52, 147, 52, 154, 57);
            endShape(CLOSE);

            //ear
            beginShape();
                vertex(139, 56);
                bezierVertex(145, 48, 158, 41, 173, 44);
                bezierVertex(186, 49, 192, 55, 191, 63);
                bezierVertex(185, 69, 176, 69, 165, 67);
                bezierVertex(153, 65, 146, 60, 138, 56);
            endShape(CLOSE);

            //eyes - front
            fill(240);
            ellipse(124, 50, 29, 32);
            fill(8);
            ellipse(118, 55, 8, 9);

            //hooves
            fill(8);
            beginShape();
                vertex(227, 365);
                vertex(227, 375);
                vertex(203, 368);
                vertex(203, 357);
            endShape(CLOSE);
            beginShape();
                vertex(95, 357);
                vertex(95, 365);
                vertex(73, 372);
                vertex(73, 361);
            endShape(CLOSE);

            //nostril
            ellipse(46, 136, 10, 12);
            ellipse(28, 129, 7, 9);

            //mouth
            noFill();
            stroke(8);
            bezier(70, 161, 83, 147, 86, 125, 76, 111);
            bezier(84, 109, 80, 110, 73, 113, 67, 118);
        },
        chicken: function() {
            strokeWeight(1);

            //hair
            fill(235, 30, 37);
            beginShape();
                vertex(122, 78);
                bezierVertex(119, 56, 117, 39, 125, 21);
                bezierVertex(134, 8, 146, 5, 153, 6);
                bezierVertex(158, 14, 158, 24, 158, 34);
                bezierVertex(170, 31, 178, 27, 185, 30);
                bezierVertex(187, 36, 188, 45, 182, 54);
                bezierVertex(188, 56, 194, 58, 198, 63);
                bezierVertex(199, 69, 192, 76, 184, 80);
                bezierVertex(186, 82, 189, 84, 188, 89);
                bezierVertex(185, 94, 173, 100, 160, 101);
            endShape(CLOSE);
            beginShape();
                vertex(107, 140);
                bezierVertex(98, 158, 95, 170, 96, 194);
                vertex(117, 193);
                vertex(120, 144);
            endShape(CLOSE);

            //wing behind
            fill(87, 25, 13);
            beginShape();
                vertex(94, 201);
                bezierVertex(83, 176, 68, 153, 50, 140);
                bezierVertex(35, 129, 17, 123, 12, 120);
                bezierVertex(9, 120, 10, 128, 17, 132);
                bezierVertex(25, 137, 31, 141, 38, 145);
                bezierVertex(38, 148, 35, 150, 28, 150);
                bezierVertex(24, 149, 21, 151, 24, 157);
                bezierVertex(29, 162, 38, 169, 45, 171);
                bezierVertex(49, 173, 50, 176, 48, 183);
                bezierVertex(45, 190, 45, 193, 49, 194);
                bezierVertex(56, 195, 72, 202, 84, 216);
            endShape(CLOSE);

            //tail
            fill(126, 18, 42);
            beginShape();
                vertex(159, 245);
                bezierVertex(169, 227, 181, 213, 191, 208);
                bezierVertex(211, 202, 242, 208, 246, 221);
                bezierVertex(249, 250, 236, 272, 224, 287);
                bezierVertex(227, 255, 217, 236, 200, 229);
                bezierVertex(213, 251, 209, 276, 198, 294);
                bezierVertex(198, 279, 195, 263, 185, 253);
                bezierVertex(185, 268, 181, 284, 169, 291);
                bezierVertex(170, 282, 170, 273, 170, 269);
                bezierVertex(168, 266, 163, 265, 156, 264);
            endShape(CLOSE);

            //body
            fill(150, 68, 31);
            beginShape();
                vertex(91, 92);
                bezierVertex(107, 81, 122, 69, 139, 68);
                bezierVertex(156, 71, 167, 84, 167, 105);
                bezierVertex(161, 127, 149, 145, 136, 161);
                bezierVertex(131, 176, 133, 189, 139, 195);
                bezierVertex(150, 199, 162, 212, 165, 236);
                bezierVertex(163, 265, 154, 281, 136, 290);
                bezierVertex(117, 294, 97, 294, 80, 282);
                bezierVertex(71, 269, 68, 255, 71, 235);
                bezierVertex(74, 218, 81, 201, 89, 193);
                bezierVertex(93, 188, 101, 183, 106, 180);
                bezierVertex(110, 171, 111, 157, 104, 143);
                bezierVertex(107, 139, 110, 132, 111, 127);
                bezierVertex(109, 113, 98, 100, 89, 92);
            endShape(CLOSE);

            //wing front
            fill(87, 25, 13);
            beginShape();
                vertex(131, 197);
                bezierVertex(137, 184, 147, 165, 163, 148);
                bezierVertex(184, 134, 198, 127, 209, 124);
                bezierVertex(212, 123, 214, 125, 210, 130);
                bezierVertex(201, 137, 193, 142, 188, 146);
                bezierVertex(188, 149, 195, 152, 202, 153);
                bezierVertex(204, 156, 202, 160, 195, 164);
                bezierVertex(188, 168, 180, 172, 174, 173);
                bezierVertex(172, 178, 177, 182, 179, 189);
                bezierVertex(178, 194, 170, 197, 158, 198);
                bezierVertex(153, 202, 148, 209, 142, 214);
                bezierVertex(134, 213, 129, 207, 130, 198);
            endShape(CLOSE);

            //beak
            fill(250, 182, 23);
            beginShape();
                vertex(86, 115);
                bezierVertex(77, 132, 70, 148, 67, 167);
                bezierVertex(78, 158, 88, 148, 94, 145);
                bezierVertex(101, 141, 105, 139, 110, 132);
            endShape(CLOSE);
            beginShape();
                vertex(92, 91);
                bezierVertex(66, 105, 51, 124, 44, 143);
                bezierVertex(70, 131, 92, 129, 109, 133);
                bezierVertex(112, 132, 114, 129, 113, 120);
                bezierVertex(107, 103, 101, 96, 93, 91);
            endShape(CLOSE);

            //eyes
            fill(240);
            ellipse(99, 70, 40, 40);
            ellipse(125, 84, 22, 22);

            //eyeballs
            fill(8);
            ellipse(106, 73, 10, 10);
            ellipse(130, 87, 5, 5);

            //legs
            noFill();
            stroke(8);
            strokeWeight(2);
            line(114, 286, 132, 358);
            line(91, 285, 73, 359);

            //feet
            beginShape();
                vertex(125, 358);
                bezierVertex(128, 354, 135, 353, 141, 353);
                bezierVertex(148, 353, 153, 355, 158, 357);
            endShape();
            beginShape();
                vertex(83, 357);
                bezierVertex(80, 353, 75, 352, 67, 351);
                bezierVertex(60, 351, 55, 353, 50, 357);
            endShape();
        },
        rabbit: function() {
            strokeWeight(1);

            //ears
            fill(240, 154, 193);
            beginShape();
                vertex(143, 86);
                bezierVertex(148, 58, 158, 25, 182, 7);
                bezierVertex(198, 3, 205, 10, 204, 24);
                bezierVertex(192, 53, 165, 76, 150, 89);
            endShape(CLOSE);
            beginShape();
                vertex(123, 84);
                bezierVertex(124, 56, 118, 25, 101, 10);
                bezierVertex(85, 5, 71, 15, 73, 31);
                bezierVertex(80, 49, 100, 64, 117, 87);
            endShape(CLOSE);

            //tail
            beginShape();
                vertex(174, 276);
                bezierVertex(188, 275, 200, 279, 204, 288);
                bezierVertex(206, 297, 202, 301, 191, 302);
                bezierVertex(181, 301, 175, 295, 169, 289);
            endShape(CLOSE);

            //legs
            beginShape();
                vertex(160, 293);
                bezierVertex(167, 305, 172, 325, 172, 343);
                bezierVertex(192, 342, 213, 354, 220, 368);
                bezierVertex(190, 369, 167, 366, 152, 364);
                bezierVertex(160, 346, 163, 321, 155, 304);
            endShape(CLOSE);
            beginShape();
                vertex(77, 291);
                bezierVertex(70, 304, 67, 325, 68, 338);
                bezierVertex(47, 340, 27, 353, 17, 365);
                bezierVertex(41, 366, 65, 364, 83, 362);
                bezierVertex(76, 337, 76, 315, 81, 302);
            endShape(CLOSE);

            //right arm (behind)
            beginShape();
                vertex(107, 180);
                bezierVertex(83, 181, 58, 171, 47, 160);
                bezierVertex(45, 152, 47, 144, 49, 137);
                bezierVertex(46, 133, 40, 135, 36, 141);
                bezierVertex(33, 136, 29, 132, 24, 130);
                bezierVertex(20, 131, 19, 138, 22, 146);
                bezierVertex(18, 146, 13, 146, 8, 150);
                bezierVertex(6, 157, 12, 160, 21, 161);
                bezierVertex(19, 165, 18, 169, 19, 174);
                bezierVertex(26, 174, 28, 170, 34, 168);
                bezierVertex(41, 172, 48, 177, 55, 183);
                bezierVertex(66, 191, 78, 194, 95, 198);
            endShape(CLOSE);

            //body
            beginShape();
                vertex(128, 176);
                bezierVertex(142, 177, 161, 184, 172, 207);
                bezierVertex(179, 228, 182, 250, 180, 272);
                bezierVertex(176, 293, 157, 313, 137, 319);
                bezierVertex(116, 323, 96, 319, 79, 305);
                bezierVertex(65, 288, 61, 268, 64, 245);
                bezierVertex(71, 217, 85, 197, 107, 177);
            endShape(CLOSE);

            //head
            beginShape();
                vertex(129, 82);
                bezierVertex(148, 83, 175, 93, 183, 117);
                bezierVertex(187, 141, 177, 164, 158, 176);
                bezierVertex(134, 187, 110, 187, 88, 173);
                bezierVertex(70, 156, 63, 129, 76, 105);
                bezierVertex(92, 86, 112, 82, 129, 82);
            endShape(CLOSE);

            //left arm (front)
            beginShape();
                vertex(158, 188);
                bezierVertex(174, 185, 191, 185, 204, 200);
                bezierVertex(212, 217, 206, 237, 194, 248);
                bezierVertex(194, 252, 195, 258, 195, 261);
                bezierVertex(191, 263, 188, 262, 185, 260);
                bezierVertex(182, 263, 180, 266, 174, 269);
                bezierVertex(171, 268, 171, 264, 175, 258);
                bezierVertex(171, 258, 168, 258, 164, 258);
                bezierVertex(161, 254, 162, 249, 169, 247);
                bezierVertex(167, 245, 163, 241, 162, 238);
                bezierVertex(163, 235, 169, 234, 173, 234);
                bezierVertex(178, 235, 181, 237, 183, 240);
                bezierVertex(190, 238, 197, 224, 198, 214);
                bezierVertex(196, 204, 186, 198, 179, 197);
                bezierVertex(172, 197, 169, 197, 167, 198);
            endShape(CLOSE);

            //nose
            fill(8);
            beginShape();
                vertex(118, 135);
                bezierVertex(126, 135, 134, 138, 134, 147);
                bezierVertex(127, 152, 123, 154, 116, 154);
                bezierVertex(109, 150, 106, 148, 104, 142);
                bezierVertex(106, 137, 113, 134, 118, 135);
            endShape(CLOSE);
            fill(240);
            ellipse(127, 144, 4, 4);

            //mouth
            noFill();
            stroke(8);
            beginShape();
                vertex(118, 152);
                bezierVertex(118, 159, 119, 164, 126, 165);
                bezierVertex(131, 164, 137, 161, 141, 158);
            endShape();
            beginShape();
                vertex(118, 152);
                bezierVertex(117, 156, 117, 160, 110, 165);
                bezierVertex(105, 166, 96, 160, 93, 154);
            endShape();

            //eyes
            fill(240);
            ellipse(105, 113, 38, 38);
            ellipse(144, 117, 25, 25);

            //eyeballs
            fill(8);
            ellipse(110, 119, 10, 10);
            ellipse(147, 122, 8, 8);
        },
        mouse: function() {
            strokeWeight(1);

            //ear left (back)
            fill(210, 149, 92);
            beginShape();
                vertex(129, 68);
                bezierVertex(133, 54, 145, 36, 156, 30);
                bezierVertex(172, 24, 186, 33, 193, 45);
                bezierVertex(197, 58, 194, 71, 185, 79);
                bezierVertex(173, 87, 163, 89, 148, 89);
            endShape(CLOSE);

            //arm left (behind)
            beginShape();
                vertex(155, 161);
                bezierVertex(172, 159, 200, 161, 218, 169);
                bezierVertex(225, 161, 230, 156, 236, 156);
                bezierVertex(238, 160, 237, 167, 236, 172);
                bezierVertex(242, 175, 248, 176, 251, 181);
                bezierVertex(248, 187, 243, 188, 237, 187);
                bezierVertex(240, 191, 241, 196, 239, 201);
                bezierVertex(233, 199, 228, 195, 225, 192);
                bezierVertex(223, 196, 219, 200, 215, 199);
                bezierVertex(212, 193, 212, 185, 214, 180);
                bezierVertex(196, 173, 177, 173, 162, 175);
            endShape(CLOSE);

            //leg left (behind)
            beginShape();
                vertex(162, 255);
                bezierVertex(177, 249, 196, 253, 204, 264);
                bezierVertex(207, 274, 205, 286, 201, 294);
                bezierVertex(210, 298, 218, 306, 220, 319);
                bezierVertex(205, 318, 189, 310, 180, 301);
                bezierVertex(183, 293, 194, 286, 195, 275);
                bezierVertex(191, 266, 178, 265, 164, 266);
            endShape(CLOSE);

            //tail
            fill(177, 111, 66);
            beginShape();
                vertex(52, 228);
                bezierVertex(40, 221, 30, 216, 28, 204);
                bezierVertex(32, 185, 42, 168, 50, 150);
                bezierVertex(56, 132, 54, 111, 43, 90);
                bezierVertex(36, 80, 27, 74, 18, 69);
                bezierVertex(29, 85, 37, 100, 39, 117);
                bezierVertex(40, 140, 25, 157, 19, 173);
                bezierVertex(10, 193, 8, 209, 14, 224);
                bezierVertex(25, 239, 37, 246, 53, 250);
            endShape(CLOSE);

            //body
            fill(210, 149, 92);
            beginShape();
                vertex(147, 143);
                bezierVertex(160, 160, 179, 188, 185, 220);
                bezierVertex(187, 242, 179, 262, 158, 280);
                bezierVertex(133, 293, 110, 293, 91, 289);
                bezierVertex(68, 280, 54, 265, 47, 244);
                bezierVertex(44, 214, 50, 189, 65, 166);
                bezierVertex(77, 152, 93, 143, 109, 138);
            endShape(CLOSE);

            //head
            beginShape();
                vertex(158, 90);
                bezierVertex(169, 96, 184, 99, 197, 97);
                bezierVertex(208, 94, 218, 86, 227, 78);
                bezierVertex(224, 96, 219, 121, 205, 131);
                bezierVertex(191, 140, 173, 141, 156, 138);
                bezierVertex(154, 149, 145, 154, 129, 155);
                bezierVertex(107, 151, 90, 139, 82, 128);
                bezierVertex(76, 113, 78, 97, 80, 82);
                bezierVertex(64, 84, 45, 80, 33, 65);
                bezierVertex(27, 48, 26, 33, 36, 19);
                bezierVertex(53, 8, 74, 8, 86, 10);
                bezierVertex(96, 14, 105, 25, 117, 41);
                bezierVertex(128, 57, 141, 73, 157, 89);
            endShape(CLOSE);

            //eyes
            fill(240);
            beginShape();
                vertex(122, 32);
                bezierVertex(131, 32, 140, 42, 139, 53);
                bezierVertex(137, 66, 130, 75, 120, 76);
                bezierVertex(109, 75, 102, 64, 102, 52);
                bezierVertex(103, 42, 109, 35, 122, 32);
            endShape(CLOSE);
            beginShape();
                vertex(150, 53);
                bezierVertex(156, 53, 162, 58, 162, 65);
                bezierVertex(162, 76, 156, 80, 149, 81);
                bezierVertex(142, 80, 137, 73, 137, 67);
                bezierVertex(137, 60, 142, 54, 150, 53);
            endShape(CLOSE);

            //eyeballs
            fill(8);
            ellipse(122, 56, 6, 6);
            ellipse(150, 67, 4, 4);

            //arm right (front)
            fill(210, 149, 92);
            beginShape();
                vertex(97, 144);
                bezierVertex(88, 159, 81, 170, 84, 183);
                bezierVertex(91, 194, 104, 196, 113, 197);
                bezierVertex(117, 189, 121, 185, 125, 183);
                bezierVertex(130, 186, 130, 192, 130, 197);
                bezierVertex(136, 200, 140, 201, 145, 202);
                bezierVertex(146, 205, 140, 207, 132, 208);
                bezierVertex(136, 213, 138, 217, 139, 223);
                bezierVertex(134, 224, 129, 221, 124, 218);
                bezierVertex(122, 221, 118, 223, 115, 222);
                bezierVertex(112, 217, 112, 213, 113, 209);
                bezierVertex(101, 208, 85, 206, 75, 200);
                bezierVertex(67, 190, 66, 179, 68, 169);
                bezierVertex(71, 157, 84, 148, 96, 142);
            endShape(CLOSE);

            //leg right (front)
            beginShape();
                vertex(86, 271);
                bezierVertex(86, 293, 80, 305, 69, 312);
                bezierVertex(59, 315, 49, 311, 43, 307);
                bezierVertex(40, 317, 31, 325, 19, 327);
                bezierVertex(21, 311, 25, 300, 33, 289);
                bezierVertex(43, 292, 52, 301, 58, 302);
                bezierVertex(69, 299, 73, 288, 75, 272);
            endShape(CLOSE);

            //mouth
            fill(8);
            beginShape();
                vertex(133, 111);
                bezierVertex(136, 119, 141, 127, 148, 133);
                bezierVertex(141, 139, 131, 142, 122, 137);
                bezierVertex(118, 126, 122, 119, 133, 111);
            endShape(CLOSE);

            noFill();
            stroke(8);
            bezier(156, 138, 138, 130, 132, 113, 130, 101);
            bezier(135, 101, 131, 100, 126, 101, 124, 104);

            noStroke();
            fill(223, 51, 39);
            //tounge
            beginShape();
                vertex(121, 133);
                bezierVertex(126, 132, 136, 133, 142, 137);
                bezierVertex(137, 141, 120, 143, 121, 134);
            endShape(CLOSE);

            //nose
            stroke(8);
            fill(129, 69, 27);
            beginShape();
                vertex(227, 48);
                bezierVertex(239, 48, 248, 56, 249, 70);
                bezierVertex(247, 81, 240, 90, 230, 90);
                bezierVertex(216, 86, 209, 79, 210, 65);
                bezierVertex(212, 56, 216, 52, 226, 48);
            endShape(CLOSE);

            //ear right (front)
            noStroke();
            fill(224, 185, 130);
            beginShape();
                vertex(103, 42);
                bezierVertex(93, 31, 81, 20, 67, 19);
                bezierVertex(55, 21, 44, 28, 40, 37);
                bezierVertex(37, 47, 38, 58, 49, 68);
                bezierVertex(60, 73, 73, 72, 84, 72);
                bezierVertex(89, 61, 96, 51, 102, 45);
            endShape(CLOSE);

            //toes
            noFill();
            stroke(8);
            bezier(208, 306, 210, 308, 211, 311, 210, 317);
            bezier(29, 313, 27, 315, 24, 318, 21, 317);

            //marks on tail
            bezier(46, 225, 43, 231, 38, 234, 34, 234);
            bezier(33, 218, 32, 221, 28, 222, 25, 223);
            bezier(28, 209, 24, 210, 23, 210, 20, 210);

            line(29, 196, 23, 196);
            line(35, 182, 29, 181);
            line(40, 169, 35, 168);
            line(48, 153, 43, 153);
            line(52, 138, 48, 138);
            line(52, 120, 48, 120);
            line(49, 104, 44, 106);

            //line on tounge
            line(132, 133, 132, 136);
        },
        sheep: function() {
            strokeWeight(1);

            //ears
            stroke(8);
            fill(8);
            beginShape();
                vertex(208, 27);
                bezierVertex(221, 28, 234, 31, 246, 36);
                bezierVertex(251, 41, 250, 47, 245, 50);
                bezierVertex(232, 48, 222, 42, 209, 32);
            endShape(CLOSE);
            beginShape();
                vertex(168, 30);
                bezierVertex(155, 32, 144, 34, 137, 39);
                bezierVertex(132, 45, 134, 53, 143, 53);
                bezierVertex(152, 49, 162, 42, 170, 37);
            endShape(CLOSE);

            //body
            fill(252);
            beginShape();
                vertex(227, 124);
                bezierVertex(237, 127, 246, 133, 256, 142);
                bezierVertex(261, 153, 262, 163, 262, 169);
                bezierVertex(273, 181, 283, 193, 283, 207);
                bezierVertex(282, 218, 275, 226, 268, 234);
                bezierVertex(272, 246, 272, 262, 266, 270);
                bezierVertex(257, 277, 249, 278, 240, 279);
                bezierVertex(238, 294, 233, 307, 224, 312);
                bezierVertex(208, 318, 196, 312, 187, 309);
                bezierVertex(180, 317, 171, 320, 159, 319);
                bezierVertex(148, 316, 139, 308, 133, 304);
                bezierVertex(123, 304, 110, 306, 101, 301);
                bezierVertex(92, 294, 89, 282, 89, 271);
                bezierVertex(80, 269, 74, 261, 72, 250);
                bezierVertex(73, 241, 76, 234, 80, 228);
                bezierVertex(72, 220, 63, 207, 63, 195);
                bezierVertex(64, 182, 70, 176, 74, 170);
                bezierVertex(73, 160, 70, 151, 76, 140);
                bezierVertex(83, 131, 92, 130, 104, 127);
                bezierVertex(107, 119, 114, 105, 122, 102);
                bezierVertex(134, 95, 152, 97, 174, 105);
            endShape(CLOSE);

            //shading on body
            noStroke();
            fill(240);
            beginShape();
                vertex(229, 137);
                bezierVertex(241, 143, 247, 149, 250, 157);
                bezierVertex(250, 164, 249, 169, 246, 177);
                bezierVertex(251, 183, 261, 191, 261, 202);
                bezierVertex(259, 212, 257, 218, 246, 223);
                bezierVertex(251, 230, 255, 244, 248, 253);
                bezierVertex(240, 258, 229, 256, 221, 255);
                bezierVertex(224, 263, 222, 273, 220, 276);
                bezierVertex(206, 288, 189, 288, 177, 281);
                bezierVertex(170, 292, 162, 295, 150, 295);
                bezierVertex(138, 294, 124, 290, 116, 285);
                bezierVertex(108, 276, 108, 265, 110, 260);
                bezierVertex(102, 256, 99, 247, 99, 240);
                bezierVertex(100, 234, 104, 228, 106, 223);
                bezierVertex(98, 218, 92, 207, 91, 195);
                bezierVertex(92, 184, 98, 175, 104, 167);
                bezierVertex(105, 161, 104, 155, 108, 150);
                bezierVertex(115, 141, 123, 140, 129, 137);
                bezierVertex(129, 130, 129, 126, 130, 120);
                bezierVertex(133, 114, 138, 109, 153, 103);
            endShape(CLOSE);

            //head
            stroke(8);
            fill(209, 171, 208);
            beginShape();
                vertex(197, 22);
                bezierVertex(214, 25, 230, 43, 236, 64);
                bezierVertex(245, 92, 245, 124, 234, 141);
                bezierVertex(221, 153, 200, 156, 181, 153);
                bezierVertex(158, 145, 145, 127, 145, 109);
                bezierVertex(145, 84, 152, 62, 165, 44);
                bezierVertex(172, 34, 185, 24, 196, 22);
            endShape(CLOSE);

            //arms
            fill(8);
            beginShape();
                vertex(243, 177);
                bezierVertex(263, 165, 284, 151, 301, 143);
                bezierVertex(301, 136, 300, 129, 301, 125);
                bezierVertex(305, 123, 309, 126, 314, 134);
                bezierVertex(323, 132, 330, 130, 333, 130);
                bezierVertex(335, 133, 334, 136, 329, 140);
                bezierVertex(332, 144, 336, 147, 337, 151);
                bezierVertex(335, 154, 329, 154, 323, 153);
                bezierVertex(324, 158, 324, 161, 323, 162);
                bezierVertex(316, 162, 313, 159, 308, 155);
                bezierVertex(285, 166, 267, 178, 245, 189);
                bezierVertex(243, 185, 245, 183, 243, 180);
            endShape(CLOSE);
            beginShape();
                vertex(104, 173);
                bezierVertex(77, 159, 58, 146, 43, 138);
                bezierVertex(44, 132, 44, 127, 43, 124);
                bezierVertex(38, 121, 33, 125, 30, 129);
                bezierVertex(25, 126, 20, 124, 14, 124);
                bezierVertex(11, 125, 11, 129, 17, 137);
                bezierVertex(12, 141, 9, 143, 8, 148);
                bezierVertex(10, 150, 16, 150, 21, 150);
                bezierVertex(17, 154, 17, 158, 20, 161);
                bezierVertex(25, 160, 29, 156, 34, 152);
                bezierVertex(54, 161, 74, 171, 99, 186);
                bezierVertex(101, 183, 101, 178, 104, 175);
            endShape(CLOSE);

            //legs
            beginShape();
                vertex(218, 281);
                vertex(260, 340);
                vertex(249, 347);
                vertex(205, 287);
                bezierVertex(213, 285, 216, 283, 218, 281);
            endShape(CLOSE);
            beginShape();
                vertex(134, 294);
                vertex(93, 353);
                vertex(81, 344);
                vertex(121, 288);
                bezierVertex(122, 288, 125, 291, 134, 294);
            endShape(CLOSE);

            //feet
            fill(250);
            beginShape();
                vertex(261, 340);
                vertex(273, 355);
                vertex(248, 354);
                vertex(249, 346);
            endShape(CLOSE);
            beginShape();
                vertex(81, 344);
                vertex(67, 360);
                vertex(90, 360);
                vertex(93, 352);
            endShape(CLOSE);

            //lines on feet
            bezier(260, 354, 259, 349, 258, 347, 257, 345);
            bezier(76, 360, 78, 359, 80, 356, 83, 352);

            //nose
            fill(8);
            beginShape();
                vertex(204, 111);
                bezierVertex(213, 109, 221, 110, 225, 116);
                bezierVertex(223, 122, 213, 126, 206, 127);
                bezierVertex(201, 128, 195, 128, 190, 124);
                bezierVertex(192, 119, 196, 115, 204, 111);
            endShape(CLOSE);


            fill(250);
            ellipse(213, 116, 3, 3);

            //line from nose to mouth
            bezier(208, 125, 208, 129, 209, 131, 207, 134);

            //mouth
            fill(8);
            beginShape();
                vertex(180, 134);
                bezierVertex(180, 140, 185, 148, 193, 150);
                bezierVertex(202, 150, 209, 144, 217, 138);
                bezierVertex(203, 140, 192, 138, 180, 131);
            endShape(CLOSE);
            noFill();
            beginShape();
                vertex(170, 119);
                bezierVertex(174, 128, 182, 133, 194, 137);
                bezierVertex(206, 139, 216, 138, 223, 136);
            endShape();
            bezier(173, 116, 171, 118, 168, 120, 167, 124);

            //tounge
            fill(149, 27, 32);
            ellipse(194, 146, 11, 4);

            //arm/leg sockets
            noFill();
            bezier(122, 154, 110, 161, 100, 175, 99, 196);
            bezier(237, 167, 242, 174, 245, 185, 244, 195);
            bezier(225, 273, 217, 284, 207, 288, 195, 288);
            bezier(146, 295, 133, 294, 123, 290, 110, 280);

            //eyes
            fill(250);
            ellipse(180, 25, 35, 35);
            ellipse(208, 31, 20, 20);

            //eyeballs
            fill(8);
            ellipse(186, 28, 8, 8);
            ellipse(205, 30, 5, 5);
        },
        reset: function() {
            this.score = 0;
            this.shake = 0;
            this.gameOver = false;
            this.gameOverTimer = 0;
            this.fired = false;
            this.addFrequency.value = ~~random(this.addFrequency.min, this.addFrequency.max);

            this.player.x = 450;
            this.player.y = 100;
            this.player.vx = 0;
            this.player.vy = 0;
            this.player.rot = 0;
            this.player.eaten = false;

            this.explosions.length = 0;
            this.trampolines.length = 0;
            this.bombs.length = 0;
            this.explosives.length = 0;
            this.flyTraps.length = 0;
            this.muds.length = 0;

            this.explosives.push(Explosive.new({
                x: 150,
                y: 500,
                w: 70,
                h: 50
            }));
        },
        setup: function() {
            //sort the scoreboard array
            this.highscores.sort(function(a, b) {
               return b.score - a.score; 
            });

            //add 6 triangles for the hills
            for(var i = 0; i < 6; i++) {
                this.triangles.push({
                    x: i * width / 5,
                    y: 510,
                    w: width / 5,
                    h: ~~random(50, 100)
                });
            }

            //preload images
            this.images = {
                skyBlue: function() {
                    background(0, 0);

                    noStroke();
                    for(var i = 0; i <= 510; i++) { 
                        fill(lerpColor(color(54, 115, 150), color(76, 151, 191), i/510));
                        rect(0, i, width, 1);
                    }

                    return get(0, 0, width, 510);
                },
                ground: function() {
                    background(0, 0);

                    noStroke();
                    for(var i = 0; i <= 100; i++) { 
                        fill(lerpColor(color(133, 189, 102), color(109, 158, 81), i/100));
                        rect(0, i, width, 1);
                    }

                    return get(0, 0, width, 100);
                },
                cat: function() {
                    background(0, 0, 0, 0);
                    game.cat();
                    return get(0, 0, 300, 350);
                },
                dog: function() {
                    background(0, 0, 0, 0);
                    game.dog();
                    return get(0, 0, 300, 300);
                },
                cow: function() {
                    background(0, 0, 0, 0);
                    game.cow();
                    return get(0, 0, 270, 370);
                },
                pig: function() {
                    background(0, 0, 0, 0);
                    game.pig();
                    return get(0, 0, 340, 330);
                },
                horse: function() {
                    background(0, 0, 0, 0);
                    game.horse();
                    return get(0, 0, 310, 380);
                },
                chicken: function() {
                    background(0, 0, 0, 0);
                    game.chicken();
                    return get(0, 0, 255, 365);
                },
                rabbit: function() {
                    background(0, 0, 0, 0);
                    game.rabbit();
                    return get(0, 0, 230, 375);
                },
                mouse: function() {
                    background(0, 0, 0, 0);
                    game.mouse();
                    return get(0, 0, 257, 335);
                },
                sheep: function() {
                    background(0, 0, 0, 0);
                    game.sheep();
                    return get(0, 0, 340, 365);
                }
            };
        },
        load: function (s) {
            var obj = Object.keys(this.images);
            this.images[obj[this.imageIndex]] = this.images[obj[this.imageIndex]]();
            this.imageIndex++;

            background(57, 58, 59);
            pushStyle();
                fill(240, 200);
                textAlign(CENTER, CENTER);
                textSize(40);
                text('LOADING', width * 0.5, height * 0.5);
                noFill();
                stroke(240, 200);
                strokeWeight(10);
                arc(width * 0.5, height * 0.5, 300, 300, 0, map(this.imageIndex / obj.length, 0, 1, 0, radians(360)));
                strokeWeight(1);
            popStyle();

            if(this.imageIndex < obj.length){
                this.loaded = false;
            }
            else {
                this.loaded = true;
                this.scene = s;
            }
        },
        collision: function(player, block) {
            if(dist(player.x, player.y, block.x, block.y) < (player.diameter + block.diameter) / 2) {
                return true;
            }
            return false;
        },
        collisionGround: function() {
            if(this.player.y + this.player.diameter * 0.5 >= this.ground.y) {
                return true;
            }
            return false;
        },
        runMountains: function() {
            //mountains (triangles)
            fill(66, 60, 50);
            noStroke();
            //loop through each of the triangles in the triangles array
            for(var i = 0; i < this.triangles.length; i++) {
                //move each triangle at the same speed as bb-8
                this.triangles[i].x-= this.player.vx;

                //draw the triangles
                triangle(   this.triangles[i].x, 
                            this.triangles[i].y, 
                            this.triangles[i].x + this.triangles[i].w, 
                            this.triangles[i].y, 
                            this.triangles[i].x + this.triangles[i].w / 2, 
                            this.triangles[i].y - this.triangles[i].h);

                //if a triangle goes off the screen then reset it
                //back to the width of the screen with a new random height
                if(this.player.vx > 0 && this.triangles[i].x + this.triangles[i].w <= 0) {
                    this.triangles[i].x = width;
                    this.triangles[i].h = ~~random(50, 100);
                }
                else if(this.player.vx < 0 && this.triangles[i].x >= width) {
                    this.triangles[i].x = -this.triangles[i].w;
                    this.triangles[i].h = ~~random(50, 100);
                }
            }
        },
        runExplosions: function() {
            noStroke();
            for(var i = this.explosions.length - 1; i>= 0; i--) {
                var explosion = this.explosions[i];

                explosion.opacity-= explosion.opacitySpeed;
                //explosion.diameter+= explosion.vel;
                explosion.x+= explosion.vx;
                explosion.y+= explosion.vy;
                explosion.vy+= explosion.gravity;

                pushStyle();
                    fill(explosion.color, explosion.opacity);
                    ellipse(explosion.x, explosion.y, explosion.diameter, explosion.diameter);
                popStyle();
            }

            while (this.explosions.length > 0 && this.explosions[0].opacity <= 0) {
                this.explosions.shift();
            }
        },
        moveCannon: function() {
            if((this.keys[UP] || this.keys[87])) { //Up arrow or W
                 this.cannon.angle = constrain(this.cannon.angle - 2, this.cannon.rot.min, this.cannon.rot.max);
            }
            if(this.keys[DOWN] || this.keys[83]) { //Down arrow or S
                 this.cannon.angle = constrain(this.cannon.angle + 1, this.cannon.rot.min, this.cannon.rot.max);
            }

            //this.cannon.angle = constrain(this.cannon.angle + 1, this.cannon.rot.min, this.cannon.rot.max);
        },
        shoot: function() {
            if(keyPressed) {
                if(keyCode === 32 && this.scene === "play") { //SPACE
                    //Fire the player out of the cannon
                    this.fired = true;

                    this.player.rot = 5;

                    this.player.x = this.cannon.x + this.sin(radians(this.cannon.angle)) * this.cannon.length;
                    this.player.y = this.cannon.y - this.cos(radians(this.cannon.angle)) * this.cannon.length;

                    this.player.vx = map(this.player.x - this.cannon.x, -this.cannon.length, this.cannon.length, -1, 1) * this.cannon.vel;
                    this.player.vy = map(this.player.y - this.cannon.y, -this.cannon.length, this.cannon.length, -1, 1) * this.cannon.vel;

                    for(var i = 0; i < 15; i++) {
                        this.explosions.push({
                            x: this.player.x,
                            y: this.player.y,
                            vx: random(-2, 2),
                            vy: random(-2, 2),
                            gravity: 0,
                            opacity: 200,
                            opacitySpeed: ~~random(3, 5),
                            diameter: ~~random(10, 30),
                            color: random() < 0.5 ? color(179, 46, 39) : color(54, 53, 54)
                        });
                    }

                    keyCode = 0;

                    this.shake = 10;
                  
                    if(this.sound) {
                      this.sounds.fire.play();
                    }
                }
            }
        },
        checkCollisions: function() {

        },
        isInView: function(obj) {
            return obj.x + obj.w + this.cam.x < 0;
        },
        runTrampolines: function() {
            for(var i = 0; i < this.trampolines.length; i++) {
                var trampoline = this.trampolines[i];

                trampoline.go();

                //if the trampoline has gone off the screen then remove it
                if(this.isInView(trampoline)) {
                    trampoline.dead = true;
                }

                //check if the player collided with the mud
                if( !this.gameOver &&
                    this.player.x + this.player.diameter * 0.5 > trampoline.x &&
                    this.player.x - this.player.diameter * 0.5 < trampoline.x + trampoline.w &&
                    this.player.y + this.player.diameter * 0.5 > trampoline.y) {

                    if(this.player.vx > 10) {
                        this.player.vx = constrain(this.player.vx * 1.1, this.player.vx, this.cannon.topSpeed);
                    }
                    else {
                        this.player.vx = 15;
                    }

                    if(this.player.vy > 10) {
                        this.player.vy = constrain(this.player.vy * -1.5, -this.cannon.topSpeed, this.player.vy);
                    }
                    else {
                        this.player.vy = -15;
                    }

                    this.shake = 25;
                  
                    if(this.sound) {
                      this.sounds.trampoline.play();
                      //fire.play();
                    }

                    break;
                }
            }

            //credit to Bob Lyon for a memory free way to "splice" objects
            while (this.trampolines.length > 0 && this.trampolines[0].dead) {
                this.trampolines.shift();
            }
        },
        runMuds: function() {
            for(var i = 0; i < this.muds.length; i++) {
                var mud = this.muds[i];

                mud.go();

                //if the mud has gone off the screen then remove it
                if(this.isInView(mud)) {
                    mud.dead = true;
                }

                //check if the player collided with the mud
                if(!this.gameOver && this.collisionGround() && this.player.x + this.player.diameter * 0.2 > mud.x && this.player.x - this.player.diameter * 0.2 < mud.x + mud.w) {
                    this.player.vx = 0;
                    this.player.vy = 0;

                    if(!this.gameOver) {
                        for(var i = 0; i < 15; i++) {
                            this.explosions.push({
                                x: ~~random(mud.x - mud.w * 0.3, mud.x + mud.w * 0.3),
                                y: mud.y,
                                vx: random(-2, 2),
                                vy: random(-3, -2),
                                gravity: 0.1,
                                opacity: 200,
                                opacitySpeed: ~~random(3, 5),
                                diameter: ~~random(10, 30),
                                color: random() < 0.5 ? color(120, 106, 44) : color(97, 72, 26)
                            });
                        }

                        this.score = ~~(this.player.x / 10) - 45;
                        this.bestScore = max(this.score, this.bestScore);

                        this.shake = map(this.player.vy, 0, this.player.vymax, 0, 20);
                    }
                  
                    if(this.sound) {
                      this.sounds.mud.play();
                    }

                    this.gameOver = true;

                    break;
                }
            }

            //credit to Bob Lyon for a memory free way to "splice" objects
            while (this.muds.length > 0 && this.muds[0].dead) {
                this.muds.shift();
            }
        },
        runBombs: function() {
            for(var i = 0; i < this.bombs.length; i++) {
                var bomb = this.bombs[i];

                bomb.go();

                //if the bomb has gone off the screen then remove it
                if(this.isInView(bomb)) {
                    bomb.dead = true;
                }

                //check if the player collided with the mud
                if( dist(this.player.x, this.player.y, bomb.x - bomb.w * 0.2, bomb.y + bomb.h * 0.1) < (this.player.diameter + bomb.w) * 0.4 ||
                    dist(this.player.x, this.player.y, bomb.x + bomb.w * 0.2, bomb.y - bomb.h * 0.1) < (this.player.diameter + bomb.w) * 0.4) {
                    // this.player.vx = constrain(this.player.vx * 1.1, this.player.vx, this.cannon.topSpeed);

                    if(this.player.vx > 10) {
                        this.player.vx = constrain(this.player.vx * 1.1, this.player.vx, this.cannon.topSpeed);
                    }
                    else {
                        this.player.vx = 15;
                    }

                    if(this.player.vy > 10) {
                        this.player.vy = constrain(this.player.vy * -2, -this.cannon.topSpeed, this.player.vy);
                    }
                    else {
                        this.player.vy = -20;
                    }

                    for(var i = 0; i < 15; i++) {
                        this.explosions.push({
                            x: bomb.x,
                            y: bomb.y,
                            vx: random(-2, 2),
                            vy: random(-2, 2),
                            gravity: 0,
                            opacity: 200,
                            opacitySpeed: ~~random(3, 5),
                            diameter: ~~random(10, 30),
                            color: random() < 0.5 ? color(179, 46, 39) : color(54, 53, 54)
                        });
                    }

                    this.shake = 25;

                    if(this.sound) {
                      this.sounds.bomb.volume = 0.4
                      this.sounds.bomb.play();
                    }

                    bomb.dead = true;

                    break;
                }
            }

            //credit to Bob Lyon for a memory free way to "splice" objects
            while (this.bombs.length > 0 && this.bombs[0].dead) {
                this.bombs.shift();
            }
        },
        runExplosives: function() {
            for(var i = 0; i < this.explosives.length; i++) {
                var explosive = this.explosives[i];

                explosive.go();

                //if the explosive has gone off the screen then remove it
                if(this.isInView(explosive)) {
                    explosive.dead = true;
                }

                //check if the player collided with the mud
                if(this.player.y + this.player.diameter * 0.2 > explosive.y && this.player.x + this.player.diameter * 0.2 > explosive.x && this.player.x - this.player.diameter * 0.2 < explosive.x + explosive.w) {
                    // this.player.vx = constrain(this.player.vx * 1.2, this.player.vx, this.cannon.topSpeed);

                    if(this.player.vx > 10) {
                        this.player.vx = constrain(this.player.vx * 1.1, this.player.vx, this.cannon.topSpeed);
                    }
                    else {
                        this.player.vx = 15;
                    }

                    if(this.player.vy > 10) {
                        this.player.vy = constrain(this.player.vy * -2, -this.cannon.topSpeed, this.player.vy);
                    }
                    else {
                        this.player.vy = -20;
                    }

                    for(var i = 0; i < 15; i++) {
                        this.explosions.push({
                            x: explosive.x,
                            y: explosive.y,
                            vx: random(-2, 2),
                            vy: random(-2, 2),
                            gravity: 0,
                            opacity: 200,
                            opacitySpeed: ~~random(3, 5),
                            diameter: ~~random(15, 30),
                            color: random() < 0.5 ? color(179, 46, 39) : color(54, 53, 54)
                        });
                    }

                    this.shake = 25;

                    if(this.sound) {
                      this.sounds.explosive.play();
                    }

                    explosive.dead = true;

                    break;
                }
            }

            //credit to Bob Lyon for a memory free way to "splice" objects
            while (this.explosives.length > 0 && this.explosives[0].dead) {
                this.explosives.shift();
            }
        },
        runFlyTraps: function() {
            for(var i = 0; i < this.flyTraps.length; i++) {
                var flyTrap = this.flyTraps[i];

                flyTrap.go();

                //if the trampoline has gone off the screen then remove it
                if(this.isInView(flyTrap)) {
                    flyTrap.dead = true;
                }

                //check if the player collided with the mud
                if(!this.gameOver && dist(this.player.x, this.player.y, flyTrap.x, flyTrap.y) < (this.player.diameter + flyTrap.w) * 0.4) {
                    this.gameOver = true;
                    this.player.vx = 0;
                    this.player.vy = 0;
                    this.score = ~~(this.player.x / 10) - 45;
                    this.bestScore = max(this.score, this.bestScore);
                    flyTrap.eat = true;
                    this.player.eaten = true;

                    for(var i = 0; i < 15; i++) {
                        this.explosions.push({
                            x: flyTrap.x,
                            y: flyTrap.y,
                            vx: random(-2, 2),
                            vy: random(-2, 2),
                            gravity: 0.1,
                            opacity: 200,
                            opacitySpeed: ~~random(3, 5),
                            diameter: ~~random(15, 30),
                            color: random() < 0.5 ? flyTrap.color : this.player.color
                        });
                    }

                    this.shake = 25;

                    if(this.sound) {
                      this.sounds.flytrap.play();
                    }

                    break;
                }
            }

            //credit to Bob Lyon for a memory free way to "splice" objects
            while (this.flyTraps.length > 0 && this.flyTraps[0].dead) {
                this.flyTraps.shift();
            }
        },
        addObject: function() {
            if(this.player.x > this.addFrequency.value) {
                //add new object
                var rnd = random(8);
                // rnd = 7; //FOR TESTING ONLY

                if(rnd < 2) {
                    this.trampolines.push(Trampoline.new({
                        x: this.addFrequency.value + 600,
                        y: 520,
                        w: 80,
                        h: 15
                    }));
                }
                else if(rnd < 4) {
                    this.bombs.push(Bomb.new({
                        x: this.addFrequency.value + 600,
                        y: ~~random(350, 450),
                        w: 50
                    }));
                }
                else if(rnd < 6) {
                    this.explosives.push(Explosive.new({
                        x: this.addFrequency.value + 600,
                        y: 500,
                        w: 70,
                        h: 50
                    }));
                }
                else if(rnd < 7) {
                    this.muds.push(Mud.new({
                        x: this.addFrequency.value + 600,
                        y: 530,
                        w: 80,
                        h: 15
                    }));
                }
                else {
                    this.flyTraps.push(FlyTrap.new({
                        x: this.addFrequency.value + 600,
                        y: 450,
                        w: 50
                    }));
                }

                //increase frequency
                this.addFrequency.value+= ~~random(this.addFrequency.min, this.addFrequency.max);
            }
        },
        displayAvatar: function() {
            pushMatrix();
                translate(710, 300);

                switch(this.player.type) {
                    case "cat":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.cat, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "dog":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.dog, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "sheep":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.sheep, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "pig":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.pig, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "cow":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.cow, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "mouse":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.mouse, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "rabbit":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.rabbit, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "chicken":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.chicken, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                    case "horse":
                        pushStyle();
                            imageMode(CENTER);
                            image(game.images.horse, 0, 0);
                            imageMode(CORNER);
                        popStyle();
                        break;
                }
            popMatrix();
        },
        scoreboard: function() {
            image(this.images.skyBlue, 0, 0);
            image(this.images.ground, 0, 510);

            image(this.images.pig, 60, 330, this.images.pig.width * 0.6, this.images.pig.height * 0.6);
            image(this.images.dog, 640, 340, this.images.dog.width * 0.6, this.images.dog.height * 0.6);

            //display top 10 scores here
            var names = "", scores = "";
            for(var i = 0; i < this.highscores.length; i++) {
                names+= this.highscores[i].name + ":\n";
                scores+= "" + this.highscores[i].score + "\n";
            }

            pushStyle();
                textAlign(CENTER);
                fill(this.colors.heading, 150);
                textSize(40);
                text("SCOREBOARD", width * 0.5, 50);
                textAlign(RIGHT);
                fill(this.colors.text);
                textSize(20);
                textLeading(35);
                text(names, 470, 125);
                text(scores, 555, 125);
            popStyle();

            this.buttons.back.draw();
        },
        store: function() {
            image(this.images.skyBlue, 0, 0);
            image(this.images.ground, 0, 510);

            pushStyle();
                textAlign(CENTER);
                fill(this.colors.heading, 150);
                textSize(40);
                text("CHARACTERS", width * 0.5, 50);
            popStyle();

            image(this.images.cat, 50, 70, this.images.cat.width * 0.3, this.images.cat.height * 0.3);
            image(this.images.dog, 240, 75, this.images.dog.width * 0.3, this.images.dog.height * 0.3);
            image(this.images.cow, 243, 214, this.images.cow.width * 0.27, this.images.cow.height * 0.27);
            image(this.images.pig, 50, 222, this.images.pig.width * 0.27, this.images.pig.height * 0.27);
            image(this.images.horse, 430, 364, this.images.horse.width * 0.27, this.images.horse.height * 0.27);
            image(this.images.chicken, 240, 358, this.images.chicken.width * 0.3, this.images.chicken.height * 0.3);
            image(this.images.rabbit, 60, 363, this.images.rabbit.width * 0.28, this.images.rabbit.height * 0.28);
            image(this.images.mouse, 437, 217, this.images.mouse.width * 0.3, this.images.mouse.height * 0.3);
            image(this.images.sheep, 430, 75, this.images.sheep.width * 0.27, this.images.sheep.height * 0.27);

            this.avatars.cat.draw();
            this.avatars.dog.draw();
            this.avatars.sheep.draw();
            this.avatars.pig.draw();
            this.avatars.cow.draw();
            this.avatars.mouse.draw();
            this.avatars.rabbit.draw();
            this.avatars.chicken.draw();
            this.avatars.horse.draw();

            this.displayAvatar();

            this.buttons.back.draw();
        },
        home: function() {
            image(this.images.skyBlue, 0, 0);
            image(this.images.ground, 0, 510);

            this.cannon.go();

            this.bomb.go();
            this.explosive.go();
            this.trampoline.go();
            this.flytrap.go();
            this.mud.go();

            image(this.images.cat, 175, 350, this.images.cat.width * 0.5, this.images.cat.height * 0.5);

            fill(this.colors.text, 150);
            pushStyle();
                textSize(60);
                textAlign(CENTER);
                text("Critter Cannon" , width * 0.5, 80);

                fill(this.colors.text);
                textSize(28);
                text("How to Play:", width * 0.5, 130);
                textSize(14);
                // text("Critter Cannon is very simple to play.\n\nJust aim the cannon using the UP/DOWN keys\nand use SPACE to fire.\n\nThe red/green bar on the cannon\nindicates the power of your shot.\n\nLeave the rest to gravity and the other objects.\n\nCheck out the Characters screen to select\none of 9 different characters.\n\nAlso, make sure you turn on the sound\nfor a better experience.", width * 0.5, 160);
                text("Critter Cannon is very simple to play.\n\nJust aim the cannon using the UP/DOWN keys\nand use SPACE to fire.\n\nThe red/green bar on the cannon\nindicates the power of your shot.\n\nLeave the rest to gravity and the other objects.\n\nCheck out the Characters screen to select\none of 9 different characters.", width * 0.5, 160);
            popStyle();

            pushMatrix();
                translate(100, 100);
                rotate(radians(-30 + sin(radians(frameCount * 2)) * 5));
                pushStyle();
                textSize(30);
                textAlign(CENTER, CENTER);
                text("How far\ncan you go?", 0, 0);
                popStyle();
            popMatrix();

            this.buttons.play.draw();
            this.buttons.scoreboard.draw();
            this.buttons.sound.draw();
            this.buttons.store.draw();
        },
        over: function() {
            image(this.gameOverImage, 0, 0);

            pushStyle();
                fill(255, 100);
                // stroke(100, 150);
                // strokeWeight(1);
                noStroke();
                rect(250, 130, 400, 300);

                textAlign(CENTER);
                fill(181, 57, 29);
                textSize(50);
                text(this.score + " ft", width / 2, 190);
                textSize(22);
                text("Your High Score: " + this.bestScore + " ft", width / 2, 230);
            popStyle();

            this.buttons.replay.draw();
            this.buttons.home.draw();
        },
        play: function() {
            image(this.images.skyBlue, 0, 0);

            image(this.images.ground, 0, 510);

            pushStyle();
                textAlign(CENTER);
                textSize(40);
                fill(255, 30);
                text((~~(this.player.x / 10) - 45) + " ft", 450, 60);
            popStyle();

            if(this.player.x > width / 2) {
                this.cam.x = lerp(this.cam.x, width / 2 - this.player.x, 0.2);
            }
            else {
                this.cam.x = 0;
            }

            this.shakeScreen();

            this.runMountains();

            pushMatrix();
                translate(this.cam.x, this.cam.y);

                this.runTrampolines();
                this.runMuds();
                this.runBombs();
                this.runExplosives();
                this.runFlyTraps();

                this.cannon.go();
                this.moveCannon();
                if(this.fired && !this.player.eaten) {
                    if(this.gameOver) {
                        this.player.draw();
                    }
                    else {
                        this.player.go();
                    }
                }

                if(this.collisionGround() && !this.gameOver) {
                    //shake when the critter hits the ground (amount based on vertical velocity)
                    this.shake = map(this.player.vy, 0, this.player.vymax, 0, 20);
                    
                    if(this.sound && this.player.vy > 1.5) {
                      this.sounds.ground.play()
                    }

                    //if critter in slow enough state then game over
                    if(this.player.vx < 3 || (this.player.vx < 3 && this.player.vy < 1)) {
                        this.player.y = this.ground.y - this.player.diameter * 0.5;
                        this.player.vx = 0;
                        this.player.vy = 0;
                        this.player.rot = 0;
                        this.score = ~~(this.player.x / 10) - 45;
                        this.bestScore = max(this.score, this.bestScore);
                        this.gameOver = true;
                    }
                    //else bounce based on current vx, vy with a bit of friction
                    else {
                        this.player.vx = constrain(this.player.vx * 0.95, 0, this.player.vx);
                        this.player.y = this.ground.y - this.player.diameter * 0.5;
                        this.player.vy = -this.player.vy * 0.7;
                    }
                }

                //if you haven't fired the cannon, then fire it
                if(!this.fired) {
                    this.buttons.playHome.draw();
                    this.buttons.playSound.draw();
                    this.shoot();
                }

                //run through all the explosions
                this.runExplosions();

                //add a new objects (semi-randomly distributed so get more helpful objects)
                this.addObject();
            popMatrix();

            if(this.gameOver) {
                if(this.gameOverTimer++ > 120) {
                    this.gameOverImage = get();
                    this.scene = "gameOver";
                    this.gameOver = false;
                }
            }
        },
        checkKeyPressed: function() {
            if(keyPressed) {
                if(keyCode === 83) { //s - toggle sound
                    game.sound = !game.sound;
                    keyCode = 0;
                }
            }
        },
        go: function() {
            //used to check if key pressed (toggle sound)
            // this.checkKeyPressed();

            background(this.colors.back);

            //scene selection
            switch(this.scene) {
                case "load":
                    this.load("home");
                    break;
                case "home":
                    this.home();
                    break;
                case "scoreboard":
                    this.scoreboard();
                    break;
                case "store":
                    this.store();
                    break;
                case "play":
                    this.play();
                    break;
                case "gameOver":
                    this.over();
                    break;
            }

            if(this.transition.active) {
                this.transition.run();
            }

            cursor(this.hover ? 'pointer' : 'default');
            this.clicked = false;
            this.hover = false;
            keyCode = 0;
        }
    };

    game = new Game();

    draw = function() {
        game.go();
    };

    keyPressed = function () {
        game.keys[keyCode] = true;
    };
    keyReleased = function () {
        game.keys[keyCode] = false;
    };
    mouseClicked = function () {
        game.clicked = true;
    };
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);