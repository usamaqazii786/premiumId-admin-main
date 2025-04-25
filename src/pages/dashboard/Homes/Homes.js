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
import { getmainhomes } from '../../../redux/slices/mainhome';
import axios from '../../../utils/axios';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// import { FormProvider, RHFSelect } from '../../../components/hook-form';

export default function Homes() {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 1,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 10,
      },
      {
        header: 'Image',
        accessorKey: 'image',
        size: 10,
        Cell: ({ value,row }) => (
          <>
            <img
              alt="homes"
              src={row.original.image}
              style={{ width: '48px', height: '48px', borderRadius: '8px', flexShrink: 0, marginRight: '12px' }}
            />
            {console.log(row.original,value, 'image URL -->')}
          </>
        ),
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const  {mainhomes}  = useSelector((state) => state.mainhome);
  console.log(mainhomes,'name--->');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getmainhomes());
  }, []);

  useEffect(() => {
    if (mainhomes?.length) {
      setTableData(mainhomes);
    }
  }, [mainhomes]);

  async function handleDelete(id) {
    try {
      await axios.delete(`/home/${id}`).then((response) => {
        console.log(response?.data, 'delete-->');
        console.log(response?.data?.status, 'delete-->');
        if (response?.status) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getmainhomes());
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
    <Page title="home list">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="home list"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.homes.addhomes}
            >
              New home list
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
                  navigate(PATH_DASHBOARD.homes.edithomes(row?.original?.id));
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
