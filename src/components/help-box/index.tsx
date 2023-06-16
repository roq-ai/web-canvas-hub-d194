import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Client', 'Team Member', 'Business Owner'];
  const applicationName = `Web Canvas Hub`;
  const tenantName = `Agency`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As a Business Owner, I want to create an Agency account so that I can manage my web design, app development, and SEO projects.

2. As a Business Owner, I want to invite Team Members to join my Agency so that they can collaborate on projects with me and my clients.

3. As a Business Owner, I want to create individual projects for each client so that I can manage their specific needs and requirements.

4. As a Business Owner, I want to assign Team Members to specific projects so that they can work on tasks related to those projects.

5. As a Team Member, I want to view the projects I am assigned to so that I can work on tasks and collaborate with the Business Owner and clients.

6. As a Team Member, I want to update the status of tasks on the kanban board so that the Business Owner and clients can track the progress of the project.

7. As a Business Owner, I want to share files with my clients and Team Members so that we can collaborate on project assets and documents.

8. As a Client, I want to view the progress of my project on the kanban board so that I can stay informed about the status of my web design, app development, or SEO project.

9. As a Client, I want to communicate with the Business Owner and Team Members through live chat so that I can ask questions, provide feedback, and discuss project details.

10. As a Client, I want to access and download shared files related to my project so that I can review and approve assets and documents.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
