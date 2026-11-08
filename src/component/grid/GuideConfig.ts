export type GridGuideConfig = {
  schemaVersion: 2;
  id: number;
  lid: number;
  revision: number;
  title: string;
  steps: { id: string; target: string; title: string; description: string; optional?: boolean }[];
};

export type GuideTargets = Record<string, () => HTMLElement | null>;

export function isGuideConfig(value: unknown): value is GridGuideConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as GridGuideConfig;
  const text = (input: unknown, max: number) => typeof input === "string" && input.trim().length > 0 && input.length <= max;
  const key = (input: unknown) => text(input, 120) && /^[a-zA-Z0-9_.-]+$/.test(input as string);
  if (config.schemaVersion !== 2 || !Number.isSafeInteger(config.id) || config.id < 1 ||
      !Number.isSafeInteger(config.lid) || config.lid < 1 || !Number.isSafeInteger(config.revision) || config.revision < 1 ||
      !text(config.title, 200) || !Array.isArray(config.steps) || !config.steps.length || config.steps.length > 50) return false;
  const ids = new Set<string>();
  return config.steps.every(step => {
    if (!step || !key(step.id) || ids.has(step.id) || !key(step.target) || !text(step.title, 200) ||
        !text(step.description, 2000) || (step.optional !== undefined && typeof step.optional !== "boolean")) return false;
    ids.add(step.id);
    return true;
  });
}
