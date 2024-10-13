declare module 'exif-js' {
    export function getData(_img: any, callback: () => void): void;
    export function getTag(_img: any, tag: string): any;
    export function getAllTags(_img: any): Record<string, any>;
    export function readFromBinaryFile(file: ArrayBuffer): any;
}
  