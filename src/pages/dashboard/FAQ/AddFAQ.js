import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Container, Grid, Stack} from '@mui/material';
// routes
import { useMemo } from 'react';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { FormProvider, RHFTextField} from '../../../components/hook-form';

export default function AddTag() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewStudentSchema = Yup.object().shape({
    answer: Yup.string().required('answer is required'),
    question: Yup.string().required('question is required'),
  });

  const defaultValues = useMemo(
    () => ({
      answer: '',
      question: '',
    }),
    //  eslint-disable-next-line react-hooks/exhaustive-deps
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
      await axios
        .post('admin/faq', faq)

        .then((response) => {
          console.log(response?.status,'response?.status--->');
          if (response?.status) {
            enqueueSnackbar('Faq Created Successfully');
            reset();
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
      <HeaderBreadcrumbs heading="Add Faq" links={[{ name: '', href: '' }]} />
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
                      Create Faq
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
