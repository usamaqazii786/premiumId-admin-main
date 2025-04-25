/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate, Link as RouterLink, Link } from 'react-router-dom';
// @mui
import { Box, Container, IconButton, Button, Divider } from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getRaritys } from '../../../redux/slices/rarity';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import BaseUrl from '../../../BaseUrl/BaseUrl';
import Vedio from './Vedio';
import ButtonText from './ButtonText';

export default function Rarity() {
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 20,
      },
      {
        accessorKey: 'organization_name',
        header: 'Organization Name',
        size: 20,
      },
      {
        accessorKey: 'organization_city',
        header: 'Organization City',
        size: 20,
      },
      {
        accessorKey: 'organization_state',
        header: 'Organization State',
        size: 20,
      },
      {
        accessorKey: 'organization_email',
        header: 'Organization Email',
        size: 20,
      },
      {
        accessorKey: 'organization_website',
        header: 'Organization Website',
        size: 20,
        Cell: ({ row }) => (
          <a href={row?.original?.organization_website} target="_blank">
            {row?.original?.organization_website}
          </a>
        ),
      },
      {
        accessorKey: 'organization_established_year',
        header: 'Established Year',
        size: 20,
      },
      {
        accessorKey: 'organization_is_active',
        header: 'organization Active',
        size: 10,
        Cell: ({ row }) =>
          row?.original?.organization_is_active === 1 ? (
            <Button
              fullWidth
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
              onClick={() => {
                handleStatus(row?.original?.id, 0);
              }}
            >
              Active
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              endIcon={<Iconify icon={'eva:close-circle-fill'} />}
              onClick={() => {
                handleStatus(row?.original?.id, 1);
              }}
            >
              Deactive
            </Button>
          ),
      },
      {
        accessorKey: 'payment',
        header: 'Payment Status',
        size: 10,
        Cell: ({ row }) =>
          row?.original?.payment !== null ? (
            <Button
              fullWidth
              variant="contained"
              color="success"
              endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
              // onClick={() => {
              //   handleStatus(row?.original?.id);
              // }}
            >
              Paid
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
              Unpaid
            </Button>
          ),
      },
      // {
      //   accessorKey: "organization_is_active",
      //   header: "Is Active",
      //   size: 20,
      // },
      {
        accessorKey: 'organization_year',
        header: 'organization year',
        size: 20,
      },
      {
        accessorKey: 'organization_age',
        header: 'organizationage',
        size: 20,
      },
      {
        accessorKey: 'organization_presentation_type',
        header: 'organization  presentation type',
        size: 20,
      },
      {
        accessorKey: 'organization_presentation_frequency',
        header: 'organization presentation frequency',
        size: 20,
      },
      {
        accessorKey: 'organization_participation_method',
        header: 'organization participation method',
        size: 20,
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { raritys } = useSelector((state) => state.rarity);
  const data = [];
  data?.push(raritys);

  console.log(data);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getRaritys());
  }, []);

  useEffect(() => {
    if (raritys) {
      setTableData(raritys);
    }
  }, [raritys]);

  async function handleDelete(rowdata) {
    const data = new FormData();
    data.append('id', rowdata);

    try {
      await axios.post(`api/admin/del/participant/org/form`, data).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar('Deleted Successfully');
          dispatch(getRaritys());
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }

  async function handleStatus(id, status) {
    try {
      const data = new FormData();
      data.append('id', +id);
      data.append('status', +status);
      await axios.post(`/api/admin/change/organization/form/activation`, data).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar('Organization Status Changed Successfully');
          dispatch(getRaritys());
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
    <Page title="Cotillion Organization">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Cotillion Organization"
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
