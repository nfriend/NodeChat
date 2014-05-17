'use strict';

describe('Test tests', function () {
    beforeEach(module('nodeChat.services'));

    it('Simple replacement tests', inject(function (profanityCleanser) {
        expect(profanityCleanser.clean('fucking')).toBe('pancaking');
        expect(profanityCleanser.clean('fucker')).toBe('pancake flipper');
        expect(profanityCleanser.clean('fuck')).toBe('pancake');
        expect(profanityCleanser.clean('shit')).toBe('sheer beauty');
        expect(profanityCleanser.clean('asshole')).toBe('elbow joint');
        expect(profanityCleanser.clean('asses')).toBe('elbows');
        expect(profanityCleanser.clean('ass')).toBe('elbow');
        expect(profanityCleanser.clean('hell')).toBe('rainbowland');
        expect(profanityCleanser.clean('bitches')).toBe('multiple mango smoothies');
        expect(profanityCleanser.clean('bitch')).toBe('mango smoothie');
        expect(profanityCleanser.clean('cunt')).toBe('pineapple smoothie');
        expect(profanityCleanser.clean('pussies')).toBe('mulitple blueberry smoothies');
        expect(profanityCleanser.clean('pussy')).toBe('blueberry smoothie');
        expect(profanityCleanser.clean('damnit')).toBe('oopsies');
        expect(profanityCleanser.clean('damn')).toBe('wowsers');
        expect(profanityCleanser.clean('dick')).toBe('tax return');
        expect(profanityCleanser.clean('cock')).toBe('tax return');
        expect(profanityCleanser.clean('wang')).toBe('tax return');
        expect(profanityCleanser.clean('dong')).toBe('tax return');
        expect(profanityCleanser.clean('tits')).toBe('tax returns');
        expect(profanityCleanser.clean('tit')).toBe('tax return');
        expect(profanityCleanser.clean('boob')).toBe('tax return');
        expect(profanityCleanser.clean('faggot')).toBe('European turtle dove');
        expect(profanityCleanser.clean('fag')).toBe('European turtle dove');
        expect(profanityCleanser.clean('nigger')).toBe('European turtle dove');
    }));

    it('Test substring option', inject(function (profanityCleanser) {
        // this entry does match on substrings
        expect(profanityCleanser.clean('111fucking111')).toBe('111pancaking111');
        // this one doesn't
        expect(profanityCleanser.clean('assembly')).toBe('assembly');
    }));

    it('Test more complex scenarios', inject(function (profanityCleanser) {

        var variations =
            [
                'shit',
                'sHiT',
                'ShIt',
                'S_H_I_T',
                'S   H    I T',
                's.h.i.t',
                's8h3i8t',
                's-h-i-t',
                's*h*i*t',
                's`1234567890-=h~!@#$%^&*()_+i[]\\;\',./{}|:"<>?t',
                's\nh\ni\nt',
                's\th\ti\tt'
            ];

        for (var i = 0; i < variations.length; i++) {
            expect(profanityCleanser.clean(variations[i])).toBe('sheer beauty');
        }
    }));

    it('Ensure null and empty inputs are handled properly', inject(function (profanityCleanser) {
        expect(profanityCleanser.clean()).toBe(undefined);
        expect(profanityCleanser.clean(null)).toBe(null);
        expect(profanityCleanser.clean('')).toBe('');
        expect(profanityCleanser.clean(' ')).toBe(' ');
    }));

    it('Run the Declaration of Independence through it, just for kicks', inject(function (profanityCleanser) {
        var declarationOfIndependence = 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature\'s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation. We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.--Such has been the patient sufferance of these Colonies; and such is now the necessity which constrains them to alter their former Systems of Government. The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world. He has refused his Assent to Laws, the most wholesome and necessary for the public good. He has forbidden his Governors to pass Laws of immediate and pressing importance, unless suspended in their operation till his Assent should be obtained; and when so suspended, he has utterly neglected to attend to them. He has refused to pass other Laws for the accommodation of large districts of people, unless those people would relinquish the right of Representation in the Legislature, a right inestimable to them and formidable to tyrants only. He has called together legislative bodies at places unusual, uncomfortable, and distant from the depository of their public Records, for the sole purpose of fatiguing them into compliance with his measures. He has dissolved Representative Houses repeatedly, for opposing with manly firmness his invasions on the rights of the people. He has refused for a long time, after such dissolutions, to cause others to be elected; whereby the Legislative powers, incapable of Annihilation, have returned to the People at large for their exercise; the State remaining in the mean time exposed to all the dangers of invasion from without, and convulsions within. He has endeavoured to prevent the population of these States; for that purpose obstructing the Laws for Naturalization of Foreigners; refusing to pass others to encourage their migrations hither, and raising the conditions of new Appropriations of Lands. He has obstructed the Administration of Justice, by refusing his Assent to Laws for establishing Judiciary powers. He has made Judges dependent on his Will alone, for the tenure of their offices, and the amount and payment of their salaries. He has erected a multitude of New Offices, and sent hither swarms of Officers to harrass our people, and eat out their substance. He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures. He has affected to render the Military independent of and superior to the Civil power. He has combined with others to subject us to a jurisdiction foreign to our constitution, and unacknowledged by our laws; giving his Assent to their Acts of pretended Legislation: For Quartering large bodies of armed troops among us: For protecting them, by a mock Trial, from punishment for any Murders which they should commit on the Inhabitants of these States: For cutting off our Trade with all parts of the world: For imposing Taxes on us without our Consent: For depriving us in many cases, of the benefits of Trial by Jury: For transporting us beyond Seas to be tried for pretended offences For abolishing the free System of English Laws in a neighbouring Province, establishing therein an Arbitrary government, and enlarging its Boundaries so as to render it at once an example and fit instrument for introducing the same absolute rule into these Colonies: For taking away our Charters, abolishing our most valuable Laws, and altering fundamentally the Forms of our Governments: For suspending our own Legislatures, and declaring themselves invested with power to legislate for us in all cases whatsoever. He has abdicated Government here, by declaring us out of his Protection and waging War against us. He has plundered our seas, ravaged our Coasts, burnt our towns, and destroyed the lives of our people.  He is at this time transporting large Armies of foreign Mercenaries to compleat the works of death, desolation and tyranny, already begun with circumstances of Cruelty & perfidy scarcely paralleled in the most barbarous ages, and totally unworthy the Head of a civilized nation. He has constrained our fellow Citizens taken Captive on the high Seas to bear Arms against their Country, to become the executioners of their friends and Brethren, or to fall themselves by their Hands. He has excited domestic insurrections amongst us, and has endeavoured to bring on the inhabitants of our frontiers, the merciless Indian Savages, whose known rule of warfare, is an undistinguished destruction of all ages, sexes and conditions. In every stage of these Oppressions We have Petitioned for Redress in the most humble terms: Our repeated Petitions have been answered only by repeated injury. A Prince whose character is thus marked by every act which may define a Tyrant, is unfit to be the ruler of a free people. Nor have We been wanting in attentions to our Brittish brethren. We have warned them from time to time of attempts by their legislature to extend an unwarrantable jurisdiction over us. We have reminded them of the circumstances of our emigration and settlement here. We have appealed to their native justice and magnanimity, and we have conjured them by the ties of our common kindred to disavow these usurpations, which, would inevitably interrupt our connections and correspondence. They too have been deaf to the voice of justice and of consanguinity. We must, therefore, acquiesce in the necessity, which denounces our Separation, and hold them, as we hold the rest of mankind, Enemies in War, in Peace Friends. We, therefore, the Representatives of the united States of America, in General Congress, Assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the Name, and by Authority of the good People of these Colonies, solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States; that they are Absolved from all Allegiance to the British Crown, and that all political connection between them and the State of Great Britain, is and ought to be totally dissolved; and that as Free and Independent States, they have full Power to levy War, conclude Peace, contract Alliances, establish Commerce, and to do all other Acts and Things which Independent States may of right do. And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor.';
        expect(profanityCleanser.clean(declarationOfIndependence)).toBe(declarationOfIndependence);
    }));
});