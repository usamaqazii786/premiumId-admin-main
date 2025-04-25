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
import { getProducts } from '../../../redux/slices/product';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

Dorm.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.number,
      benefit: PropTypes.string,
      expectation: PropTypes.string,
    }),
  }),
};
export default function Dorm() {
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
        accessorKey: 'name',
        header: 'Name',
        size: 10,
      },
      {
        accessorKey: 'benefit',
        header: 'Benefit',
        size: 10,
        Cell: ({ row }) => (
          <div>{row?.original?.benefit}</div>
        ),
      },
      {
        accessorKey: 'expectation',
        header: 'Expectation',
        size: 10,
        Cell: ({ row }) => (
          <div>{row?.original?.expectation}</div>
        ),
      },
      {
        accessorKey: 'period',
        header: 'Period',
        size: 10,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 10,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 50,
      },
    ],
    []
  );
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  async function handleDelete() {
    try {
      await axios.delete(`admin/plans/${deletedId}`).then((response) => {
        if (response) {
          setShow(false);
          enqueueSnackbar('Subscription Deleted Sucessfully');
          dispatch(getProducts());
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
    <Page title="Subscription">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Subscription"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.dorm.adddorm}
            >
              New Subscription
            </Button>
          }
        />

        <MaterialReactTable
          state={{ isLoading, showSkeletons: isLoading }}
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
                  navigate(PATH_DASHBOARD.dorm.editdorm(row.original.id));
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
