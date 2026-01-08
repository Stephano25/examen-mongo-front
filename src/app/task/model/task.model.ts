export interface Task {
  _id?: string;   // identifiant MongoDB obligatoire
  title: string;
  description: string;
  status: 'EN_COURS' | 'TERMINEE';
  createdAt?: Date;
  updatedAt?: Date;
}
