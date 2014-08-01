rot13
'use strict';

angular.module('nodeChat.services')
    .factory('profanityCleanser', function () {

        // [0]: the word to replace
        // [1]: the replacement
        // [2]: only match at a word level (don't match substrings),
        //      to avoid cases like "hello" or "assets"

        var replacements = [
            ['shpxvat', 'pancaking', false],
            ['shpxre', 'pancake flipper', false],
            ['shpx', 'pancake', false],
            ['fuvg', 'sheer beauty', true],
            ['fuvgcnapnxr', 'deliciousness', false],
            ['fuvgnff', ':)', false],
            ['fuvgsnpr', 'big meanie', false],
            ['nffjvcr', 'bottom tissue', false],
            ['nffubyr', 'elbow joint', false],
            ['nffrf', 'elbows', false],
            ['nff', 'elbow', true],
            ['uryy', 'rainbowland', true],
            ['ovgpurf', 'multiple mango smoothies', false],
            ['ovgpu', 'mango smoothie', false],
            ['phag', 'pineapple smoothie', false],
            ['chffvrf', 'mulitple blueberry smoothies', false],
            ['chffl', 'blueberry smoothie', false],
            ['qnzavg', 'oopsies', false],
            ['qnza', 'wowsers', false],
            ['qvpx', 'tax return', false],
            ['pbpx', 'tax return', false],
            ['jnat', 'tax return', false],
            ['qbat', 'tax return', true],
            ['gvgf', 'tax returns', true],
            ['gvg', 'tax return', true],
            ['obbo', 'tax return', true],
            ['snttbg', 'European turtle dove', false],
            ['snt', 'European turtle dove', true],
            ['avttre', 'European turtle dove', false],
            ['gjng', 'great white shark', false],
            ['juber', 'silly person', true],
            ['fyhg', 'mechanical pencil', false],
            ['cvff', 'urinate', true],
            ['cvffrq', 'urinated', true],
            ['gvggvrf', 'tax returns', false],
            ['obbovrf', 'tax returns', false],
            ['obbof', 'tax returns', false],
            ['gjrex', 'square dance', false],
            ['phz', 'throw a frisbee', true],
            ['phzzvat', 'throwing a frisbee', true]
        ];

        // make it a little more difficult to use these words
        var replacementRegexes = [];
        replacements.forEach(function (element, index, array) {
            var unencyptedString = toRot13(element[0]);
            var regexString = element[2] ? '\\b' : '';
            for (var i = 0; i < unencyptedString.length; i++) {
                regexString += unencyptedString.substr(i, 1);
                if (i < unencyptedString.length - 1) {
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

        // how about let's ROT13 everything so I don't have to stare at 
        // these ridiculously offensive words while I'm developing
        function toRot13(s) {
            return s.replace(/[a-zA-Z]/g, function (c) { return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26); });
        }
    });
