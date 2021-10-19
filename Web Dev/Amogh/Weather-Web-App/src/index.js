import ReactDOM from "react-dom";
import store from "./store/index";
import "./index.css";
import {Provider} from "react-redux";
import App from "./App";
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
