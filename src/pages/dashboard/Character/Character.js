/* eslint-disable react/prop-types */
import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// cbvjkbdjvnjsdnjkvnsjkdvnjs
import {
  Box,
  Button,
  Container,
  IconButton,
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { getCharacter } from '../../../redux/slices/character';
import { useDispatch, useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Character() {

  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 5,
      },
      {
        accessorKey: "slug",
        header: "Slug ID",
        size: 5,
      },
      {
        accessorKey: "name",
        header: "Character Name",
        size: 5,
      },
      {
        accessorKey: "card.name",
        header: "Card Name",
        size: 10,
      },
      {
        accessorKey: "dorm.name",
        header: "Dorm",
        size: 5,
      },
      {
        accessorKey: "obtain",
        header: "Obtained",
        size: 30,
        Cell: ({ row }) => (
          row.original.obtain?.map((e, index) => <Button  variant="contained"  sx={{ borderRadius: '20px', marginRight: '4px',marginBottom:'2px' }} key={index}>{e}</Button>  )
      ),
      },
      {
        accessorKey: "image",
        header: "Image",
        size: 10,
        Cell: ({ row }) => (
          <img src={row.original.image} alt="Thumbnail" style={{ width: "50px", height: '50px',borderRadius:'20px' }} />
        ),
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { characters} = useSelector((state) => state.character);
  const [tableData,setTableData]=useState([])
  console.log(characters)

  useEffect(() => {
    dispatch(getCharacter());
  }, [dispatch]);

  useEffect(() => {
    if (characters.length) {
      setTableData(characters);
    }
  }, [characters]);

  async function handleDelete(rowdata) {
    try {
     
   await axios.delete(`character/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getCharacter());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Character">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Character"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.character.addcharacter}
            >
              New Character
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
            onClick={()=>{navigate(PATH_DASHBOARD.character.editcharacter(row.original.id))}}
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


