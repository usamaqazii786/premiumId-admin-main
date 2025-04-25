/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {  Link as RouterLink, Link } from 'react-router-dom';
// @mu
import { Box, Container, IconButton, Button, Divider } from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
// routes
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import axiosInstance from '../../../utils/axios';

export default function UsersData() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setdata] = useState([]);
  async function GetData() {
    try {
      axiosInstance.get(`/api/admin/get/subscriptions/with/clients`).then((res) => {
        console.log(res);
        if (res.data.status === true) {
          setdata(res?.data?.data);
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }
  useEffect(() => {
    GetData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 20,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 20,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 20,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 20,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 20,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 20,
      },
      {
        accessorKey: 'new_plan_id',
        header: 'Plan Name',
        size: 20,
        Cell: ({ row }) =>
          row?.original?.new_plan_id === 1 ? (
            <p>
              Individual
            </p>
          ) :   (
            <p>
           Organization or Business
          </p>
          ) ,
      },
      {
        accessorKey: 'start_date',
        header: 'start Date',
        size: 20,
      },
      {
        accessorKey: 'expiry_date',
        header: 'expiry Date',
        size: 20,
      },

      {
        accessorKey: 'status',
        header: 'Status',
        size: 10,
        Cell: ({ row }) =>
          row?.original?.status === 'active' ? (
            <Button
              fullWidth
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
              // onClick={() => {
              //   handleStatus(row?.original?.id);
              // }}
            >
              Active
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              endIcon={<Iconify icon={'eva:close-circle-fill'} />}
              // onClick={() => {
              //   handleStatus(row?.original?.id);
              // }}
            >
              Deactive
            </Button>
          ),
      },
    ],
    []
  );
  // async function handleStatus(id) {
  //   try {
  //     await axiosInstance.put(`/api/clinic/providers/${id}/active_deactive`).then((response) => {
  //       if (response?.data?.status === true) {
  //         enqueueSnackbar('Provider Status Changed Successfully');
  //         GetData()
  //       }
  //     });
  //   } catch (error) {
  //     enqueueSnackbar(error?.message, {
  //       variant: 'error',
  //     });
  //     console.error(error);
  //   }
  // }
//   const navigate = useNavigate();

  // async function handleDelete(rowdata) {
  //   const data = new FormData();
  //   data.append('id', rowdata);

  //   try {
  //     await axios.post(`api/admin/del/participant/org/form`, data).then((response) => {
  //       if (response?.data?.status === true) {
  //         enqueueSnackbar('Deleted Successfully');
  //       }
  //     });
  //   } catch (error) {
  //     enqueueSnackbar(error?.message, {
  //       variant: 'error',
  //     });
  //     console.error(error);
  //   }
  // }

  return (
    <Page title="User">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="User"
          links={[{ name: '', href: '' }]}
          action={
            <></>
            // <Button
            //   variant="contained"
            //   startIcon={<Iconify icon="eva:plus-fill" />}
            //   component={RouterLink}
            //   to={'/dashboard/title'}
            // >
            // video Title
            // </Button>
          }
        />

        <MaterialReactTable
          columns={columns}
          data={data}
    
        />
      </Container>
    </Page>
  );
}
