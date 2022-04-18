import React, { useEffect } from 'react';
import styled from "styled-components";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import OriginalTab from './TabImg/original';
import BoxTab from './TabImg/box';
import AnalysisTab from './TabImg/Analysis';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Drawer from './TabImg/drawer'
import Button from '@material-ui/core/Button';
import tempImg from '../../resource/new_align_0001.jpg'
import DefaultImg from '../../resource/DICE.png'
import * as htmlToImage from 'html-to-image';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const ContainerGrid = styled(Grid)`
    height:100%;
    width:100%;
    background-color:#f0f0f0;
    z-index:3;
`
const boxList = [
    {
        color: '#3dc000',
        marginRatio: '87.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#3dc000',
        marginRatio: '88.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#3dc000',
        marginRatio: '87.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#ff3300',
        marginRatio: '82.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#3dc000',
        marginRatio: '87.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#3dc000',
        marginRatio: '87.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#ff3300',
        marginRatio: '82.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#3dc000',
        marginRatio: '87.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#3dc000',
        marginRatio: '87.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#ff3300',
        marginRatio: '82.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        color: '#3dc000',
        marginRatio: '87.5%',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    }
];
const bbox = [
    [
        1195.08,
        855.92,
        109.73,
        214.52
    ],
    [
        96.74,
        865.18,
        103.54,
        205.72
    ],
    [
        2290.44,
        852.98,
        107.49,
        213.8
    ],
]

const ImgListDiv = styled.div`
    width:100%;
    background-color: ${(props) => props.background || "white"}4f;
    border-bottom: solid 1px black;
    cursor:pointer;
    span{
        background-color:gray;
    }
    font-size:1rem;
    text-align:left;
`;
const ItemList = styled(Grid)`
    width:100%;
    height:50rem;
    & > div:nth-child(1){
        width:100%;
        height:42rem;
        overflow:auto;
    }
    & > div:nth-child(2){
        width:100%;
        height:8rem;
        font-size:10px;
        &>form{
            flex-wrap: wrap;
            box-sizing: border-box;
            display:flex;
            width:100%;
            height:100%;
            div:nth-child(1), div:nth-child(5), div:nth-child(7){
                height:2rem;
                // padding:0.5rem;
                h2{
                    text-align:left;
                }
            }
            div:nth-child(2), div:nth-child(4), div:nth-child(6), div:nth-child(8){
                height:2rem;
                display:flex;
            }
            div:nth-child(3){
                font-size:2rem;
                height:2rem;
                text-align:center;
            }
            div:nth-child(9){
                display: flex;
                align-items: center;
                justify-content: flex-end;
                button{
                    margin-top:20px;
                }
            }
        }
    }
`;
const BBoxImg = styled.div`
    background-color:#f7f7f7;
    width:2448px;
    height:2048px;
    position:absolute;
    display:block;
    top:0;
    left:0;
    img{
        width:2448px;
        height:2048px;
    }
    div{
        border:5px solid rgba(200, 0, 0, 0.5);
        position:absolute;
    }
`

export default ({ match }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [fromRatio, setFromRatio] = React.useState(83);
    const [toRatio, setToRatio] = React.useState(87);
    const [threshold, setThreshold] = React.useState(85);
    const [cutOff, setCutOff] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [box, setBox] = React.useState();
    const [bboxImg, setBboxImg] = React.useState(DefaultImg);

    useEffect(() => {
        var node = document.getElementById('boxContainer2');

        htmlToImage.toJpeg(node,{width:2448,height:2048})
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            setBboxImg(img.src)
            node.remove();
            document.getElementById('boxContainer1').remove();
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }, []);

    const handleClickOpen = (elem) => {
        setOpen(true);
        setBox(elem);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const tabHandleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange = (event) => {
        // input value 가져오기
        const { name, value } = event.target;
        switch (name) {
            case "fromRatio":
                if (value >= 0 && value < toRatio) {
                    setFromRatio(value);
                } else {
                    document.querySelector('input[name="fromRatio"]').value = fromRatio;
                }
                break;
            case "toRatio":
                if (value <= 100 && value > fromRatio) {
                    setToRatio(value);
                } else {
                    document.querySelector('input[name="toRatio"]').value = toRatio;
                }
                break;
            case "threshold":
                if (value >= 0 && value <= 100) {
                    setThreshold(value);
                } else {
                    document.querySelector('input[name="threshold"]').value = threshold;
                }
                break;
            case "cutOff":
                if (value > 0) {
                    setCutOff(value);
                } else {
                    document.querySelector('input[name="cutOff"]').value = cutOff;
                }
                break;
            default:
                console.log("error!");
        }
    };
    const imgList = (elem, color, ratio, path) => {
        return (
            <ImgListDiv key={"box" + elem} background={color} onClick={() => handleClickOpen(elem)}>
                <span>&nbsp;Box {elem}&nbsp;</span> <br />
                <p>&nbsp;&nbsp;Min Margin Ratio : {ratio}</p>
            </ImgListDiv>
        )
    }

    return (
        <>
            <ContainerGrid container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"  >
                <Grid item xs={9}>
                    <div className={classes.root}>
                        <AntTabs value={value} onChange={tabHandleChange} aria-label="ant example">
                            <AntTab label="Original"  {...a11yProps(0)} />
                            <AntTab label="Box" {...a11yProps(1)} />
                            <AntTab label="Analysis" {...a11yProps(2)} />
                        </AntTabs>
                        <TabPanel value={value} index={0}>
                            <OriginalTab path={match.params.img} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <BoxTab path={match.params.img} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <AnalysisTab path={match.params.img} imgSrc={bboxImg}/>
                        </TabPanel>
                    </div>
                </Grid>

                <ItemList item xs={3}>
                    <div>
                        {boxList.map((Element, index) => (imgList(index + 1, Element.color, Element.marginRatio, Element.imgPath)))}
                    </div>
                    <div>
                        <form name="setting">
                            <Grid item xs={4}><h2>Warning ratio</h2></Grid>
                            <Grid item xs={3}>
                                <Input
                                    type="number"
                                    name="fromRatio"
                                    defaultValue={fromRatio}
                                    onChange={handleChange}
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                ~
                            </Grid>
                            <Grid item xs={3}>
                                <Input
                                    type="number"
                                    name="toRatio"
                                    defaultValue={toRatio}
                                    onChange={handleChange}
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={6}><h2>Margin threshold</h2></Grid>
                            <Grid item xs={6}>
                                <Input
                                    type="number"
                                    name="threshold"
                                    defaultValue={threshold}
                                    onChange={handleChange}
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={6}><h2>Cut off</h2></Grid>
                            <Grid item xs={6}>
                                <Input
                                    type="number"
                                    name="cutOff"
                                    defaultValue={cutOff}
                                    onChange={handleChange}
                                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained"
                                    color="default">
                                    Search
                                </Button>
                            </Grid>
                        </form>

                    </div>
                </ItemList>
                <Drawer
                    handleClickOpen={handleClickOpen}
                    handleDrawerClose={handleClose}
                    toggleDrawer={toggleDrawer}
                    open={open}
                    box={box}
                />
            </ContainerGrid>
            <BBoxImg style={{zIndex:"2"}} id="boxContainer1"></BBoxImg>
            <BBoxImg style={{zIndex:"1"}} id="boxContainer2">
                <img src={tempImg}></img>
                {
                        bbox.map((element) => (
                            <div style={{ width: element[2] + "px", height: element[3] + "px", left: element[0] + "px", top: element[1] + "px" }}></div>
                        ))
                    }
            </BBoxImg>
        </>
    );
};