const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    const notes = loadNotes()
    
    notes.forEach( note => {
        console.log(note.title, ' : ', note.body)
    });

    
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) => note.title === title )
    debugger
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added to datastore'))
    } else {
        console.log(chalk.yellow.inverse('Note title already exist'))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString()
    
        return JSON.parse(dataJson)
    
    } catch (error) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToSave = notes.filter( (note) => note.title !== title )

    if(notes.length > notesToSave.length) {
        saveNotes(notesToSave)
        console.log(chalk.green.inverse('Note removed successfully'))
    } else {
        console.log(chalk.red.inverse('Note title Mismatch :'), chalk.yellow.inverse('Note do not exist in data store'))
    }
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteToFind = notes.find( (note) => note.title === title)

    if(noteToFind === undefined) {
        console.log(chalk.red.inverse('Note not found in datastore'))
    } else{
        console.log(noteToFind.title,' ', noteToFind.body)
    }
}

module.exports = {
    getNote: getNotes,
    addNote: addNote,
    removeNote: removeNotes,
    getNote: getNotes,
    readNote: readNotes
}