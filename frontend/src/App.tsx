import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import router from "./router";

function App() {

  return (
    <div className="">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
