const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "adds new note",
  builder: {
    title: {
      describe: "adds title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("adding a note with the title", argv.title);
  },
});

// console.log(yargs.argv);
yargs.parse();
