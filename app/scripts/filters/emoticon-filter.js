'use strict';

angular.module('nodeChat.filters').
    filter('emoticonFilter', function () {
        var regex = /\[\[[a-zA-Z-]+\]\]/g;

        return function (text) {
            if (angular.isDefined(text) && angular.isString(text)) {

                text = text.replace(/:\)|:-\)|\(:|\(-:/g, '[[fa-smile-o]]')
                           .replace(/:\(|:-\(|\):|\)-:/g, '[[fa-frown-o]]')
                           .replace(/:\||:-\||\|:|\|-:/g, '[[fa-meh-o]]')
                           .replace(/\[like\]/g, '[[fa-thumbs-o-up]]')
                           .replace(/\[dislike\]/g, '[[fa-thumbs-o-down]]')
                           .replace(/\[moon\]/g, '[[fa-moon-o]]')
                           .replace(/\[star\]/g, '[[fa-star]]')
                           .replace(/\[heart\]|\[love\]|<3/g, '[[fa-heart-o]]')
                           .replace(/\[boy\]|\[man\]/g, '[[fa-male]]')
                           .replace(/\[girl\]|\[woman\]/g, '[[fa-female]]')
                           .replace(/\[camera\]/g, '[[fa-camera-retro]]');

                var match = regex.exec(text);
                while (match) {
                    text = text.replace(match + '', '<i class="fa inline-emoticon ' + (match + '').replace(/\[|\]/g, '') + '"></i>');
                    match = regex.exec(text);
                }

                return text;
            }
        };
    });
