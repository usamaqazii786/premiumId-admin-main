/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Delete as DeleteIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, IconButton, Dialog, Stack, Typography, Divider, Grid, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getSpells } from '../../../redux/slices/spell';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import BaseUrl from '../../../BaseUrl/BaseUrl';
import image from './image.jpeg';

export default function Spell() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 10,
      },

      {
        accessorKey: 'first_name',
        header: 'First Name',
        size: 10,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 10,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 10,
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone',
        size: 10,
      },
      {
        accessorKey: 'status',
        header: 'Type',
        size: 10,
      },
     
    ],
    []
  );

  const dispatch = useDispatch();
  const { spells } = useSelector((state) => state.spell);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    dispatch(getSpells());
  }, []);

  useEffect(() => {
    if (spells) {
      setTableData(spells);
    }
  }, [spells]);

  async function handleDelete() {
    try {
      await axios.delete(`admin/memberships/${deletedId}`).then((response) => {
        if (response?.data) {
          setShow(false);
          enqueueSnackbar('Deleted Successfully');
          dispatch(getSpells());
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
    <>
      <Page title="Membership">
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading="Membership Users"
            links={[{ name: '', href: '' }]}
            action={
              <></>
              // <Button
              //   variant="contained"
              //   startIcon={<Iconify icon="eva:plus-fill" />}
              //   component={RouterLink}
              //   to={PATH_DASHBOARD.spell.addspell}
              // >
              //   New Client
              // </Button>
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
                        navigate(PATH_DASHBOARD.spell.detail(row?.original?.id), {
                          state: {
                            data: {
                             data:row.original
                            }
                          }
                        });
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
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
    </>
  );
}
