class Rover {
   constructor(position, mode, generatorWatts) {
      if(!mode){
         mode = "NORMAL";
      }
      if(!generatorWatts){
         generatorWatts = 110;
      }
   this.position = position;
   this.mode = mode;
   this.generatorWatts = generatorWatts;
   //this.roverStatus = {`Rover Status: ${this.position}`} here this would not get updated
   }
   receiveMessage(messageObject){
      let resultsArray = [];
      for (let i = 0; i < messageObject.commandsArray.length; i++) {
         if (messageObject.commandsArray[i].commandType === 'MOVE'){
           if(this.mode === 'LOW_POWER'){
             resultsArray.unshift({completed: false});
           } else {
            this.position = messageObject.commandsArray[i].value
            resultsArray.unshift({
               completed: true,
               position: this.position
            });
           }
         }
         if (messageObject.commandsArray[i].commandType === 'MODE_CHANGE'){
            this.mode = messageObject.commandsArray[i].value
            resultsArray.unshift({completed: true});
         }
         if (messageObject.commandsArray[i].commandType === 'STATUS_CHECK'){
            let roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            };
            resultsArray.unshift({
               completed: true,
               roverStatus: roverStatus
            });
         }
      }
      let functionResponse = {
         message: messageObject.name,
         results: resultsArray
      }
      return functionResponse;
};

}

module.exports = Rover;