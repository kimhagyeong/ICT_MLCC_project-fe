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
import api from '../../api'

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
            div:nth-child(1), div:nth-child(5){
                height:2rem;
                // padding:0.5rem;
                h2{
                    text-align:left;
                }
            }
            div:nth-child(2), div:nth-child(4){
                height:2rem;
                display:flex;
            }
            div:nth-child(3){
                font-size:2rem;
                height:2rem;
                text-align:center;
            }
            div:nth-child(6){
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

const defaultResponse = {
    "original_img": "http://127.0.0.1:8000/media/data/1/new_normal_0152.jpg",
    "segmentation_image": "http://127.0.0.1:8000/media/data/1/new_normal_0152.jpg",
    "Box": {
        "1-1": {
            "box_center_x": 12,
            "box_center_y": 34,
            "box_width": 20,
            "box_height": 10
        },
        "1-2": {
            "box_center_x": 12,
            "box_center_y": 34,
            "box_width": 20,
            "box_height": 10
        }
    },
    "Ratio": {
        "1-1": 84.1234,
        "1-2": 78.5456
    }
}

const defaultAnalysicBox = {
    "box_center_x": 12,
    "box_center_y": 34,
    "box_width": 20,
    "box_height": 10
}
const defaultRows = [
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


export default ({ match }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [fromRatio, setFromRatio] = React.useState(83);
    const [toRatio, setToRatio] = React.useState(87);
    const [threshold, setThreshold] = React.useState(85);
    const [cutOff, setCutOff] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [box, setBox] = React.useState();
    const [analysisBoxList, setanalysisBoxList] = React.useState([]);
    const [boxList, setBoxList] = React.useState([]);

    const [originImg, setOriginImg] = React.useState(null);
    const [segmentationImg, setSegmentationImg] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    
    useEffect(() => {
        componentDidMountApi()
    });

    const componentDidMountApi = async () => {
        try {
            var response = await api.getDetail(match.params.img);
            setOriginImg(response.data['original_img'])
            if (response.data['segmentation_image']) {
                setSegmentationImg(response.data['segmentation_image'])
            } else {
                setSegmentationImg(response.data['original_img'])
            }
            let index = [];
            for (let x in response.data['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                var ele = {}
                ele.name = value;
                ele.ratio = response.data['Ratio'][value]
                ele.bbox = response.data['Box'][value]
                ele.b_color = 'red'
                b.push(ele)
            };
            setBoxList(b)
            setanalysisBoxList(b)
        } catch (e) {
            console.log(e)
            setOriginImg(defaultResponse['original_img'])
            setSegmentationImg(defaultResponse['segmentation_image'])
            let index = [];
            for (let x in defaultResponse['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                
                var _ele = {}
                _ele.name = value;
                _ele.ratio = defaultResponse['Ratio'][value]
                _ele.bbox = defaultResponse['Box'][value]
                _ele.b_color = 'red'
                b.push(_ele)
            };
            setBoxList(b)
            setanalysisBoxList(b)
        }
    }
    const getDetailApi = async () => {
        try {
            var response = await api.getDetailWithSetting(match.params.img, threshold);
            setOriginImg(response.data['original_img'])

            let index = [];
            for (let x in response.data['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                var ele = {}
                ele.name = value;
                ele.ratio = response.data['Ratio'][value]
                ele.bbox = response.data['Box'][value]
                ele.b_color = 'red'
                b.push(ele)
            };
            setBoxList(b)
        } catch (e) {
            console.log(e)
            setOriginImg(defaultResponse['original_img'])
            let index = [];
            for (let x in defaultResponse['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                var _ele = {}
                _ele.name = value;
                _ele.ratio = defaultResponse['Ratio'][value]
                _ele.bbox = defaultResponse['Box'][value]
                _ele.b_color = 'red'
                b.push(_ele)
            };
            setBoxList(b)
        }
    }
    const getApiForAnalysis = async(id)=>{
        try{
            var response = await api.getDetailForAnalysis(match.params.img,box,id)
            let b_list = [...boxList]
            var ele = {}
            ele.bbox = response.data
            ele.b_color = 'yellow'
            b_list.push(ele)
            setanalysisBoxList(b_list)
        }catch{
            var b_list =[...boxList]
            var _ele ={}
            _ele.bbox = defaultAnalysicBox
            _ele.b_color = 'yellow'
            b_list.push(_ele)
            setanalysisBoxList(b_list)
        }
    }

    const getApiForDrawer = async(_box)=>{
        try{
            var response = await api.getDetailForDrawer(match.params.img, _box)
            
            if(Object.keys(response.data).length === 0){
                setRows(defaultRows)
            }else{
                setRows(response.data)
            }
        }catch{
            setRows(defaultRows)
        }
    }

    const handleClickOpen = async(elem) => {
        setBox(elem);
        await getApiForDrawer(elem)
        setOpen(true);
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
    const tabHandleChangeWithId = (event, newValue, id) => {
        setValue(newValue);
        getApiForAnalysis(id);
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
    const handleSearch = () => {
        getDetailApi()
    }
    const imgList = (elem, color, ratio) => {
        return (
            <ImgListDiv key={"box" + elem} background={color} onClick={() => handleClickOpen(elem)}>
                <span>&nbsp;Box {elem}&nbsp;</span> <br />
                <p>&nbsp;&nbsp;Min Margin Ratio : {ratio}</p>
            </ImgListDiv>
        )
    }
    const setWarningColor = (ratio) => {
        if (ratio < fromRatio) {
            return '#ff3300'
        }
        if (ratio >= fromRatio && ratio <= toRatio) {
            return '#ff7300'
        }
        if (ratio > toRatio) {
            return '#3dc000'
        }
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
                            <OriginalTab path={match.params.img} img={originImg} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <BoxTab path={match.params.img} img={segmentationImg} bbox={boxList} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <AnalysisTab path={match.params.img} img={segmentationImg} bbox={analysisBoxList} />
                        </TabPanel>
                    </div>
                </Grid>

                <ItemList item xs={3}>
                    <div>
                        {boxList.map((Element) => (imgList(Element.name, setWarningColor(Element.ratio), Element.ratio)))}
                    </div>
                    <div>
                        <form name="setting">
                            <Grid item xs={4}><h2>Warning ratio</h2></Grid>
                            <Grid item xs={3}>
                                <Input
                                    className="admin-setting"
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
                                    className="admin-setting"
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
                                    className="admin-setting"
                                    type="number"
                                    name="threshold"
                                    defaultValue={threshold}
                                    onChange={handleChange}
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                />
                            </Grid>
                            {/* <Grid item xs={6}><h2>Cut off</h2></Grid>
                            <Grid item xs={6}>
                                <Input
                                    type="number"
                                    name="cutOff"
                                    defaultValue={cutOff}
                                    onChange={handleChange}
                                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <Button
                                    className="admin-setting"
                                    variant="contained"
                                    color="default"
                                    onClick={handleSearch}
                                >
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
                    rows={rows}
                    // box={box}
                    tabHandleChange={tabHandleChange}
                    tabHandleChangeWithId={tabHandleChangeWithId}
                />
            </ContainerGrid>
        </>
    );
};