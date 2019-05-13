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
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
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
  // 'GET /api/getAreas': (req, res) => {
  //   res.send({
  //     status: 'ok',
  //     data: [
  //       {
  //         label: '思学楼A区',
  //         value: 'sx_a',
  //       },
  //       {
  //         label: '思学楼B区',
  //         value: 'sx_b',
  //       },
  //       {
  //         label: '思学楼C区',
  //         value: 'sx_c',
  //       },
  //       {
  //         label: '思学楼D区',
  //         value: 'sx_d',
  //       },
  //       {
  //         label: '博学楼A区',
  //         value: 'bx_a',
  //       },
  //       {
  //         label: '博学楼B区',
  //         value: 'bx_b',
  //       },
  //       {
  //         label: '明德楼A区',
  //         value: 'md_a',
  //       },
  //       {
  //         label: '明德楼B区',
  //         value: 'md_b',
  //       },
  //       {
  //         label: '明志楼A区',
  //         value: 'mz_a',
  //       },
  //       {
  //         label: '明志楼B区',
  //         value: 'mz_b',
  //       },
  //       {
  //         label: '明辨楼C区',
  //         value: 'mb_c',
  //       },
  //       {
  //         label: '明理楼A区',
  //         value: 'ml_a',
  //       },
  //       {
  //         label: '明理楼B区',
  //         value: 'ml_b',
  //       },
  //       {
  //         label: '思学楼机房',
  //         value: 'sxl',
  //       },
  //     ]
  //   })
  // }
};

export default delay(proxy, 1000);
