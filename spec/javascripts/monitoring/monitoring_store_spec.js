import MonitoringStore from '~/monitoring/stores/monitoring_store';
import MonitoringMock, { deploymentData, environmentData } from './mock_data';

describe('MonitoringStore', () => {
  const store = new MonitoringStore();
  store.storeMetrics(MonitoringMock.data);

  it('contains two groups that contains, one of which has two queries sorted by priority', () => {
    expect(store.groups).toBeDefined();
    expect(store.groups.length).toEqual(2);
    expect(store.groups[0].metrics.length).toEqual(2);
  });

  it('gets the metrics count for every group', () => {
    expect(store.getMetricsCount()).toEqual(3);
  });

  it('contains deployment data', () => {
    store.storeDeploymentData(deploymentData);

    expect(store.deploymentData).toBeDefined();
    expect(store.deploymentData.length).toEqual(3);
    expect(typeof store.deploymentData[0]).toEqual('object');
  });

  it('only stores environment data that contains deployments', () => {
    store.storeEnvironmentsData(environmentData);

    expect(store.environmentsData.length).toEqual(2);
  });

  it('removes the data if all the values from a query are not defined', () => {
    expect(store.groups[1].metrics[0].queries[0].result.length).toEqual(0);
  });
});
