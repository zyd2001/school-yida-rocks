const description = new Vue({
    el: '#assignment_description',
    data: {
        isOpen: true,
        buttonText: 'Complete This Assignment',
    },
    methods: {},
    mounted: function () {
        var setting = $('meta[name=setting]');
        if (setting.length === 1)
            setting = JSON.parse(setting.attr('content'));
        if (setting.open === false){
            this.isOpen = false;
            this.buttonText = 'This assignment is closed';
        }
    }
});