import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { projectValidationSchema } from 'validationSchema/projects';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getProjects();
    case 'POST':
      return createProject();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProjects() {
    const data = await prisma.project
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'project'));
    return res.status(200).json(data);
  }

  async function createProject() {
    await projectValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.task?.length > 0) {
      const create_task = body.task;
      body.task = {
        create: create_task,
      };
    } else {
      delete body.task;
    }
    if (body?.team_member_project?.length > 0) {
      const create_team_member_project = body.team_member_project;
      body.team_member_project = {
        create: create_team_member_project,
      };
    } else {
      delete body.team_member_project;
    }
    const data = await prisma.project.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
