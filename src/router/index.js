import Vue from 'vue'
import Router from 'vue-router'

/*登录注册页面*/
const SignIn = () => import(/*webpackChunkName:"group-login"*/'@/page/user/signIn')
const SignUp = () => import(/*webpackChunkName:"group-login"*/'@/page/user/signUp')
const UserSignPage = () => import(/*webpackChunkName:"group-login"*/'@/page/user/signPage')

/*找回密码*/
const ForgetPwd = () => import(/*webpackChunkName:"group-forget"*/'@/page/forgetPwd/forgetPage')
const ForgetType = () => import(/*webpackChunkName:"group-forget"*/'@/page/forgetPwd/forget-type')
const PhoneValidate = () => import(/*webpackChunkName:"group-forget"*/'@/page/forgetPwd/phone-validate')
const EmailValidate = () => import(/*webpackChunkName:"group-forget"*/'@/page/forgetPwd/email-validate')
const ForgetReset = () => import(/*webpackChunkName:"group-forget"*/'@/page/forgetPwd/forget-reset')
const ForgetSuccess = () => import(/*webpackChunkName:"group-forget"*/'@/page/forgetPwd/forget-success')

/*首页路由*/
const HomePage = () => import(/*webpackChunkName:"group-home-index"*/'@/page/home/home')
const HomeIndex = () => import(/*webpackChunkName:"group-home-index"*/'@/page/home/index/index')

/*我的设备*/
const MyDevice = () => import(/*webpackChunkName:"group-device"*/'@/page/home/myDevice/myDevice')
const MyDeviceRight = () => import(/*webpackChunkName:"group-device"*/'@/page/home/myDevice/deviceRight/myDeviceRight')
const MyDeviceIndependent = () => import(/*webpackChunkName:"group-device"*/'@/page/home/myDevice/deviceRight/deviceIndependent')
const MyDeviceGroup = () => import(/*webpackChunkName:"group-device"*/'@/page/home/myDevice/deviceRight/deviceGroup')
const MyDeviceActivation = () => import(/*webpackChunkName:"group-device"*/'@/page/home/myDevice/deviceActivation/myDeviceActivation')
const MyDeviceBracelet = () => import(/*webpackChunkName:"group-device"*/'@/page/home/myDevice/bracelet/bracelet')

/*运维管理*/
const MochaITOM = () => import(/*webpackChunkName:"mocha"*/'@/page/home/mocha/mocha')

/*应用服务*/
const Application = () => import(/*webpackChunkName:"application"*/'@/page/home/application/application')

/*个人中心*/
const PersonalPage = () => import(/*webpackChunkName:"group-persion"*/'@/page/personal/personal-page')
const ComputerAttestation = () => import(/*webpackChunkName:"group-persion"*/'@/page/personal/computer-attestation')

/*系统管理*/
const SystemManage = () => import(/*webpackChunkName:"group-system"*/'@/page/home/manage/system-manage')
const SystemAccount = () => import(/*webpackChunkName:"group-system"*/'@/page/home/manage/systemRight/account')
const SystemEquipment = () => import(/*webpackChunkName:"group-system"*/'@/page/home/manage/systemRight/equipment')
const SystemActivation = () => import(/*webpackChunkName:"group-system"*/'@/page/home/manage/systemRight/activation-code')

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },{
            path: '/login',
            component: UserSignPage,
            children: [
                {
                    path: '/',
                    redirect: 'signin'
                },{
                    path: 'signin',
                    name: 'SignIn',
                    component: SignIn
                },{
                    path: 'signup',
                    name: 'SignUp',
                    component: SignUp
                },
            ]
        },{
            path: '/home',
            component : HomePage,
            children : [
                {
                    path : '/',
                    redirect : 'index'
                },{
                    path : 'index',//首页
                    name : HomeIndex,
                    component : HomeIndex
                },{
                    path : 'mydevice',//我的设备
                    component : MyDevice,
                    children : [
                        {
                            path : '/',
                            redirect : 'bracelet'
                        },
                        {
                            path: 'right',
                            component: MyDeviceRight,
                            children: [
                                {
                                    path: '/',
                                    redirect: 'independent'
                                },{
                                    path: 'independent',
                                    name: MyDeviceIndependent,
                                    component: MyDeviceIndependent
                                },{
                                    path: 'group',
                                    name: MyDeviceGroup,
                                    component: MyDeviceGroup
                                }
                            ]
                        },{
                            path : 'activation',
                            name : MyDeviceActivation,
                            component : MyDeviceActivation
                        },{
                            path : 'bracelet',
                            name : MyDeviceBracelet,
                            component : MyDeviceBracelet
                        }
                    ]
                },{
                    path: 'MochaITOM',
                    component : MochaITOM 
                },{
                    path: 'application',
                    component : Application 
                },{
                    path: 'manage',
                    component: SystemManage,
                    children: [
                        {
                            path: '/',
                            redirect: 'account'
                        },
                        {
                            path: 'account',
                            name: SystemAccount,
                            component: SystemAccount,
                        }, {
                            path: 'equipment',
                            name: SystemEquipment,
                            component: SystemEquipment
                        }, {
                            path: 'activation',
                            name: SystemActivation,
                            component: SystemActivation
                        }
                    ]
                }              
            ] 
        },{
            path: '/forgetPwd',
            component: ForgetPwd,
            children: [
              {
                path: '/',
                redirect: 'forget-type'
              },{
                path: 'forget-type',
                name: 'forget-type',
                component: ForgetType
              },{
                path: 'phone-validate',
                name: 'phone-validate',
                component: PhoneValidate
              },{
                path: 'email-validate',
                name: 'email-validate',
                component: EmailValidate
              },{
                path: 'forget-reset',
                name: 'forget-reset',
                component: ForgetReset
              },{
                path: 'forget-success',
                name: 'forget-success',
                component: ForgetSuccess
              }
            ]
        },{
            path: '/personal-page',
            name: 'personal-page',
            component: PersonalPage,
        },
        {
            path: '/computer-attestation',
            name: 'computer-attestation',
            component: ComputerAttestation,
        }  
    ]
})
