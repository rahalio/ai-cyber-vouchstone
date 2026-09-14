export function validateApiResponse<T>(data: T, _schema?: unknown): T {
  return data;
}
export function formatValidationError(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
