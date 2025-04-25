/* eslint-disable react/prop-types */
import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Tooltip,
  Box,
  Button,
  Container,
  IconButton,
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getCards } from '../../../redux/slices/card';
import { getCharacter } from '../../../redux/slices/character';
import { getTags} from '../../../redux/slices/tag';
import { getRaritys} from '../../../redux/slices/rarity';
import { getSpells} from '../../../redux/slices/spell';
import { getProducts} from '../../../redux/slices/product';
import { getmagictypes} from '../../../redux/slices/magictype';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';


export default function Card() {
  const { enqueueSnackbar } = useSnackbar();
  
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 2,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 25,
      },
      {
        accessorKey: "rarity.name",
        header: "Rarity",
        size: 25,
      },
      {
        accessorKey: "magic_type.name",
        header: "Magic Type",
        size: 25,
      },
      {
        accessorKey: "cg_thumbnail",
        header: "CG",
        size: 2,
        Cell: ({ row }) => (
          <img src={row.original.cg_thumbnail} alt="Thumbnail" style={{ width: "50px", height: '50px',borderRadius:'20px' }} />
        ),
      },
      {
        accessorKey: "groovy_cg_thumbnail",
        header: "GROOVY",
        size: 2,
        Cell: ({ row }) => (
          <img src={row.original.groovy_cg_thumbnail} alt="Thumbnail" style={{ width: "50px", height: '50px',borderRadius:'20px' }} />
        ),
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cards} = useSelector((state) => state.card);
  const [tableData,setTableData]=useState([])

  useEffect(() => {
    dispatch(getCharacter());
    dispatch(getCards());
    dispatch(getSpells());
    dispatch(getRaritys());
    dispatch(getTags());
    dispatch(getProducts());
    dispatch(getmagictypes());
  }, [dispatch]);

  useEffect(() => {
    if (cards.length) {
      setTableData(cards);
    }
  }, [cards]);

  async function handleDelete(rowdata) {
    try {
     
   await axios.delete(`card/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getCards());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Card">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Card"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.card.addcard}
            >
              New Card
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
            <Tooltip arrow title="View Card Details">
            <IconButton
            sx={{
              border: "1px solid",
              borderColor: "warning.main",
            }}
            color="warning"
            onClick={()=>{navigate(PATH_DASHBOARD.card.carddetail(row.original.id))}}
          >
            <VisibilityIcon />
          </IconButton>
          </Tooltip>
              <IconButton
                color="success"
                sx={{
                  border: "1px solid",
                  borderColor: "success.main",
                }}
                onClick={()=>{navigate(PATH_DASHBOARD.card.editcard(row.original.id))}}
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


