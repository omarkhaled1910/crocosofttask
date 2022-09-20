import AddEditQuiz from "../pages/AddEditQuiz/AddEditQuiz";
import Home from "../pages/Home/Home";
import ViewQuiz from "../pages/ViewQuiz/ViewQuiz";

export const appRoutes = [
  {
    component: <Home />,
    route: "/",
    exact: false,
  },
  {
    component: <AddEditQuiz />,
    route: "/add-quiz",
    exact: false,
  },
  {
    component: <AddEditQuiz />,
    route: "/edit-quiz/:id",
    exact: false,
  },
  {
    component: <ViewQuiz />,
    route: "/view-quiz/:id",
    exact: false,
  },
];
