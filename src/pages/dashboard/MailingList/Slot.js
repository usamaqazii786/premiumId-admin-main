/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Effect() {

  const location = useLocation();
  const { data } = location.state;
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'date',
        header: 'Date',
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
        accessorKey: 'repeat',
        header: 'Repeat',
        size: 10,
      },
      {
        accessorKey: 'student_limit',
        header: 'Student limit',
        size: 10,
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);
  console.log(tableData,'navigate state---------->>>')

  useEffect(() => {
    if (data?.slot?.length > 0) {
      setTableData(data.slot);
    }
  }, [data]);


  return (
    <Page title="All Slot">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={`All Slot for ${data?.name}`}
          links={[{ name: '', href: '' }]}
        />

        <MaterialReactTable
          columns={columns}
          data={tableData}
          positionActionsColumn="last"
        />
      </Container>

   
    </Page>
  );
}
