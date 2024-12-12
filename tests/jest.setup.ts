/**
 * Setting required envs or setups in jest here
 */
process.env.ENV_NODE = "test";

afterAll(() => {
  jest.clearAllMocks();
});
