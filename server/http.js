var express = require("express");
var router = express.Router();

const apiDataList = [];

for (let index = 1; index < 1000; index++) {
  const data = {
    id: index,
    count: Math.floor(Math.random() * 80),
    data: Math.random().toString(36).substring(7),
  };
  apiDataList.push(data);
}

router.post("/dbsource", function (req, res) {
  const MIN_ID = 1;
  const dataList = [];
  dataList.push(["id", "count", "data"]);
  for (let index = MIN_ID; index < 300; index++) {
    dataList.push([
      index,
      Math.floor(Math.random() * 80),
      Math.random().toString(36).substring(7),
    ]);
  }
  res.json({
    "book.list": dataList,
  });
});

router.get("/api", function (req, res) {
  const MIN_ID = 1;
  const dataList = [];

  res.send({
    sources: {
      "api.demo": {
        options: null,
        data: apiDataList,
      },
    },
  });
});

router.get("/api/server", function (req, res) {
  console.log(req.query);
  const clientData = JSON.parse(req.query.data);

  const filter = clientData?.filter;

  const rootData = filter
    ? apiDataList.filter(
      (x) =>
        x.id.toString().indexOf(filter) != -1 ||
        x.count.toString().indexOf(filter) != -1 ||
        x.data.indexOf(filter) != -1
    )
    : apiDataList;

  const sortInfo = clientData?.sortInfo;
  if (sortInfo) {
  }

  const pageSize = Math.max(clientData?.pageSize ?? 10, 0);
  const pageNumber = Math.max(clientData?.pageNumber ?? 1, 1);
  let minId = pageSize * (pageNumber - 1);
  if (minId >= rootData.length) {
    minId = 0;
  }
  const maxId = minId + pageSize;
  let data = rootData.filter((_, i) => i > minId && i <= maxId);

  console.log({ pageSize, pageNumber, sortInfo, filter });
  res.send({
    sources: {
      "api.demo": {
        options: {
          extra: {
            total: rootData.length,
            from: minId,
          },
        },
        data: data,
      },
    },
  });
});

router.get("/api/server/loader", function (req, res) {
  console.log(req.query);
  const name = req.query.name;
  const clientData = JSON.parse(req.query.data);

  const filter = clientData?.filter;

  const rootData = filter
    ? apiDataList.filter(
      (x) =>
        x.id.toString().indexOf(filter) != -1 ||
        x.count.toString().indexOf(filter) != -1 ||
        x.data.indexOf(filter) != -1
    )
    : apiDataList;

  const sortInfo = clientData?.sortInfo;
  if (sortInfo) {
  }

  const pageSize = Math.max(clientData?.pageSize ?? 10, 0);
  const pageNumber = Math.max(clientData?.pageNumber ?? 1, 1);
  let minId = pageSize * (pageNumber - 1);
  if (minId >= rootData.length) {
    minId = 0;
  }
  const maxId = minId + pageSize;
  let data = rootData.filter((_, i) => i > minId && i <= maxId);

  for (let i = 0; i < 100000; i++) {
    for (let j = 0; j < 10000; j++) {

    }
  }
  console.log({ pageSize, pageNumber, sortInfo, filter });
  const source = {};
  Reflect.set(source, name, {
    options: {
      extra: {
        total: rootData.length,
        from: minId,
      },
    },
    data: data,
  });
  res.send({ sources: source });
});

router.get("/api/mix", function (req, res) {
  console.log(req.query);
  const clientData = JSON.parse(req.query.data);

  const filter = clientData?.filter;

  const rootData = filter
    ? apiDataList.filter(
      (x) =>
        x.id.toString().indexOf(filter) != -1 ||
        x.count.toString().indexOf(filter) != -1 ||
        x.data.indexOf(filter) != -1
    )
    : apiDataList;

  const sortInfo = clientData?.sortInfo;
  if (sortInfo) {
  }

  console.log({ sortInfo, filter });
  res.send({
    sources: {
      "api.demo": {
        options: {
          extra: {
            total: rootData.length,
            from: 0,
          },
        },
        data: rootData,
      },
    },
  });
});
module.exports = router;
