import { dbContext } from "../db/DbContext.js"

class NotesService {
    async getNotesByBugId(bugId) {
        const notes = await dbContext.Notes.find({ bugId })
        return notes
    }
    async createNote(noteData) {
        const note = await dbContext.Notes.create(noteData)
        return note
    }

}

export const notesService = new NotesService()