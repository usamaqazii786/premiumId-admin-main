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
import { getboxs } from '../../../redux/slices/box';
import axios from '../../../utils/axios';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// import { FormProvider, RHFSelect } from '../../../components/hook-form';

export default function Magictype() {
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
        header: 'title',
        size: 10,
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
    ],
    []
  );

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { boxs } = useSelector((state) => state?.box);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getboxs());
  }, []);

  useEffect(() => {
    if (boxs?.length) {
      setTableData(boxs);
    }
  }, [boxs]);

  async function handleDelete(id) {
    try {
      await axios.delete(`/admin/dynamic-box-page/${id}`).then((response) => {
        console.log(response?.data, 'delete-->');
        console.log(response?.data?.status, 'delete-->');
        if (response?.status) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getboxs());
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
    <Page title="Box">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Box"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.box.addbox}
            >
              New Box
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
                  navigate(PATH_DASHBOARD.box.editbox(row?.original?.id));
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
