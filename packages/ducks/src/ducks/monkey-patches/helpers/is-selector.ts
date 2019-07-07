export function isSelector(candidate: any): boolean {
  return !!candidate.release && !!candidate.projector;
}
