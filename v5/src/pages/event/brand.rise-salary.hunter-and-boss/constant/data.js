import domain from '@liepin/native-domain-fe';
import Curry from '../images/Curry.jpg';
import Dullay from '../images/Dullay.jpg';
import Huskar from '../images/Huskar.jpg';
import Jeff from '../images/Jeff.jpg';
import Sarah from '../images/Sarah.jpg';
import Vancy from '../images/Vancy.jpg';

const location = domain('m');
const hunterData = [
  {
    id: '06547e309558580970de5758dc36f686',
    name: 'Jeff He',
    job: '管理顾问',
    company: '上海必胜人力资源有限公司',
    application: '93%',
    feedback: '93%',
    logo: `${Jeff}`,
    list: [
      {
        jobId: '16496057',
        job: '算法工程师',
        salary: '48-96万',
        position: '上海',
        year: '3年以上',
        link: `${location}/a/16496057.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16495803',
        job: '平台专家（AI、大数据、云）',
        salary: '120-240万',
        position: '北京',
        year: '8年以上',
        link: `${location}/a/16495803.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16495615',
        job: '云平台负责人',
        salary: '120-241万',
        position: '北京',
        year: '8年以上',
        link: `${location}/a/16495615.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '8522d8ae13bf7f8f14af88d443e04c8d',
    name: 'vancy',
    job: '助理顾问',
    company: '上海仕卿人力资源有限公司',
    application: '77%',
    feedback: '76%',
    logo: `${Vancy}`,
    list: [
      {
        jobId: '16584783',
        job: '大数据架构师',
        salary: '75-120万',
        position: '北京',
        year: '8年以上',
        link: `${location}/a/16584783.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16463121',
        job: '高级营收产品经理',
        salary: '45-90万',
        position: '北京',
        year: '3年以上',
        link: `${location}/a/16463121.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16462175',
        job: '用户增长运营',
        salary: '45-75万',
        position: '广州',
        year: '3年以上',
        link: `${location}/a/16462175.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '4e38bcc109197b867c8c352156d8c67c',
    name: 'Dullay',
    job: '猎头顾问',
    company: '江苏满天星企业管理咨询有限公司',
    application: '92%',
    feedback: '92%',
    logo: `${Dullay}`,
    list: [
      {
        jobId: '15867479',
        job: '高级电商运营经理',
        salary: '24-48万',
        position: '武汉',
        year: '5年以上',
        link: `${location}/a/15867479.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '15765421',
        job: '安全算法工程师',
        salary: '24-48万',
        position: '南京',
        year: '2年以上',
        link: `${location}/a/15765421.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '15765565',
        job: 'HRD',
        salary: '70-82万',
        position: '北京',
        year: '6年以上',
        link: `${location}/a/15765565.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '7483a8d36462802d6c6af2012ef43c40',
    name: 'Sarah',
    job: '猎头顾问',
    company: '万宝盛华人力资源(中国)有限公司深圳分公司',
    application: '96%',
    feedback: '96%',
    logo: `${Sarah}`,
    list: [
      {
        jobId: '16503045',
        job: '用户体验交互设计专家',
        salary: '48-80万',
        position: '杭州',
        year: '5年以上',
        link: `${location}/a/16503045.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16265743',
        job: '资深运维工程师',
        salary: '32-64万',
        position: '深圳',
        year: '5年以上',
        link: `${location}/a/16265743.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '15651779',
        job: '搜索推荐产品经理',
        salary: '32-64万',
        position: '杭州',
        year: '5年以上',
        link: `${location}/a/15651779.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '9d5f436d9700247c48a8f70a674a09ae',
    name: 'Huskar',
    job: '顾问',
    company: '任仕达企业管理(上海)有限公司',
    application: '96%',
    feedback: '96%',
    logo: `${Huskar}`,
    list: [
      {
        jobId: '16344655',
        job: '产品总监',
        salary: '80-112万',
        position: '深圳',
        year: '5年以上',
        link: `${location}/a/16344655.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '15249947',
        job: '高级后台开发',
        salary: '40-64万',
        position: '北京',
        year: '5年以上',
        link: `${location}/a/15249947.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '15820109',
        job: '医疗AI产品经理',
        salary: '48-80万',
        position: '北京',
        year: '3年以上',
        link: `${location}/a/15820109.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: 'f6053996c0cb9188afba8963e14e5031',
    name: 'Curry',
    job: 'AC',
    company: '上海必胜人力资源有限公司(上海)有限公司',
    application: '84%',
    feedback: '84%',
    logo: `${Curry}`,
    list: [
      {
        jobId: '16755045',
        job: '资深搜索算法工程师',
        salary: '56-98万',
        position: '广州',
        year: '2年以上',
        link: `${location}/a/16755045.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16373867',
        job: '高级架构师',
        salary: '60-99万',
        position: '南京',
        year: '7年以上',
        link: `${location}/a/16373867.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16755033',
        job: '电商ERP产品经理',
        salary: '36-50万',
        position: '北京',
        year: '3年以上',
        link: `${location}/a/15820109.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
];

const bossData = [
  {
    id: '8481996',
    name: '雪球',
    welfare: [
      '午餐补助', '定期体检', '节日礼物', '绩效奖金',
    ],
    logo: 'https://image0.lietou-static.com/huge_/5c7dd095509919c4f50ed7f507u.png',
    list: [
      {
        jobId: '23751215',
        job: '高级/资深Android开发工程师',
        salary: '30-42w',
        position: '北京',
        year: '3年以上',
        link: `${location}/job/1923751215.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '23276247',
        job: '品牌及整合营销负责人',
        salary: '24-48w',
        position: '北京',
        year: '5年以上',
        link: `${location}/job/1923276247.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '23237995',
        job: '高级用户运营',
        salary: '19-36w',
        position: '北京',
        year: '5年以上',
        link: `${location}/job/1923237995.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '9594289',
    name: 'Soul',
    welfare: [
      '技能培训', '扁平管理', '岗位晋升', '五险一金',
    ],
    logo: 'https://image0.lietou-static.com/huge_/5cc2ab3d9fae687d434dd23605u.jpg',
    list: [
      {
        jobId: '24014317',
        job: '内容运营',
        salary: '面议',
        position: '上海',
        year: '经验不限',
        link: `${location}/job/1924014317.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '24022725',
        job: '商业化产品经理',
        salary: '面议',
        position: '上海',
        year: '5年以上',
        link: `${location}/job/1924022725.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '22271125',
        job: '后端架构师',
        salary: '40-64w',
        position: '上海',
        year: '5年以上',
        link: `${location}/job/1922271125.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '9682154',
    name: '梦想加',
    welfare: [
      '股票期权', '绩效奖金', '带薪年假', '弹性工作',
    ],
    logo: 'https://image0.lietou-static.com/huge_/5bff66e44e50bc2d1c9c2d1503u.png',
    list: [
      {
        jobId: '20336525',
        job: '前端专家',
        salary: '42-60w',
        position: '北京',
        year: '5年以上',
        link: `${location}/job/1920336525.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '23929875',
        job: '核算经理',
        salary: '20-33w',
        position: '北京',
        year: '5年以上',
        link: `${location}/job/1923929875.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '23944743',
        job: '社区运营经理',
        salary: '10-13万',
        position: '杭州',
        year: '3年以上',
        link: `${location}/job/1923944743.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '8586509',
    name: '摩天轮票务',
    welfare: [
      '五险一金', '定期体检', '发展空间大', '带薪年假',
    ],
    logo: 'https://image0.lietou-static.com/huge_/5bac9b718e50fb8f5587ed3204a.png',
    list: [
      {
        jobId: '23000391',
        job: '高级前端开发师',
        salary: '36-48万',
        position: '上海',
        year: '5年以上',
        link: `${location}/job/1923000391.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '16408841',
        job: '法务经理',
        salary: '28-42万',
        position: '上海',
        year: '5年以上',
        link: `${location}/job/1916408841.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '22752323',
        job: 'Java工程师-N',
        salary: '24-26万',
        position: '上海',
        year: '3年以上',
        link: `${location}/job/1922752323.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
  {
    id: '9128001',
    name: '玉符科技',
    welfare: [
      '午餐补助', '弹性工作', '岗位晋升', '扁平管理',
    ],
    logo: 'https://image0.lietou-static.com/huge_/5ab323758e50636470f7527305a.jpg',
    list: [
      {
        jobId: '23521549',
        job: '测试开发工程师（web端）',
        salary: '18-33万',
        position: '北京',
        year: '3年以上',
        link: `${location}/job/1923521549.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '23522277',
        job: '云平台开发工程师（中台）',
        salary: '20-39万',
        position: '北京',
        year: '3年以上',
        link: `${location}/job/1923522277.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
      {
        jobId: '22633215',
        job: 'Java开发工程师',
        salary: '21-42万',
        position: '北京',
        year: '3年以上',
        link: `${location}/job/1922633215.shtml?d_sfrom=special_activity_201909_hardcore`,
      },
    ],
  },
];

export { hunterData, bossData };