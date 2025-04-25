/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import {useMemo } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container} from '@mui/material';
// routes
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField} from '../../../components/hook-form';

export default function EditDom() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { faqs } = useSelector((state) => state?.faq);

  const currenttag = faqs?.find((tag) => tag?.id === +id);
  console.log(currenttag,faqs,'currenttag--->');

  const NewStudentSchema = Yup.object().shape({
    answer: Yup.string().required('answer is required'),
    question: Yup.string().required('question is required'),

  });
  const defaultValues = useMemo(
    () => ({
      answer: currenttag?.answer || '',
      question: currenttag?.question || ''
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewStudentSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async () => {
    const formValues = getValues();
    console.log(formValues);
    try {
      const faq = new FormData();
      faq.append('question', formValues?.question);
      faq.append('answer', formValues?.answer);
      faq.append('_method', "put");

      await axios
        .post(`admin/faq/${id}`, faq)

        .then((response) => {
          if (response?.status) {
            reset();
            enqueueSnackbar("Faq Edit Successfully");
            navigate(PATH_DASHBOARD.faq.faq);
          }
        });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Faq" links={[{ name: '', href: '' }]} />
      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                <RHFTextField name="question" label="question" InputLabelProps={{ shrink: true }} />
                <RHFTextField name="answer" label="answer" InputLabelProps={{ shrink: true }} />
                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Edit 
                    </LoadingButton>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </Container>
  );
}
