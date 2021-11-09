//  keys ,为mock中Random对象的成员函数, 方便后面使用, 忘记了可以展开查看
const {
  boolean,    bool,      natural,
  integer,   int,        float,     character,
  char,      string,     str,       range,
  date,      time,       datetime,  now,
  image,     img,        color,
  hex,       rgb,        rgba,      hsl,
  paragraph, cparagraph, sentence,  csentence,
  word,      cword,      title,     ctitle,
  first,     last,       name,      cfirst,
  clast,     cname,      url,       protocol,
  domain,    tld,        email,     ip,
  region,    province,   city,      county,
  zip,       capitalize, upper,     lower,
  pick,      d4,
  d6,        d8,         d12,       d20,
  d100,      guid,       uuid,      id,
  increment, inc,        shuffle
} = require('./mockServer/mocking/keys')

// mock的项, 统一为上面key函数的调用
module.exports = {
  // 配置成数组, 指定生成的数目
  goods:[
    () => ({
      id: id(),
      title:ctitle(),
      detail:cparagraph()
    }),
    5
  ],

  // 配置成函数, 默认生成20条数据
  users:() => ({
    id: id(),
    name: cname()
  }),
}
