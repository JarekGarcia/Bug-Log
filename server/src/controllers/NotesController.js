import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .get('', this.getNotesByBugId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNote)
    }

    async getNotesByBugId(req, res, next) {
        try {
            const notes = await notesService.getNotesByBugId()
            return res.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async createNote(req, res, next) {
        try {
            const noteData = req.body
            noteData.creatorId = req.userInfo.id
            const note = await notesService.createNote(noteData)
            await note.populate('creator')
            return res.send(note)
        } catch (error) {
            next(error)
        }
    }
}