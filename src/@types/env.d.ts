export interface EnvironmentConfig {
  SECRET_TOKEN: string;
  duolingo: DuolingoConfig;
}

export interface DuolingoConfig {
  username: string;
  email: string;
  password: string;
}
