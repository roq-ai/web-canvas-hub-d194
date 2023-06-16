const mapping: Record<string, string> = {
  agencies: 'agency',
  projects: 'project',
  tasks: 'task',
  'team-member-projects': 'team_member_project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
