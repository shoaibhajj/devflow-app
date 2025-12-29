// eslint-disable-next-line no-unused-vars
import {  model, models, Schema, Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IModel {}

const ModelSchema = new Schema<IModel>({}, { timestamps: true });

const Model = models?.Model || model<IModel>("Model", ModelSchema);

export default Model;
