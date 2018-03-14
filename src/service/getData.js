import axios from 'axios'
import {baseUrl} from '@/config/base'
/*
 * @Author: wangsheng 
 * @Date: 2018-01-31 15:05:28 
 * @Last Modified by: wanghseng
 * @Last Modified time: 2018-02-02 14:26:00
 */
/*wangshegn BEGIN*/

export const userSignIn = userInfo => axios({//用户登录    
    params : {
        accountNo : userInfo.UserName,
        password : userInfo.PassWord,
        captcha : userInfo.code        
    },
    timeout: 10000,
    method : 'POST',
    withCredentials : true,
    url : baseUrl+'/login.do',
});

export const switchAccount = account => axios({//检查用户名是否已存在
    params : {accountNo:account},
    method : 'POST',
    withCredentials : true,
    url : baseUrl+'/validate_account'
});


export const signUpAccount = userInfo => axios({//用户注册
    params : {
        accountNo: userInfo.UserName,
        password : userInfo.PassWord_0
    },
    method : 'POST',
    timeout : 10000,
    withCredentials : true,
    url : baseUrl+'/register'
});
/*wangsheng END*/
/*==================================================================================================*/