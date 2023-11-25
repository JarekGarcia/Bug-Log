import { Schema } from "mongoose";

export const BugSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        priority: { type: Number, required: true },
        closed: { type: Boolean, required: true, default: false },
        closedDate: { type: Date, required: false },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

BugSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true

})