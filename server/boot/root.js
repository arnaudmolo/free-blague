export default function(server) {

  var router;
  // Install a `/` route that returns server status
  router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  server.use(router);
};
