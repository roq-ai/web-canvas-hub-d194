import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTeamMemberProjectById, updateTeamMemberProjectById } from 'apiSdk/team-member-projects';
import { Error } from 'components/error';
import { teamMemberProjectValidationSchema } from 'validationSchema/team-member-projects';
import { TeamMemberProjectInterface } from 'interfaces/team-member-project';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ProjectInterface } from 'interfaces/project';
import { getUsers } from 'apiSdk/users';
import { getProjects } from 'apiSdk/projects';

function TeamMemberProjectEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TeamMemberProjectInterface>(
    () => (id ? `/team-member-projects/${id}` : null),
    () => getTeamMemberProjectById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TeamMemberProjectInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTeamMemberProjectById(id, values);
      mutate(updated);
      resetForm();
      router.push('/team-member-projects');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TeamMemberProjectInterface>({
    initialValues: data,
    validationSchema: teamMemberProjectValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Team Member Project
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<ProjectInterface>
              formik={formik}
              name={'project_id'}
              label={'Select Project'}
              placeholder={'Select Project'}
              fetcher={getProjects}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'team_member_project',
  operation: AccessOperationEnum.UPDATE,
})(TeamMemberProjectEditPage);
