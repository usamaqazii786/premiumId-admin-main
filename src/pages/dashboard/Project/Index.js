/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// import * as Yup from 'yup';
import { Delete as DeleteIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, IconButton } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { LoadingButton } from '@mui/lab';
// import { Modal } from 'react-bootstrap';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import { getprojects } from '../../../redux/slices/project';
import { useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
// import { FormProvider, RHFSelect } from '../../../components/hook-form';

export default function Project() {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 1,
      },
      // {
      //   accessorKey: 'title',
      //   header: 'Title',
      //   size: 10,
      // },
      {
        header: 'Image',
        accessorKey: 'image',
        size: 10,
        Cell: ({ value, row }) => (
          <>
            <img
              alt="homes"
              src={row.original.image}
              style={{ width: '48px', height: '48px', borderRadius: '8px', flexShrink: 0, marginRight: '12px' }}
            />
            {console.log(row.original, value, 'image URL -->')}
          </>
        ),
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { projects } = useSelector((state) => state.project);
  console.log(projects, 'name--->');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getprojects());
  }, []);

  useEffect(() => {
    if (projects?.length) {
      setTableData(projects);
    }
  }, [projects]);

  async function handleDelete(id) {
    try {
      await axios.delete(`/project/${id}`).then((response) => {
        console.log(response?.data, 'delete-->');
        console.log(response?.data?.status, 'delete-->');
        if (response?.status) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getprojects());
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
    <Page title="Project list">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Project list"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.projects.addproject}
            >
              New Project list
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
                  navigate(PATH_DASHBOARD.projects.editproject(row?.original?.id));
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
