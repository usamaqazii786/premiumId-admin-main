import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  })
);

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }) {
  const itemsToRender = navConfig[0]?.items;

  return (
    <Box {...other}>
      {itemsToRender.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <NavListRoot key={group.title} list={group} isCollapse={isCollapse} />
        </List>
      ))}
    </Box>
  );
}
