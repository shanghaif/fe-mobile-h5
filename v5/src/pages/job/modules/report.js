import initReport from '../../../components/business/report';

const { jobId, jobKind } = $CONFIG;

initReport($('[data-selector="report-btn"]'), {
  reportedJobKind: jobKind,
  reportedJobId: jobId,
  type: 'job',
});
