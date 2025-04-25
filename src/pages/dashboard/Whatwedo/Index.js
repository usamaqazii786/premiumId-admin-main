/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// import * as Yup from 'yup';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Button, Container, IconButton } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { LoadingButton } from '@mui/lab';
// import { Modal } from 'react-bootstrap';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import { getwhatwedos,deleteElementSuccess } from '../../../redux/slices/whatwedo';
import { useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
// import { FormProvider, RHFSelect } from '../../../components/hook-form';

export default function Whatwedo() {
  // const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 1,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 1,
      },

      {
        header: 'Image',
        accessorKey: 'image',
        size: 10,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <img
              alt={`Left`}
              src={row.original.image}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                flexShrink: 0,
                marginRight: '12px',
              }}
            />
          </div>
        ),
      },
      {
        header: 'Actions',
        accessorKey: 'type',
        size: 10,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '8px' }}>
           <IconButton
                color="error"
                sx={{
                  border: '1px solid',
                  borderColor: 'error.main',
                }}
                onClick={() => {
                  handleDelete(row.original.type,row.original.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { whatwedos } = useSelector((state) => state.whatwedo);
  const [tableData, setTableData] = useState([]);
  console.log(whatwedos, 'tableData--->');

  useEffect(() => {
    dispatch(getwhatwedos());
  }, [tableData]);

// eslint-disable-next-line
useEffect(() => {
  // eslint-disable-next-line
  if (whatwedos?.images) {
    setTableData(whatwedos?.images); 
  }
}, [whatwedos,handleDelete]);


async function handleDelete(type, id) {
  const whatWeDo = type !== 'right' ? "what-we-do-left-image-delete" : "what-we-do-right-image-delete"; // Updated variable name to camelCase
  try {
    await axios.delete(`${whatWeDo}/${id}`).then((response) => {
      console.log(response?.data, 'delete-->');
      console.log(response?.data?.status, 'delete-->');
      if (response?.status) {
        enqueueSnackbar(response?.data?.message, { variant: 'success' });
        dispatch(getwhatwedos());
        // Dispatch to update Redux state
        dispatch(deleteElementSuccess(id,type));
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
    <Page title="What we do list">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="What we do list"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.whatwedo.addwhatwedo}
            >
              New Whatwedo list
            </Button>
          }
        />

        <MaterialReactTable
          columns={columns}
          data={tableData}
          // enableRowActions
          // renderRowActions={({ row }) => (
          //   <Box
          //     sx={{
          //       display: 'flex',
          //       flexWrap: 'nowrap',
          //       gap: '10px',
          //       justifyContent: 'flex-center',
          //     }}
          //   >
          //     {/* <IconButton
          //       color="success"
          //       sx={{
          //         border: '1px solid',
          //         borderColor: 'success.main',
          //       }}
          //       onClick={() => {
          //         navigate(PATH_DASHBOARD.projects.editproject(row?.original?.id));
          //       }}
          //     >
          //       <EditIcon />
          //     </IconButton> */}
          //     <IconButton
          //       color="error"
          //       sx={{
          //         border: '1px solid',
          //         borderColor: 'error.main',
          //       }}
          //       onClick={() => {
          //         handleDelete(row.original.id);
          //       }}
          //     >
          //       <DeleteIcon />
          //     </IconButton>
          //   </Box>
          // )}
          // positionActionsColumn="last"
        />
      </Container>
    </Page>
  );
}
