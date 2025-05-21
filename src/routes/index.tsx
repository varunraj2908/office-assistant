// import { RouteObject } from "react-router";
// import Layout from "../layout";
// import Boards from "../pages/Boards";
// import Chat from "../pages/Chat";
// import Assistant from "../pages/Assistant";

// const routes: RouteObject[] = [
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         children: [
//           {
//             path: "chat",
//             element: <Chat />,
//           },

//           {
//             path: "task",
//             element: <Boards />,
//           },
//           {
//             path: "assistant",
//             element: <Assistant />,
//           },
//         ],
//       },
//     ],
//   },
// ];

// export default routes;


import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Chat from "../pages/Chat";
import Assistant from "../pages/Assistant";
import Home from "../pages/Home"; // Import Home component
import VirtualAssistant from "../pages/VirtualAssistant";

const routes: RouteObject[] = [
  {
    path: "/", 
    element: <Home />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "task",
        element: <Boards />,
      },
      {
        path: "assistant",
        element: <Assistant />,
      },
      {
        path: "virtual-assistant",
        element: <VirtualAssistant />,
      },
    ],
  },
];

export default routes;

