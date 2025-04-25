/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { Box, Container, IconButton,Tooltip,Grid,Stack,MenuItem,Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../redux/store';
import { getCreview } from '../../../redux/slices/creview';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFSelect } from '../../../components/hook-form';


export default function Creview() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { creviews } = useSelector((state) => state.creview);
//   const navigate = useNavigate();
  const [reviewID, setReviewID] = useState('');
  const [show, setShow] = useState(false);
  // const location = useLocation();
  // const { data } = location.state;
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 10,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 20,
      },
      {
        accessorKey: 'review.review',
        header: 'Student Review',
        size: 20,
      },
      {
        accessorKey: 'review.provider.fname',
        header: 'Provider Name',
        Cell: ({ row }) =>
         <div>
          {`${row?.original?.review?.provider?.fname} ${row?.original?.review?.provider?.lname}`}
         </div>,
        size: 10,
      },
      {
        accessorKey: 'status',
        header: 'Request Status',
        size: 10,
        Cell: ({ row }) =>
          row?.original?.status === 1 ? (
            <Button
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
            >
              Resolve
            </Button>
          ): (
            <Button variant="contained"  color="warning">
              Pending 
            </Button>
          ),
      },
     
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getCreview(id));
  }, [dispatch]);

  useEffect(() => {
    if (creviews?.length > 0) {
      setTableData(creviews);
    }
  }, [creviews]);

  const reviewSchema = Yup.object().shape({
    status: Yup.string().required('This field is required'),
  });

  const defaultValues = useMemo(
    () => ({
        status: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();


  const OnSubmit = async () => {
    try {
        const form = new FormData();
        form.append('is_flagged',values?.status === "flagged" ? 1 : 0);
        form.append('is_hidden', values?.status === "hidden" ? 1 : 0);
      await axios.post(`/api/company/review_requests/${reviewID}`,form,{
        headers: {
          Accept: "application/json"
        }
      }).then((response) => {
          console.log('response',response);
        if (response?.data?.status === true) {
          enqueueSnackbar(response?.data?.response);
          setShow(false)
          reset()
          dispatch(getCreview(id));
        }
        else{
            enqueueSnackbar(response?.data?.error, {
                variant: 'error',
            });
            setShow(false)
            reset()
        }
      });
    } catch (error) {
      console.log('error',error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      setShow(false)
      reset()
      console.error(error);
    }
  }

  const handleClose = () => {
    setShow(false);
    reset();
  };


  return (
    <Page title="Review Request">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={`Review Request`}
          links={[{ name: '', href: '' }]}
        //   action={
            // <Button
            //   variant="contained"
            //   startIcon={<Iconify icon="eva:plus-fill" />}
            //   component={RouterLink}
            //   to={PATH_DASHBOARD.slot.addslotById(id)}
            // >
            //   Add Slot
            // </Button>
        //   }
        />

        <MaterialReactTable
          columns={columns}
          data={tableData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '5px',
                justifyContent: 'flex-center',
              }}
            >
             <Tooltip title="Resolve Request">
                <IconButton
                  color="success"
                  sx={{
                    border: '1px solid',
                    borderColor: 'success.main',
                  }}
                  onClick={() => {
                    setReviewID(row?.original?.review_id);
                    setShow(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          positionActionsColumn="last"
        />
      </Container>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-center" centered>
          <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>Request Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={3} pb={2}>
                    <RHFSelect
                      name="status"
                      label="Rview Status"
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                    >
                      <MenuItem
                        value="flagged"
                        sx={{
                          mx: 1,
                          my: 0.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          textTransform: 'capitalize',
                        }}
                      >
                        Flagged
                      </MenuItem>
                      <MenuItem
                        value="hidden"
                        sx={{
                          mx: 1,
                          my: 0.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          textTransform: 'capitalize',
                        }}
                      >
                        Hidden
                      </MenuItem>
                    </RHFSelect>
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
        </Modal>

   
    </Page>
  );
}
