import { UserInterface } from 'interfaces/user';
import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberProjectInterface {
  id?: string;
  user_id: string;
  project_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  project?: ProjectInterface;
  _count?: {};
}

export interface TeamMemberProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  project_id?: string;
}
