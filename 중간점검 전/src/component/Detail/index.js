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

const sampleResponse = {
    "Original_image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&h=2000&q=80",
    "Segmentation_image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1500&h=2000&q=80",
    "Box": {
        "new_align_0361_bbox_1": {
            "box_x": 1195.08,
            "box_y": 855.92,
            "box_width": 109.73,
            "box_height": 214.52
        },
        "new_align_0361_bbox_2": {
            "box_x": 96.74,
            "box_y": 865.18,
            "box_width": 103.54,
            "box_height": 205.72
        }
    },
    "Ratio": {
        "new_align_0361_bbox_1": 84.1234,
        "new_align_0361_bbox_2": 78.5456
    },
    "Margin_list": {
        "new_align_0361_bbox_1": [
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            },
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            },
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            }
        ],
        "new_align_0361_bbox_2": [
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            },
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            }
        ]
    },
    "Cvat_url": "https://cvat.org"
}


export default ({ match }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [fromRatio, setFromRatio] = React.useState(83);
    const [toRatio, setToRatio] = React.useState(87);
    const [threshold, setThreshold] = React.useState(85);
    const [cutOff, setCutOff] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [analysisBoxList, setAnalysisBoxList] = React.useState([]);
    const [boxList, setBoxList] = React.useState([]);

    const [originImg, setOriginImg] = React.useState(null);
    const [segmentationImg, setSegmentationImg] = React.useState(null);
    const [rows, setRows] = React.useState([]);

    const [raw, setRaw] = React.useState({});
    const [cvatUrl, setCvatUrl] = React.useState("https://cvat.org");

    const componentDidMountApi = async (__img) => {
        try {
            var response = await api.getDetail(__img);
            setRaw(response.data)
            setCvatUrl(response.data['Cvat_url'])
            setOriginImg(response.data['Original_image'])
            if (response.data['Segmentation_image']) {
                setSegmentationImg(response.data['Segmentation_image'])
            } else {
                setSegmentationImg(response.data['Original_image'])
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
            setAnalysisBoxList(b)
        } catch (e) {
            console.log(e)
            setRaw(sampleResponse)
            setCvatUrl(sampleResponse['Cvat_url'])
            setOriginImg(sampleResponse['Original_image'])
            setSegmentationImg(sampleResponse['Segmentation_image'])
            let index = [];
            for (let x in sampleResponse['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                var _ele = {}
                _ele.name = value;
                _ele.ratio = sampleResponse['Ratio'][value]
                _ele.bbox = sampleResponse['Box'][value]
                _ele.b_color = 'red'
                b.push(_ele)
            };
            setBoxList(b)
            setAnalysisBoxList(b)
        }
    }
    useEffect(() => {
        componentDidMountApi(match.params.img)
        return () => {
            componentDidMountApi(match.params.img)
        };
    }, [match.params.img]);


    const getDetailApi = async () => {
        try {
            var response = await api.getDetailWithSetting(match.params.img, threshold);
            setRaw(response.data)
            setCvatUrl(response.data['Cvat_url'])
            setOriginImg(response.data['Original_image'])
            if (response.data['Segmentation_image']) {
                setSegmentationImg(response.data['Segmentation_image'])
            } else {
                setSegmentationImg(response.data['Original_image'])
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
            setAnalysisBoxList(b)
        } catch (e) {
            console.log(e)
            setCvatUrl(sampleResponse['Cvat_url'])
            setRaw(sampleResponse)
            setOriginImg(sampleResponse['Original_image'])
            setSegmentationImg(sampleResponse['Segmentation_image'])
            let index = [];
            for (let x in sampleResponse['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                var _ele = {}
                _ele.name = value;
                _ele.ratio = sampleResponse['Ratio'][value]
                _ele.bbox = sampleResponse['Box'][value]
                _ele.b_color = 'red'
                b.push(_ele)
            };
            setBoxList(b)
            setAnalysisBoxList(b)
        }

    }
    const getApiForAnalysis = async (margin_x, margin_y, margin_width) => {
        var b_list = [...boxList]
        var ele = {}
        ele.bbox = {
            "box_x": margin_x,
            "box_y": margin_y,
            "box_width": margin_width,
            "box_height": 0.1
        }
        ele.b_color = 'red'
        b_list.push(ele)
        setAnalysisBoxList(b_list)
    }

    const getApiForDrawer = async (_box) => {
        var _box_list = []
        raw['Margin_list'][_box].map((item, i) => {
            var tmp_item = item
            tmp_item.id = i
            return _box_list.push(tmp_item)
        })
        setRows(_box_list)
    }

    const handleClickOpen = async (elem) => {
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
    const tabHandleChangeWithId = (event, newValue, margin_x, margin_y, margin_width) => {
        setValue(newValue);
        getApiForAnalysis(margin_x, margin_y, margin_width);
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
    const imgList = (i, elem, color, ratio) => {
        return (
            <ImgListDiv key={elem} background={color} onClick={() => handleClickOpen(elem)}>
                <span>&nbsp;{elem}&nbsp;</span> <br />
                <p>&nbsp;&nbsp;Min Margin Ratio : {ratio.toFixed(3)}</p>
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
                            <OriginalTab path={match.params.img} img={originImg} cvatUrl={cvatUrl} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <BoxTab path={match.params.img} img={segmentationImg} bbox={boxList} cvatUrl={cvatUrl} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <AnalysisTab path={match.params.img} img={segmentationImg} bbox={analysisBoxList} cvatUrl={cvatUrl} />
                        </TabPanel>
                    </div>
                </Grid>

                <ItemList item xs={3}>
                    <div>
                        {boxList.map((Element, i) => (imgList(i, Element.name, setWarningColor(Element.ratio), Element.ratio)))}
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
                    tabHandleChange={tabHandleChange}
                    tabHandleChangeWithId={tabHandleChangeWithId}
                />
            </ContainerGrid>
        </>
    );
};