import { useTranslation } from 'react-i18next';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import EuroTwoToneIcon from '@mui/icons-material/EuroTwoTone';

import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';

const VerticalLayoutRoot = styled('div')({
    display: 'flex',
    position: 'fixed',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingLeft: 50,
});

const LinkContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
});

export const Navbar = (props) => {
    const { t } = useTranslation();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const pages = [];

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    {/* Responsive */}
                    <MuiLink
                        color="text.secondary"
                        component={Link}
                        href={paths.index}
                        display="flex"
                        alignItems="center"
                        underline='none'
                    >
                        <EuroTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , fontSize: 40 }} />
                        <Typography
                            variant="body2"
                            noWrap
                            fontSize={32}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        {t(tokens.app.title)}
                        </Typography>
                    </MuiLink>                    

                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' },
                        justifyContent: 'flex-start',
                    }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>

                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >

                            <MuiLink
                                color="text.secondary"
                                component={Link}
                                href={paths.products}
                            >
                            <Typography variant="body1">{t(tokens.navbar.products)}</Typography>
                            </MuiLink>

                            <MuiLink
                                color="text.secondary"
                                component={Link}
                                href={paths.providers}
                            >
                            <Typography variant="body1">{t(tokens.navbar.providers)}</Typography>
                            </MuiLink>

                        </Menu>
                    </Box>

                    <MuiLink
                        color="text.secondary"
                        component={Link}
                        href={paths.index}
                        display="flex"
                        alignItems="center"
                    >
                        <EuroTwoToneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        {t(tokens.app.title)}
                        </Typography>
                    </MuiLink>  

                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'space-evenly',
                    }}>
                        <MuiLink
                            color="text.secondary"
                            component={Link}
                            href={paths.products}
                        >
                        <Typography variant="body2" fontSize={30}>{t(tokens.navbar.products)}</Typography>
                        </MuiLink>

                        <MuiLink
                            color="text.secondary"
                            component={Link}
                            href={paths.providers}
                        >
                        <Typography variant="body2" fontSize={30}>{t(tokens.navbar.providers)}</Typography>
                        </MuiLink>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
