import { delay } from 'roadhog-api-doc';
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: '管理员',
    no: 'admin',
    tel: '17780110770',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'admin@ers.com',
    // signature: '海纳百川，有容乃大',
    // title: '交互专家',
    // group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    // tags: [
    //   {
    //     key: '0',
    //     label: '很有想法的',
    //   },
    //   {
    //     key: '1',
    //     label: '专注设计',
    //   },
    //   {
    //     key: '2',
    //     label: '辣~',
    //   },
    //   {
    //     key: '3',
    //     label: '大长腿',
    //   },
    //   {
    //     key: '4',
    //     label: '川妹子',
    //   },
    //   {
    //     key: '5',
    //     label: '海纳百川',
    //   },
    // ],
    // notifyCount: 12,
    // unreadCount: 11,
    // country: 'China',
    // geographic: {
    //   province: {
    //     label: '浙江省',
    //     key: '330000',
    //   },
    //   city: {
    //     label: '杭州市',
    //     key: '330100',
    //   },
    // },
    // address: '西湖区工专路 77 号',
    // phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === 'password' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'password' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'POST /api/updateUserInfo': (req, res) => {
    const data = req.body;
    res.send({
      status: 'ok',
      data,
    });
  },
  'POST /api/updatePassword': (req, res) => {
    const { oldPassword } = req.body;
    if (oldPassword === 'password') {
      res.send({
        status: 'ok',
      });
    } else {
      res.send({
        status: 'error',
      });
    }
  },
  'GET /api/getEtFaultResult': (req, res) => {
    const { type } = req.query;
    let data = [];
    switch (type) {
      case '投影设备':
        data = [
          {
            x: '松下 PT-PX770',
            y: 12,
          },
          {
            x: '日立 HCP-4000X',
            y: 23,
          },
          {
            x: 'NEC NP-P451X+',
            y: 8,
          },
          {
            x: '日立 HCP-4060WX',
            y: 33,
          },
          {
            x: 'HCP-4200WX',
            y: 27,
          },
          {
            x: 'HT-G20W',
            y: 16,
          },
        ]
        break;
      case '计算机':
        data = [
          {
            x: '超越E350 P4/3.06G',
            y: 12,
          },
          {
            x: 'DELL P4/3.0G',
            y: 17,
          },
          {
            x: '同方超越E710 8200',
            y: 7,
          },
          {
            x: '同方E700 Core2 4600',
            y: 28,
          },
          {
            x: '同方超越E705 2.53G',
            y: 56,
          },
          {
            x: 'DELL 380 E5400 2.7G',
            y: 16,
          },
          {
            x: '方正E520  E7400',
            y: 45,
          },
          {
            x: 'DELL 380',
            y: 18,
          },
          {
            x: '同方E900',
            y: 3,
          },
          {
            x: '同方超越E500 I5 3470',
            y: 4,
          },
        ]
        break;
      case '音响设备':
        data = [
          {
            x: 'AK100S',
            y: 4,
          },
          {
            x: '声霸 KA-80',
            y: 9,
          },
          {
            x: 'S200',
            y: 25,
          },
          {
            x: '松下WS-M80',
            y: 17,
          },
          {
            x: '湖山DK-F210',
            y: 9,
          },
          {
            x: '皇冠 S-9V',
            y: 12,
          },
          {
            x: '海普迪 S-9V',
            y: 2,
          },
        ]
        break;
      case '讲桌':
        data = [
          {
            x: '海捷',
            y: 2,
          },
          {
            x: '钢制（定制）',
            y: 6,
          },
          {
            x: 'MT-1400',
            y: 9,
          },
          {
            x: '控智',
            y: 8,
          },
          {
            x: '海力展H1200D',
            y: 14,
          },
        ]
        break;
      case '中控':
        data = [
          {
            x: 'ZY-860',
            y: 14,
          },
          {
            x: 'MC720',
            y: 22,
          },
          {
            x: '来同720',
            y: 11,
          },
          {
            x: '竟业达MNV9600C',
            y: 17,
          },
          {
            x: 'HY-6000',
            y: 3,
          },
          {
            x: '新纬创 HY-6000',
            y: 10,
          },
        ]
        break;
      case '电源控制器':
        data = [
          {
            x: '新开普 5(20)A',
            y: 2,
          },
          {
            x: '纬创  HY-SP8',
            y: 7,
          },
          {
            x: '纬创 SP6',
            y: 6,
          },
          {
            x: 'V3805C',
            y: 1,
          },
          {
            x: 'YPG-Ⅰ',
            y: 5,
          },
        ]
        break;
      default:
        break;
    }
    res.send({
      status: 'ok',
      data,
    });
  }
};

export default delay(proxy, 1000);
