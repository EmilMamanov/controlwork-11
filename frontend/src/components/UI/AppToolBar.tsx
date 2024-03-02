import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../features/users/usersSlice.ts";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});


const AppToolbar = () => {

    const user = useAppSelector(selectUser);

    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="center" alignItems="center">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to="/">AttracStore</Link>
                    </Typography>
                    <Grid container justifyContent="space-around" alignItems="center">
                        <Link to="/products/category/sports">Sports</Link>
                        <Link to="/products/category/tech">Tech</Link>
                        <Link to="/products/category/furniture">Furniture</Link>
                        <Link to="/products/category/other">Other</Link>
                    </Grid>
                    {user ? (
                        <UserMenu user={user}/>
                    ) : (
                        <AnonymousMenu/>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    )
};

export default AppToolbar;