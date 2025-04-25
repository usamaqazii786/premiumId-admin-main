import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, IconButton, Dialog, Stack, Typography, Divider, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from '../../../redux/store';
import { getpresss } from '../../../redux/slices/press';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

Press.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.number,
      page: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
}

export default function Press() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 5,
      },
      {
        accessorKey: 'page',
        header: 'Page',
        size: 10,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 10,
        // @ts-ignores
        Cell: ({ row }) => (
        <div>{row?.original?.description}</div>
      ),
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { presss } = useSelector((state) => state.press);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getpresss());
  }, [dispatch]);

  useEffect(() => {
    if (presss.length) {
      setTableData(presss);
    }
  }, [presss]);

  async function handleDelete() {
    try {
      await axios.delete(`admin/dynamic-page/${deletedId}`).then((response) => {
        if (response) {
          setShow(false);
          enqueueSnackbar('dynamic page Deleted Sucessfully');
          dispatch(getpresss());
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Page title="dynamic page">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="dynamic page"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.press.addpress}
            >
              New Subscription
            </Button>
          }
        />

        <MaterialReactTable
          // state={{ isLoading, showSkeletons: isLoading }}
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
                  navigate(PATH_DASHBOARD.press.editpress(row.original.id));
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
                  setDeletedId(row.original.id);
                  setShow(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          positionActionsColumn="last"
        />
        <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
          <Stack sx={{ py: 4, px: 4, alignItems: 'center' }} spacing={2}>
            <Iconify icon="mi:delete" width={60} height={60} color="red" />
            {/* Adjust the size */}
            <Typography variant="h6" align="center">
              Do You Want to Delete this?
            </Typography>
            <Typography align="center">Once deleted, you will not be able to recover this!</Typography>
            <Divider sx={{ width: '100%' }} />

            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12}>
                <Stack spacing={2} direction="row" justifyContent="center" py={1} my={1}>
                  <Grid item xs={6} md={6}>
                    <LoadingButton
                      type="button"
                      color="success"
                      variant="outlined"
                      size="medium"
                      onClick={() => handleClose()}
                      endIcon={<Iconify icon={'eva:close-circle-fill'} />}
                      fullWidth
                    >
                      No
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <LoadingButton
                      type="button"
                      color="error"
                      variant="contained"
                      size="medium"
                      onClick={() => handleDelete()}
                      fullWidth
                    >
                      Yes <DeleteIcon />
                    </LoadingButton>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Dialog>
      </Container>
    </Page>
  );
}
