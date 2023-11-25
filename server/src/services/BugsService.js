import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {
    async getAllBugs(query) {
        const allBugs = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator')
        return allBugs
    }
    async getBugById(bugId) {
        const bug = (await dbContext.Bugs.findById(bugId)).populate('creator')
        return bug
    }
    async postBug(bugData) {
        const newBug = await dbContext.Bugs.create(bugData)
        await newBug.populate('creator')
        return newBug
    }
    async editBug(userId, bugId, bugData) {
        const bug = await dbContext.Bugs.findById(bugId)
        if (bug.closed) { throw new BadRequest(`${bug.title} is closed`) }
        if (bug.creatorId != userId) { throw new Forbidden(`${bug.title} is not yours to edit`) }
        bug.title = bugData.title || bug.title
        bug.description = bugData.description || bug.description
        bug.priority = bugData.priority || bug.priority
        await bug.save()
        return bug
    }
    async closeBug(bugId, userId) {
        const bug = await this.getBugById(bugId)
        if (bug.creatorId.toString() != userId) { throw new Forbidden("not your bug to close!") }
        bug.closed = !bug.closed
        await bug.save()
        return bug
    }

}

export const bugsService = new BugsService()