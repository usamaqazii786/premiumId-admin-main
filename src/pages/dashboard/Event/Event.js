/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../redux/store';
import { getEvents } from '../../../redux/slices/event';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Effect() {

  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const navigate = useNavigate();
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
        accessorKey: 'start_time',
        header: 'Start time',
        size: 10,
        Cell: ({ row }) => {
          const startTime = new Date(`2024-01-01T${row.original.start_time}`);
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
        accessorKey: 'end_time',
        header: 'End time',
        size: 10,
        Cell: ({ row }) => {
          const endTime = new Date(`2024-01-01T${row.original.end_time}`);
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
        accessorKey: 'event_date',
        header: 'Event date',
        size: 10,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        size: 10,
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (events?.length > 0) {
      setTableData(events);
    }
  }, [events]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`admin/event/${rowdata}`).then((response) => {
        console.log('delete');
        if (response?.data) {
          enqueueSnackbar('event Deleted Successfully');
          dispatch(getEvents());
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
    <Page title="All Event">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={`All Event`}
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.event.addevent}
            >
              Add Event
            </Button>
          }
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
              <IconButton
                sx={{
                  border: '1px solid',
                  borderColor: 'primary.main',
                }}
                color="primary"
                onClick={() => {
                  navigate(PATH_DASHBOARD.event.editevent(row.original.id));
                }}
              >
                <EditIcon />
              </IconButton>

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
      </Container>

   
    </Page>
  );
}
