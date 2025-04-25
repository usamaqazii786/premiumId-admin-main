/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Button, Container, Grid, Stack, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from '../../../redux/store';
import { getappointments } from '../../../redux/slices/appoint';
import axios from '../../../utils/axios';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFDescription, RHFSelect } from '../../../components/hook-form';

export default function Appointment() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [appointmentID, setAppointmentID] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 1,
      },
      {
        accessorKey: 'student.fname',
        header: 'Student Name',
        size: 10,
        Cell: ({ row }) => `${row.original.student.fname} ${row.original.student.lname}`,
      },
      {
        accessorKey: 'student.email',
        header: 'Student Email',
        size: 20,
        Cell: ({ row }) => row.original.student.email,
      },
      {
        accessorKey: 'student.address',
        header: 'Student Address',
        size: 20,
        Cell: ({ row }) => row.original.student.address,
      },
      {
        accessorKey: 'student.city',
        header: 'Student City',
        size: 20,
        Cell: ({ row }) => row.original.student.city,
      },
     
      {
        accessorKey: 'date',
        header: 'Date',
        size: 10,
      },
      {
        accessorKey: 'slot.start_time',
        header: 'Start time',
        size: 10,
        Cell: ({ row }) => {
          const startTime = new Date(`2024-01-01T${row.original.slot.start_time}`);
          const startTimeFormatted = startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          });

          return <span>{startTimeFormatted}</span>;
        },
      },
      {
        accessorKey: 'slot.end_time',
        header: 'End time',
        size: 10,
        Cell: ({ row }) => {
          const endTime = new Date(`2024-01-01T${row.original.slot.end_time}`);
          const endTimeFormatted = endTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          });

          return <span>{endTimeFormatted}</span>;
        },
      },
      {
        accessorKey: 'slot.provider.lname',
        header: 'Provider Name',
        size: 10,
        Cell: ({ row }) => `${row.original.slot.provider.fname} ${row.original.slot.provider.lname}`,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 10,
        Cell: ({ row }) =>
          row?.original?.status === 'pending' ? (
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={() => {
                setAppointmentID(row?.original?.id)
                setShow(true);
              }}
            >
              Pending
            </Button>
          ) : row?.original?.status === 'approved' ? (
            <Button
              fullWidth
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
              onClick={() => {
                setAppointmentID(row?.original?.id)
                setShow(true);
              }}
            >
              Approved
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              endIcon={<Iconify icon={'eva:close-circle-fill'} />}
              onClick={() => {
                setAppointmentID(row?.original?.id)
                setShow(true);
              }}
            >
              Reject
            </Button>
          ),
      },
      {
        accessorKey: 'is_cancel',
        header: 'Appoinmnet Cancel',
        size: 10,
        Cell: ({ row }) =>
          row?.original?.is_cancel === 0 ? (
            <Button
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:close-circle-fill'} />}
              onClick={() => {
                setAppointmentID(row?.original?.id)
                setShow1(true);
              }}
            >
              Not Cancel
            </Button>
          ): (
            <Button
              variant="contained"
              color="error"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
            >
              Cancel
            </Button>
          ),
      },
      {
        accessorKey: 'cancel_reason',
        header: 'Cancel reason',
        size: 20,
        Cell: ({ row }) => row.original.cancel_reason,
      },
      {
        accessorKey: 'student.image',
        header: 'Student Image',
        size: 2,
        Cell: ({ row }) => (
          <img
            src={row?.original?.student.image}
            alt="student-img"
            style={{ width: '60px', height: '60px', borderRadius: '15px' }}
          />
        ),
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appoint);
  const [tableData, setTableData] = useState([]);
  
  const appointmentSchema = Yup.object().shape({
    status: Yup.string().required('Status is required'),
    reason: Yup.string().when('status', {
      is: 'deny',
      then: Yup.string().required('Status is required'),
    }),
    cancel_reason: Yup.string().when('status', {
      is: 'cancel',
      then: Yup.string().required('Cancellation Reason is required'),
    })
  });

  const defaultValues = useMemo(
    () => ({
      reason: '',
      status: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(getappointments());
  }, [dispatch]);

  useEffect(() => {
    if (appointments?.length > 0) {
      setTableData(appointments);
    }
  }, [appointments]);

  const OnSubmit = async () => {
    try {
      const appointment = new FormData();
      appointment.append('status', values.status);
      values?.status === "deny" && appointment.append('reason', values?.reason);
      await axios.post(`/api/clinic/appointments/${appointmentID}/approve_reject`,appointment)
      .then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar(`Appointment ${response?.data?.data}`);
          reset()
          dispatch(getappointments());
          setShow(false)
        }
        // else{
        //   enqueueSnackbar('The reason field is required when status is deny.', {
        //     variant: 'error',
        //   });
        //   dispatch(getappointments());
        //   reset()
        //   setShow(false)
        // }
      });
    } catch (error) {
      reset()
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }

  const OnSubmit1 = async () => {
    try {
      const cancel = new FormData();
      cancel.append('cancel_reason', values?.cancel_reason);
      await axios.post(`/api/clinic/appointments/${appointmentID}/cancel`,cancel)
      .then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar(`${response?.data?.response}`);
          reset()
          dispatch(getappointments());
          setShow1(false)
        }
      });
    } catch (error) {
      reset()
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleClose1 = () => {
    setShow1(false);
    reset();
  };
  
  const values = watch();
  
  return (
    <Page title="Appointment">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs heading="Appointment" links={[{ name: '', href: '' }]} />

        <MaterialReactTable
          columns={columns}
          data={tableData}
        
          positionActionsColumn="last"
        />
      </Container>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-center" centered>
        <FormProvider methods={methods}  onSubmit={handleSubmit(OnSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Appointment Response</Modal.Title>
          </Modal.Header>
          <Modal.Body>  
           
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Stack spacing={3} pb={2}>
                  <RHFSelect
                    name="status"
                    label="Appointment Status"
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  >
                    <MenuItem
                      value="approved"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      Approved
                    </MenuItem>
                    <MenuItem
                      value="deny"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      Reject
                    </MenuItem>
                  </RHFSelect>
                </Stack>
                {values?.status === 'deny' &&
                 <Stack spacing={3} pt={2}>
                 <RHFDescription
                   name="reason"
                   label="Reason For Rejection"
                   multiline
                   rows={3}
                   InputLabelProps={{ shrink: true }}
                 />
               </Stack>
                }
               
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
      <Modal show={show1} onHide={handleClose1} aria-labelledby="contained-modal-title-center" centered>
        <FormProvider methods={methods}  onSubmit={handleSubmit(OnSubmit1)}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Appointment </Modal.Title>
          </Modal.Header>
          <Modal.Body>  
           
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Stack spacing={3} pb={2}>
                  <RHFSelect
                    name="status"
                    label="Appointment Cancellation"
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  >
                    <MenuItem
                      value="cancel"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      Cancel
                    </MenuItem>
                  </RHFSelect>
                </Stack>
                 <Stack spacing={3} pt={2}>
                 <RHFDescription
                   name="cancel_reason"
                   label="Reason For Cancellation"
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
      </Modal>
    </Page>
  );
}
