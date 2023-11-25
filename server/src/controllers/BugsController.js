import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .get('', this.getAllBugs)
            .get('/:bugId', this.getBugById)
            .get('/:bugId/notes', this.getNotesByBugId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postBug)
            .put('/:bugId', this.editBug)
            .delete('/:bugId', this.closeBug)
    }

    async getAllBugs(req, res, next) {
        try {
            const query = req.query
            const allBugs = await bugsService.getAllBugs(query)
            return res.send(allBugs)
        } catch (error) {
            next(error)
        }
    }

    async getBugById(req, res, next) {
        try {
            const bugId = req.params.bugId
            const bug = await bugsService.getBugById(bugId)
            return res.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getNotesByBugId(req, res, next) {
        try {
            const bugId = req.params.bugId
            const notes = await notesService.getNotesByBugId(bugId)
            return res.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async postBug(req, res, next) {
        try {
            const bugData = req.body
            bugData.creatorId = req.userInfo.id
            const newBug = await bugsService.postBug(bugData)
            return res.send(newBug)
        } catch (error) {
            next(error)
        }
    }

    async editBug(req, res, next) {
        try {
            const userId = req.userInfo.id
            const bugId = req.params.bugId
            const bugData = req.body
            const bug = await bugsService.editBug(userId, bugId, bugData)
            return res.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async closeBug(req, res, next) {
        try {
            const bugId = req.params.bugId
            const userId = req.userInfo.id
            const bug = await bugsService.closeBug(bugId, userId)
            return res.send(bug)
        } catch (error) {
            next(error)
        }
    }
}