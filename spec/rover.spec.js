const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

function receiveMessage(messageObject){
  let name = messageObject.name
     return console.log("message: ",name);
}

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function(){
    let result = new Rover(102030);
    result.position = 102030;
    result.mode = 'NORMAL';
    result.generatorWatts = 110;
    });

//test 8
  it("response returned by receiveMessage contains the name of the message", function(){
    //let testMessage = new Message("message name",new Command("STATUS_CHECK"));
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(19010);

    let response = rover.receiveMessage(message);
    expect(response.message).toBe(message.name);
      });

//test 9 - FAIL - only returning one item in results array. is this a loop error?
    it("response returned by receiveMessage includes two results if two commands are sent in the message", function (){
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE',400)];
      let testMessage = new Message('Test message with two commands', commands);
      let rover = new Rover(65432);
      let response = rover.receiveMessage(testMessage);
      expect(response.results.length).toBe(2);
    }); 

//test 10.
    it("responds correctly to the status check command", function(){
      let commands = [new Command('STATUS_CHECK')];
      let testMessage = new Message('Test message with STATUS_CHECK', commands);
      let rover = new Rover(65432, 'NORMAL',100);
      //console.log(testMessage);
      //console.log(testMessage.commandsArray);
      if (testMessage.commandsArray.commandType === "STATUS_CHECK"); {
        //console.log("results array",rover.receiveMessage(testMessage).results);
        //console.log(rover.receiveMessage(testMessage).results[0].roverStatus);
        expect(rover.receiveMessage(testMessage).results[0].roverStatus.mode).toBe(rover.mode);
        expect(rover.receiveMessage(testMessage).results[0].roverStatus.position).toBe(rover.position);
        expect(rover.receiveMessage(testMessage).results[0].roverStatus.generatorWatts).toBe(rover.generatorWatts);
      }
    });

//Test 11. am i checking that it returns completed. then am I checking that .mode = one of two things?  checks normal, changes to low, cheks low. yay
      it("responds correctly to the mode change command", function(){
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
        let testMessage = new Message('Test message with STATUS_CHECK', commands);
        let rover = new Rover(65432, 'NORMAL',100);
        //console.log("before",rover.mode);
        expect(rover.mode).toBe('NORMAL');
        rover.receiveMessage(testMessage);
        expect(rover.mode).toBe('LOW_POWER');
        //console.log("after",rover.mode);
      });

//test 12. //rover.mode is low and i get MOVE, false completed
      it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
        let commands = [new Command('MOVE',500)];
        let testMessage = new Message('Test message with MOVE', commands);
        let rover = new Rover(65432, 'LOW_POWER',100);
        //console.log(rover.receiveMessage(testMessage).results[0].completed);
        expect(rover.receiveMessage(testMessage).results[0].completed).toBe(false);
      });

//test 13.
      it("responds with the position for the move command", function(){
        let commands = [new Command('MOVE',500)];
        let testMessage = new Message('Test message with MOVE', commands);
        let rover = new Rover(65432, 'NORMAL',100);
        //console.log(rover.receiveMessage(testMessage).results[0]);
        expect(rover.receiveMessage(testMessage).results[0].position).toBe(500);
      });
});
