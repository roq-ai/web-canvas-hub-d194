import { TaskInterface } from 'interfaces/task';
import { TeamMemberProjectInterface } from 'interfaces/team-member-project';
import { AgencyInterface } from 'interfaces/agency';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  agency_id: string;
  client_id: string;
  created_at?: any;
  updated_at?: any;
  task?: TaskInterface[];
  team_member_project?: TeamMemberProjectInterface[];
  agency?: AgencyInterface;
  user?: UserInterface;
  _count?: {
    task?: number;
    team_member_project?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  agency_id?: string;
  client_id?: string;
}
