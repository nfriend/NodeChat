'use strict';

angular.module('nodeChat.services')
    .factory('profanityCleanser', function () {

        // [0]: the word to replace
        // [1]: the replacement
        // [2]: only match at a word level (don't match substrings),
        //      to avoid cases like "hello" or "assets"

        var replacements = [
            ['fucking', 'pancaking', false],
            ['fucker', 'pancake flipper', false],
            ['fuck', 'pancake', false],
            ['shit', 'sheer beauty', false],
            ['asshole', 'elbow joint', false],
            ['asses', 'elbows', false],
            ['ass', 'elbow', true],
            ['hell', 'rainbowland', true],
            ['bitches', 'multiple mango smoothies', false],
            ['bitch', 'mango smoothie', false],
            ['cunt', 'pineapple smoothie', false],
            ['pussies', 'mulitple blueberry smoothies', false],
            ['pussy', 'blueberry smoothie', false],
            ['damnit', 'oopsies', false],
            ['damn', 'wowsers', false],
            ['dick', 'tax return', false],
            ['cock', 'tax return', false],
            ['wang', 'tax return', false],
            ['dong', 'tax return', true],
            ['tits', 'tax returns', true],
            ['tit', 'tax return', true],
            ['boob', 'tax return', true],
            ['faggot', 'European turtle dove', false],
            ['fag', 'European turtle dove', true],
            ['nigger', 'European turtle dove', false],
        ];

        // make it a little more difficult to use these words
        var replacementRegexes = [];
        replacements.forEach(function (element, index, array) {
            var regexString = element[2] ? '\\b' : '';
            for (var i = 0; i < element[0].length; i++) {
                regexString += element[0].substr(i, 1);
                if (i < element[0].length - 1) {
                    regexString += '[^a-zA-Z]*';
                } else if (element[2]) {
                    regexString += '\\b';
                }
            }
            replacementRegexes.push([new RegExp(regexString, 'gi'), element[1]]);
        });

        return {
            clean: function(text) {
                if (angular.isDefined(text) && angular.isString(text)) {
                    replacementRegexes.forEach(function (element, index, array) {
                        text = text.replace(element[0], element[1]);
                    });
                }
                return text;
            }
        };
    });
