'use strict';
const SERVER_IPS = ["http://custapi.shihua365.xin/custAppApi", "http://112.74.181.229:7031/custAppApi"];//api接口
const SERVERINDEX = 0;
const SERVER_IP = SERVER_IPS[SERVERINDEX];
const $axios = axios.create({
    baseURL: SERVER_IP,
    timeout: 5000,
//  headers: {
//      "Content-Type": "application/json;charset=UTF-8",
//      "scity":JSON.parse(window.sessionStorage.project).scity
//  }
});
//添加unique-code 用户标识
// $axios.defaults.headers.common['unique-code'] = "d2ViX2U5ZjdkYWJmLTFhNDYtNDdmMC04ZjA5LTRiNzlhMDJlYmMzMF84ODQwMDAwMDA=";

let TWOHOUSEUSED = SERVER_IP + "/contrast/used-house";  //二手房对比
let HOUSECONTRAST = SERVER_IP + "/statistics/houseUsed"; //查询房价统计
let STATISTICS = SERVER_IP + "/statistics/trend"; //查询 趋势统计
let HOUSINGCS = SERVER_IP + '/statistics/housing60-days'//查看最近60天成交房源
let GUIDEHAND = SERVER_IP + '/info/purchase-guide/index'//购房指南首页信息
let GUIDEHANDETAIL = SERVER_IP + '/info/'//获取资讯内容详情
let CONSULTANTINFO = SERVER_IP + '/consultant/info'//获取顾问详情
let PROBLEMINFO = SERVER_IP + '/consultant/problem_info'//获取问题详情
let TWOHOUSELIST = SERVER_IP + '/house/query'//二手房列表
let AGREET = SERVER_IP + '/consultant/adopt'//采纳
let LOOK = SERVER_IP + '/consultant/concern'//是否关注

