/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Button, Container,Box,Tooltip,IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from '../../../redux/store';
import { getTodayShadow } from '../../../redux/slices/todayShadow';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function TodayShadow() {

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
        accessorKey: 'attendance',
        header: 'Attendance',
        size: 10,
        Cell: ({ row }) => {
          const appointmentDate = new Date(row.original.date);
          const currentDate = new Date();
          const attendanceStatus = row.original.attendance?.status;
  
          if (currentDate > appointmentDate) {
            return attendanceStatus ? (
              <Button
                fullWidth
                variant="contained"
                color="success"
                endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
              >
                Present
              </Button>
            ) : (
              <Button fullWidth variant="contained" color="error" endIcon={<Iconify icon={'eva:close-circle-fill'} />}>
                Absent
              </Button>
            );
          // eslint-disable-next-line no-else-return
          } else {
            return attendanceStatus ? (
              <Button
                fullWidth
                variant="contained"
                color="success"
                endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
              >
                Present
              </Button>
            ) : (
              <Button fullWidth variant="contained" color="warning">
                Pending
              </Button>
            );
          }
        },
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
            >
              Pending
            </Button>
          ) : row?.original?.status === 'approved' ? (
            <Button
              fullWidth
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
            
            >
              Approved
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              endIcon={<Iconify icon={'eva:close-circle-fill'} />}
           
            >
              Reject
            </Button>
          ),
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
  const { todayShadows } = useSelector((state) => state.todayShadow);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getTodayShadow());
  }, [dispatch]);

  useEffect(() => {
    if (todayShadows?.length > 0) {
      setTableData(todayShadows);
    }
  }, [todayShadows]);
  
  return (
    <Page title="Today Shadows">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs heading="Today Shadows" links={[{ name: '', href: '' }]} />

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
                <Tooltip arrow title="View Detail">
                  <IconButton
                    sx={{
                      border: '1px solid',
                      borderColor: 'success.main',
                    }}
                    color="success"
                    onClick={() => {
                        navigate(PATH_DASHBOARD.appointment.studentDetail, {
                          state: {
                            data: row.original.student,
                            additionalInfo: row.original.additional_requirement,
                            signature: row.original.signature
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
  );
}
