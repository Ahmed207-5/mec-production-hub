import * as production from "./production";
import * as power from "./power";
export const archives={production,power};
export const defaultDepartment="production";
export type DepartmentId=keyof typeof archives;
export const getArchive=(id:DepartmentId=defaultDepartment)=>archives[id];
