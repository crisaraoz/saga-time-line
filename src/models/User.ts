import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const watchedTitleSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    franchise: { type: Schema.Types.ObjectId, ref: "Franchise", required: true },
    watchedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, trim: true },
    avatarUrl: { type: String, default: null },
    // ISO 3166-1 alpha-2, define qué plataformas de streaming se muestran.
    country: { type: String, default: "AR", uppercase: true, minlength: 2, maxlength: 2 },
    preferences: {
      theme: { type: String, enum: ["cinema", "dark", "light"], default: "cinema" },
      order: { type: String, enum: ["chronological", "release"], default: "chronological" },
      spoilerFreeLoreCaps: { type: Boolean, default: true },
    },
    watched: { type: [watchedTitleSchema], default: [] },
    followedFranchises: [{ type: Schema.Types.ObjectId, ref: "Franchise" }],
  },
  { timestamps: true },
);

userSchema.index({ "watched.movie": 1 });

export type UserDoc = InferSchemaType<typeof userSchema>;

export const User: Model<UserDoc> =
  (models.User as Model<UserDoc>) ?? model<UserDoc>("User", userSchema);

export default User;
