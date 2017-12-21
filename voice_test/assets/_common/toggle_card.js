// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var self = this;
        self.cards = self.getCards();
        self.initEventBtn();
        self.initBtn();
    },

    initEventBtn: function() {
        var self = this;
        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });

        // bind events
        self.node.on(cc.Node.EventType.TOUCH_END, function() {
            var nodeName = self.node.name;
            if (!nodeName) return;
            if (nodeName == "nextPageBtn") {
                self.nextPageBtn();
            } else if (nodeName == "upPageBtn") {
                self.upPageBtn();
            }
        });
    },

    initBtn: function() {
        var self = this;
        cc.find('Canvas/student/upPageBtn').opacity = 0;
        if (self.cards && self.cards.length < 2) cc.find('Canvas/student/nextPageBtn').opacity = 0;
    },

    // 下一页
    nextPageBtn: function() {
        var self = this;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var nextCard = self.getNextCard(activeCard, self.cards);
            if (!nextCard) return;
            var canActive = null;
            var currentNode = cc.find('Canvas/student/cardList/' + activeCard);

            currentNode.zIndex = 2;

            currentNode.opacity = 0;

            var nextNode = cc.find('Canvas/student/cardList/' + nextCard);
            nextNode.opacity = 255;
            nextNode.zIndex = 1;
            disB();

            function disB() {
                canActive = self.canNextActiveCard();
                if (!canActive) {
                    self.node.opacity = 0;
                } else {
                    cc.find('Canvas/student/upPageBtn').opacity = 255;
                }
            }
        }
    },

    //上一页
    upPageBtn: function() {
        var self = this;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var upCard = self.getUpCard(activeCard, self.cards);
            if (!upCard) return;

            var canActive = null;
            var currentNode = cc.find('Canvas/student/cardList/' + activeCard);

            currentNode.zIndex = 2;

            currentNode.opacity = 0;

            var upNode = cc.find('Canvas/student/cardList/' + upCard);
            upNode.opacity = 255;
            upNode.zIndex = 1;
            disB();

            function disB() {
                canActive = self.canUpActiveCard();
                if (!canActive) {
                    self.node.opacity = 0;
                } else {
                    cc.find('Canvas/student/nextPageBtn').opacity = 255;
                }
            }
        }
    },

    getCards: function() {
        var cards = [];
        var node = cc.find('Canvas/student/cardList');
        if (!node || !node.children || !node.children.length) return;

        for (var i = 0; i < node.children.length; i++) {
            cards.push(node.children[i].name);
        }
        return cards.reverse();
    },

    canNextActiveCard: function() {
        var self = this;
        var res = false;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var nextCard = self.getNextCard(activeCard, self.cards);
            if (nextCard) res = true;
        }
        return res;
    },

    canUpActiveCard: function() {
        var self = this;
        var res = false;
        var activeCard = self.getNodeName();
        if (activeCard && self.cards.length) {
            var nextCard = self.getUpCard(activeCard, self.cards);
            if (nextCard) res = true;
        }
        return res;
    },

    getNodeName: function() {
        var nodeName;

        var node = cc.find('Canvas/student/cardList');
        if (!node) return nodeName;

        for (var i = 0; i < node.children.length; i++) {
            if (node.children[i].opacity == 255) nodeName = node.children[i].name;
        }
        return nodeName;
    },

    getNextCard: function(activeCard, cards) {
        for (var i = 0; i < cards.length; i++) {
            if (cards[i] == activeCard) return i == cards.length - 1 ? null : cards[i + 1];
        }
    },
    getUpCard: function(activeCard, cards) {
        for (var i = 0; i < cards.length; i++) {
            if (cards[i] == activeCard) return i == 0 ? null : cards[i - 1];
        }
    }
});