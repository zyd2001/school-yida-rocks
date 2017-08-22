const description = new Vue({
    el: '#assignment_description',
    data: {
        isOpen: true,
        buttonText: 'Complete This Assignment',
    },
    methods: {},
    mounted: function () {
        var status = assignmentStatus();
        this.isOpen = status[0];
        this.buttonText = status[1] ? status[1] : 'Complete This Assignment';
    }
});