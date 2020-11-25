import jobs from '@liepin/dict-job-fe/jobs';

export default function jobTitleValid() {
  const result = {
    valid: true,
    customErrorMsg: `请更新您的${this.getAttribute('validate-title')}`,
  };
  const values = this.value.split(',');
  let i = 0;
  const { length } = values;
  for (; i < length; i++) {
    if (values[i] in jobs.relations) {
      result.valid = false;
      break;
    }
  }
  return result;
}
