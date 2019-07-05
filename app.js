const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')
const util = require('./utils')

yargs.version('1.0.1')

// add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        util.addNote(argv.title, argv.body)
    }
})

// remove
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Title of the note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        util.removeNote(argv.title)
    }
})

// list
yargs.command({
    command: 'list',
    describe: 'Add a new note',
    handler() {
        util.getNote()
    }
})

// read
yargs.command({
    command: 'read',
    describe: ' read notes ',
    builder: {
        title:{
            describe: 'Title of the note to search',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        util.readNote(argv.title)
    }
})

yargs.parse()
