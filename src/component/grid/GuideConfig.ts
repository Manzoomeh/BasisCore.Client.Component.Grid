export type GridGuideStep = { id: string; target: string; title: string; description: string; optional?: boolean; priority?: number };

export type ColumnGuideStep = Omit<GridGuideStep, "target" | "title"> & { target?: string; title?: string };

export type GridGuideMetadata = {
  schemaVersion: 2;
  id: number;
  lid: number;
  revision: number;
  title: string;
  steps?: GridGuideStep[];
};

export type GridGuideOptions = boolean | Partial<GridGuideMetadata>;

export type GridGuideConfig = Partial<GridGuideMetadata> & { title: string; steps: GridGuideStep[] };

export type ColumnGuideConfig = {
  status: "active" | "inactive";
  id: string;
  description?: string;
  optional?: boolean;
  priority?: number;
  steps?: ColumnGuideStep[];
};

export type GuideTargets = Record<string, () => HTMLElement | HTMLElement[] | null>;

// Semantic action keys are matched as data values, never evaluated as CSS or JavaScript.
export function parseGuideActionTarget(target: string) {
  const match = /^list\.(row|bulk)\.action\.([a-zA-Z0-9_-]{1,80})$/.exec(target);
  return match ? { scope: match[1], key: match[2] } : null;
}

const text = (input: unknown, max: number) => typeof input === "string" && input.trim().length > 0 && input.length <= max;
const key = (input: unknown) => text(input, 120) && /^[a-zA-Z0-9_.-]+$/.test(input as string);
const priority = (input: unknown) => input === undefined || (Number.isSafeInteger(input) && (input as number) >= 0);

function validSteps(steps: unknown, column = false): boolean {
  if (!Array.isArray(steps) || !steps.length || steps.length > 50) return false;
  const ids = new Set<string>();
  return steps.every(step => {
    if (!step || !key(step.id) || ids.has(step.id) || ((!column || step.target !== undefined) && !key(step.target)) ||
        ((!column || step.title !== undefined) && !text(step.title, 200)) || !text(step.description, 2000) ||
        !priority(step.priority) || (step.optional !== undefined && typeof step.optional !== "boolean")) return false;
    ids.add(step.id);
    return true;
  });
}

export function isGuideOptions(value: unknown): value is GridGuideOptions {
  if (typeof value === "boolean") return true;
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const config = value as GridGuideConfig;
  if (config.schemaVersion !== undefined && config.schemaVersion !== 2) return false;
  for (const field of ["id", "lid", "revision"] as const) {
    const number = config[field];
    if (number !== undefined && (!Number.isSafeInteger(number) || number < 1)) return false;
  }
  return (config.title === undefined || text(config.title, 200)) &&
    (config.steps === undefined || (Array.isArray(config.steps) && !config.steps.length) || validSteps(config.steps));
}

export function isGuideMetadata(value: unknown): value is GridGuideMetadata {
  if (!isGuideOptions(value) || typeof value !== "object") return false;
  return value.schemaVersion === 2 && value.id !== undefined && value.lid !== undefined &&
    value.revision !== undefined && value.title !== undefined && (value.steps === undefined || validSteps(value.steps));
}

export function isGuideConfig(value: unknown): value is GridGuideConfig {
  return isGuideOptions(value) && typeof value === "object" && text(value.title, 200) && validSteps(value.steps);
}

export function isColumnGuideConfig(value: unknown): value is ColumnGuideConfig {
  if (!value || typeof value !== "object") return false;
  const guide = value as ColumnGuideConfig;
  return (guide.status === "active" || guide.status === "inactive") &&
    key(guide.id) && priority(guide.priority) &&
    (guide.description === undefined ? guide.steps !== undefined : text(guide.description, 2000)) &&
    (guide.steps === undefined || validSteps(guide.steps, true)) &&
    (guide.optional === undefined || typeof guide.optional === "boolean");
}
