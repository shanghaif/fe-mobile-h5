/**
 * 通用正则表达式
 */

// 汉字校验正则
export const CHINESE_CHAR = /^[\u4E00-\u9FA5\u3400-\u4DBF]+(·[\u4E00-\u9FA5\u3400-\u4DBF]+){0,3}$/;
// 英文字符串(包含空格)
export const EN_CHAR = /^[a-zA-Z\\s]+$/;
// 无效的公司名称
export const INVALID_COMPANY = /^(?!(无|没有|个体|保密|应届毕业生|学校|学生|部队|暂无|医院|123|自由职业|私企|个人|应届生|无无|待业|私人|1|私营|银行|幼儿园|自主创业|某公司|离职|酒店|北京|没|在校学生|事业单位|在校|个体经营|广告公司|自营|政府|私人企业|国企|其他|个体户|建筑公司|11|111|房地产|上海)$)/;
// 邮箱
export const EMAIL = /^[A-Z_a-z0-9-.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/;
// 手机号
export const MOBILE = /^(((\(\d{2,3}\))|(\d{3}-))?(1[2-9]\d{9}))$|^((001)[2-9]\d{9})$|^00((6001\d{8})|(8201[016]\d{8})|(919\d{9})|(330\d{9})|(6402\d{7,9})|(346\d{8})|(393\d{9})|(3519\d{8}))+$/;
