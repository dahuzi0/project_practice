/**
 * [description:奖励显示]
 * [version:V1.0.0]
 */
cc.Class({
    extends: cc.Component,
    properties: {
        animNode: {
            default: null,
            type: cc.Node
        },
        voiceAnim: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function() {
        var self = this;
        self.bindBtnEvents();
        self.hideButton();
    },

    bindBtnEvents: function() {
        var self = this;

        // cursor pointer
        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(event) {
            cc._canvas.style.cursor = 'pointer';
        });
        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
            cc._canvas.style.cursor = 'default';
        });

        // bind
        self.node.on(cc.Node.EventType.TOUCH_END, function() {
            var rewards_btn = window.localStorage.getItem('rewards_btn');
            if (!rewards_btn || rewards_btn == "null" || rewards_btn == 1) {
                window.localStorage.setItem('rewards_btn', 2);
                self.showAnim();
                if (window.nova && window.nova.teacherRewards) window.nova.teacherRewards(self.node.name);
            }
        });
    },

    hideButton: function() {
        var isTeacher = window.WCRDocSDK && window.WCRDocSDK.isTeacher && window.WCRDocSDK.isTeacher();
        if (!isTeacher) {
            this.node.opacity = 0;
        }
    },

    onDisable() {
        window.localStorage.setItem('rewards_btn', null);
    },

    stopAnim_1: function() {
         //停止骨骼动画
        var self = this;
        if (!self.animNode) return;
        if (!self.animNode.getComponent('bone')) return;
        self.animNode.getComponent('bone').stopAnim();
    },

    stopAnim_2: function() {
        //停止按钮动画
        var self = this;
        if (!self.voiceAnim) return;
        if (!self.voiceAnim.getComponent('voice_anim')) return;
        self.voiceAnim.getComponent('voice_anim').voiceStopAnim();
    },

    showAnim: function() {
        var self = this;
        self.stopAnim_1();
        self.stopAnim_2();
        if (!self.animNode) return;
        if (!self.animNode.getComponent('bone')) return;
        self.animNode.getComponent('bone').showAnim();
    }

});