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

export default function video() {
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


 
  const GetAllAdmin = () => {
    axios
      .get('/api/admin/video')
      .then((response) => {
        if (response?.data?.videos) {
          console.log(response?.data?.videos);
          setTableData(response?.data?.videos);
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
        header: "Url",
        size: 40,
      },
    ],
    []
  );


  async function handleDelete(rowdata) {
    try {
      await axios.delete(`/api/admin/video/${rowdata}`)
        .then((response) => {
          if (response?.data?.status === true) {
            enqueueSnackbar(response?.data?.message);
            // dispatch(getRaritys());
            GetAllAdmin()
          }
        });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="video">
      <Container maxWidth='xl'>
        <HeaderBreadcrumbs
          heading="video"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.rarity.addrarity}
            >
             Add video
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
                onClick={() => { navigate(`/dashboard/videos/${row.original.id}`) }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
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
              </IconButton>
            </Box>
          )}
          positionActionsColumn="last"
        />
      </Container>
    </Page>
  );
}
