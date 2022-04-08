const str_obj = `{"inq":"0210F22200018E80800800000000020000000200380099000000035860031802005900351403190312203122000000003514TEIPC200BPKALSEL36008805110032605170600011203A              35860 SEKRETARIAT DPRD PROV. KALSEL               06001001","amount":35860,"bit61":"05110032605170600011203A              35860 SEKRETARIAT DPRD PROV. KALSEL               ","stanpay":3806,"datetrans":"0318020557"}`
const obj = JSON.parse(str_obj);

const inq = obj["inq"]
const pay = inq.substring(0,40) + 50 + inq.substring(42,inq.length);

obj["pay"] = pay;

// const pay = `,"pay":"${inq.substring(0,40) + 50 + inq.substring(42,inq.length)}"`
console.log(JSON.stringify(obj))