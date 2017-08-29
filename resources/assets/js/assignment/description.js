const description = new Vue({
    el: '#assignment_description',
    data: {
        isOpen: true,
        buttonText: 'Complete This Assignment',
    },
    methods: {},
    mounted: function () {
        var assignmentStatus = assignmentStatus();
        this.isOpen = assignmentStatus['open'];
        this.buttonText = assignmentStatus['msg'] ? assignmentStatus['msg'] : 'Complete This Assignment';
    }
});