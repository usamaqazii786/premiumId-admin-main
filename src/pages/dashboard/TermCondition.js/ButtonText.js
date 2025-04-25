/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  IconButton,
  Button
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux'; // Assuming you only need useDispatch
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import BaseUrl from '../../../BaseUrl/BaseUrl';

export default function ButtonText() {
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


 
  const GetAllAdmin = () => {
    axios
      .get('/api/admin/button')
      .then((response) => {
        if (response?.data?.buttons) {
          console.log(response?.data?.buttons);
          setTableData(response?.data?.buttons);
        }
        console.log(response, 'resp');
    })
    .catch((error) => {
        console.error(error);
    });
};
React.useEffect(() => {
    GetAllAdmin();
}, []);
console.log(tableData, 'tableData');
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 5,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 40,
      },
    ],
    []
  );


//   async function handleDelete(rowdata) {
//     try {
//       await axios.delete(`admin/videotitle/update`)
//         .then((response) => {
//           if (response?.data?.status === true) {
//             enqueueSnackbar('Deleted Success Fully');
//             GetAllAdmin()
//             // dispatch(getRaritys());
//           }
//         });
//     } catch (error) {
//       enqueueSnackbar(error?.message, {
//         variant: 'error'
//       });
//       console.error(error);
//     }
//   }

  return (
    <Page title="Button Text">
      <Container maxWidth='xl'>
        <HeaderBreadcrumbs
          heading="Button Text"
          links={[{ name: '', href: '' }]}
          action={
            <>
            </>
            // <Button
            //   variant="contained"
            //   startIcon={<Iconify icon="eva:plus-fill" />}
            //   component={RouterLink}
            //   to={PATH_DASHBOARD.rarity.addrarity}
            // >
              
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
                display: "flex",
                flexWrap: "nowrap",
                gap: "10px",
                justifyContent: "flex-center",
              }}
            >
              <IconButton
                color="primary"
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                }}
                onClick={() => { navigate(PATH_DASHBOARD.rarity.editrarity(row.original.id)) }}
              >
                <EditIcon />
              </IconButton>
              {/* <IconButton
                color="error"
                sx={{
                  border: "1px solid",
                  borderColor: "error.main",
                }}
                onClick={() => {
                  handleDelete(row.original.id)
                }}
              >
                <DeleteIcon />
              </IconButton> */}
            </Box>
          )}
          positionActionsColumn="last"
        />
      </Container>
    </Page>
  );
}
