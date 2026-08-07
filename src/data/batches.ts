// src/data/batches.ts

// Backward-compatibility wrapper.
// Production data now lives in ./production.ts.

export type { Batch, YearData, Semester } from "./production";

export {
  batches,
  getBatchByYear,
  getAllBatchYears,
} from "./production";
