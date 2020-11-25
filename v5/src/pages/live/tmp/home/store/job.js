import {
  observable,
  action,
} from 'mobx';

class Job {
  liveId = '';

  @observable
  jobList = [];

  @observable
  jobCount = 0;

  @observable
  screenWidth = 0;

  @observable
  videoHeight = 0;

  @observable
  active = '';

  @observable
  showActiiveJob = false;

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
  setJobCount(count) {
    this.jobCount = count;
  }

  @action.bound
  setRect({
    screenWidth,
    videoHeight,
  }) {
    videoHeight && (this.videoHeight = videoHeight);
    screenWidth && (this.screenWidth = screenWidth);
  }

  @action.bound
  handleApply(id, index) {
    const eco = this.jobList.find((item) => item.comp.compId === id);
    eco.jobs[index].applied = true;
  }

  @action.bound
  fetchJobs(liveId) {
    if (liveId && !this.liveId) {
      this.liveId = liveId;
    }
    $.ajax({
      url: '/live/get-job-list.json',
      data: {
        liveId: liveId || this.liveId,
      },
      success: ({ data, flag }) => {
        if (flag === 1) {
          const { st = '', datas = [] } = data;
          st && this.setActive(st);
          if (datas.length) {
            this.setJobCount(datas.reduce((t, item) => (t + item.jobs.length), 0));
            this.setList(datas);
          }
        }
      },
    });
  }
}

export default new Job();
