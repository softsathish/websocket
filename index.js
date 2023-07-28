import { WebSocketServer } from "ws";
import StockSocket from "stocksocket";

const wss = new WebSocketServer({ port: 8080 });

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", JSON.parse(data));
    const stocks = JSON.parse(data);
    StockSocket.removeAllTickers();
    StockSocket.addTickers(stocks, (data) => {
      ws.send(JSON.stringify(data));
    })
  });
});
