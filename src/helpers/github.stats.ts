import axios from 'axios';
import env from '../env';

const baseHeaders: { Authorization: string, Accept: string } = {
  Authorization: `token ${env.GITHUB_USER_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

/**
 * Github helper class, use for managing API called in github
 * @export default
 * @class GithubHelper
 */
export default class GithubStat {
  /**
 * Get numbe of repositories
 * return -1 when some error occured
 * @static
 * @returns {number} repositories
 * @memberof GithubHelper
 */
  static async numberOfRepositories(): Promise<number> {
    const URL = 'https://api.github.com/orgs/rwandaopensource/repos?per_page=1';
    try {
      const response = await axios.get(URL, {
        headers: baseHeaders,
      });
      return this.parseNumberOfPage(response.headers.link);
    } catch (err) {
      return -1;
    }
  }

  /**
 * Get number of members
 * return -1 when some error occured
 * @static
 * @returns {Array} repositories
 * @memberof GithubHelper
 */
  static async numberOfMembers(): Promise<number> {
    const URL = 'https://api.github.com/orgs/rwandaopensource/members?per_page=1';
    try {
      const response = await axios.get(URL, {
        headers: baseHeaders,
      });
      return this.parseNumberOfPage(response.headers.link);
    } catch (err) {
      return -1;
    }
  }

  /**
 * Get number of teams
 * return -1 when some error occured
 * @static
 * @returns {number} teams
 * @memberof GithubHelper
 */
  static async numberOfTeams(): Promise<number> {
    const URL = 'https://api.github.com/orgs/rwandaopensource/teams?per_page=1';
    try {
      const response = await axios.get(URL, {
        headers: baseHeaders,
      });
      return this.parseNumberOfPage(response.headers.link);
    } catch (err) {
      return -1;
    }
  }

  /**
 * Get number of projects
 * eturn -1 when some error occured
 * @static
 * @returns {number} teams
 * @memberof GithubHelper
 */
  static async numberOfProjects(): Promise<number> {
    const URL = 'https://api.github.com/orgs/rwandaopensource/projects?per_page=1';
    try {
      const response = await axios.get(URL, {
        headers: {
          ...baseHeaders,
          Accept: 'application/vnd.github.inertia-preview+json',
        },
      });
      return this.parseNumberOfPage(response.headers.link);
    } catch (err) {
      return -1;
    }
  }

  static parseNumberOfPage(link: string): any {
    if (!link) {
      return 1;
    }
    const matched: RegExpMatchArray = link.match(/page=(\d+)>; rel="last"/) || [];
    return matched[1] || 1;
  }
}