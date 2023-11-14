export const getEndpoint = () => {
  return process.env.WORDPRESS_GRAPHQL_ENDPOINT.split('').reverse().join('');
};
