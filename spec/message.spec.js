const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws an error if a name is NOT passed into the constructor as the first parameter", function(){
        expect( function() { new Message();}).toThrow(new Error('First parameter must be a message Name.'));
    });

    it("constructor sets name", function (){
        let result = new Message("Message Name Test");
        result.name = "Message Name Test";
    });

    it("contains a commands array passed into the constructor as the 2nd argument", function(){
        let commands = [new Command('MOVE',4000), new Command('MOVE', 2000), new Command('MODE_CHANGE', "LOW_POWER")];
        let result = new Message("Message Name",commands);
        result.commandsArray = commands;
    });
});
