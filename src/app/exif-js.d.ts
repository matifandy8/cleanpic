declare module "exif-js" {
  export function getData(_img: File, callback: () => void): void;
  export function getTag(_img: File, tag: string): string | undefined;
  export function getAllTags(_img: File): Record<string, string | undefined>;
  export function readFromBinaryFile(file: ArrayBuffer): void;
}
