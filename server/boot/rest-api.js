export default function mountRestApi(server) {
  server.use(server.get('restApiRoot'), server.loopback.rest());
};
