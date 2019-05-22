export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/user/login' },
      {
        path: '/em',
        name: '设备管理',
        icon: 'cluster',
        routes: [
          {
            path: '/em/emcheck',
            name: '设备查看',
            component: './Em/EmCheck/index',
          },
          {
            path: '/em/roomauth',
            name: '教室管理',
            component: './Em/RoomAuth/index',
            authority: ['admin', 'area_admin'],
          },
          {
            path: '/em/areaauth',
            name: '区域管理',
            component: './Em/AreaAuth/index',
            authority: ['admin'],
          },
          {
            path: '/em/etcheckout',
            name: '设备外借记录',
            component: './Em/EtCheckout/index',
            authority: ['admin'],
          },
        ]
      },
      {
        path: '/complaint',
        icon: 'form',
        name: '投诉列表',
        routes: [
          {
            path: '/complaint/food_complaint',
            name: '卫生投诉',
            component: './Complaint/FoodComplaint/index',
          },
          {
            path: '/complaint/fault_complaint',
            name: '故障投诉',
            component: './Complaint/FaultComplaint/index',
          },
        ],
      },
      {
        path: '/maintain',
        name: '设备维护',
        icon: 'tool',
        routes: [
          {
            path: '/maintain/faulthanding',
            name: '日常故障记录',
            component: './EtMaintain/FaultHanding/index',
          },
          {
            path: '/maintain/techhanding',
            name: '技术故障记录',
            component: './EtMaintain/TechHanding/index',
          },
        ]
      },
      {
        path: '/polling',
        name: '设备巡检',
        icon: 'profile',
        routes: [
          {
            path: '/polling/ups',
            name: 'UPS巡检',
            routes: [
              {
                path: '/polling/ups/list',
                name: 'UPS巡检记录',
                component: './Polling/Ups/CheckList/index',
              },
              {
                path: '/polling/ups/areaauth',
                name: 'UPS区域管理',
                component: './Polling/Ups/AreaAuth/index',
              },
              {
                path: '/polling/ups/roomauth',
                name: 'UPS机房管理',
                component: './Polling/Ups/RoomAuth/index',
              },
            ]
          },
          {
            path: '/polling/machine',
            name: '机房巡检',
            routes: [
              {
                path: '/polling/machine/list',
                name: '机房巡检记录',
                component: './Polling/Machine/CheckList/index',
              },
              {
                path: '/polling/machine/areaauth',
                name: '机房区域管理',
                component: './Polling/Machine/AreaAuth/index',
              },
              {
                path: '/polling/machine/roomauth',
                name: '机房管理',
                component: './Polling/Machine/RoomAuth/index',
              },
            ]
          },
          {
            path: '/polling/warehouse',
            name: '库房巡检',
          },
        ]
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      {
        name: '个人中心',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/settings',
            name: '设置',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        path: '/setting',
        name: '系统设置',
        icon: 'setting',
        authority: ['admin'],
        routes: [
          {
            path: '/setting/account',
            name: '账号管理',
            component: './Setting/Account/index',
            authority: ['admin'],
          },
        ]
      },
      {
        component: '404',
      },
    ],
  },
];
