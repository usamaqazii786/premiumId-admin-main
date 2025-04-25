/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Container,
  IconButton,
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getCheckInfo } from '../../../redux/slices/CheckInfo';
import axios from '../../../utils/axios';
// routes
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';


export default function CheckinInfo() {
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 1,
      },
      {
        accessorKey: "info",
        header: "check-in Info",
        size: 5,
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkInfo } = useSelector((state) => state.checkInfo);
  const [tableData, setTableData] = useState([]);

    useEffect(() => {
      dispatch(getCheckInfo());
    }, []);

    useEffect(() => {
      if (checkInfo?.length) {
        setTableData(checkInfo);
      }
    }, [checkInfo]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`/api/clinic/checkin_info/${rowdata}`)
        .then((response) => {
          console.log(response,"delete");
          if (response?.data?.status === true) {
            enqueueSnackbar('Check-in Info Deleted Successfully');
            dispatch(getCheckInfo());
            // window.location.reload();
          }
        })
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error'
      });
      console.error(error);
    }
  }




  return (
    <Page title="Check-in Info">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Check-in Info"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to='/dashboard/addcheckinInfo'
            >
              Add Check-in Info
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
                onClick={() => { navigate(`/dashboard/editcheckinInfo/${row.original.id}`) }}
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



