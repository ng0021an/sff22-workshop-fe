import ReactDOM from "react-dom/client";

(async () => {
  let App;
  console.log(__APP_ID__);
  if (__APP_ID__ === "a") {
    const AppAExports = await import("./components/a/AppA");
    App = AppAExports.default;
  } else {
    const AppBExports = await import("./components/b/AppB");
    App = AppBExports.default;
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
