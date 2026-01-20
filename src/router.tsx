import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { ContactInfo } from "./pages/ContactInfo";
import { HelpPage } from "./pages/help/Help";
import { GenericHelpPage } from "./pages/help/GenericHelpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
      {
        path: "/contact-info",
        element: <ContactInfo />,
      },
      {
        path: "/help",
        // Parent route just for grouping, or render an Outlet wrapper if specific layout needed. 
        // For now, removing element to let children render in MainLayout's Outlet
        children: [
          {
            index: true,
            element: <HelpPage />,
          },
          {
            path: ':category',
            element: <GenericHelpPage />,
          },
          {
            path: ':category/:slug',
            element: <GenericHelpPage />,
          }
        ]
      }
    ],
  },
]);
