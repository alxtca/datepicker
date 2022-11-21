import {Note} from "./note";

export class User {
  id!: number;
  birthDate!: string;
  name!: string;
  avatar!: string;
  bio!: string;

  notes: Note[] = [];
}
