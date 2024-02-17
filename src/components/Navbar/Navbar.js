import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';

import logo from '../../assets/favicon.png'
import useStyles from './styles';

const Navbar = ( ) => {
    const classes = useStyles();

    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="SafeWalkAI" height="25px" className={classes.image}/>
                    SafeWalkAI
                </Typography>
                <div className={classes.grow} />
                <div className={classes.button} >
                    <IconButton arial-label="Safe Walk With Us" color="inherit">
                        <Badge badgeContent={2} color="secondary">
                            SafeWalkAI
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar;