/**
 * Merge classnames with Tailwind CSS
 */
export function cn(...classes: (string | undefined | null | Record<string, boolean>)[]): string {
  return classes
    .flat()
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ');
}