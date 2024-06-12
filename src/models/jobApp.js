import DB from './db';
import UserModel from './users';

export default class JobAppModel {
  constructor(jobName, firstName, lastName, email, phone, resume, coverLetter) {
    this.jobName = jobName;
    this.date = new Date();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.resume = resume;
    this.coverLetter = coverLetter;
  }

  static async getJobApps() {
    return DB.readFile('storage/jobApps.json');
  }

  static async setJobApps(jobApps) {
    return DB.writeFile('storage/jobApps.json', jobApps);
  }

  static async addJobApp(jobApp) {
    const user = UserModel.getUserByEmail(jobApp.email);

    if (user) {
      const jobApps = await this.getJobApps();
      jobApps.push(jobApp);
      await this.setJobApps(jobApps);
      return jobApp;
    }
    return Error('User not found');
  }

  static async getJobAppsByEmail(email) {
    const jobApps = await this.getJobApps();
    return jobApps.filter((app) => app.email === email);
  }
}
