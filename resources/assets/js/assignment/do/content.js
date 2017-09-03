const content = new Vue({
    el: '#assignment_content',
    data: {
        questions: null,
        answer: null,
        matching: new Array(5),
        in_focus: false,
        choice_complete: false,
        current_index: 0,
    },
    mounted: function () {
        var id = document.getElementsByTagName('meta')['id'].content;
        var aStatus = assignmentStatus();
        if (aStatus['open']) {
            this.answer = localStorage.getItem('answer-' + id);
            if (this.answer) {
                showMessage('Detected saved answer locally, continuing', 1);
                this.fetch();
                this.$nextTick(function () {
                    this.answer = JSON.parse(this.answer);
                    fill();
                    window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                })
            } else if (aStatus['gradeStatus'] == 2) {
                var self = this;
                showMessage('Detected saved answer on the server, continuing', 1);
                this.fetch();
                axios.get('/assignments/' + id + '/save').then(function (res) {
                    localStorage.setItem('answer-' + id, JSON.stringify(res.data));
                    self.$nextTick(function () {
                        self.answer = res.data;
                        fill();
                        window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                    })
                })
            }
        }
    },
    methods: {
        fetch: function () {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            var local = sessionStorage.getItem('questions-' + id);
            if (local)
                self.questions = JSON.parse(local);
            else
                axios.get('/assignments/' + id + '/questions').then(function (res) {
                    self.questions = res.data;
                    sessionStorage.setItem('questions-' + id, JSON.stringify(res.data));
                });
        },
        submit: function () {
            if (getAnswer()) {
                var id = document.getElementsByTagName('meta')['id'].content;
                localStorage.removeItem('answer-' + id);
                var form = document.getElementById('submit_form');
                form.children[0].value = JSON.stringify(this.answer);
                form.submit();
            } else {
                showMessage('Something went wrong!', 0);
            }
        },
        save: function (type) {
            var self = this;
            var id = document.getElementsByTagName('meta')['id'].content;
            if (getAnswer()) {
                switch (type) {
                    case 0:
                        localStorage.setItem('answer-' + id, JSON.stringify(this.answer));
                        showMessage('Save successfully', 1);
                        break;
                    case 1:
                        axios.post('/assignments/' + id + '/save', {answer: JSON.stringify(self.answer)}).then(function (res) {
                            showMessage(res.data.msg.content, res.data.msg.type); //0=>danger, 1=>info
                        });
                        break;
                }
            } else {
                showMessage('Something went wrong!', 0);
            }
        },
        match: function (event) {
            var current = $(event.target);
            var index = current.attr('index');
            var c = $('#canvas-' + index);
            if (!c.width()) {
                var w = c.parent().width();
                var h = c.parent().height();
                c[0].width = w;
                c[0].height = h;
            }
            var ctx = c[0].getContext('2d');
            var choices = $('a[index=' + index + '].disabled');
            current.addClass('disabled').siblings().addClass('disabled');
            choices.on('click', function (e) {
                var choice = $(e.target);
                var input = $('#' + index).contents('input[name=result]');
                var result = input.val();
                if (!result)
                    result = [];
                else
                    result = JSON.parse(result);
                result[current.attr('order')] = choice.attr('value');
                ctx.clearRect(0, 0, c.width(), c.height());
                ctx.strokeStyle = '#007bff';
                for (var i in result) {
                    if (result[i])
                        draw(ctx, $('[index=' + index + '][order=' + i + ']'), $('[index=' + index + '][value=' + result[i] + ']'), c);
                }

                // var prev = current.prevAll();
                // var x1 = 0, x2 = c.width(), y1 = 0, y2 = 0;
                // for (var i = 0; i < prev.length; i++)
                //     y1 += $(prev[i]).height();
                // y1 += current.height() / 2.0;
                // prev = choice.prevAll();
                // for (var i = 0; i < prev.length; i++)
                //     y2 += $(prev[i]).height();
                // y2 += choice.height() / 2.0;
                // ctx.strokeStyle = '#007bff';
                // drawLine(ctx, x1, y1, x2, y2);
                choices.unbind('click');
                choices.addClass('disabled');
                current.removeClass('disabled').siblings().removeClass('disabled');
                result = JSON.stringify(result);
                input.val(result);
            });
            choices.removeClass('disabled');
        }
        // addColor: function (className) {
        //     var elem = document.getElementsByClassName(className);
        //     for (var i = 0; i < elem.length; i++) {
        //         var sty = elem[i].style;
        //         // sty.backgroundColor = sty.backgroundColor? "":"#00C851";
        //         sty.backgroundColor = "#00C851";
        //     }
        // },
        // deleteColor: function (className) {
        //     var elem = document.getElementsByClassName(className);
        //     for (var i = 0; i < elem.length; i++) {
        //         var sty = elem[i].style;
        //         // sty.backgroundColor = sty.backgroundColor? "":"#00C851";
        //         sty.backgroundColor = "";
        //     }
        // },
    },
});

$('#get_content').on('click', function (event) {
    content.fetch();
});
//     for (var i = 0; i < 5; i++) {
//         content.matching[i] = 0;
//     }
//     /*    console.log(content.matching);
//         function createLineElement(x, y, length, angle) {
//             var line = document.createElement("div");
//             var styles = 'border: 1px solid black; '
//                        + 'width: ' + length + 'px; '
//                        + 'height: 0px; '
//                        + '-moz-transform: rotate(' + angle + 'rad); '
//                        + '-webkit-transform: rotate(' + angle + 'rad); '
//                        + '-o-transform: rotate(' + angle + 'rad); '
//                        + '-ms-transform: rotate(' + angle + 'rad); '
//                        + 'position: absolute; '
//                        + 'top: ' + y + 'px; '
//                        + 'left: ' + x + 'px; ';
//             line.setAttribute('style', styles);
//             return line;
//         }
//         function createLine(x1, y1, x2, y2) {
//             var a = x1 - x2,
//                 b = y1 - y2,
//                 c = Math.sqrt(a * a + b * b);
//             var sx = (x1 + x2) / 2,
//                 sy = (y1 + y2) / 2;
//             var x = sx - c / 2,
//                 y = sy;
//             var alpha = Math.PI - Math.atan2(-b, a);
//             return createLineElement(x, y, c, alpha);
//         }
//         function findPos(ele) {
//             var currentLeft = currentTop = 0;
//             if (ele.offsetParent) {
//                 do {
//                     currentLeft += ele.offsetLeft;
//                     currentTop += ele.offsetTop;
//                 } while(ele = ele.offsetParent);
//             }
//             return [currentLeft, currentTop];
//         }
//         for (var i = 1; i <= 5; i++) {
//             for (var j = 1; j <= 5; j++) {
//                 var leftEle = document.getElementById("left_" + i);
//                 var rightEle = document.getElementById("right_" + j);
//                 var left = findPos(leftEle);
//                 var right = findPos(rightEle);
//                 document.body.appendChild(createLine(left[0], left[1], right[0], right[1]));
//                 // console.log(left[0], left[1], i, j);
//             }
//         }*/
//     // document.body.appendChild(createLine(100, 100, 500, 200));
// });
//
// $('.left_choice').on('focus', function (event) {
//     content.addColor('right_choice');
//     content.in_focus = true;
//     content.choice_complete = false;
//     for (var i = 1; i <= content.matching.length; i++) {
//         var leftEle = document.getElementById("left_" + i);
//         if (leftEle === document.activeElement) {
//             current_index = i;
//             console.log("current_index-->" + current_index);
//             var leftEle = document.getElementById("left_" + i);
//             var sty = leftEle.style;
//             sty.outline = "0";
//             sty.webkitBoxShadow = "0 0 0 3px rgba(134, 142, 150, 0.5)";
//             sty.boxShadow = "0 0 0 3px rgba(134, 142, 150, 0.5)";
//         }
//         else {
//             var leftEle = document.getElementById("left_" + i);
//             var sty = leftEle.style;
//             sty.outline = "0";
//             sty.webkitBoxShadow = "0 0 0 0px rgba(134, 142, 150, 0.5)";
//             sty.boxShadow = "0 0 0 0px rgba(134, 142, 150, 0.5)";
//         }
//     }
// });
// $('.right_choice').on('focus', function (event) {
//     if (content.in_focus && current_index != 0) {
//         for (var i = 1; i <= content.matching.length; i++) {
//             var rightEle = document.getElementById("right_" + i);
//             var leftChoice = document.getElementById("left_" + current_index);
//             if (rightEle === document.activeElement) {
//                 content.matching[current_index - 1] = i;
//                 console.log(content.matching);
//                 content.in_focus = false;
//                 content.deleteColor('right_choice');
//                 $(".completed_choices").append("<p class='text-center mb-0'>" + leftChoice.innerHTML + "<——>" + rightEle.innerHTML + "</p>");
//                 var all_stuff = document.getElementsByClassName('completed_choices');
//                 // console.log(all_stuff.innerText);
//                 /*                for (var i = 0; i < all_stuff.length; i++) {
//                                     console.log(all_stuff[i].innerText);
//                                 }*/
//             }
//             var leftEle = document.getElementById("left_" + i);
//             var sty = leftEle.style;
//             sty.outline = "0";
//             sty.webkitBoxShadow = "0 0 0 0px rgba(134, 142, 150, 0.5)";
//             sty.boxShadow = "0 0 0 0px rgba(134, 142, 150, 0.5)";
//         }
//     }
// });
// $('.left_choice').on('focusout', function (event) {
//     /*    var flag = false;
//         for (var i = 1; i <= content.matching.length; i++) {
//             var rightEle = document.getElementById("right_" + i);
//             console.log(document.activeElement.id);
//             if (rightEle === document.activeElement) {
//                 content.changeColor('right_choice');
//                 console.log("right active");
//                 flag = true;
//             }
//         }
//         if (!flag) {
//             content.changeColor('right_choice');
//             content.in_focus = false;
//             console.log("right not active");
//         }*/
//     if (content.in_focus) {
//         for (var i = 1; i <= content.matching.length; i++) {
//             if (i == current_index) {
//                 var leftEle = document.getElementById("left_" + i);
//                 var sty = leftEle.style;
//                 sty.outline = "0";
//                 sty.webkitBoxShadow = "0 0 0 3px rgba(134, 142, 150, 0.5)";
//                 sty.boxShadow = "0 0 0 3px rgba(134, 142, 150, 0.5)";
//             }
//             else {
//                 var leftEle = document.getElementById("left_" + i);
//                 var sty = leftEle.style;
//                 sty.outline = "0";
//                 sty.webkitBoxShadow = "0 0 0 0px rgba(134, 142, 150, 0.5)";
//                 sty.boxShadow = "0 0 0 0px rgba(134, 142, 150, 0.5)";
//             }
//         }
//     }
// });
// $('.right_choice').on('focusout', function (event) {
// });


function getAnswer() {
    content.answer = [];
    for (var i in content.questions) {
        var type = content.questions[i].type;
        switch (type) {
            case 0:
                var input = $('input[name=' + i + ']');
                var value = null;
                for (var j = 0; j < input.length; j++) {
                    if (input[j].checked) {
                        value = input[j].value;
                    }
                }
                content.answer[i] = value;
                break;
            case 1:
                break;
        }
    }
    return true;
}

function fill() {
    for (var i in content.answer) {
        if (!content.answer[i])
            continue;
        switch (content.questions[i].type) {
            case 0:
                $('input[name=' + i + '][value=' + content.answer[i] + ']').attr('checked', true);
                break;
        }
    }
}

function draw(ctx, current, choice, c) {
    var prev = current.prevAll();
    var x1 = 0, x2 = c.width(), y1 = 0, y2 = 0;
    for (var i = 0; i < prev.length; i++)
        y1 += ($(prev[i]).height() + 7);
    y1 += current.height() / 2.0 + 7;
    prev = choice.prevAll();
    for (var i = 0; i < prev.length; i++)
        y2 += ($(prev[i]).height() + 7);
    y2 += choice.height() / 2.0 + 7;
    drawLine(ctx, x1, y1, x2, y2);
}