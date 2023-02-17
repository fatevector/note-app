const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

const getNotes = async () => {
    const notesString = await fs.readFile(notesPath, { encoding: "utf-8" });
    const notes = JSON.parse(notesString);
    return Array.isArray(notes) ? notes : [];
};

const addNote = async title => {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString()
    };

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen("Note was added!"));
};

const removeNote = async id => {
    const notes = await getNotes();
    const newNotes = notes.filter(note => note.id !== id);
    if (notes.length !== newNotes.length) {
        await fs.writeFile(notesPath, JSON.stringify(newNotes));
        console.log(chalk.bgGreen("Note was removed!"));
    } else {
        console.log(chalk.bgRed("No note has the given id!"));
    }
};

const editNote = async (id, title) => {
    const notes = await getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);

    notes[noteIndex].title = title;

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen("Note was edited!"));
};

const printNotes = async () => {
    const notes = await getNotes();
    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach(note => {
        console.log(chalk.green(note.id), chalk.blue(note.title));
    });
};

module.exports = {
    addNote,
    removeNote,
    editNote,
    getNotes,
    printNotes
};
