class Message {
   constructor(name, commandsArray) {
      this.name = name;
      if(!name) {
         throw Error("First parameter must be a message Name.")
      }
      this.commandsArray = commandsArray;
   }
}

module.exports = Message;