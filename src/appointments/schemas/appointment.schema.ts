import { Schema } from "mongoose";

export const AppointmentSchema = new Schema({
    date: {
        unique: true,
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    UpdatedAt: {
        type: Date,
        default: Date.now,
    },
});
