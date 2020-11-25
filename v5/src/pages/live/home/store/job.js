import {
  observable,
  action,
} from 'mobx';

class Job {
  liveId = '';

  @observable
  jobList = [];

  @observable
  active = '';

  @observable
  listVisible = false;

  @observable
  showActiiveJob = false;

  @action.bound
  setListVisible(visible) {
    this.listVisible = visible;
  }

  @action.bound
  setActive(active) {
    if (this.active !== active) {
      this.active = active;
      this.showActiiveJob = true;
    }
  }
  @action.bound
  closeActiveJob() {
    this.showActiiveJob = false;
  }


  @action.bound
  setList(list) {
    this.jobList = list;
  }


  @action.bound
  handleApply(id, kind) {
    const job = this.jobList.find((item) => (item.jobId === id && item.jobKind === kind));
    job.applied = true;
  }

  @action.bound
  fetchJobs(liveId) {
    if (liveId && !this.liveId) {
      this.liveId = liveId;
    }
    $.ajax({
      url: '/live/v1/get-job-list.json',
      data: {
        liveId: liveId || this.liveId,
      },
      success: ({ data, flag }) => {
        if (flag === 1) {
          const { ext, datas = [] } = data;
          ext && this.setActive(`${ext.jobId}_${ext.jobKind}`);
          if (datas.length) {
            this.setList(datas);
          }
        }
      },
    });
  }
}

export default new Job();
