import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  name: string;
  project_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  _count?: {};
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  project_id?: string;
  status?: string;
}
