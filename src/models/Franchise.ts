import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// Cada entrada del timeline: referencia al título + su lugar en la ruta.
const franchiseTitleSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    chronologicalOrder: { type: Number, required: true },
    releaseOrder: { type: Number, required: true },
    isOptional: { type: Boolean, default: false },
    note: { type: String, default: null },
  },
  { _id: false },
);

const franchiseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: null },
    overview: { type: String, default: "" },
    backdropPath: { type: String, default: null },
    posterPath: { type: String, default: null },
    tmdbCollectionIds: { type: [Number], default: [] },
    aliases: { type: [String], default: [] },
    titles: { type: [franchiseTitleSchema], default: [] },
    recommendationTmdbIds: { type: [Number], default: [] },
  },
  { timestamps: true },
);

franchiseSchema.index({ name: "text", aliases: "text" });

export type FranchiseDoc = InferSchemaType<typeof franchiseSchema>;

export const Franchise: Model<FranchiseDoc> =
  (models.Franchise as Model<FranchiseDoc>) ??
  model<FranchiseDoc>("Franchise", franchiseSchema);

export default Franchise;
