const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 
const util = require('util');
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class Notes{
    read(){
        return readAsync('db/db.json', 'utf-8');
        
    }
    write(note){
        return writeAsync('db/db.json', JSON.stringify(note));
    }

    writeNote(note){
        const newNote = {
            title: note.title,
            text: note.text,
            id: uuidv4()
        }
        console.log(newNote);
        return this.getNotes().then(notesArr => [...notesArr, newNote]).then(newInfo => this.write(newInfo)).then(()=> newNote);
    }

    getNotes(){
        return this.read().then(rawNotes => {
            let notesArr = [];
            try {
                notesArr = notesArr.concat(JSON.parse(rawNotes))
            } catch (error) {
                notesArr = [];
            }
            return notesArr;
        })
    }
    deleteNote(id){
        return this.getNotes().then(notesArr => notesArr.filter(note => note.id !== id)).then(updatedArr => this.write(updatedArr))
    }
}

module.exports = new Notes();