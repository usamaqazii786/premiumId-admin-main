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
import axios from '../../../utils/axios';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { getfaqs } from '../../../redux/slices/faq';
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
        accessorKey: 'question',
        header: 'Question',
        size: 10,
      },
      {
        accessorKey: 'answer',
        header: 'Answer',
        size: 20,
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { faqs } = useSelector((state) => state.faq);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getfaqs());
  }, []);

  useEffect(() => {
    if (faqs?.length) {
      setTableData(faqs);
    }
  }, [faqs]);

  async function handleDelete(id) {
    try {
      await axios.delete(`admin/faq/${id}`).then((response) => {
        console.log(response?.data, 'delete-->');
        console.log(response?.data?.status, 'delete-->');
        if (response?.status) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getfaqs());
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
    <Page title="Faq">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Faq"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.faq.addfaq}
            >
              New Faq
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
                  navigate(PATH_DASHBOARD.faq.editfaq(row.original.id));
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
