/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import { Box, Button, Container, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { getClinicProvider } from '../../../redux/slices/clinicProvider';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Spell() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: { clinicName },
  } = location.state;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 10,
      },
      {
        accessorKey: 'fname',
        header: 'First Name',
        size: 5,
        Cell: ({ row }) => {
          return `${row.original.fname} ${row.original.lname}`;
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 10,
      },
     
      {
        accessorKey: 'title',
        header: 'Title',
        size: 10,
      },
      {
        accessorKey: 'level_of_code',
        header: 'Level Code',
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
        accessorKey: 'provider_description',
        header: 'Description',
        size: 10,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 10,
        Cell: ({ row }) =>
          row?.original?.status ? (
            <Button
              fullWidth
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
             
            >
              Active
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              endIcon={<Iconify icon={'eva:close-circle-fill'} />}
             
            >
              Deactive
            </Button>
          ),
      },
      {
        accessorKey: 'image',
        header: 'Image',
        size: 2,
        Cell: ({ row }) => (
          <img
            src={row?.original?.image}
            alt="clinic"
            style={{ width: '60px', height: '60px', borderRadius: '15px' }}
          />
        ),
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { cProviders } = useSelector((state) => state.cProvider);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getClinicProvider(id));
  }, []);

  useEffect(() => {
    if (cProviders.length) {
      setTableData(cProviders);
    }
  }, [cProviders]);

  return (
    <>
      <Page title="Post">
        <Container maxWidth="xl">
        <HeaderBreadcrumbs heading={`Admin Post`}  links={[{ name: '', href: '' }]} />
        {/* <HeaderBreadcrumbs heading={`Clinic name : ${clinicName} , Provider`} links={[{ name: '', href: '' }]} /> */}
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
                <Tooltip arrow title="View Slot">
                  <IconButton
                    sx={{
                      border: '1px solid',
                      borderColor: 'success.main',
                    }}
                    color="success"
                    onClick={() => {
                        navigate(PATH_DASHBOARD.magictype.cSlot(row?.original?.id), {
                          state: {
                            data: {
                             slot:row.original.timeslots,
                             name:`${row.original.fname} ${row.original.lname}`
                            }
                          }
                        });
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            positionActionsColumn="last"
          />
        </Container>
      </Page>
    </>
  );
}
