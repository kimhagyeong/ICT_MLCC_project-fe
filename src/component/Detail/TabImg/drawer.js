import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    list: {
        width: 700,
    },
    fullList: {
        width: 'auto',
    },
    drawerEnd: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
        field: 'threshold',
        headerName: '마진폭',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'real',
        headerName: '실마진',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'ratio',
        headerName: '마진율%',
        type: 'number',
        width: 200,
        editable: true,
    }
];

const rows = [
    { id: 1, threshold: 48.000, real: 38.000, ratio: 79.167 },
    { id: 2, threshold: 48.000, real: 38.000, ratio: 82.609 },
    { id: 3, threshold: 48.000, real: 38.000, ratio: 84.444 },
    { id: 4, threshold: 40.000, real: 38.000, ratio: 95.000 },
    { id: 5, threshold: 40.000, real: 38.000, ratio: 95.000 },
    { id: 6, threshold: 38.000, real: 38.000, ratio: 100.000 },
    { id: 7, threshold: 38.000, real: 38.000, ratio: 100.000 },
    { id: 8, threshold: 38.000, real: 38.000, ratio: 100.000 },
    { id: 9, threshold: 38.000, real: 38.000, ratio: 100.000 },
    { id: 10, threshold: 38.000, real: 38.000, ratio: 100.000 },
    { id: "Min", threshold: 48.000, real: 38.000, ratio: 79.000 },
    { id: "Max", threshold: 48.000, real: 38.000, ratio: 100.000 },
    { id: "Avg", threshold: 48.000, real: 38.000, ratio: 93.500 },
];

export default (props) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Drawer
            className={classes.drawer}
            anchor="right"
            open={props.open}
            onClose={props.toggleDrawer(false)}
        >
            <div className={clsx(classes.list, {
                [classes.fullList]: false,
            })}
                role="presentation"
                onClick={() => props.toggleDrawer(false)}
                onKeyDown={() => props.toggleDrawer(false)}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={props.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <div style={{ height: "35rem" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={13}
                        onCellClick={(params, event) => {
                            props.tabHandleChange(this, 2)
                            console.log(params)
                        }}

                        // checkboxSelection
                        disableSelectionOnClick
                    // checkboxSelection={props.tabHandleChange(this,1)}
                    />
                </div>
                <div className={classes.drawerEnd}>
                    <Button onClick={props.handleClose} color="primary">
                        엑셀로 전송
                    </Button>
                </div>
            </div>
        </Drawer>
    );
}
