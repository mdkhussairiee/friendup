/*©agpl*************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
* Copyright (c) Friend Software Labs AS. All rights reserved.                  *
*                                                                              *
* Licensed under the Source EULA. Please refer to the copy of the GNU Affero   *
* General Public License, found in the file license_agpl.txt.                  *
*                                                                              *
*****************************************************************************©*/

class FUIChatlog extends FUIElement
{
    constructor( options )
    {
        super( options );
        // Do stuff
        
        this.messageList = {};
        this.messageListOrder = [];
        this.lastId = 0;
        
        this.emojis = {
            'Smilies': '😀😃😄😁😆😅😂🤣🥲🥹☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😮‍💨😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🫣🤗🫡🤔🫢🤭🤫🤥😶😶‍🌫️😐😑😬🫨🫠🙄😯😦😧😮😲🥱😴🤤😪😵😵‍💫🫥🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾',
            'Gestures and bodyparts': '👋🤚🖐✋🖖👌🤌🤏✌️🤞🫰🤟🤘🤙🫵🫱🫲🫸🫷🫳🫴👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🫶🙌👐🤲🤝🙏✍️💅🤳💪🦾🦵🦿🦶👣👂🦻👃🫀🫁🧠🦷🦴👀👁👅👄🫦💋🩸',
            'People and fantasy': '👶👧🧒👦👩🧑👨👩‍🦱🧑‍🦱👨‍🦱👩‍🦰🧑‍🦰👨‍🦰👱‍♀️👱👱‍♂️👩‍🦳🧑‍🦳👨‍🦳👩‍🦲🧑‍🦲👨‍🦲🧔‍♀️🧔🧔‍♂️👵🧓👴👲👳‍♀️👳👳‍♂️🧕👮‍♀️👮👮‍♂️👷‍♀️👷👷‍♂️💂‍♀️💂💂‍♂️🕵️‍♀️🕵️🕵️‍♂️👩‍⚕️🧑‍⚕️👨‍⚕️👩‍🌾🧑‍🌾👨‍🌾👩‍🍳🧑‍🍳👨‍🍳👩‍🎓🧑‍🎓👨‍🎓👩‍🎤🧑‍🎤👨‍🎤👩‍🏫🧑‍🏫👨‍🏫👩‍🏭🧑‍🏭👨‍🏭👩‍💻🧑‍💻👨‍💻👩‍💼🧑‍💼👨‍💼👩‍🔧🧑‍🔧👨‍🔧👩‍🔬🧑‍🔬👨‍🔬👩‍🎨🧑‍🎨👨‍🎨👩‍🚒🧑‍🚒👨‍🚒👩‍✈️🧑‍✈️👨‍✈️👩‍🚀🧑‍🚀👨‍🚀👩‍⚖️🧑‍⚖️👨‍⚖️👰‍♀️👰👰‍♂️🤵‍♀️🤵🤵‍♂️👸🫅🤴🥷🦸‍♀️🦸🦸‍♂️🦹‍♀️🦹🦹‍♂️🤶🧑‍🎄🎅🧙‍♀️🧙🧙‍♂️🧝‍♀️🧝🧝‍♂️🧛‍♀️🧛🧛‍♂️🧟‍♀️🧟🧟‍♂️🧞‍♀️🧞🧞‍♂️🧜‍♀️🧜🧜‍♂️🧚‍♀️🧚🧚‍♂️🧌👼🤰🫄🫃🤱👩‍🍼🧑‍🍼👨‍🍼🙇‍♀️🙇🙇‍♂️💁‍♀️💁💁‍♂️🙅‍♀️🙅🙅‍♂️🙆‍♀️🙆🙆‍♂️🙋‍♀️🙋🙋‍♂️🧏‍♀️🧏🧏‍♂️🤦‍♀️🤦🤦‍♂️🤷‍♀️🤷🤷‍♂️🙎‍♀️🙎🙎‍♂️🙍‍♀️🙍🙍‍♂️💇‍♀️💇💇‍♂️💆‍♀️💆💆‍♂️🧖‍♀️🧖🧖‍♂️💅🤳💃🕺👯‍♀️👯👯‍♂️🕴👩‍🦽🧑‍🦽👨‍🦽👩‍🦼🧑‍🦼👨‍🦼🚶‍♀️🚶🚶‍♂️👩‍🦯🧑‍🦯👨‍🦯🧎‍♀️🧎🧎‍♂️🏃‍♀️🏃🏃‍♂️🧍‍♀️🧍🧍‍♂️👭🧑‍🤝‍🧑👬👫👩‍❤️‍👩💑👨‍❤️‍👨👩‍❤️‍👨👩‍❤️‍💋‍👩💏👨‍❤️‍💋‍👨👩‍❤️‍💋‍👨👪👨‍👩‍👦👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👦👨‍👦‍👦👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧🗣👤👥🫂',
            'Clothing and accessories': '🧳🌂☂️🧵🪡🪢🪭🧶👓🕶🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩴🩱🩲🩳👙👚👛👜👝🎒👞👟🥾🥿👠👡🩰👢👑👒🎩🎓🧢⛑🪖💄💍💼',
            'Pale emojis': '👋🏻🤚🏻🖐🏻✋🏻🖖🏻👌🏻🤌🏻🤏🏻✌🏻🤞🏻🫰🏻🤟🏻🤘🏻🤙🏻🫵🏻🫱🏻🫲🏻🫸🏻🫷🏻🫳🏻🫴🏻👈🏻👉🏻👆🏻🖕🏻👇🏻☝🏻👍🏻👎🏻✊🏻👊🏻🤛🏻🤜🏻👏🏻🫶🏻🙌🏻👐🏻🤲🏻🙏🏻✍🏻💅🏻🤳🏻💪🏻🦵🏻🦶🏻👂🏻🦻🏻👃🏻👶🏻👧🏻🧒🏻👦🏻👩🏻🧑🏻👨🏻👩🏻‍🦱🧑🏻‍🦱👨🏻‍🦱👩🏻‍🦰🧑🏻‍🦰👨🏻‍🦰👱🏻‍♀️👱🏻👱🏻‍♂️👩🏻‍🦳🧑🏻‍🦳👨🏻‍🦳👩🏻‍🦲🧑🏻‍🦲👨🏻‍🦲🧔🏻‍♀️🧔🏻🧔🏻‍♂️👵🏻🧓🏻👴🏻👲🏻👳🏻‍♀️👳🏻👳🏻‍♂️🧕🏻👮🏻‍♀️👮🏻👮🏻‍♂️👷🏻‍♀️👷🏻👷🏻‍♂️💂🏻‍♀️💂🏻💂🏻‍♂️🕵🏻‍♀️🕵🏻🕵🏻‍♂️👩🏻‍⚕️🧑🏻‍⚕️👨🏻‍⚕️👩🏻‍🌾🧑🏻‍🌾👨🏻‍🌾👩🏻‍🍳🧑🏻‍🍳👨🏻‍🍳👩🏻‍🎓🧑🏻‍🎓👨🏻‍🎓👩🏻‍🎤🧑🏻‍🎤👨🏻‍🎤👩🏻‍🏫🧑🏻‍🏫👨🏻‍🏫👩🏻‍🏭🧑🏻‍🏭👨🏻‍🏭👩🏻‍💻🧑🏻‍💻👨🏻‍💻👩🏻‍💼🧑🏻‍💼👨🏻‍💼👩🏻‍🔧🧑🏻‍🔧👨🏻‍🔧👩🏻‍🔬🧑🏻‍🔬👨🏻‍🔬👩🏻‍🎨🧑🏻‍🎨👨🏻‍🎨👩🏻‍🚒🧑🏻‍🚒👨🏻‍🚒👩🏻‍✈️🧑🏻‍✈️👨🏻‍✈️👩🏻‍🚀🧑🏻‍🚀👨🏻‍🚀👩🏻‍⚖️🧑🏻‍⚖️👨🏻‍⚖️👰🏻‍♀️👰🏻👰🏻‍♂️🤵🏻‍♀️🤵🏻🤵🏻‍♂️👸🏻🫅🏻🤴🏻🥷🏻🦸🏻‍♀️🦸🏻🦸🏻‍♂️🦹🏻‍♀️🦹🏻🦹🏻‍♂️🤶🏻🧑🏻‍🎄🎅🏻🧙🏻‍♀️🧙🏻🧙🏻‍♂️🧝🏻‍♀️🧝🏻🧝🏻‍♂️🧛🏻‍♀️🧛🏻🧛🏻‍♂️🧜🏻‍♀️🧜🏻🧜🏻‍♂️🧚🏻‍♀️🧚🏻🧚🏻‍♂️👼🏻🤰🏻🫄🏻🫃🏻🤱🏻👩🏻‍🍼🧑🏻‍🍼👨🏻‍🍼🙇🏻‍♀️🙇🏻🙇🏻‍♂️💁🏻‍♀️💁🏻💁🏻‍♂️🙅🏻‍♀️🙅🏻🙅🏻‍♂️🙆🏻‍♀️🙆🏻🙆🏻‍♂️🙋🏻‍♀️🙋🏻🙋🏻‍♂️🧏🏻‍♀️🧏🏻🧏🏻‍♂️🤦🏻‍♀️🤦🏻🤦🏻‍♂️🤷🏻‍♀️🤷🏻🤷🏻‍♂️🙎🏻‍♀️🙎🏻🙎🏻‍♂️🙍🏻‍♀️🙍🏻🙍🏻‍♂️💇🏻‍♀️💇🏻💇🏻‍♂️💆🏻‍♀️💆🏻💆🏻‍♂️🧖🏻‍♀️🧖🏻🧖🏻‍♂️💃🏻🕺🏻🕴🏻👩🏻‍🦽🧑🏻‍🦽👨🏻‍🦽👩🏻‍🦼🧑🏻‍🦼👨🏻‍🦼🚶🏻‍♀️🚶🏻🚶🏻‍♂️👩🏻‍🦯🧑🏻‍🦯👨🏻‍🦯🧎🏻‍♀️🧎🏻🧎🏻‍♂️🏃🏻‍♀️🏃🏻🏃🏻‍♂️🧍🏻‍♀️🧍🏻🧍🏻‍♂️👭🏻🧑🏻‍🤝‍🧑🏻👬🏻👫🏻🧗🏻‍♀️🧗🏻🧗🏻‍♂️🏇🏻🏂🏻🏌🏻‍♀️🏌🏻🏌🏻‍♂️🏄🏻‍♀️🏄🏻🏄🏻‍♂️🚣🏻‍♀️🚣🏻🚣🏻‍♂️🏊🏻‍♀️🏊🏻🏊🏻‍♂️⛹🏻‍♀️⛹🏻⛹🏻‍♂️🏋🏻‍♀️🏋🏻🏋🏻‍♂️🚴🏻‍♀️🚴🏻🚴🏻‍♂️🚵🏻‍♀️🚵🏻🚵🏻‍♂️🤸🏻‍♀️🤸🏻🤸🏻‍♂️🤽🏻‍♀️🤽🏻🤽🏻‍♂️🤾🏻‍♀️🤾🏻🤾🏻‍♂️🤹🏻‍♀️🤹🏻🤹🏻‍♂️🧘🏻‍♀️🧘🏻🧘🏻‍♂️🛀🏻🛌🏻',
            'Cream white emojis': '👋🏼🤚🏼🖐🏼✋🏼🖖🏼👌🏼🤌🏼🤏🏼✌🏼🤞🏼🫰🏼🤟🏼🤘🏼🤙🏼🫵🏼🫱🏼🫲🏼🫸🏼🫷🏼🫳🏼🫴🏼👈🏼👉🏼👆🏼🖕🏼👇🏼☝🏼👍🏼👎🏼✊🏼👊🏼🤛🏼🤜🏼👏🏼🫶🏼🙌🏼👐🏼🤲🏼🙏🏼✍🏼💅🏼🤳🏼💪🏼🦵🏼🦶🏼👂🏼🦻🏼👃🏼👶🏼👧🏼🧒🏼👦🏼👩🏼🧑🏼👨🏼👩🏼‍🦱🧑🏼‍🦱👨🏼‍🦱👩🏼‍🦰🧑🏼‍🦰👨🏼‍🦰👱🏼‍♀️👱🏼👱🏼‍♂️👩🏼‍🦳🧑🏼‍🦳👨🏼‍🦳👩🏼‍🦲🧑🏼‍🦲👨🏼‍🦲🧔🏼‍♀️🧔🏼🧔🏼‍♂️👵🏼🧓🏼👴🏼👲🏼👳🏼‍♀️👳🏼👳🏼‍♂️🧕🏼👮🏼‍♀️👮🏼👮🏼‍♂️👷🏼‍♀️👷🏼👷🏼‍♂️💂🏼‍♀️💂🏼💂🏼‍♂️🕵🏼‍♀️🕵🏼🕵🏼‍♂️👩🏼‍⚕️🧑🏼‍⚕️👨🏼‍⚕️👩🏼‍🌾🧑🏼‍🌾👨🏼‍🌾👩🏼‍🍳🧑🏼‍🍳👨🏼‍🍳👩🏼‍🎓🧑🏼‍🎓👨🏼‍🎓👩🏼‍🎤🧑🏼‍🎤👨🏼‍🎤👩🏼‍🏫🧑🏼‍🏫👨🏼‍🏫👩🏼‍🏭🧑🏼‍🏭👨🏼‍🏭👩🏼‍💻🧑🏼‍💻👨🏼‍💻👩🏼‍💼🧑🏼‍💼👨🏼‍💼👩🏼‍🔧🧑🏼‍🔧👨🏼‍🔧👩🏼‍🔬🧑🏼‍🔬👨🏼‍🔬👩🏼‍🎨🧑🏼‍🎨👨🏼‍🎨👩🏼‍🚒🧑🏼‍🚒👨🏼‍🚒👩🏼‍✈️🧑🏼‍✈️👨🏼‍✈️👩🏼‍🚀🧑🏼‍🚀👨🏼‍🚀👩🏼‍⚖️🧑🏼‍⚖️👨🏼‍⚖️👰🏼‍♀️👰🏼👰🏼‍♂️🤵🏼‍♀️🤵🏼🤵🏼‍♂️👸🏼🫅🏼🤴🏼🥷🏼🦸🏼‍♀️🦸🏼🦸🏼‍♂️🦹🏼‍♀️🦹🏼🦹🏼‍♂️🤶🏼🧑🏼‍🎄🎅🏼🧙🏼‍♀️🧙🏼🧙🏼‍♂️🧝🏼‍♀️🧝🏼🧝🏼‍♂️🧛🏼‍♀️🧛🏼🧛🏼‍♂️🧜🏼‍♀️🧜🏼🧜🏼‍♂️🧚🏼‍♀️🧚🏼🧚🏼‍♂️👼🏼🤰🏼🫄🏼🫃🏼🤱🏼👩🏼‍🍼🧑🏼‍🍼👨🏼‍🍼🙇🏼‍♀️🙇🏼🙇🏼‍♂️💁🏼‍♀️💁🏼💁🏼‍♂️🙅🏼‍♀️🙅🏼🙅🏼‍♂️🙆🏼‍♀️🙆🏼🙆🏼‍♂️🙋🏼‍♀️🙋🏼🙋🏼‍♂️🧏🏼‍♀️🧏🏼🧏🏼‍♂️🤦🏼‍♀️🤦🏼🤦🏼‍♂️🤷🏼‍♀️🤷🏼🤷🏼‍♂️🙎🏼‍♀️🙎🏼🙎🏼‍♂️🙍🏼‍♀️🙍🏼🙍🏼‍♂️💇🏼‍♀️💇🏼💇🏼‍♂️💆🏼‍♀️💆🏼💆🏼‍♂️🧖🏼‍♀️🧖🏼🧖🏼‍♂️💃🏼🕺🏼🕴🏼👩🏼‍🦽🧑🏼‍🦽👨🏼‍🦽👩🏼‍🦼🧑🏼‍🦼👨🏼‍🦼🚶🏼‍♀️🚶🏼🚶🏼‍♂️👩🏼‍🦯🧑🏼‍🦯👨🏼‍🦯🧎🏼‍♀️🧎🏼🧎🏼‍♂️🏃🏼‍♀️🏃🏼🏃🏼‍♂️🧍🏼‍♀️🧍🏼🧍🏼‍♂️👭🏼🧑🏼‍🤝‍🧑🏼👬🏼👫🏼🧗🏼‍♀️🧗🏼🧗🏼‍♂️🏇🏼🏂🏼🏌🏼‍♀️🏌🏼🏌🏼‍♂️🏄🏼‍♀️🏄🏼🏄🏼‍♂️🚣🏼‍♀️🚣🏼🚣🏼‍♂️🏊🏼‍♀️🏊🏼🏊🏼‍♂️⛹🏼‍♀️⛹🏼⛹🏼‍♂️🏋🏼‍♀️🏋🏼🏋🏼‍♂️🚴🏼‍♀️🚴🏼🚴🏼‍♂️🚵🏼‍♀️🚵🏼🚵🏼‍♂️🤸🏼‍♀️🤸🏼🤸🏼‍♂️🤽🏼‍♀️🤽🏼🤽🏼‍♂️🤾🏼‍♀️🤾🏼🤾🏼‍♂️🤹🏼‍♀️🤹🏼🤹🏼‍♂️🧘🏼‍♀️🧘🏼🧘🏼‍♂️🛀🏼🛌🏼',
            'Brown emojis': '👋🏽🤚🏽🖐🏽✋🏽🖖🏽👌🏽🤌🏽🤏🏽✌🏽🤞🏽🫰🏽🤟🏽🤘🏽🤙🏽🫵🏽🫱🏽🫲🏽🫸🏽🫷🏽🫳🏽🫴🏽👈🏽👉🏽👆🏽🖕🏽👇🏽☝🏽👍🏽👎🏽✊🏽👊🏽🤛🏽🤜🏽👏🏽🫶🏽🙌🏽👐🏽🤲🏽🙏🏽✍🏽💅🏽🤳🏽💪🏽🦵🏽🦶🏽👂🏽🦻🏽👃🏽👶🏽👧🏽🧒🏽👦🏽👩🏽🧑🏽👨🏽👩🏽‍🦱🧑🏽‍🦱👨🏽‍🦱👩🏽‍🦰🧑🏽‍🦰👨🏽‍🦰👱🏽‍♀️👱🏽👱🏽‍♂️👩🏽‍🦳🧑🏽‍🦳👨🏽‍🦳👩🏽‍🦲🧑🏽‍🦲👨🏽‍🦲🧔🏽‍♀️🧔🏽🧔🏽‍♂️👵🏽🧓🏽👴🏽👲🏽👳🏽‍♀️👳🏽👳🏽‍♂️🧕🏽👮🏽‍♀️👮🏽👮🏽‍♂️👷🏽‍♀️👷🏽👷🏽‍♂️💂🏽‍♀️💂🏽💂🏽‍♂️🕵🏽‍♀️🕵🏽🕵🏽‍♂️👩🏽‍⚕️🧑🏽‍⚕️👨🏽‍⚕️👩🏽‍🌾🧑🏽‍🌾👨🏽‍🌾👩🏽‍🍳🧑🏽‍🍳👨🏽‍🍳👩🏽‍🎓🧑🏽‍🎓👨🏽‍🎓👩🏽‍🎤🧑🏽‍🎤👨🏽‍🎤👩🏽‍🏫🧑🏽‍🏫👨🏽‍🏫👩🏽‍🏭🧑🏽‍🏭👨🏽‍🏭👩🏽‍💻🧑🏽‍💻👨🏽‍💻👩🏽‍💼🧑🏽‍💼👨🏽‍💼👩🏽‍🔧🧑🏽‍🔧👨🏽‍🔧👩🏽‍🔬🧑🏽‍🔬👨🏽‍🔬👩🏽‍🎨🧑🏽‍🎨👨🏽‍🎨👩🏽‍🚒🧑🏽‍🚒👨🏽‍🚒👩🏽‍✈️🧑🏽‍✈️👨🏽‍✈️👩🏽‍🚀🧑🏽‍🚀👨🏽‍🚀👩🏽‍⚖️🧑🏽‍⚖️👨🏽‍⚖️👰🏽‍♀️👰🏽👰🏽‍♂️🤵🏽‍♀️🤵🏽🤵🏽‍♂️👸🏽🫅🏽🤴🏽🥷🏽🦸🏽‍♀️🦸🏽🦸🏽‍♂️🦹🏽‍♀️🦹🏽🦹🏽‍♂️🤶🏽🧑🏽‍🎄🎅🏽🧙🏽‍♀️🧙🏽🧙🏽‍♂️🧝🏽‍♀️🧝🏽🧝🏽‍♂️🧛🏽‍♀️🧛🏽🧛🏽‍♂️🧜🏽‍♀️🧜🏽🧜🏽‍♂️🧚🏽‍♀️🧚🏽🧚🏽‍♂️👼🏽🤰🏽🫄🏽🫃🏽🤱🏽👩🏽‍🍼🧑🏽‍🍼👨🏽‍🍼🙇🏽‍♀️🙇🏽🙇🏽‍♂️💁🏽‍♀️💁🏽💁🏽‍♂️🙅🏽‍♀️🙅🏽🙅🏽‍♂️🙆🏽‍♀️🙆🏽🙆🏽‍♂️🙋🏽‍♀️🙋🏽🙋🏽‍♂️🧏🏽‍♀️🧏🏽🧏🏽‍♂️🤦🏽‍♀️🤦🏽🤦🏽‍♂️🤷🏽‍♀️🤷🏽🤷🏽‍♂️🙎🏽‍♀️🙎🏽🙎🏽‍♂️🙍🏽‍♀️🙍🏽🙍🏽‍♂️💇🏽‍♀️💇🏽💇🏽‍♂️💆🏽‍♀️💆🏽💆🏽‍♂️🧖🏽‍♀️🧖🏽🧖🏽‍♂️💃🏽🕺🏽🕴🏽👩🏽‍🦽🧑🏽‍🦽👨🏽‍🦽👩🏽‍🦼🧑🏽‍🦼👨🏽‍🦼🚶🏽‍♀️🚶🏽🚶🏽‍♂️👩🏽‍🦯🧑🏽‍🦯👨🏽‍🦯🧎🏽‍♀️🧎🏽🧎🏽‍♂️🏃🏽‍♀️🏃🏽🏃🏽‍♂️🧍🏽‍♀️🧍🏽🧍🏽‍♂️👭🏽🧑🏽‍🤝‍🧑🏽👬🏽👫🏽🧗🏽‍♀️🧗🏽🧗🏽‍♂️🏇🏽🏂🏽🏌🏽‍♀️🏌🏽🏌🏽‍♂️🏄🏽‍♀️🏄🏽🏄🏽‍♂️🚣🏽‍♀️🚣🏽🚣🏽‍♂️🏊🏽‍♀️🏊🏽🏊🏽‍♂️⛹🏽‍♀️⛹🏽⛹🏽‍♂️🏋🏽‍♀️🏋🏽🏋🏽‍♂️🚴🏽‍♀️🚴🏽🚴🏽‍♂️🚵🏽‍♀️🚵🏽🚵🏽‍♂️🤸🏽‍♀️🤸🏽🤸🏽‍♂️🤽🏽‍♀️🤽🏽🤽🏽‍♂️🤾🏽‍♀️🤾🏽🤾🏽‍♂️🤹🏽‍♀️🤹🏽🤹🏽‍♂️🧘🏽‍♀️🧘🏽🧘🏽‍♂️🛀🏽🛌🏽',
            'Dark brown emojis': '👋🏾🤚🏾🖐🏾✋🏾🖖🏾👌🏾🤌🏾🤏🏾✌🏾🤞🏾🫰🏾🤟🏾🤘🏾🤙🏾🫵🏾🫱🏾🫲🏾🫸🏾🫷🏾🫳🏾🫴🏾👈🏾👉🏾👆🏾🖕🏾👇🏾☝🏾👍🏾👎🏾✊🏾👊🏾🤛🏾🤜🏾👏🏾🫶🏾🙌🏾👐🏾🤲🏾🙏🏾✍🏾💅🏾🤳🏾💪🏾🦵🏾🦶🏾👂🏾🦻🏾👃🏾👶🏾👧🏾🧒🏾👦🏾👩🏾🧑🏾👨🏾👩🏾‍🦱🧑🏾‍🦱👨🏾‍🦱👩🏾‍🦰🧑🏾‍🦰👨🏾‍🦰👱🏾‍♀️👱🏾👱🏾‍♂️👩🏾‍🦳🧑🏾‍🦳👨🏾‍🦳👩🏾‍🦲🧑🏾‍🦲👨🏾‍🦲🧔🏾‍♀️🧔🏾🧔🏾‍♂️👵🏾🧓🏾👴🏾👲🏾👳🏾‍♀️👳🏾👳🏾‍♂️🧕🏾👮🏾‍♀️👮🏾👮🏾‍♂️👷🏾‍♀️👷🏾👷🏾‍♂️💂🏾‍♀️💂🏾💂🏾‍♂️🕵🏾‍♀️🕵🏾🕵🏾‍♂️👩🏾‍⚕️🧑🏾‍⚕️👨🏾‍⚕️👩🏾‍🌾🧑🏾‍🌾👨🏾‍🌾👩🏾‍🍳🧑🏾‍🍳👨🏾‍🍳👩🏾‍🎓🧑🏾‍🎓👨🏾‍🎓👩🏾‍🎤🧑🏾‍🎤👨🏾‍🎤👩🏾‍🏫🧑🏾‍🏫👨🏾‍🏫👩🏾‍🏭🧑🏾‍🏭👨🏾‍🏭👩🏾‍💻🧑🏾‍💻👨🏾‍💻👩🏾‍💼🧑🏾‍💼👨🏾‍💼👩🏾‍🔧🧑🏾‍🔧👨🏾‍🔧👩🏾‍🔬🧑🏾‍🔬👨🏾‍🔬👩🏾‍🎨🧑🏾‍🎨👨🏾‍🎨👩🏾‍🚒🧑🏾‍🚒👨🏾‍🚒👩🏾‍✈️🧑🏾‍✈️👨🏾‍✈️👩🏾‍🚀🧑🏾‍🚀👨🏾‍🚀👩🏾‍⚖️🧑🏾‍⚖️👨🏾‍⚖️👰🏾‍♀️👰🏾👰🏾‍♂️🤵🏾‍♀️🤵🏾🤵🏾‍♂️👸🏾🫅🏾🤴🏾🥷🏾🦸🏾‍♀️🦸🏾🦸🏾‍♂️🦹🏾‍♀️🦹🏾🦹🏾‍♂️🤶🏾🧑🏾‍🎄🎅🏾🧙🏾‍♀️🧙🏾🧙🏾‍♂️🧝🏾‍♀️🧝🏾🧝🏾‍♂️🧛🏾‍♀️🧛🏾🧛🏾‍♂️🧜🏾‍♀️🧜🏾🧜🏾‍♂️🧚🏾‍♀️🧚🏾🧚🏾‍♂️👼🏾🤰🏾🫄🏾🫃🏾🤱🏾👩🏾‍🍼🧑🏾‍🍼👨🏾‍🍼🙇🏾‍♀️🙇🏾🙇🏾‍♂️💁🏾‍♀️💁🏾💁🏾‍♂️🙅🏾‍♀️🙅🏾🙅🏾‍♂️🙆🏾‍♀️🙆🏾🙆🏾‍♂️🙋🏾‍♀️🙋🏾🙋🏾‍♂️🧏🏾‍♀️🧏🏾🧏🏾‍♂️🤦🏾‍♀️🤦🏾🤦🏾‍♂️🤷🏾‍♀️🤷🏾🤷🏾‍♂️🙎🏾‍♀️🙎🏾🙎🏾‍♂️🙍🏾‍♀️🙍🏾🙍🏾‍♂️💇🏾‍♀️💇🏾💇🏾‍♂️💆🏾‍♀️💆🏾💆🏾‍♂️🧖🏾‍♀️🧖🏾🧖🏾‍♂️💃🏾🕺🏾🕴🏿👩🏾‍🦽🧑🏾‍🦽👨🏾‍🦽👩🏾‍🦼🧑🏾‍🦼👨🏾‍🦼🚶🏾‍♀️🚶🏾🚶🏾‍♂️👩🏾‍🦯🧑🏾‍🦯👨🏾‍🦯🧎🏾‍♀️🧎🏾🧎🏾‍♂️🏃🏾‍♀️🏃🏾🏃🏾‍♂️🧍🏾‍♀️🧍🏾🧍🏾‍♂️👭🏾🧑🏾‍🤝‍🧑🏾👬🏾👫🏾🧗🏾‍♀️🧗🏾🧗🏾‍♂️🏇🏾🏂🏾🏌🏾‍♀️🏌🏾🏌🏾‍♂️🏄🏾‍♀️🏄🏾🏄🏾‍♂️🚣🏾‍♀️🚣🏾🚣🏾‍♂️🏊🏾‍♀️🏊🏾🏊🏾‍♂️⛹🏾‍♀️⛹🏾⛹🏾‍♂️🏋🏾‍♀️🏋🏾🏋🏾‍♂️🚴🏾‍♀️🚴🏾🚴🏾‍♂️🚵🏾‍♀️🚵🏾🚵🏾‍♂️🤸🏾‍♀️🤸🏾🤸🏾‍♂️🤽🏾‍♀️🤽🏾🤽🏾‍♂️🤾🏾‍♀️🤾🏾🤾🏾‍♂️🤹🏾‍♀️🤹🏾🤹🏾‍♂️🧘🏾‍♀️🧘🏾🧘🏾‍♂️🛀🏾🛌🏾',
            'Black emojis': '👋🏿🤚🏿🖐🏿✋🏿🖖🏿👌🏿🤌🏿🤏🏿✌🏿🤞🏿🫰🏿🤟🏿🤘🏿🤙🏿🫵🏿🫱🏿🫲🏿🫸🏿🫷🏿🫳🏿🫴🏿👈🏿👉🏿👆🏿🖕🏿👇🏿☝🏿👍🏿👎🏿✊🏿👊🏿🤛🏿🤜🏿👏🏿🫶🏿🙌🏿👐🏿🤲🏿🙏🏿✍🏿💅🏿🤳🏿💪🏿🦵🏿🦶🏿👂🏿🦻🏿👃🏿👶🏿👧🏿🧒🏿👦🏿👩🏿🧑🏿👨🏿👩🏿‍🦱🧑🏿‍🦱👨🏿‍🦱👩🏿‍🦰🧑🏿‍🦰👨🏿‍🦰👱🏿‍♀️👱🏿👱🏿‍♂️👩🏿‍🦳🧑🏿‍🦳👨🏿‍🦳👩🏿‍🦲🧑🏿‍🦲👨🏿‍🦲🧔🏿‍♀️🧔🏿🧔🏿‍♂️👵🏿🧓🏿👴🏿👲🏿👳🏿‍♀️👳🏿👳🏿‍♂️🧕🏿👮🏿‍♀️👮🏿👮🏿‍♂️👷🏿‍♀️👷🏿👷🏿‍♂️💂🏿‍♀️💂🏿💂🏿‍♂️🕵🏿‍♀️🕵🏿🕵🏿‍♂️👩🏿‍⚕️🧑🏿‍⚕️👨🏿‍⚕️👩🏿‍🌾🧑🏿‍🌾👨🏿‍🌾👩🏿‍🍳🧑🏿‍🍳👨🏿‍🍳👩🏿‍🎓🧑🏿‍🎓👨🏿‍🎓👩🏿‍🎤🧑🏿‍🎤👨🏿‍🎤👩🏿‍🏫🧑🏿‍🏫👨🏿‍🏫👩🏿‍🏭🧑🏿‍🏭👨🏿‍🏭👩🏿‍💻🧑🏿‍💻👨🏿‍💻👩🏿‍💼🧑🏿‍💼👨🏿‍💼👩🏿‍🔧🧑🏿‍🔧👨🏿‍🔧👩🏿‍🔬🧑🏿‍🔬👨🏿‍🔬👩🏿‍🎨🧑🏿‍🎨👨🏿‍🎨👩🏿‍🚒🧑🏿‍🚒👨🏿‍🚒👩🏿‍✈️🧑🏿‍✈️👨🏿‍✈️👩🏿‍🚀🧑🏿‍🚀👨🏿‍🚀👩🏿‍⚖️🧑🏿‍⚖️👨🏿‍⚖️👰🏿‍♀️👰🏿👰🏿‍♂️🤵🏿‍♀️🤵🏿🤵🏿‍♂️👸🏿🫅🏿🤴🏿🥷🏿🦸🏿‍♀️🦸🏿🦸🏿‍♂️🦹🏿‍♀️🦹🏿🦹🏿‍♂️🤶🏿🧑🏿‍🎄🎅🏿🧙🏿‍♀️🧙🏿🧙🏿‍♂️🧝🏿‍♀️🧝🏿🧝🏿‍♂️🧛🏿‍♀️🧛🏿🧛🏿‍♂️🧜🏿‍♀️🧜🏿🧜🏿‍♂️🧚🏿‍♀️🧚🏿🧚🏿‍♂️👼🏿🤰🏿🫄🏿🫃🏿🤱🏿👩🏿‍🍼🧑🏿‍🍼👨🏿‍🍼🙇🏿‍♀️🙇🏿🙇🏿‍♂️💁🏿‍♀️💁🏿💁🏿‍♂️🙅🏿‍♀️🙅🏿🙅🏿‍♂️🙆🏿‍♀️🙆🏿🙆🏿‍♂️🙋🏿‍♀️🙋🏿🙋🏿‍♂️🧏🏿‍♀️🧏🏿🧏🏿‍♂️🤦🏿‍♀️🤦🏿🤦🏿‍♂️🤷🏿‍♀️🤷🏿🤷🏿‍♂️🙎🏿‍♀️🙎🏿🙎🏿‍♂️🙍🏿‍♀️🙍🏿🙍🏿‍♂️💇🏿‍♀️💇🏿💇🏿‍♂️💆🏿‍♀️💆🏿💆🏿‍♂️🧖🏿‍♀️🧖🏿🧖🏿‍♂️💃🏿🕺🏿🕴🏿👩🏿‍🦽🧑🏿‍🦽👨🏿‍🦽👩🏿‍🦼🧑🏿‍🦼👨🏿‍🦼🚶🏿‍♀️🚶🏿🚶🏿‍♂️👩🏿‍🦯🧑🏿‍🦯👨🏿‍🦯🧎🏿‍♀️🧎🏿🧎🏿‍♂️🏃🏿‍♀️🏃🏿🏃🏿‍♂️🧍🏿‍♀️🧍🏿🧍🏿‍♂️👭🏿🧑🏿‍🤝‍🧑🏿👬🏿👫🏿🧗🏿‍♀️🧗🏿🧗🏿‍♂️🏇🏿🏂🏿🏌🏿‍♀️🏌🏿🏌🏿‍♂️🏄🏿‍♀️🏄🏿🏄🏿‍♂️🚣🏿‍♀️🚣🏿🚣🏿‍♂️🏊🏿‍♀️🏊🏿🏊🏿‍♂️⛹🏿‍♀️⛹🏿⛹🏿‍♂️🏋🏿‍♀️🏋🏿🏋🏿‍♂️🚴🏿‍♀️🚴🏿🚴🏿‍♂️🚵🏿‍♀️🚵🏿🚵🏿‍♂️🤸🏿‍♀️🤸🏿🤸🏿‍♂️🤽🏿‍♀️🤽🏿🤽🏿‍♂️🤾🏿‍♀️🤾🏿🤾🏿‍♂️🤹🏿‍♀️🤹🏿🤹🏿‍♂️🧘🏿‍♀️🧘🏿🧘🏿‍♂️🛀🏿🛌🏿',
            'Animals and nature': '🐶🐱🐭🐹🐰🦊🐻🐼🐻‍❄️🐨🐯🦁🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦🐦‍⬛🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🪱🐛🦋🐌🐞🐜🪰🪲🪳🦟🦗🕷🕸🦂🐢🐍🦎🦖🦕🐙🦑🦐🦞🦀🪼🪸🐡🐠🐟🐬🐳🐋🦈🐊🐅🐆🦓🫏🦍🦧🦣🐘🦛🦏🐪🐫🦒🦘🦬🐃🐂🐄🐎🐖🐏🐑🦙🐐🦌🫎🐕🐩🦮🐕‍🦺🐈🐈‍⬛🪽🪶🐓🦃🦤🦚🦜🦢🪿🦩🕊🐇🦝🦨🦡🦫🦦🦥🐁🐀🐿🦔🐾🐉🐲🌵🎄🌲🌳🌴🪹🪺🪵🌱🌿☘️🍀🎍🪴🎋🍃🍂🍁🍄🐚🪨🌾💐🌷🪷🌹🥀🌺🌸🪻🌼🌻🌞🌝🌛🌜🌚🌕🌖🌗🌘🌑🌒🌓🌔🌙🌎🌍🌏🪐💫⭐️🌟✨⚡️☄️💥🔥🌪🌈☀️🌤⛅️🌥☁️🌦🌧⛈🌩🌨❄️☃️⛄️🌬💨💧💦🫧☔️☂️🌊🌫',
            'Food and drink': '🍏🍎🍐🍊🍋🍌🍉🍇🍓🫐🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🫛🥬🥒🌶🫑🌽🥕🫒🧄🧅🫚🥔🍠🫘🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🦴🌭🍔🍟🍕🫓🥪🥙🧆🌮🌯🫔🥗🥘🫕🥫🍝🍜🍲🍛🍣🍱🥟🦪🍤🍙🍚🍘🍥🥠🥮🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼🫖☕️🍵🧃🥤🧋🫙🍶🍺🍻🥂🍷🫗🥃🍸🍹🧉🍾🧊🥄🍴🍽🥣🥡🥢🧂',
            'Activity and sports': '⚽️🏀🏈⚾️🥎🎾🏐🏉🥏🎱🪀🏓🏸🏒🏑🥍🏏🪃🥅⛳️🪁🏹🎣🤿🥊🥋🎽🛹🛼🛷⛸🥌🎿⛷🏂🪂🏋️‍♀️🏋️🏋️‍♂️🤼‍♀️🤼🤼‍♂️🤸‍♀️🤸🤸‍♂️⛹️‍♀️⛹️⛹️‍♂️🤺🤾‍♀️🤾🤾‍♂️🏌️‍♀️🏌️🏌️‍♂️🏇🧘‍♀️🧘🧘‍♂️🏄‍♀️🏄🏄‍♂️🏊‍♀️🏊🏊‍♂️🤽‍♀️🤽🤽‍♂️🚣‍♀️🚣🚣‍♂️🧗‍♀️🧗🧗‍♂️🚵‍♀️🚵🚵‍♂️🚴‍♀️🚴🚴‍♂️🏆🥇🥈🥉🏅🎖🏵🎗🎫🎟🎪🤹🤹‍♂️🤹‍♀️🎭🩰🎨🎬🎤🎧🎼🎹🥁🪘🪇🎷🎺🪗🎸🪕🎻🪈🎲♟🎯🎳🎮🎰🧩',
            'Travel and places': '🚗🚕🚙🚌🚎🏎🚓🚑🚒🚐🛻🚚🚛🚜🦯🦽🦼🛴🚲🛵🏍🛺🚨🚔🚍🚘🚖🛞🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉✈️🛫🛬🛩💺🛰🚀🛸🚁🛶⛵️🚤🛥🛳⛴🚢⚓️🛟🪝⛽️🚧🚦🚥🚏🗺🗿🗽🗼🏰🏯🏟🎡🎢🛝🎠⛲️⛱🏖🏝🏜🌋⛰🏔🗻🏕⛺️🛖🏠🏡🏘🏚🏗🏭🏢🏬🏣🏤🏥🏦🏨🏪🏫🏩💒🏛⛪️🕌🕍🛕🕋⛩🛤🛣🗾🎑🏞🌅🌄🌠🎇🎆🌇🌆🏙🌃🌌🌉🌁',
            'Objects': '⌚️📱📲💻⌨️🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞☎️📟📠📺📻🎙🎚🎛🧭⏱⏲⏰🕰⌛️⏳📡🔋🪫🔌💡🔦🕯🪔🧯🛢🛍️💸💵💴💶💷🪙💰💳💎⚖️🪮🪜🧰🪛🔧🔨⚒🛠⛏🪚🔩⚙️🪤🧱⛓🧲🔫💣🧨🪓🔪🗡⚔️🛡🚬⚰️🪦⚱️🏺🔮📿🧿🪬💈⚗️🔭🔬🕳🩹🩺🩻🩼💊💉🩸🧬🦠🧫🧪🌡🧹🪠🧺🧻🚽🚰🚿🛁🛀🧼🪥🪒🧽🪣🧴🛎🔑🗝🚪🪑🛋🛏🛌🧸🪆🖼🪞🪟🛍🛒🎁🎈🎏🎀🪄🪅🎊🎉🪩🎎🏮🎐🧧✉️📩📨📧💌📥📤📦🏷🪧📪📫📬📭📮📯📜📃📄📑🧾📊📈📉🗒🗓📆📅🗑🪪📇🗃🗳🗄📋📁📂🗂🗞📰📓📔📒📕📗📘📙📚📖🔖🧷🔗📎🖇📐📏🧮📌📍✂️🖊🖋✒️🖌🖍📝✏️🔍🔎🔏🔐🔒🔓',
            'Symbols': '❤️🩷🧡💛💚💙🩵💜🖤🩶🤍🤎❤️‍🔥❤️‍🩹💔❣️💕💞💓💗💖💘💝💟☮️✝️☪️🪯🕉☸️✡️🔯🕎☯️☦️🛐⛎♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️🆔⚛️🉑☢️☣️📴📳🈶🈚️🈸🈺🈷️✴️🆚💮🉐㊙️㊗️🈴🈵🈹🈲🅰️🅱️🆎🆑🅾️🆘❌⭕️🛑⛔️📛🚫💯💢♨️🚷🚯🚳🚱🔞📵🚭❗️❕❓❔‼️⁉️🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯️💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿️🅿️🛗🈳🈂️🛂🛃🛄🛅🚹🚺🚼⚧🚻🚮🎦🛜📶🈁🔣ℹ️🔤🔡🔠🆖🆗🆙🆒🆕🆓0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟🔢#️⃣*️⃣⏏️▶️⏸⏯⏹⏺⏭⏮⏩⏪⏫⏬◀️🔼🔽➡️⬅️⬆️⬇️↗️↘️↙️↖️↕️↔️↪️↩️⤴️⤵️🔀🔁🔂🔄🔃🎵🎶➕➖➗✖️🟰♾💲💱™️©️®️〰️➰➿🔚🔙🔛🔝🔜✔️☑️🔘🔴🟠🟡🟢🔵🟣⚫️⚪️🟤🔺🔻🔸🔹🔶🔷🔳🔲▪️▫️◾️◽️◼️◻️🟥🟧🟨🟩🟦🟪⬛️⬜️🟫🔈🔇🔉🔊🔔🔕📣📢👁‍🗨💬💭🗯♠️♣️♥️♦️🃏🎴🀄️🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧',
            'Non-emoji symbols': '✢✣✤✥✦✧★☆✯✡︎✩✪✫✬✭✮✶✷✵✸✹→⇒⟹⇨⇾➾⇢☛☞➔➜➙➛➝➞♠︎♣︎♥︎♦︎♤♧♡♢♚♛♜♝♞♟♔♕♖♗♘♙⚀⚁⚂⚃⚄⚅🂠⚈⚉⚆⚇𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏𓀐𓀑𓀒𓀓𓀔𓀕𓀖𓀗𓀘𓀙𓀚𓀛𓀜𓀝',
            'Flags': '🏳️🏴🏁🚩🏳️‍🌈🏳️‍⚧️🏴‍☠️🇦🇫🇦🇽🇦🇱🇩🇿🇦🇸🇦🇩🇦🇴🇦🇮🇦🇶🇦🇬🇦🇷🇦🇲🇦🇼🇦🇺🇦🇹🇦🇿🇧🇸🇧🇭🇧🇩🇧🇧🇧🇾🇧🇪🇧🇿🇧🇯🇧🇲🇧🇹🇧🇴🇧🇦🇧🇼🇧🇷🇮🇴🇻🇬🇧🇳🇧🇬🇧🇫🇧🇮🇰🇭🇨🇲🇨🇦🇮🇨🇨🇻🇧🇶🇰🇾🇨🇫🇹🇩🇨🇱🇨🇳🇨🇽🇨🇨🇨🇴🇰🇲🇨🇬🇨🇩🇨🇰🇨🇷🇨🇮🇭🇷🇨🇺🇨🇼🇨🇾🇨🇿🇩🇰🇩🇯🇩🇲🇩🇴🇪🇨🇪🇬🇸🇻🇬🇶🇪🇷🇪🇪🇪🇹🇪🇺🇫🇰🇫🇴🇫🇯🇫🇮🇫🇷🇬🇫🇵🇫🇹🇫🇬🇦🇬🇲🇬🇪🇩🇪🇬🇭🇬🇮🇬🇷🇬🇱🇬🇩🇬🇵🇬🇺🇬🇹🇬🇬🇬🇳🇬🇼🇬🇾🇭🇹🇭🇳🇭🇰🇭🇺🇮🇸🇮🇳🇮🇩🇮🇷🇮🇶🇮🇪🇮🇲🇮🇱🇮🇹🇯🇲🇯🇵🎌🇯🇪🇯🇴🇰🇿🇰🇪🇰🇮🇽🇰🇰🇼🇰🇬🇱🇦🇱🇻🇱🇧🇱🇸🇱🇷🇱🇾🇱🇮🇱🇹🇱🇺🇲🇴🇲🇰🇲🇬🇲🇼🇲🇾🇲🇻🇲🇱🇲🇹🇲🇭🇲🇶🇲🇷🇲🇺🇾🇹🇲🇽🇫🇲🇲🇩🇲🇨🇲🇳🇲🇪🇲🇸🇲🇦🇲🇿🇲🇲🇳🇦🇳🇷🇳🇵🇳🇱🇳🇨🇳🇿🇳🇮🇳🇪🇳🇬🇳🇺🇳🇫🇰🇵🇲🇵🇳🇴🇴🇲🇵🇰🇵🇼🇵🇸🇵🇦🇵🇬🇵🇾🇵🇪🇵🇭🇵🇳🇵🇱🇵🇹🇵🇷🇶🇦🇷🇪🇷🇴🇷🇺🇷🇼🇼🇸🇸🇲🇸🇦🇸🇳🇷🇸🇸🇨🇸🇱🇸🇬🇸🇽🇸🇰🇸🇮🇬🇸🇸🇧🇸🇴🇿🇦🇰🇷🇸🇸🇪🇸🇱🇰🇧🇱🇸🇭🇰🇳🇱🇨🇵🇲🇻🇨🇸🇩🇸🇷🇸🇿🇸🇪🇨🇭🇸🇾🇹🇼🇹🇯🇹🇿🇹🇭🇹🇱🇹🇬🇹🇰🇹🇴🇹🇹🇹🇳🇹🇷🇹🇲🇹🇨🇹🇻🇻🇮🇺🇬🇺🇦🇦🇪🇬🇧🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁳󠁣󠁴󠁿🏴󠁧󠁢󠁷󠁬󠁳󠁿🇺🇳🇺🇸🇺🇾🇺🇿🇻🇺🇻🇦🇻🇪🇻🇳🇼🇫🇪🇭🇾🇪🇿🇲🇿🇼'
        };  
    }
    base64ToBytes( base64 )
    {
        const binString = atob( base64 );
        return Uint8Array.from( binString, ( m ) => m.codePointAt( 0 ) );
    }
    bytesToBase64( bytes ) 
    {
        const binString = Array.from( bytes, ( x ) => String.fromCodePoint( x ) ).join( '' );
        return btoa( binString );
    }
    attachDomElement()
    {
        super.attachDomElement();
        
        let self = this;
        
        this.domElement.className = 'FUIChatlog';
        
        let data = '\
        <div class="Topic"></div>\
        <div class="Messages"><div class="Incoming"></div><div class="Queue"></div></div>\
        <div class="Input"></div>\
        ';
        
        this.domElement.innerHTML = data;
        
        this.domTopic = this.domElement.querySelector( '.Topic' );
        this.domMessages = this.domElement.querySelector( '.Messages' );
        this.domInput = this.domElement.querySelector( '.Input' );
        
        if( this.options.name )
        {
        	if( this.options.type == 'jeanie' )
        	{
        		let text = this.options.name;
		        try
		        {
		            let dec = new TextDecoder().decode( self.base64ToBytes( text ) );
		            text = dec;
		        }
		        catch( e ){};
		        this.domTopic.innerHTML = text;
        	}
        	else
        	{
		        this.domTopic.innerHTML = this.options.name;
	        }
        }
            
        if( this.options.parentElement )
        {
            let par = document.createElement( 'div' );
            par.className = 'ParentLink';
            par.innerHTML = '';
            par.onclick = function()
            {
                let p = FUI.getElementByUniqueId( self.options.parentElement );
                p.contactsMode();
            }
            this.domTopic.appendChild( par );
        }
        
        this.initDomInput();
        
        // Set stuff on this.domElement.innerHTML
        this.refreshDom();
    }
    initDomInput()
    {
    	let self = this;
    	
    	function clearActive( exception )
    	{
    	    let divs = self.domInput.getElementsByTagName( 'div' );
    	    for( let a = 0; a < divs.length; a++ )
    	    {
    	        if( divs[ a ].parentNode != self.domInput ) continue;
    	        if( divs[ a ] == exception )
    	            divs[ a ].classList.add( 'Active' );
                else 
                {
                    divs[ a ].classList.remove( 'Active' );
                    if( divs[ a ].popWidget )
                        divs[ a ].popWidget.destroy();
                }
    	    }
    	}
    	
    	this.domInput.innerHTML = '\
    		<div class="Upload"></div><div class="Search"></div><div class="Emote"></div><div contenteditable="true" class="Textarea"></div><div class="Send"></div>\
    	';
    	this.domTextarea = this.domInput.querySelector( '.Textarea' );
    	this.domInput.querySelector( '.Send' ).onclick = function()
    	{
    	    let val = self.domTextarea.innerText;
    	    if( val.split( ' ' ).join( '' ).length <= 0 )
		        return;
		    val = self.domTextarea.innerHTML;
			self.domTextarea.innerHTML = '';	
			self.domTextarea.checkHeight();
			self.queueMessage( val );
    	}
    	this.domInput.querySelector( '.Emote' ).onclick = function()
    	{
    	    if( this.classList.contains( 'Active' ) )
    	    {
    	        this.classList.remove( 'Active' );
    	        if( this.popWidget )
    	            this.popWidget.destroy();
    	        this.popWidget = null;
    	    }
    	    else
    	    {
    	        clearActive( this );
    	        
    	        let str = '';
                for( let a in self.emojis )
                {
                    str += '<p><strong class="Header">' + a + '</strong></p><div class="EmojiList">';
                    let emojilist = self.emojis[ a ];
                    for( let b = 0; b < emojilist.length; b++ )
                    {
                        let code = emojilist.codePointAt( b );
                        str += '<span class="Emoticon" attr="' + code + '">' + emojilist[ b ] + '</span>';
                    }
                    str += '</div>';
                }
    	        
    	        this.classList.add( 'Active' );
    	        let d = document.createElement( 'div' );
    	        document.body.appendChild( d );
    	        let s = this;
    	        this.popWidget = new FUIPopwidget( { 
    	            placeholderElement: d, 
    	            originElement: this, 
    	            width: 480, 
    	            height: 480, 
    	            content: str,
    	            clickCallback: function( e )
    	            {
    	                if( e.target && e.target.nodeName == 'SPAN' )
    	                {
    	                    let code = e.target.getAttribute( 'attr' );
                            let sel, range;
                            let node = document.createElement( 'span' );
                            node.setAttribute( 'contenteditable', 'false' );
                            node.className = 'Emoticon';
                            node.innerHTML = String.fromCodePoint( code );
                            
                            s.popWidget.destroy();
    	                    s.classList.remove( 'Active' );
                            
                            if( window.getSelection )
                            {
                                sel = window.getSelection();
                                if( sel.getRangeAt && sel.rangeCount )
                                {
                                    e.target.setAttribute( 'contenteditable', 'false' );
                                    range = sel.getRangeAt( 0 );
                                    range.deleteContents();
                                    range.insertNode( node );
                                    range.collapse( true );
                                    
                                    self.domTextarea.focus();
                                    return;
                                }
                            } 
                            self.domTextarea.appendChild( node );
                            self.domTextarea.focus();
	                    }
	                    else
	                    {
	                        s.popWidget.destroy();
	                        s.classList.remove( 'Active' );
                        }
    	            }
	            } );
    	    }
    	}
    	this.domInput.querySelector( '.Upload' ).onclick = function()
    	{
    	    let s = this;
    	    if( this.classList.contains( 'Active' ) )
    	    {
    	        this.classList.remove( 'Active' );
    	        if( this.popWidget )
    	            this.popWidget.destroy();
    	        this.popWidget = null;
    	    }
    	    else
    	    {
    	        clearActive( this );
    	        this.classList.add( 'Active' );
    	        
    	        let flags = {
					multiSelect: false,
					suffix: [ 'jpg', 'jpeg', 'png', 'gif' ],
					triggerFunction: function( arr )
					{
						s.classList.remove( 'Active' );
						
						if( arr && arr.length > 0 )
						{
							let m = new Module( 'system' );
							m.onExecuted = function( me, md )
							{
								if( me == 'ok' )
								{
									let res = JSON.parse( md );
									self.queueMessage( '<attachment type="' + res.type + '" image="' + res.url + '"/>' );
								}
							}
							let zmsg = { method: 'addupload', path: arr[ 0 ].Path };
							if( self.options.type == 'dm-user' )
							{
								zmsg.userId = self.options.cid;
							}
							else if( self.options.type == 'jeanie' )
							{
								zmsg.context = 'jeanie';
							}
							else
							{
								zmsg.groupId = self.options.cid;
							}
							m.execute( 'convos', zmsg );
						}
					},
					path: false,
					rememberPath: true,
					type: 'load'
				};
			
				new Filedialog( flags );
    	    }
    	}
    	this.domInput.querySelector( '.Search' ).onclick = function()
    	{
    	    if( self.domInput.querySelector( '.Search' ).classList.contains( 'Active' ) )
    	    {
    	        this.classList.remove( 'Active' );
    	    }
    	    else
    	    {
    	        clearActive( this );
    	    }   
    	}
    	this.domTextarea.checkHeight = function()
    	{
    	    if( this.offsetHeight > 50 )
    	    {
    	        this.style.top = 50 - this.offsetHeight + 'px';
    	        this.classList.add( 'Grown' );
    	    }
    	    else
    	    {
    	        this.style.top = 0;
    	        this.classList.remove( 'Grown' );
    	    }
    	}
    	this.domTextarea.addEventListener( 'keyup', function( e )
    	{
    	    if( e.which == 16 )
    	    {
    	        this.shiftKey = false;
	        }
	        this.checkHeight();
    	} );
    	this.domTextarea.addEventListener( 'keydown', function( e )
    	{
    	    if( e.which == 16 )
    	    {
    	        this.shiftKey = true;
	        }
    		else if( e.which == 13 )
    		{
    		    if( this.shiftKey )
    		    {
    		        this.checkHeight();
    		        return;
		        }
		        
    		    let val = self.domTextarea.innerText;
        	    if( val.split( ' ' ).join( '' ).length <= 0 )
        	    {
        	        this.checkHeight();
		            return;
	            }
		        val = self.domTextarea.innerHTML;
			    self.domTextarea.innerHTML = '';	
    			cancelBubble( e );
    			
    			// Strip scripts and such
    			val = val.split( /<script.*?\>[\w\W]*?\<\/script\>/i ).join( '' );
    			val = val.split( /<style.*?\>[\w\W]*?\<\/style\>/i ).join( '' );
    			val = val.split( /<link.*?\>/i ).join( '' );
    			
    			// Check white space
    			let candidate = val.split( /\<.*?\>/ ).join( '' );
    			candidate = candidate.split( /[\s]/ ).join( '' ).split( '&nbsp;' ).join( '' );
    			
    			if( candidate.length )
    			{
    				self.queueMessage( val );
				}
    		}
    		this.checkHeight();
    	} );
    }
    parseDate( instr )
    {
        let now = new Date();
        let test = now.getFullYear() + '-' + StrPad( now.getMonth() + 1, 2, '0' ) + '-' + StrPad( now.getDate(), 2, '0' );
        let time = new Date( instr );
        let diff = ( now.getTime() / 1000 ) - ( time.getTime() / 1000 );
        if( diff < 60 )
        {
            if( diff < 1 )
            {
                return i18n( 'i18n_just_now' );
            }
            return Math.floor( diff ) + ' ' + i18n( 'i18n_seconds_ago' ) + '.';
        }
        else if( diff < 3600 )
        {
            return Math.floor( diff / 60 ) + ' ' + i18n( 'i18n_minutes_ago' ) + '.';
        }
        else if( diff < 86400 )
        {
            return Math.floor( diff / 60 / 24 ) + ' ' + i18n( 'i18n_hours_ago' ) + '.';
        }
        instr = time.getFullYear() + '-' + StrPad( time.getMonth() + 1, 2, '0' ) + '-' + StrPad( time.getDate(), 2, '0' );
        if( test == instr.substr( 0, test.length ) )
            return instr.substr( test.length, instr.length - test.length );
        return instr;
    }
    // Adds messages to a list locked by sorted timestamps
    addMessages( messageList )
    {
        let self = this;
        
        for( let a = messageList.length - 1; a >= 0; a-- )
        {
            let m = messageList[a];
            
            if( !m.ID ) continue; // Skip unregistered ones
            
            // Find highest message ID
            if( parseInt( m.ID ) > self.lastId )
                self.lastId = parseInt( m.ID );
            
            let d = document.createElement( 'div' );
            d.className = 'Message';
            d.classList.add( 'Showing' );
            d.setAttribute( 'owner', m.Name );
            
            let text = m.Message;
            try
            {
                let dec = new TextDecoder().decode( self.base64ToBytes( m.Message ) );
                text = dec;
            }
            catch( e ){};
             
            let replacements = {
                message: self.replaceUrls( self.replaceEmojis( text ) ),
                i18n_date: i18n( 'i18n_date' ),
                i18n_fullname: i18n( 'i18n_fullname' ),
                date: self.parseDate( m.Date ),
                signature: '',
                fullname: m.Own ? i18n( 'i18n_you' ) : m.Name
            };
            d.innerHTML = FUI.getFragment( 'chat-message-head', replacements );
            let timestamp = Math.floor( ( new Date( m.Date ) ).getTime() / 1000 );
            if( m.Own ) d.classList.add( 'Own' );
            
            // Get slot
            let slot = timestamp;
            let slotId = slot + '-' + m.ID;
            d.setAttribute( 'slotId', slotId ); // If we will use this new element, give slotid
            
            // Update a message in a time slot
            if( this.messageList[ slot ] && this.messageList[ slot ].parentNode )
            {
                //console.log( 'Add message to existing slot: ' + slot, m.Message );
                let found = false;
                for( let b = 0; b < this.messageList[ slot ].childNodes.length; b++ )
                {
                    if( this.messageList[ slot ].childNodes[ b ].getAttribute( 'slotId' ) == slotId )
                    {
                        found = this.messageList[ slot ].childNodes[ b ];
                        break;
                    }
                }
                // Replace existing node
                if( found )
                {
                    this.messageList[ slot ].replaceChild( d, found );
                }
                // Add a new node to this group slot
                else
                {
                    this.messageList[ slot ].appendChild( d );
                }
            }
            // Insert a message in a timestamp slot
            else
            {
                let grp = document.createElement( 'div' );
                grp.className = 'Slot';
                grp.appendChild( d );
                this.messageList[ slot ] = grp;
                
                this.messageListOrder.push( slot );
                this.messageListOrder.sort();

                // First message
                if( this.messageListOrder.length == 1 )
                {
                    // Create group
                    this.domMessages.querySelector( '.Incoming' ).appendChild( grp );
                }
                else
                {
                    for( let b = 0; b < this.messageListOrder.length; b++ )
                    {
                        let last = b == this.messageListOrder.length - 1;
                        let slotHere = this.messageListOrder[ b ];
                        // We found our slot
                        if( slotHere == slot )
                        {
                            // Add since we're the last in the list
                            if( last || b == 0 )
                            {
                                 this.domMessages.querySelector( '.Incoming' ).appendChild( grp );
                            }
                            // Insert before previous
                            else
                            {
                                this.domMessages.querySelector( '.Incoming' ).insertBefore( this.messageList[ this.messageListOrder[ b + 1 ] ], grp );
                            }
                        }
                    }
                }
            }
        }
        this.toBottom();
        this.refreshDom();
    }
    setTopic( topic, type = false )
    {
    	// Jeanie is a top level chat
    	// TODO: Figure out if we are showing contacts or not while running 
    	//       this topic
    	if( type != 'jeanie' )
    	{
    		let p = this.domTopic.querySelector( '.ParentLink' );
    		
    		this.domTopic.innerHTML = topic;
			if( p ) this.domTopic.appendChild( p );
		}
		else
		{
			this.domTopic.innerHTML = topic;
		}
    }
    toBottom( way )
    {
        let self = this;
        if( way == 'smooth' )
        {
            this.domMessages.scrollTop = this.domMessages.lastChild.offsetHeight + this.domMessages.lastChild.offsetTop;
            return;
        }
        this.domMessages.style.scrollBehavior = 'inherit';
        this.domMessages.scrollTop = this.domMessages.lastChild.offsetHeight + this.domMessages.lastChild.offsetTop;
        setTimeout( function(){ self.domMessages.style.scrollBehavior = 'smooth'; }, 5 );
    }
    queueMessage( string )
    {
        let self = this;
        
        // When in a lock, just wait
        if( self.lock )
        {
            return setTimeout( function(){ self.queueMessage( string ); }, 250 );
        }
        
    	let dom = document.createElement( 'div' );
    	dom.className = 'Message Own';
    	dom.innerHTML = '<p>' + string + '</p>';
    	dom.setAttribute( 'timestamp', ( new Date() ).getTime() );
    	this.domMessages.querySelector( '.Queue' ).appendChild( dom );
    	
    	// Add queue to Convos
    	if( window.Convos )
    	{
    	    let text = self.bytesToBase64( new TextEncoder().encode( string ) );
    	    let ms = {
    	        timestamp: parseInt( parseFloat( dom.getAttribute( 'timestamp' ) ) / 1000 ),
    	        message: encodeURIComponent( text ),
    	        type: this.options.type ? this.options.type : '',
    	        targetId: this.options.cid
    	    };
    	    Convos.outgoing.push( ms );
    	    Application.holdConnection( { 
    	        method: 'messages', 
    	        roomType: this.options.type ? this.options.type : '', 
    	        cid: this.options.cid ? this.options.cid : '',
    	        lastId: this.lastId
	        } );
    	}
    	
    	// Play a sound when sending
    	Application.playSound( getImageUrl( 'Progdir:Assets/send.ogg' ) );
    	
    	setTimeout( function()
    	{
    		dom.classList.add( 'Showing' );
		}, 2 );
		
		this.toBottom( 'smooth' );
    }
    refreshMessages()
    {
        let msg = { 
            method: 'messages', 
            roomType: this.options.type ? this.options.type : '', 
            cid: this.options.cid ? this.options.cid : '',
            lastId: this.lastId
        };
        Application.holdConnection( msg );
    }
    clearQueue()
    {
        let self = this;
        self.lock = true;
        let queue = this.domMessages.querySelector( '.Queue' );
        let messages = queue.getElementsByClassName( 'Message' );
        for( let a = 0; a < messages.length; a++ )
        {
            ( function( mess )
            {
                if( mess.parentNode )
                    mess.parentNode.removeChild( mess );
            } )( messages[ a ] );
        }
        setTimeout( function()
        {
            self.lock = false;
        }, 250 );
    }
    grabAttributes( domElement )
    {
        super.grabAttributes( domElement );
        
        let uniqueId = domElement.getAttribute( 'uniqueid' );
        if( uniqueId ) this.options.uniqueid = uniqueId;
        
        let type = domElement.getAttribute( 'type' );
        if( type ) this.options.type = type;
        
        let cid = domElement.getAttribute( 'cid' );
        if( cid ) this.options.cid = cid;
        
        let context = domElement.getAttribute( 'context' );
        if( context ) this.options.context = context;
        
        let name = domElement.getAttribute( 'name' );
        if( name ) this.options.name = name;
        
        let parentElement = domElement.getAttribute( 'parentelement' );
        if( parentElement ) this.options.parentElement = parentElement;
    }
    refreshDom( evaluated = false )
    {
        super.refreshDom();
        let self = this;
        
        // Let's do some message owner management for styling
        let messages = this.domElement.getElementsByClassName( 'Message' );
        let lastOwner = false;
        for( let a = 0; a < messages.length; a++ )
        {
            let date = messages[ a ].querySelector( '.Date' );
            let tstm = messages[ a ].getAttribute( 'slotid' );
            if( tstm )
            {
                let newDate = self.parseDate( parseInt( tstm.split( '-' )[0] ) * 1000 );
                date.innerHTML = newDate;
            }
            
            let owner = messages[ a ].getAttribute( 'owner' );
            let powner = a > 0 ? messages[ a - 1 ].getAttribute( 'owner' ) : false;
            let nowner = a + 1 < messages.length ? messages[ a + 1 ].getAttribute( 'owner' ) : false;
            
            if( owner == lastOwner )
            {
                messages[ a ].classList.add( 'ConceilOwner' );
                if( a + 1 < messages.length && nowner != owner )
                {
                    messages[ a ].classList.add( 'LastForOwner' );
                }
                else
                {
                    messages[ a ].classList.remove( 'LastForOwner' );
                }
            }
            else if( a + 1 < messages.length && nowner == owner )
            {
                messages[ a ].classList.add( 'FirstForOwner' );
            }
            
            // First message
            if( !powner && !nowner )
            {
            	messages[ a ].classList.add( 'OnlyMessage' );
            }
            // Prev message has different owner and next message has different owner
            if( powner && powner != owner && nowner && nowner != owner )
            {
            	messages[ a ].classList.add( 'OnlyMessage' );
            }
            // Prev owner is different, and it's the last message
            if( powner && powner != owner && !nowner )
            {
            	messages[ a ].classList.add( 'OnlyMessage' );
            }
            
            if( a + 1 >= messages.length && messages[ a ].classList.contains( 'ConceilOwner' ) )
            {
                messages[ a ].classList.add( 'LastForOwner' );
            }
            lastOwner = owner;
        }
        
        this.checkLinks();
        this.domElement.classList.add( 'Initialized' );
       
    }
    // Get markup for object
    getMarkup( data )
    {
    	// Return meta-markup for class instantiation later
    	let props = '';
    	let n = 0;
    	for( let a in this.options )
    	{
    	    if( n++ > 0 ) props += ' ';
    	    props += a + '="' + props[ a ] + '"';
    	}
    	return '<fui-chatlist' + props + '></fui-chatlist>';
    }
    // Just display an error message
    errorMessage( string )
    {
        this.domElement.innerHTML = '<h2 class="Error">' + string + '</h2>';
    }
    checkLinks()
    {
        let self = this;
        
        let eles = this.domElement.getElementsByClassName( 'WebLink' );
        for( let a = 0; a < eles.length; a++ )
        {
            if( !eles[ a ].classList.contains( 'LinkChecked' ) )
            {
                eles[ a ].classList.add( 'LinkChecked' );
                ( function( el )
                {
                    let m = new Module( 'system' );
                    m.onExecuted = function( me, md )
                    {
                        if( !el.parentNode ) return;
                        if( me != 'ok' )
                            return;
                        let ne = document.createElement( 'div' );
                        ne.className = 'WebLinkPreview';
                        el.parentNode.replaceChild( ne, el );
                        let ln = document.createElement( 'p' );
                        ln.className = 'WebLinkP';
                        ln.appendChild( el );
                        
                        
                        let ogs = {};
                        while( 1 )
                        {
                            let res = md.match( /\sproperty\=\"og\:(.*?)\".*?content\=\"(.*?)\"/i );
                            if( res != null )
                            {
                                ogs[ res[1] ] = res[2];
                                md = md.split( res[0] ).join( '' );
                                continue;
                            }
                            break;
                        }
                        
                        let sn = false;
                        if( ogs.site_name )
                        {
                            sn = document.createElement( 'p' );
                            sn.innerHTML = ogs.site_name;
                            sn.className = 'OGSite';
                            sn.onclick = function()
                            {
                                window.open( el.getAttribute( 'href' ), '_blank' );
                            }
                            ne.appendChild( sn );
                        }
                        if( ogs.title && ( !ogs.site_name || ogs.site_name != ogs.title ) )
                        {
                            if( sn )
                            {
                                sn.innerHTML += ' - ' + ogs.title;
                            }
                            else
                            {
                                let p = document.createElement( 'p' );
                                p.innerHTML = ogs.title;
                                p.className = 'OGSite';
                                ne.appendChild( p );
                                p.onclick = function()
                                {
                                    window.open( el.getAttribute( 'href' ), '_blank' );
                                }
                            }
                        }
                        if( ogs.image )
                        {
                            let d = document.createElement( 'div' );
                            d.className = 'OGImage';
                            ne.appendChild( d );
                            d.onclick = function()
                            {
                                window.open( el.getAttribute( 'href' ), '_blank' );
                            }
                            
                            let n = document.createElement( 'img' );
                            n.src = ogs.image;
                            n.style.position = 'absolute';
                            n.style.pointerEvents = 'none';
                            n.onload = function()
                            {
                                n.style.position = '';
                                ne.classList.add( 'Showing' );
                                self.toBottom();
                            }
                            if( n.width ) n.onload();
                            d.appendChild( n );
                        }
                        else
                        {
                            ne.classList.add( 'Showing' );
                        }
                        
                        ne.appendChild( ln );
                    }
                    m.execute( 'websitegraph', { 'link': el.getAttribute( 'href' ) } );
                } )( eles[ a ] );
            }
        }
    }
    replaceUrls( string )
    {
       	let self = this;
        let fnd = 0;
        while( 1 )
        {
            let res = string.match( /[\s]{0,1}http([s]{0,1}\:\/\/[^\s]*)/i );
            if( res != null )
            {
                string = string.split( res[0] ).join( '<a class="WebLink" href="fnd' + res[1] + '" target="_blank">fnd' + res[1] + '</a>' );
                fnd++;
                continue;
            }
            break;
        }
        if( fnd )
        {
            string = string.split( 'fnds://' ).join( 'https://' ).split( 'fnd://' ).join( 'http://' );
        }
        // Take attachments
        while( 1 )
        {
        	let res = string.match( /[\s]{0,1}\<attachment\ type\=\"image\"\ image\=\"(.*?)\"\/\>/i );
        	if( res != null )
        	{
        		if( !self.randArra )
        			self.randArra = {};
        		if( !self.randArra[ res[1] ] )
        		{
        			self.randArra[ res[ 1 ] ] = md5( ( Math.random() * 10 ) + res[ 1 ] );
        		}
        		let rand = self.randArra[ res[ 1 ] ];
        		string = string.split( res[ 0 ] ).join( '<img onload="Application.handleImageLoad( this )" onerror="Application.handleImageError( this )" src="' + res[1] + '&authid=' + Application.authId + '&rand=' + rand + '" class="Attachment"/>' );
        		continue;
        	}
        	break;
        }
        // Take video calls
        while( 1 )
        {
        	let res = string.match( /[\s]{0,1}\<videocall\ type\=\"video\"\ callid\=\"(.*?)\"\/\>/i );
        	if( res != null )
        	{
        		let button = '<div class="VideoCall" onclick="initVideoCall(\'' + res[1] + '\')"><span>' + i18n( 'i18n_video_call_button' ) + '</span></div>';
        		string = string.split( res[ 0 ] ).join( button );
        		continue;
        	}
        	break;
        }
        return string;
    }
    replaceEmojis( string )
    {
        let smilies = [ '8)', '8-)', ':-)', ':)', ':-D', ':D', 'X)', 'B)', 'B-)', 'X-)', ':|', ':-|', ':-o', ':o', ':O', ':O', ':(', ':-(',  ';)', ';-)' ];
        let emotes  = [ '🤓', '🤓', '🙂',  '🙂', '😀', '😀', '😆', '😎', '😎', '😆', '😐', '😐', '😮', '😮', '😮', '😮', '😒', '😒', '😏', '😏' ];
        
        for( let a = 0; a < smilies.length; a++ )
        {
            string = string.split( smilies[a] ).join( '<span class="Emoji">' + emotes[a] + '</span>' );
        }
        
        while( 1 )
        {
            let res = string.match( /\:(.*?)\:/i );
            if( res && res[0] )
            {
                string = string.split( res[0] ).join( this.emoji( res[1] ) );
            }
            else break;
        }
        
        return string;
    }
    emoji( type )
    {
        let s = '';
        switch( type )
        {
            case 'bug': s = '🪲'; break;
            case 'sun': s = '☀️'; break;
            case 'heart': s = '❤️'; break;
            case 'kiss': s = '💋'; break;
            case 'y': s = '👍'; break;
            case 'beers': s = '🍻'; break;
            case 'beer': s = '🍺'; break;
            case 'wine': s = '🍷'; break;
            case 'sick': s = '😷'; break;
            case 'fire': s = '🔥'; break;
            default: break;
        }
        return '<span class="Emoji">' + s + '</span>';
    }
}
FUI.registerClass( 'chatlog', FUIChatlog );

Application.handleImageError = function( ele )
{
	let newnode = document.createElement( 'div' );
	newnode.className = 'ImageError';
	ele.parentNode.replaceChild( newnode, ele );
}

Application.handleImageLoad = function( ele )
{
	let mes = document.querySelector( '.Messages' );
	if( !mes ) return;
	if( ele.naturalWidth < ele.parentNode.offsetWidth )
		ele.style.width = ele.naturalWidth + 'px';
	mes.style.scrollBehavior = 'initial';
	mes.scrollTop = mes.scrollHeight;
	setTimeout( function()
	{
		mes.style.scrollBehavior = '';
	}, 10 );
	// Open the image in image viewer
	ele.onclick = function()
	{
		let ms = {
			type: 'dos',
			method: 'openWindowByFilename',
			args: {
				fileInfo: { Path: ele.src, Filename: 'Convos - Image' },
				ext: 'jpg'
			}
		};
		Application.sendMessage( ms );
	}
	
}

