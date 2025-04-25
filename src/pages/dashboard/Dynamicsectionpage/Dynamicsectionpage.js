/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// import * as Yup from 'yup';
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Container, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import { LoadingButton } from '@mui/lab';
// import { Modal } from 'react-bootstrap';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useDispatch, useSelector } from '../../../redux/store';
import { getdynamicSectionPages } from '../../../redux/slices/dynamicSectionPage';
import axios from '../../../utils/axios';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// import { FormProvider, RHFSelect } from '../../../components/hook-form';

export default function Dynamicsectionpage() {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 1,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 10,
        // @ts-ignore
        Cell: ({ row }) => 
            (
              <div>{row?.original?.title}</div>
            ),
      },
      {
        accessorKey: 'description',
        header: 'description',
        size: 20,
      },
      {
        accessorKey: 'section',
        header: 'section',
        size: 10,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        size: 10,
      },
      {
        accessorKey: 'image',
        header: 'Image',
        size: 10,
      },
      // {
      //   accessorKey: 'email',
      //   header: 'Email',
      //   size: 10,

      // },
      // {
      //   accessorKey: 'payment',
      //   header: 'Payment Status',
      //   size: 10,
      //   Cell: ({ row }) =>
      //     row?.original?.payment !== null ? (
      //       <Button
      //         fullWidth
      //         variant="contained"
      //         color="success"
      //         endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
      //         // onClick={() => {
      //         //   handleStatus(row?.original?.id);
      //         // }}
      //       >
      //         Paid
      //       </Button>
      //     ) : (
      //       <Button
      //         fullWidth
      //         variant="contained"
      //         color="error"
      //         endIcon={<Iconify icon={'eva:close-circle-fill'} />}
      //         // onClick={() => {
      //         //   handleStatus(row?.original?.id);
      //         // }}
      //       >
      //         Unpaid
      //       </Button>
      //     ),
      // },
      // {
      //   accessorKey: 'website',
      //   header: 'website',
      //   size: 10,
      //   Cell: ({ row }) => (

      //     // eslint-disable-next-line react/jsx-no-target-blank
      //     <a href={`${row?.original?.website}/${row?.original?.website}`} target='_blank'>
      //   {row?.original?.website}

      //       </a>
      //   ),

      // },
    ],
    []
  );

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { dynamicSectionPages } = useSelector((state) => state.dynamicSectionPage);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getdynamicSectionPages());
  }, []);

  useEffect(() => {
    if (dynamicSectionPages?.length) {
      setTableData(dynamicSectionPages);
    }
  }, [dynamicSectionPages]);

  async function handleDelete(id) {
    try {
      await axios.delete(`/admin/dynamic-section-page/${id}`).then((response) => {
        console.log(response?.data, 'delete-->');
        console.log(response?.data?.status, 'delete-->');
        if (response?.status) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getdynamicSectionPages());
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
    <Page title="Dynamic Section Page">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Dynamic Section Page"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.dynamicsectionpage.adddynamicsectionpage}
            >
              New Dynamic Section Page
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
                gap: '10px',
                justifyContent: 'flex-center',
              }}
            >
              <IconButton
                color="success"
                sx={{
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
                onClick={() => {
                  navigate(PATH_DASHBOARD.dynamicsectionpage.editdynamicsectionpage(row?.original?.id));
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
