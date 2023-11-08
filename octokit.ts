import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: process.env.AUTH_TOKEN,
});
