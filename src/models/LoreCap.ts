import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// Caché de los resúmenes generados por IA: 4 viñetas del contexto previo.
const loreCapSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    franchise: { type: Schema.Types.ObjectId, ref: "Franchise", required: true },
    language: { type: String, default: "es", lowercase: true },
    bullets: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => value.length >= 3 && value.length <= 5,
        message: "Un LoreCap debe tener entre 3 y 5 viñetas",
      },
    },
    // Para invalidar la caché cuando cambiemos el prompt o el modelo.
    promptVersion: { type: String, required: true, default: "v1" },
    aiModel: { type: String, required: true },
    tokensUsed: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

loreCapSchema.index(
  { movie: 1, language: 1, promptVersion: 1 },
  { unique: true },
);

export type LoreCapDoc = InferSchemaType<typeof loreCapSchema>;

export const LoreCap: Model<LoreCapDoc> =
  (models.LoreCap as Model<LoreCapDoc>) ??
  model<LoreCapDoc>("LoreCap", loreCapSchema);

export default LoreCap;
