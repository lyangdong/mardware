import axios from 'axios'
import {baseUrl} from '@/config/base'

export const getForgetCode = accountNo => axios({//忘记密码获取验证码
  params: {accountNo: accountNo},
  method: 'GET',
  withCredentials: true,
  url: baseUrl + '/forget_password'
});

export const resetPwd = resetInfo => axios({//重置密码
  params: {accountNo: resetInfo.accountNo,password:resetInfo.password,captcha:resetInfo.code},
  method: 'POST',
  withCredentials: true,
  url: baseUrl + '/forget_password'
});

export const getPersonal = () => axios({//获取个人信息
  method: 'GET',
  withCredentials: true,
  url: baseUrl + '/web/common/self_information'
});

export const getProvinceInfo = () => axios({//获取一级城市
  method: 'GET',
  withCredentials: true,
  url: baseUrl + '/web/common/area/province'
});

export const getCityInfo = (pid) => axios({//获取一级城市
  params: {pid: pid},
  method: 'GET',
  withCredentials: true,
  url: baseUrl + '/web/common/area/city'
});

export const qualification = qualificationInfo => axios({//
  params: {
    companyAddress: qualificationInfo.companyAddress,
    companyName:qualificationInfo.companyName,
    charterId:qualificationInfo.charterId,
    telephone:qualificationInfo.telephone,
    areaId:qualificationInfo.areaId,
    linkman:qualificationInfo.linkman,
    companyType:qualificationInfo.companyType,
  },
  method: 'POST',
  withCredentials: true,
  url: baseUrl + '/web/common/qualification/commit'
});
