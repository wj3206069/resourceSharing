import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import DefaultView from '@/views/layout/components/DefaultView'
import RegisterView from '@/views/layout/components/RegisterView'
import Index from '../views/index/index'
import EmpExa from '@/views/WaitDeal/EmployeeExamine/EmpExa'

Vue.use(Router)

function idPropFn(route) {
  return {
    id: route.query.id
  }
}

export const initialRouterMap = [{
  path: '',
  redirect: '/index',
  hidden: true
}, {
  path: '/user',
  name: 'userLogin',
  component: DefaultView,
  hidden: true,
  children: [{
    path: 'login',
    name: 'login',
    component: () =>
      import('@/views/user/Login')
  }]
}, {
  path: '/user',
  name: 'userRegister',
  hidden: true,
  component: RegisterView,
  children: [{
      path: 'register',
      name: 'register',
      component: () =>
        import('@/views/user/Register')
    }, {
      path: 'forgetPwd',
      name: 'forgetPwd',
      component: () =>
        import('@/views/user/ForgetPwd')
    },
    {
      path: 'identificationAll',
      name: 'identificationAll',
      component: () =>
        import('@/views/user/identificationAll')
    }, {
      path: 'setpassword',
      name: 'setpassword',
      component: () =>
        import('@/views/user/setPassword')
    }, {
      path: 'ForgetUserName',
      name: 'ForgetUserName',
      component: () =>
        import('@/views/user/ForgetUserName')
    },
    {
      path: 'personIdentify',
      name: 'personIdentify',
      component: () =>
        import('@/views/user/personIdentify')
    },
    {
      path: 'serivceIdentify',
      name: 'serivceIdentify',
      component: () =>
        import('@/views/user/serivceIdentify')
    },
    {
      path: 'unitIdentify',
      name: 'unitIdentify',
      component: () =>
        import('@/views/user/unitIdentify')
    },
    {
      path: 'expretIdentify',
      name: 'expretIdentify',
      component: () =>
        import('@/views/user/expretIdentify')
    },
  ]
}, {
  path: '/index',
  component: Layout,
  hidden: false,
  name: 'index',
  icon: 'zxicon zx-qiye-copy',
  title: '首页',
  children: [{
    path: '/index',
    component: Index
  }]
}]

export const asyncRouteMap = [{
    path: '/service',
    name: 'service',
    icon: 'zxicon zx-gongxiangfuwu',
    title: '共享服务管理',
    component: Layout,
    children: [{
        path: 'instrument',
        name: 'instrument',
        title: '仪器管理--机构',
        component: () =>
          import('@/views/ShareService/service/Service')
      },
      {
        path: 'instrumentPlatform',
        name: 'instrumentPlatform',
        title: '仪器管理--平台',
        component: () =>
          import('@/views/ShareService/service/instruPlatform')
      },
      {
        path: 'InsTem',
        name: 'instrumentTemplate',
        title: '仪器模版配置',
        component: () =>
          import('@/views/ShareService/insTemplate/template')
      },
      {
        path: 'serviceManagerList',
        name: 'serviceManagerList',
        title: '服务平台',
        component: () =>
          import('@/views/ShareService/serviceManager/serviceManagerList')
      },
      {
        path: 'serviceManagerPlatform',
        name: 'serviceManagerPlatform',
        title: '服务机构',
        component: () =>
          import('@/views/ShareService/serviceManager/serviceManagerPlatform')
      }, {
        path: 'CreateNewTemplate',
        name: 'CreateNewTemplate',
        title: '新增服务模板管理',
        component: () =>
          import('@/views/ShareService/CreateNewTemplate')
      }, {
        path: 'classificationEquipment',
        name: 'classificationEquipment',
        title: '设备分类',
        component: () =>
          import('@/views/ShareService/classificationEquipment/classificationEquipment')
      }, {
        path: 'smallEquipment',
        name: 'smallEquipment',
        title: '设备小类',
        component: () =>
          import('@/views/ShareService/classificationEquipment/smallEquipment')
      }
    ]
  }, {
    path: '/order',
    name: 'order',
    icon: 'zxicon zx-jibenxinxi',
    title: '订单管理',
    component: Layout,
    children: [{
      path: 'orderList',
      name: 'orderList',
      title: '订单管理--机构',
      component: () =>
        import('@/views/order/orderList')
    }, {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      hidden: true,
      title: '订单详情',
      component: () =>
        import('@/views/order/orderDetail')
    }, {
      path: 'orderListPlatform',
      name: 'orderListPlatform',
      title: '订单管理--平台',
      component: () =>
        import('@/views/order/orderListPlatform')
    }, {
      path: '/orderDetailPlatform/:id',
      name: 'orderDetailPlatform',
      hidden: true,
      title: '订单详情',
      component: () =>
        import('@/views/order/orderDetailPlatform')
    }]
  }, {
    path: '/appraise',
    name: 'appraise',
    icon: 'zxicon zx-wodeqiaquan-',
    title: '联合评议',
    component: Layout,
    children: [{
      path: 'instrument',
      name: 'instrument',
      title: '联合评议1',
      component: () =>
        import('@/views/service/instrument')
    }, {
      path: 'share',
      name: 'share',
      title: '联合评议2',
      component: () =>
        import('@/views/service/template')
    }]
  }, {
    path: '/content',
    name: 'content',
    icon: 'zxicon zx-zhuanjia',
    title: '内容评议',
    component: Layout,
    children: [{
      path: 'instrument',
      name: 'instrument',
      title: '内容评议1',
      component: () =>
        import('@/views/service/instrument')
    }, {
      path: 'share',
      name: 'share',
      title: '内容评议2',
      component: () =>
        import('@/views/service/template')
    }]
  }, {
    path: '/evaluate',
    name: 'evaluate',
    icon: 'zxicon zx-pingyixitong',
    title: '考核评估',
    component: Layout,
    children: [{
      path: 'instrument',
      name: 'instrument',
      title: '考核评估1',
      component: () =>
        import('@/views/service/instrument')
    }, {
      path: 'share',
      name: 'share',
      title: '考核评估2',
      component: () =>
        import('@/views/service/template')
    }]
  }, {
    path: '/count',
    name: 'count',
    icon: 'zxicon zx-daoru',
    title: '统计分析',
    component: Layout,
    children: [{
      path: 'instrument',
      name: 'instrument',
      title: '统计分析1',
      component: () =>
        import('@/views/service/instrument')
    }, {
      path: 'share',
      name: 'share',
      title: '统计分析2',
      component: () =>
        import('@/views/service/template')
    }]
  },
  {
    path: '/clientManage',
    name: 'clientManage',
    icon: 'zxicon zx-shezhi',
    title: '客户管理',
    component: Layout,
    children: [{
      path: 'unitUser',
      name: 'unitUser',
      title: '单位用户列表',
      component: () =>
        import('@/views/clientManage/unit/unitUser')
    }, {
      path: 'unitPersonal/:id',
      name: 'unitPersonal',
      hidden: true,
      title: '单位人员列表',
      component: () =>
        import('@/views/clientManage/unit/unitPersonalList')
    }, {
      path: 'checkUnitUser',
      name: 'checkUnitUser',
      title: '单位用户审核列表',
      component: () =>
        import('@/views/clientManage/unit/checkUnitUser')
    }, {
      path: 'personalUser',
      name: 'personalUser',
      title: '个人用户列表',
      component: () =>
        import('@/views/clientManage/personal/personalUser')
    }, {
      path: 'specialistList',
      name: 'specialistList',
      title: '专家审核列表',
      component: () =>
        import('@/views/clientManage/specialist/specialistList')
    }, {
      path: 'serviceCategoryList',
      name: 'serviceCategoryList',
      title: '服务类目管理',
      component: () =>
        import('@/views/clientManage/serviceCategory/serviceCategoryList')
    }]
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    icon: 'zxicon zx-shezhi',
    title: '用户中心',
    component: Layout,
    children: [{
      path: 'basicUnitInformation',
      name: 'basicUnitInformation',
      title: '用户中心',
      component: () =>
        import('@/views/userCenter/basicUnitInformation')
    }]
  },
  {
    path: '/contentManagement',
    name: 'contentManagement',
    icon: 'zxicon zx-shezhi',
    title: '内容管理',
    component: Layout,
    children: [{
        path: 'ScienceTechnologyInformation',
        name: 'ScienceTechnologyInformation',
        title: '科技资讯',
        component: () =>
          import('@/views/contentManagement/ScienceTechnologyInformation')
      },
      {
        path: 'Announcements',
        name: 'Announcements',
        title: '通知公告',
        component: () =>
          import('@/views/contentManagement/Announcements')
      }
    ]
  },
  {
    path: '/systemManagement',
    name: 'systemManagement',
    icon: 'zxicon zx-shezhi',
    title: '系统管理',
    component: Layout,
    children: [{
        path: 'rviewflowTerrace',
        name: 'rviewflowTerrace',
        title: '审核流配置-平台',
        component: () =>
          import('@/views/systemManagement/rviewflowTerrace')
      },
      {
        path: 'rviewflowOrganization',
        name: 'rviewflowOrganization',
        title: '审核流配置-机构',
        component: () =>
          import('@/views/systemManagement/rviewflowOrganization')
      },
      {
        path: 'roleNew',
        name: 'roleNew',
        hidden: 'true',
        component: () =>
          import('@/views/systemManagement/roleNew'),
      },
      {
        path: 'roleReview',
        name: 'roleReview',
        hidden: 'true',
        component: () =>
          import('@/views/systemManagement/roleReview'),
      },
      {
        path: 'organizer',
        name: 'organizer',
        title: '组织人员',
        component: () =>
          import('@/views/systemManagement/organizer')
      },
      {
        path: 'InnovativeVolumeSetup',
        name: 'InnovativeVolumeSetup',
        title: '创新卷免责协议设置-平台',

        component: () =>
          import('@/views/systemManagement/InnovativeVolumeSetup')
      },
      {
        path: 'electronicAgreement',
        name: 'electronicAgreement',
        title: '电子协议(合同)-服务机构',

        component: () =>
          import('@/views/systemManagement/electronicAgreement')
      },
      {
        path: 'orders',
        name: 'orders',
        title: '委托单-服务机构',

        component: () =>
          import('@/views/systemManagement/orders')
      },
      {
        path: 'roleAuthorityManagementPlatform',
        name: 'roleAuthorityManagementPlatform',
        title: '角色权限管理',
        component: () =>
          import('@/views/systemManagement/roleAuthorityManagementPlatform')
      },
      // {
      //   path: 'InstitutionalQualificationManagementList',
      //   name: 'InstitutionalQualificationManagementList',
      //   title: '机构资质管理-机构',
      //   component: () =>
      //     import('@/views/systemManagement/InstitutionalQualificationManagement/InstitutionalQualificationManagementList')
      // },
      // {
      //   path: 'InnovationCarrierList',
      //   name: 'InnovationCarrierList',
      //   title: '创新载体名称',
      //   component: () =>
      //     import('@/views/systemManagement/InnovationCarrierName/InnovationCarrierList')
      // },
      {
        path: 'InManagementList',
        name: 'InManagementList',
        title: '机构资质管理-机构',
        component: () =>
          import('@/views/systemManagement/InManagement/InManagementList')
      },
      {
        path: 'InnovationCarrierList',
        name: 'InnovationCarrierList',
        title: '创新载体名称',
        component: () =>
          import('@/views/systemManagement/InnovationCarrierName/InnovationCarrierList')
      },
      {
        path: 'organizeSetRole',
        name: 'organizeSetRole',
        hidden: 'true',
        component: () =>
          import('@/views/systemManagement/organizeSetRole')
      },
      {
        path: 'Setrole',
        name: 'Setrole',
        hidden: 'true',
        component: () =>
          import('@/views/systemManagement/Setrole')
      }
    ]
  },
  {
    path: '/WaitDeal',
    name: 'WaitDeal',
    icon: 'zxicon zx-daiban',
    title: '待办',

    component: Layout,
    children: [{
        path: 'EquipExamine',
        name: 'EquipExamine',
        title: '仪器审核-机构',
        component: () =>
          import('@/views/WaitDeal/EquipExamine/EquExa')
      },
      {
        path: 'EquipExaminePlat',
        name: 'EquipExaminePlat',
        title: '仪器审核-平台',

        component: () =>
          import('@/views/WaitDeal/EquipExamine/EquExaPlatform')
      },
      {
        path: 'ServiceExamine',
        name: 'ServiceExamine',
        title: '服务机构',

        component: () =>
          import('@/views/WaitDeal/ServiceExamine/SerExa')
      },

      {
        path: 'servicePlatform',
        name: 'servicePlatform',
        title: '服务平台',

        component: () =>
          import('@/views/WaitDeal/ServiceExamine/servicePlatform')
      },
      {
        path: 'CompanyExamine',
        name: 'CompanyExamine',
        title: '单位认证审核',

        component: () =>
          import('@/views/WaitDeal/CompanyExamine/ComExa'),
      },
      {
        path: 'EmployeeExamine',
        name: 'EmployeeExamine',
        title: '员工认证审核',

        component: () =>
          import('@/views/WaitDeal/EmployeeExamine/EmpExa'),
        component: EmpExa
      },
      {
        path: 'ExpertExamine',
        name: 'ExpertExamine',
        title: '专家审核',

        component: () =>
          import('@/views/WaitDeal/ExpertExamine/ExpExa'),
      }

    ]
  }
]

const router = new Router({
  mode: 'hash',
  // routes: initialRouterMap
  routes: initialRouterMap.concat(asyncRouteMap)

})

export default router
