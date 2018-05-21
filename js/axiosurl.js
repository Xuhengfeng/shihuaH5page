'use strict';
const SERVER_IPS = ["http://112.74.181.229:7031/custAppApi", "http://192.168.16.173:7031/custAppApi"];//api接口
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
