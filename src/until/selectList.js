/*
 * @Author: lijun
 * @Date: 2018-11-20 15:06:38
 * @Last Modified by: lijun
 * @Last Modified time: 2018-11-20 15:09:39
 * 存放下拉选择列表数据
 */

// 设备分类数据
export const classifyList = [
  {
    value: 'AnalyticalInstruments',
    label: '分析仪器',
    children: [{
      value: '1',
      label: '电子光学仪器'
    }, {
      value: '2',
      label: '质谱仪器'
    },
    {
      value: '3',
      label: 'X射线仪器'
    },
    {
      value: '4',
      label: '光谱仪器'
    },
    {
      value: '5',
      label: '色谱仪器'
    },
    {
      value: '6',
      label: '波谱仪器'
    },
    {
      value: '7',
      label: '电化学仪器'
    },
    {
      value: '8',
      label: '显微镜及图象分析仪器'
    },
    {
      value: '9',
      label: '热分析仪器'
    },
    {
      value: '10',
      label: '生化分离分析仪器'
    },
    {
      value: '11',
      label: '环境与农业分析仪器'
    },
    {
      value: '12',
      label: '样品前处理及制备仪器'
    },
    {
      value: '13',
      label: '其他'
    }
    ]
  },
  {
    value: 'physical',
    label: '物理性能测试仪器',
    children: [{
      value: '1',
      label: '力学性能测试仪器'
    },
    {
      value: '2',
      label: '大地测量仪器'
    },
    {
      value: '3',
      label: '光电测量仪器'
    },
    {
      value: '4',
      label: '声学振动仪器'
    },
    {
      value: '5',
      label: '颗粒度测量仪器'
    },
    {
      value: '6',
      label: '探伤仪器'
    },
    {
      value: '7',
      label: '其他'
    }]
  },
  {
    value: 'Metering',
    label: '计量仪器',
    children: [{
      value: '1',
      label: '长度计量仪器'
    },
    {
      value: '2',
      label: '热学计量仪器'
    },
    {
      value: '3',
      label: '力学计量仪器'
    },
    {
      value: '4',
      label: '电磁学计量仪器'
    },
    {
      value: '5',
      label: '时间频率计量仪器'
    },
    {
      value: '6',
      label: '声学计量仪器'
    },
    {
      value: '7',
      label: '光学计量仪器'
    },
    {
      value: '8',
      label: '电离辐射计量仪器'
    },
    {
      value: '9',
      label: '电子学计量仪器'
    },
    {
      value: '10',
      label: '其他'
    }]
  },
  {
    value: 'electronic',
    label: '电子测量仪器',
    children: [{
      value: '1',
      label: '通用电子测量仪器'
    },
    {
      value: '2',
      label: '射频和微波测试仪器'
    },
    {
      value: '3',
      label: '通讯测量仪器'
    },
    {
      value: '4',
      label: '网络分析仪器'
    },
    {
      value: '5',
      label: '大规模集成电路测试仪器'
    },
    {
      value: '6',
      label: '其他'
    }]
  },
  {
    value: 'ocean',
    label: '海洋仪器',
    children: [{
      value: '1',
      label: '海洋水文测量仪器'
    },
    {
      value: '2',
      label: '多要素水文气象测量系统'
    },
    {
      value: '3',
      label: '海洋生物调查仪器'
    },
    {
      value: '4',
      label: '海水物理量测量仪器'
    },
    {
      value: '5',
      label: '海洋遥感／遥测仪器'
    },
    {
      value: '6',
      label: '海洋采样设备'
    },
    {
      value: '7',
      label: '其他'
    }]
  },
  {
    value: 'Earth',
    label: '地球探测仪器',
    children: [{
      value: '1',
      label: '电法仪器'
    },
    {
      value: '2',
      label: '电磁法仪器'
    },
    {
      value: '3',
      label: '磁法仪器'
    },
    {
      value: '4',
      label: '重力仪器'
    },
    {
      value: '5',
      label: '地震仪器'
    },
    {
      value: '6',
      label: '地球物理测井仪器'
    },
    {
      value: '7',
      label: '岩石矿物测试仪器'
    },
    {
      value: '8',
      label: '其他'
    }]
  },
  {
    value: 'Atmospheric',
    label: '大气探测仪器',
    children: [{
      value: '1',
      label: '气象台站观测仪器'
    },
    {
      value: '2',
      label: '高空气象探测仪器'
    },
    {
      value: '3',
      label: '特殊大气探测仪器'
    },
    {
      value: '4',
      label: '主动大气遥感仪器'
    },
    {
      value: '5',
      label: '被动大气遥感仪器'
    },
    {
      value: '6',
      label: '高层大气/电离层探测器'
    },
    {
      value: '7',
      label: '对地观测仪器'
    },
    {
      value: '8',
      label: '其他'
    }]
  },
  {
    value: 'Astronomical',
    label: '天文仪器',
    children: [{
      value: '1',
      label: '天体测量仪器'
    },
    {
      value: '2',
      label: '地面天文望远镜'
    },
    {
      value: '3',
      label: '空间天文望远镜'
    },
    {
      value: '4',
      label: '其他'
    }]
  },
  {
    value: 'medicine',
    label: '医学诊断仪器',
    children: [{
      value: '1',
      label: '临床检验分析仪器'
    },
    {
      value: '2',
      label: '影像诊断仪器'
    },
    {
      value: '3',
      label: '电子诊察仪器'
    },
    {
      value: '4',
      label: '其他'
    }]
  },
  {
    value: 'Nuclear',
    label: '核仪器',
    children: [{
      value: '1',
      label: '核辐射探测仪器'
    },
    {
      value: '2',
      label: '活化分析仪器'
    },
    {
      value: '3',
      label: '离子束分析仪器'
    },
    {
      value: '4',
      label: '核效应分析仪器'
    },
    {
      value: '5',
      label: '中子散射及衍射仪器'
    },
    {
      value: '6',
      label: '其他'
    }]
  },
  {
    value: 'Special',
    label: '特种检测仪器',
    children: [{
      value: '1',
      label: '射线检测仪器'
    },
    {
      value: '2',
      label: '超声检测仪器'
    },
    {
      value: '3',
      label: '电磁检测仪器'
    },
    {
      value: '4',
      label: '声发射检测仪器'
    },
    {
      value: '5',
      label: '光电检测仪器'
    },
    {
      value: '6',
      label: '其他'
    }]
  },
  {
    value: 'Technology',
    label: '工艺实验设备',
    children: [{
      value: '1',
      label: '汽车工艺实验设备'
    },
    {
      value: '2',
      label: '化工、制药工艺实验设备'
    },
    {
      value: '3',
      label: '电子工艺实验设备'
    },
    {
      value: '4',
      label: '加工工艺实验设备'
    },
    {
      value: '5',
      label: '纺织工艺实验设备'
    },
    {
      value: '6',
      label: '食品工艺实验设备'
    },
    {
      value: '7',
      label: '其他'
    }]
  },
  {
    value: 'Computer',
    label: '计算机及其配套设备',
    children: [{
      value: '1',
      label: '计算机'
    },
    {
      value: '2',
      label: '服务器'
    },
    {
      value: '3',
      label: '软件'
    },
    {
      value: '4',
      label: '数据采集及工作站'
    },
    {
      value: '5',
      label: '其他'
    }]
  },
  {
    value: 'Laser',
    label: '激光器',
    children: [{
      value: '1',
      label: '激光器'
    }, {
      value: '2',
      label: '其他'
    }]
  }]
