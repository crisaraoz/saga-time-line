import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const providerSchema = new Schema(
  {
    providerId: { type: Number, required: true },
    name: { type: String, required: true },
    logoPath: { type: String, default: null },
    type: {
      type: String,
      enum: ["flatrate", "rent", "buy", "free", "ads"],
      required: true,
    },
  },
  { _id: false },
);

// Caché local de la metadata de TMDB para no pegarle a la API en cada render.
const movieSchema = new Schema(
  {
    tmdbId: { type: Number, required: true, unique: true, index: true },
    kind: { type: String, enum: ["movie", "tv"], default: "movie" },
    title: { type: String, required: true, trim: true },
    originalTitle: { type: String, trim: true },
    overview: { type: String, default: "" },
    releaseDate: { type: Date },
    runtime: { type: Number, default: null },
    posterPath: { type: String, default: null },
    backdropPath: { type: String, default: null },
    genres: { type: [String], default: [] },
    directors: { type: [String], default: [] },
    voteAverage: { type: Number, default: 0 },
    // Disponibilidad por país: { AR: [...], ES: [...] }
    providersByCountry: {
      type: Map,
      of: [providerSchema],
      default: () => new Map(),
    },
    providersUpdatedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export type MovieDoc = InferSchemaType<typeof movieSchema>;

export const Movie: Model<MovieDoc> =
  (models.Movie as Model<MovieDoc>) ?? model<MovieDoc>("Movie", movieSchema);

export default Movie;
