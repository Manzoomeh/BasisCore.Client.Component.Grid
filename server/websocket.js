const WebSocket = require("ws");

const MergeType = {
  replace: 0,
  append: 1,
};

const DataStatus = {
  added: 0,
  edited: 1,
  deleted: 2,
};

const wss = new WebSocket.Server({ port: 8080 });

let userId = 1000;
setInterval(() => {
  userId++;
  const data = {
    setting: { keepalive: true },
    sources: {
      "socket.demo": {
        options: {
          mergeType: MergeType.append,
          keyFieldName: "id",
          statusFieldName: "status",
        },
        data: [
          {
            id: userId,
            age: Math.floor(Math.random() * 80),
            name: Math.random().toString(36).substring(7),
            status: DataStatus.added,
          },
        ],
      },
    },
  };
  [...wss.clients]
    .filter((ws) => ws.typeEx === "/demo-data")
    .forEach((ws) => ws.send(JSON.stringify(data)));
}, 2000);

wss.on("connection", function connection(ws, req) {
  ws.typeEx = req.url;
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
});
