/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, IconButton } from '@mui/material';
import { Link as RouterLink,  useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../redux/store';
import { gethomeourmissions } from '../../../redux/slices/homeourmission';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function HomeOurMission() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { homeourmissions } = useSelector((state) => state.homeourmission);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { data } = location.state;
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 10,
        Cell: ({ row }) => (
          <span>{row?.original?.our_mission_detail?.map((e) => e?.title)}</span>
        ),              
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 10,
        Cell: ({ row }) => (
          <span>{row?.original?.our_mission_detail?.map((e) => e?.description)}</span>
        ),        
      },
      {
        accessorKey: 'image',
        header: 'Image',
        size: 10,
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(gethomeourmissions(id));
  }, [dispatch]);

  useEffect(() => {
    if (homeourmissions?.length > 0) {
      setTableData(homeourmissions);
    }
  }, [homeourmissions]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`admin/home-our-mission/${rowdata}`).then((response) => {
        console.log('delete');
        if (response?.data) {
          enqueueSnackbar('Home Our Mission Deleted Successfully');
          dispatch(gethomeourmissions());
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
    <Page title="All Home Our Mission">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={`All Home Our Mission`}
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.homeourmission.addhomeourmission}
            >
              Add home our mission
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
                gap: '5px',
                justifyContent: 'flex-center',
              }}
            >
              <IconButton
                sx={{
                  border: '1px solid',
                  borderColor: 'primary.main',
                }}
                color="primary"
                onClick={() => {
                  navigate(PATH_DASHBOARD.homeourmission.edithomeourmission(row.original.id));
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
