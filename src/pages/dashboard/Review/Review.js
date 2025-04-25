/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
// import * as Yup from 'yup';
import MaterialReactTable from 'material-react-table';
// import EditIcon from '@mui/icons-material/Edit';

// import { useLocation,useNavigate } from 'react-router-dom';
// @mui
import { Box, Container, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
// redux
// import { useSnackbar } from 'notistack';
import { useSnackbar } from 'notistack';

// import { LoadingButton } from '@mui/lab';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Modal } from 'react-bootstrap';
// import { useSnackbar } from 'notistack';
// import axios from '../../../utils/axios';
// import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
// import Iconify from '../../../components/Iconify';
// import { FormProvider, RHFTextField, RHFDescription } from '../../../components/hook-form';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import axiosInstance from '../../../utils/axios';

export default function Review() {
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  // const location = useLocation();
  const [Data, setdata] = useState('');
  // const [show, setShow] = useState(false);
  const GetData = () => {
    axiosInstance
      .get(`/api/admin/get/all/artifacts`)
      .then((response) => {
        // console.log(response);
        if (response.data.data) {
          setdata(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    GetData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 5,
      },
      {
        accessorKey: 'artifact',
        header: 'artifact',
        size: 10,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 10,
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        size: 10,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 10,
      },
      {
        accessorKey: 'organization',
        header: 'Organization',
        size: 10,
      },
      {
        accessorKey: 'phone',
        header: 'phone',
        size: 10,
      },
      // {
      //   accessorKey: 'review_request',
      //   header: 'Request Status',
      //   size: 10,
      //   Cell: ({ row }) =>
      //     row?.original?.review_request?.status === 1 ? (
      //       <Button
      //         variant="contained"
      //         color="success"
      //         endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
      //       >
      //         Resolve
      //       </Button>
      //     ) : row?.original?.review_request?.status === 0 ? (
      //       <Button variant="contained"  color="warning">
      //         Pending
      //       </Button>
      //     ) : (
      //       <Button
      //         variant="contained"
      //         color="error"
      //         onClick={() => {
      //           setReviewID(row?.original?.id);
      //           setShow(true);
      //         }}
      //       >
      //         Report
      //       </Button>
      //     ),
      // },
    ],
    []
  );

  // const reviewSchema = Yup.object().shape({
  //   title: Yup.string()
  //     .required('Title is required')
  //     .min(6, 'Title must be at least 6 characters'),
  //   description: Yup.string().required('Description is required'),
  // });

  // const defaultValues = useMemo(
  //   () => ({
  //     title: '',
  //     description: '',
  //   }),
  //   []
  // );

  // const methods = useForm({
  //   resolver: yupResolver(reviewSchema),
  //   defaultValues,
  // });

  // const {
  // watch,
  // reset,
  // handleSubmit,
  // formState: { isSubmitting },
  // } = methods;
  // const values = watch();

  // const OnSubmit = async () => {
  //   try {
  //     const review= new FormData()
  //     review?.append('title',values?.title)
  //     review?.append('description',values?.description)
  //     await axios.post(`/api/clinic/provider/reviews/${reviewID}/mark_flag_hidden`,review).then((response) => {
  //       if (response?.data?.status === true) {
  //         reset()
  //         setShow(false)
  //         enqueueSnackbar(response?.data?.response);
  //         navigate(PATH_DASHBOARD.spell.spell);
  //         // dispatch(getRaritys());
  //       }
  //     });
  //   } catch (error) {
  //     reset()
  //     setShow(false)
  //     enqueueSnackbar(error?.error, {
  //       variant: 'error',
  //     });

  //     console.error(error);
  //   }
  // }
  // const handleClose = () => {
  //   setShow(false);
  //   reset();
  // };
  async function handleDelete(rowdata) {
    const data = new FormData();
    data.append('id', rowdata);

    try {
      await axiosInstance.post(`api/admin/del/artifact`, data).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar('Deleted Successfully');
          GetData();
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }
  return (
    <Page title="Reviews">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs heading="Artifacts Donation" links={[{ name: '', href: '' }]} />

        <MaterialReactTable
          columns={columns}
          data={Data}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '10px',
                justifyContent: 'flex-center',
              }}
            >
              <IconButton
                color="error"
                sx={{
                  border: '1px solid',
                  borderColor: 'error.main',
                }}
                onClick={() => {
                  handleDelete(row.original.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          positionActionsColumn="last"
        />
        {/* <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-center" centered>
          <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>Compose Review Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={3} pb={2}>
                    <RHFTextField name="title" label="Title" />
                  </Stack>

                  <Stack spacing={3} pt={2}>
                    <RHFDescription
                      name="description"
                      label="Description for Request"
                      multiline
                      rows={3}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Modal.Body>
            <Modal.Footer>
              <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </Modal.Footer>
          </FormProvider>
        </Modal> */}
      </Container>
    </Page>
  );
}
