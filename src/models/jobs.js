import DB from './db';

export default class JobsModel {
  constructor(jobName) {
    this.jobName = jobName;
  }

  static async getJobs() {
    return DB.readFile('storage/jobs.json');
  }

  static async setJobs(users) {
    return DB.writeFile(users, 'storage/jobs.json');
  }

  static async getJobByName(jobName) {
    const jobs = this.getJobs();
    return jobs.find((job) => job.jobName === jobName);
  }

  static async addJob(jobName) {
    const jobs = this.getJobs();
    const newJob = new JobsModel(jobName);

    jobs.push(newJob);
    this.setJobs(jobs);
    return newJob;
  }
}
