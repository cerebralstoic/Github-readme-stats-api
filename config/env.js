import dotenv from 'dotenv';

dotenv.config();

export const env = {
    githubToken: process.env.GITHUB_TOKEN || '',
};