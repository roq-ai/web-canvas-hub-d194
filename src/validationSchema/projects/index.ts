import * as yup from 'yup';

export const projectValidationSchema = yup.object().shape({
  name: yup.string().required(),
  agency_id: yup.string().nullable().required(),
  client_id: yup.string().nullable().required(),
});
